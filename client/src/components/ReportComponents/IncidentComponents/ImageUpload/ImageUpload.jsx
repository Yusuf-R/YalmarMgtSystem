import {useFormContext} from 'react-hook-form';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CropIcon from '@mui/icons-material/Crop';
import DeleteIcon from '@mui/icons-material/Delete';
import AdvImgMultiFile from "@/components/AdvImgMultiFile/AdvImgMultiFile";
import {useState} from "react";
import {v4 as uuidv4} from 'uuid';


function ImageUpload() {
    const typographyStyle = {
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: '16px',
        textAlign: 'left',
    };
    const paperSx = {
        padding: '10px',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        width: '100%',
        height: 'auto',
    }
    const [images, setImages] = useState([]);
    const [isCropping, setIsCropping] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    
    const {register} = useFormContext(); // Use useFormContext to access form methods
    
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const validImages = files.filter((file) => {
            const fileType = file.type;
            const fileSize = file.size;
            return fileSize <= 20000000 && ["image/png", "image/jpeg", "image/jpg"].includes(fileType);
        });
        
        const imagePromises = validImages.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve({
                        id: uuidv4(),
                        src: reader.result,
                        file: file,
                        croppedSrc: null
                    });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });
        
        Promise.all(imagePromises)
            .then((newImages) => {
                setImages((prevImages) => [...prevImages, ...newImages]);
            })
            .catch((error) => {
                console.error("Error reading files", error);
            });
    };
    
    const handleRemoveImage = (imageId) => {
        setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
    };
    
    const handleOpenCrop = (image) => {
        setCurrentImage(image);
        setIsCropping(true);
    };
    
    const handleSaveCroppedImage = (croppedSrc) => {
        setImages((prevImages) =>
            prevImages.map((img) =>
                img.id === currentImage.id ? {...img, croppedSrc} : img
            )
        );
        setIsCropping(false);
        setCurrentImage(null);
    };
    
    return (
        <>
            <Paper sx={{padding: '30px', backgroundColor: 'inherit', borderRadius: '10px'}}>
                {/* Images upload */}
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle 4" sx={{color: '#FFF'}}>Optional: Attach Relevant
                            Images</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={5} sx={{padding: '30px', backgroundColor: 'inherit', borderRadius: '10px'}}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Stack direction='row' gap={4}>
                                        <Typography variant="subtitle1" sx={{color: '#FFF'}}>Allowed Types: PNG, JPG,
                                            JPEG.</Typography>
                                        <Divider orientation="vertical" sx={{border: '5px solid #FFF'}} flexItem/>
                                        <Typography variant="subtitle1" sx={{color: '#FFF'}}>Max Size for each picture:
                                            2MB.</Typography>
                                        <Divider orientation="vertical" sx={{border: '5px solid #FFF'}} flexItem/>
                                        <Typography variant="subtitle1" sx={{color: '#FFF'}}>You can select more than
                                            one
                                            file at once</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Paper>
                        <br/>
                        <Grid container spacing={3}>
                            {images.map((image) => (
                                <Grid item xs={12} sm={6} md={4} key={image.id}>
                                    <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                                        <Typography variant='subtitle1' color="#FFF">Original Image</Typography>
                                        <Image
                                            alt="Profile Picture"
                                            src={image.src || '/Avatar-3.svg'}
                                            width={360}
                                            height={360}
                                        />
                                        {image.croppedSrc && (
                                            <>
                                                <Typography variant="subtitle1" color="#20fa94">
                                                    Cropped Image
                                                </Typography>
                                                <Image
                                                    src={image.croppedSrc}
                                                    alt="Cropped Image Preview"
                                                    width={360}
                                                    height={360}
                                                />
                                            </>
                                        )}
                                        <Typography variant="subtitle2" color="#FFF">{image.file.name}</Typography>
                                        <Stack direction='row' spacing={2} justifyContent='center'>
                                            <Button variant="contained" onClick={() => handleOpenCrop(image)}
                                                    color='primary' startIcon={<CropIcon/>}>
                                                Crop Image
                                            </Button>
                                            <Button variant="contained" onClick={() => handleRemoveImage(image.id)}
                                                    color='secondary' startIcon={<DeleteIcon/>}>
                                                Remove Image
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                        <br/><br/>
                        <Grid item xs={12}>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button
                                    component="label"
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon/>}
                                >
                                    Upload Pictures
                                    <input
                                        {...register('images')}
                                        type="file"
                                        multiple
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        style={{display: 'none'}} // Hide the input element
                                    />
                                </Button>
                            </Box>
                        </Grid>
                        {isCropping && currentImage && (
                            <AdvImgMultiFile
                                open={isCropping}
                                onClose={() => setIsCropping(false)}
                                image={currentImage}
                                onSave={handleSaveCroppedImage}
                            />
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default ImageUpload;
