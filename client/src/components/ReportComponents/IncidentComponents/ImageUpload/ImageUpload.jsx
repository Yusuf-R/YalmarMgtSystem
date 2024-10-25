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
import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';


function ImageUpload({onImagesChange}) {
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

    const {register, setValue, watch} = useFormContext(); // Use useFormContext to access form methods


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
                img.id === currentImage.id ? {...img, croppedSrc, isCropped: true} : img
            )
        );
        setIsCropping(false);
        setCurrentImage(null);
    };

    const [isInitialized, setIsInitialized] = useState(false); // Track if images are initialized

    useEffect(() => {
        if (isInitialized) {
            onImagesChange(images); // Pass the prepared images to the parent component
        } else {
            setIsInitialized(true); // Initialize once
        }
    }, [images]);

    return (
        <>
            <Paper sx={paperSx}>
                {/* Images upload */}
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle 4" sx={{
                            fontWeight: 'bold',
                            fontFamily: 'Poppins',
                            fontSize: '16px',
                            borderRadius: '30px',
                            textAlign: 'left',
                            // color: '#46F0F9',
                        }}>Optional: Attach Relevant
                            Images</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={5} sx={{padding: '30px', backgroundColor: 'inherit', borderRadius: '10px'}}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Stack
                                        direction={{xs: 'column', sm: 'row'}}
                                        spacing={{xs: 2, sm: 3, md: 4}}
                                        alignItems="center"
                                        justifyContent="center"
                                    
                                        divider={<Divider orientation="vertical" flexItem
                                                          sx={{
                                                              display: {xs: 'none', sm: 'block'},
                                                              border: '2px solid #FFF'
                                                          }}/>}
                                    >
                                        <Typography variant="body2"
                                                    sx={{
                                                        fontSize: {
                                                            xs: '0.8rem',
                                                            sm: '0.9rem',
                                                            md: '1rem'
                                                        },
                                                        color: '#FFF'
                                                    }}>
                                            Allowed Types: PNG, JPG, JPEG
                                        </Typography>
                                        <Typography variant="body2"
                                                    sx={{
                                                        fontSize: {
                                                            xs: '0.8rem', sm: '0.9rem', md: '1rem',

                                                        },
                                                        color: '#FFF'
                                                    }}>
                                            Max Size: 2MB per picture
                                        </Typography>
                                        <Typography variant="body2"
                                                    sx={{
                                                        fontSize: {
                                                            xs: '0.8rem', sm: '0.9rem', md: '1rem',
                                                            color: '#FFF'
                                                        },
                                                        color: '#FFF'
                                                    }}>
                                            Multiple selection allowed
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Paper>
                        <br/>
                        <Grid container spacing={3}>
                            {images.map((image) => (
                                <Grid item xs={12} sm={12} md={6} lg={4} key={image.id}>
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
                                                    color='primary' startIcon={<CropIcon/>} size="small">
                                                Crop
                                            </Button>
                                            <Button variant="contained" onClick={() => handleRemoveImage(image.id)}
                                                    color='secondary' startIcon={<DeleteIcon/>} size="small">
                                                Remove
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
                                    size="small"
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
