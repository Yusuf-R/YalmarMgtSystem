import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import AdvImgResizerMultiFile from '@/components/AdvImgResizerMultiFile/AdvImgResizerMultiFile';

const Step9PictureUpload = ({formData, setFormData}) => {
    const {register} = useFormContext();
    const [isResizing, setIsResizing] = useState(false);
    const [imagesToResize, setImagesToResize] = useState([]);
    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));

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

    const handleRemoveImage = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            images: prevData.images.filter((_, i) => i !== index)
        }));
    };

    return (
        <Box sx={{width: '100%', p: {xs: 2, sm: 3, md: 4}}}>
            <Grid container spacing={{xs: 2, sm: 3, md: 4}}>
                <Grid item xs={12}>
                    <Typography variant="h6"
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'},
                                }}>
                        Picture Upload
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{xs: 2, sm: 3, md: 4}}
                        divider={<Divider orientation="vertical" flexItem
                                          sx={{display: {xs: 'none', sm: 'block'}, border: '2px solid #FFF'}}/>}
                    >
                        <Typography variant="body2" sx={{fontSize: {xs: '0.8rem', sm: '0.9rem', md: '1rem'}}}>
                            Allowed Types: PNG, JPG, JPEG
                        </Typography>
                        <Typography variant="body2" sx={{fontSize: {xs: '0.8rem', sm: '0.9rem', md: '1rem'}}}>
                            Max Size: 2MB per picture
                        </Typography>
                        <Typography variant="body2" sx={{fontSize: {xs: '0.8rem', sm: '0.9rem', md: '1rem'}}}>
                            Multiple selection allowed
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        component="label"
                        variant="contained"
                        sx={{
                            fontSize: {xs: '0.8rem', sm: '0.9rem', md: '1rem'},
                            padding: {xs: '8px 16px', sm: '10px 20px', md: '12px 24px'}
                        }}
                    >
                        Upload Pictures
                        <input
                            {...register('images')}
                            type="file"
                            multiple
                            onChange={handleImageUpload}
                            accept="image/*"
                            style={{display: 'none'}}
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
                    <Grid container spacing={{xs: 1, sm: 2}}>
                        {(formData?.images || []).map((image, index) => (
                            <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        paddingTop: '100%', // 1:1 Aspect Ratio
                                        width: '100%',
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={`Uploaded ${index}`}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                            },
                                        }}
                                        onClick={() => handleRemoveImage(index)}
                                        size="small"
                                    >
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Step9PictureUpload;