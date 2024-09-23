'use client';
import {useState, useRef, useEffect, useCallback} from "react";
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
import {mainSection, modalStyle} from "@/utils/data";

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

function AdvImgResizerMultiFile({initialImages = [], onImagesChange}) {
    const [images, setImages] = useState(() => initialImages);
    const [currentImage, setCurrentImage] = useState(null);
    const [open, setOpen] = useState(false);
    const cropperRef = useRef(null);

    const handleClear = () => {
        setCurrentImage(null);
        setOpen(false);
    };
    // Use useCallback to memoize the function
    const updateImages = useCallback((newImages) => {
        setImages(newImages);
        onImagesChange(newImages);
    }, [onImagesChange]);

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

    const handleSave = () => {
        if (!cropperRef.current) {
            return;
        }

        const canvas = cropperRef.current.getCanvas();
        if (canvas) {
            const croppedImage = canvas.toDataURL('image/jpeg');
            updateImages(images.map(img => (img === currentImage ? {...img, croppedSrc: croppedImage} : img)));
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        images.forEach(image => {
            formData.append('images', image.croppedSrc || image.src);
        });
    };

    return (
        <>
            <Box>
                <br/>
                <Paper elevation={5} sx={paperProps}>
                    <Stack direction='column' spacing={2}>
                        <Stack direction='column' spacing={2} justifyContent="center" alignItems="center">
                            <Grid container spacing={3}>
                                {images.map((image, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Stack direction="column" spacing={2} justifyContent="center"
                                               alignItems="center">
                                            <Typography variant='subtitle1' color="#FFF">Original Image</Typography>
                                            <Image
                                                alt="Profile Picture"
                                                src={image.src || '/Avatar-3.svg'}
                                                width={360}
                                                height={360}
                                            />
                                            {image.croppedSrc && (
                                                <>
                                                    <Typography variant="subtitle1" color="#20fa94">Cropped
                                                        Image</Typography>
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
                                                        color='primary' startIcon={<CropIcon/>}>
                                                    Crop Image
                                                </Button>
                                                <Button variant="contained" onClick={() => handleRemoveImage(image)}
                                                        color='secondary' startIcon={<DeleteIcon/>}>
                                                    Remove Image
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                            <br/><br/>
                            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
                                <Button
                                    component="label"
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon/>}
                                >
                                    Upload Pictures
                                    <VisuallyHiddenInput type="file" multiple onChange={onFileSelect}/>
                                </Button>
                            </Stack>
                            <br/>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
            <Modal open={open} onClose={handleClose} sx={modalStyle}>
                <Paper sx={paperProps}>
                    <Stack direction="column" gap={5}>
                        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                            <Paper sx={paperProps}>
                                <Cropper
                                    ref={cropperRef}
                                    src={currentImage ? currentImage.src : ""}
                                    onCrop={handleCropChange}
                                />
                            </Paper>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Button variant="contained" onClick={handleSave} color="primary" startIcon={<SendIcon/>}>
                                Crop
                            </Button>
                            <Button variant="contained" onClick={handleClear} color="error"
                                    startIcon={<NotInterestedIcon/>}>
                                Clear
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Modal>
        </>
    );
}

export default AdvImgResizerMultiFile;
