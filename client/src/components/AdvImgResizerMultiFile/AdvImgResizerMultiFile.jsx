import React, {useState, useRef, useEffect, useCallback} from "react";
import {styled} from '@mui/material/styles';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CropIcon from "@mui/icons-material/Crop";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "@mui/material/Modal";
import {Cropper} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const paperProps = {
    padding: '10px',
    backgroundColor: '#274e61',
    color: '#46F0F9',
    borderRadius: '10px',
    width: '100%',
    height: 'auto',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)'
};

const StyledModal = styled(Modal)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const modalContentStyle = {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    padding: {xs: 2, sm: 3, md: 4},
    width: {xs: '95%', sm: '90%', md: '600px'},
    maxHeight: '90vh',
    overflow: 'auto',
};

const cropperWrapperStyle = {
    width: '100%',
    height: {xs: '300px', sm: '400px'},
};

function AdvImgResizerMultiFile({initialImages = [], onImagesChange}) {
    const [images, setImages] = useState(() => initialImages);
    const [currentImage, setCurrentImage] = useState(null);
    const [open, setOpen] = useState(false);
    const cropperRef = useRef(null);

    const handleClear = () => {
        setCurrentImage(null);
        setOpen(false);
    };

    const onFileSelect = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const validImages = selectedFiles.filter(file => {
            const fileType = file.type;
            const fileSize = file.size;
            return fileSize <= 2000000 && ['image/png', 'image/jpeg', 'image/svg', 'image/svg+xml', 'image/jpg'].includes(fileType);
        });

        const imagePromises = validImages.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve({src: reader.result, file});
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(imagePromises).then(results => {
            updateImages([...images, ...results]);
        }).catch(error => {
            console.error('Error reading files', error);
        });
    };

    const handleOpen = (image) => {
        setCurrentImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateImages = useCallback((newImages) => {
        const processedImages = newImages.map(img => ({
            ...img,
            finalSrc: img.croppedSrc || img.src // Use cropped image if available, otherwise use original
        }));
        setImages(processedImages);
        onImagesChange(processedImages);
    }, [onImagesChange]);

    const handleSave = () => {
        if (!cropperRef.current) {
            return;
        }

        const canvas = cropperRef.current.getCanvas();
        if (canvas) {
            const croppedImage = canvas.toDataURL('image/jpeg');
            updateImages(images.map(img =>
                img === currentImage
                    ? {...img, croppedSrc: croppedImage, finalSrc: croppedImage}
                    : img
            ));
            handleClose();
        }
    };


    const handleCropChange = () => {
        if (cropperRef.current) {
            const canvas = cropperRef.current.getCanvas();
            if (canvas) {
                const croppedImageDataUrl = canvas.toDataURL('image/jpeg');
                updateImages(images.map(img => img === currentImage ? {...img, croppedSrc: croppedImageDataUrl} : img));
            }
        }
    };

    useEffect(() => {
        onImagesChange(images);
    }, [images, onImagesChange]);

    useEffect(() => {
        if (currentImage) {
            handleCropChange();
        }
    }, [currentImage]);

    const handleRemoveImage = (imageToRemove) => {
        updateImages(images.filter(image => image !== imageToRemove));
    };

    return (
        <Box sx={{width: '100%', p: {xs: 2, sm: 3, md: 4}}}>
            <Stack direction='column' spacing={2} justifyContent="center" alignItems="center">
                <Typography variant="h6" sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    color: '#FFF',
                    fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'},
                }}>
                    Picture Upload
                </Typography>

                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    spacing={{xs: 2, sm: 3, md: 4}}
                    divider={<Divider orientation="vertical" flexItem
                                      sx={{display: {xs: 'none', sm: 'block'}, border: '2px solid #FFF'}}/>}
                >
                    <Typography variant="body2"
                                sx={{fontSize: {xs: '0.8rem', sm: '0.9rem', md: '1rem'}, color: '#FFF'}}>
                        Allowed Types: PNG, JPG, JPEG
                    </Typography>
                    <Typography variant="body2"
                                sx={{fontSize: {xs: '0.8rem', sm: '0.9rem', md: '1rem'}, color: '#FFF'}}>
                        Max Size: 2MB per picture
                    </Typography>
                    <Typography variant="body2"
                                sx={{fontSize: {xs: '0.8rem', sm: '0.9rem', md: '1rem'}, color: '#FFF'}}>
                        Multiple selection allowed
                    </Typography>
                </Stack>

                <Button
                    component="label"
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon/>}
                    sx={{
                        fontSize: {xs: '0.8rem', sm: '0.9rem', md: '1rem'},
                        padding: {xs: '8px 16px', sm: '10px 20px', md: '12px 24px'}
                    }}
                >
                    Upload Pictures
                    <VisuallyHiddenInput type="file" multiple onChange={onFileSelect}/>
                </Button>

                <Grid container spacing={{xs: 2, sm: 3, md: 4}}>
                    {images.map((image, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
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
                                        <Typography variant="subtitle1" color="#20fa94">Cropped Image</Typography>
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
                                    <Button variant="contained" onClick={() => handleOpen(image)}
                                            color='primary' size="small" startIcon={<CropIcon/>}>
                                        Crop
                                    </Button>
                                    <Button variant="contained" onClick={() => handleRemoveImage(image)}
                                            color='secondary' size="small" startIcon={<DeleteIcon/>}>
                                        Remove
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Stack>


            <Modal open={open} onClose={handleClose} sx={modalStyle}>
                <Box sx={modalContentStyle}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'grey.500',
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Crop Image
                    </Typography>
                    <Box sx={cropperWrapperStyle}>
                        <Cropper
                            ref={cropperRef}
                            src={currentImage ? currentImage.src : ""}
                            style={{height: '100%', width: '100%'}}
                            onCrop={handleCropChange}
                        />
                    </Box>
                    <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            startIcon={<SendIcon/>}
                        >
                            Crop
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleClear}
                            startIcon={<DeleteIcon/>}
                        >
                            Clear
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
}

export default AdvImgResizerMultiFile;