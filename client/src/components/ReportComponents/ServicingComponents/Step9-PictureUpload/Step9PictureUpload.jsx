import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AdvImgResizerMultiFile from '@/components/AdvImgResizerMultiFile/AdvImgResizerMultiFile';

const Step9PictureUpload = ({formData, setFormData}) => {
    const {register} = useFormContext();
    const [isResizing, setIsResizing] = useState(false);
    const [imagesToResize, setImagesToResize] = useState([]);
    
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const validImages = files.filter(file => {
            const fileType = file.type;
            const fileSize = file.size;
            return fileSize <= 2000000 && ['image/png', 'image/jpeg', 'image/svg', 'image/svg+xml', 'image/jpg'].includes(fileType);
        });
        
        setImagesToResize(validImages.map(file => URL.createObjectURL(file)));
        setIsResizing(true);
    };
    
    const handleResizedImages = (resizedImages) => {
        setFormData((prevData) => ({...prevData, images: [...(prevData?.images || []), ...resizedImages]}));
        setIsResizing(false);
    };
    
    return (
        <>
            <br/><br/><br/>
            <Box>
                <Grid container spacing={4}>
                    <Paper elevation={5} sx={{
                        alignContent: 'start',
                        padding: '30px',
                        backgroundColor: 'inherit',
                        color: '#46F0F9',
                        borderRadius: '10px',
                        width: '100%',
                        height: 'auto',
                        margin: '25px'
                    }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Picture Upload</Typography>
                                <br/><br/>
                                <Stack direction='row' gap={4}>
                                    <Typography variant="subtitle1">Allowed Types: PNG, JPG, JPEG, SVG.</Typography>
                                    <Divider orientation="vertical" sx={{border: '5px solid #FFF'}} flexItem/>
                                    <Typography variant="subtitle1">Max Size for each picture: 2MB.</Typography>
                                    <Divider orientation="vertical" sx={{border: '5px solid #FFF'}} flexItem/>
                                    <Typography variant="subtitle1">You can select more than one file at
                                        once</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Button component="label" variant="contained">
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
                            </Grid>
                            <Grid item xs={12}>
                                {isResizing && (
                                    <AdvImgResizerMultiFile
                                        images={imagesToResize}
                                        onResized={handleResizedImages}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    {(formData?.images || []).map((image, index) => (
                                        <Grid item key={index}>
                                            <img src={image} alt={`Uploaded ${index}`} width="100" height="100"/>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Box>
        </>
    );
};

export default Step9PictureUpload;
