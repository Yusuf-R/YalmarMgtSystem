import React, {useState, useCallback, useRef} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import {
    Cropper,
} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import CropIcon from '@mui/icons-material/Crop';

const AdvImgMultiFile = ({open, onClose, image, onSave}) => {
    const [croppedImage, setCroppedImage] = useState(null);
    const cropperRef = useRef(null);
    const [aspect, setAspect] = useState(1);


    // Handle cropping
    const handleCrop = () => {
        const cropper = cropperRef.current;
        if (cropper) {
            const canvas = cropper.getCanvas();
            if (canvas) {
                const croppedDataUrl = canvas.toDataURL();
                setCroppedImage(croppedDataUrl);  // Set the cropped image for preview
            }
        }
    };


    // Handle saving the cropped image
    const handleSave = () => {
        const cropper = cropperRef.current;
        if (cropper) {
            const canvas = cropper.getCanvas();
            if (canvas) {
                const croppedData = canvas.toDataURL();
                onSave(croppedData);  // Save cropped image without updating the preview
                onClose();  // Close the dialog
            }
        }
    };

    // Close the dialog without saving
    const handleClose = () => {
        onClose();
    };

    const paperProps = {
        alignCenter: 'center',
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#274e61',
        borderRadius: '10px',
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth='lg' fullWidth sx={{
            overflow: 'hidden',
            backgroundColor: '#274e61',
        }}>
            <DialogContent sx={{
                backgroundColor: '#274e61',
                overflow: 'hidden',
                height: '950px',
            }}>
                <Box sx={{
                    p: 0,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Paper sx={paperProps}>
                                <Typography variant='subtitle1'
                                            sx={{fontFamily: 'Poppins', fontWeight: 'bold', color: "#FFF"}}>Original
                                    Image</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper sx={paperProps}>
                                <Typography variant='subtitle1'
                                            sx={{fontFamily: 'Poppins', fontWeight: 'bold', color: "#FFF"}}>Cropped
                                    Image</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sx={{
                            p: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Paper sx={{
                                ...paperProps,
                                m: 0,
                                p: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 'fit-content',
                            }}>
                                {image && image.src ? (
                                    <Cropper
                                        ref={cropperRef}
                                        src={image.src}
                                        style={{
                                            height: '100%',
                                            width: '500px',
                                            backgroundColor: '#274e61',
                                            p: 0,
                                            m: 0,
                                            alignSelf: 'center',
                                        }}
                                    />
                                ) : (
                                    <Typography variant='subtitle1'
                                                sx={{fontFamily: 'Poppins', fontWeight: 'bold', color: "#FFF"}}>
                                        Image not available
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sx={{
                            p: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Paper sx={{
                                ...paperProps,
                                m: 0,
                                p: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 'fit-content',
                            }}>
                                {croppedImage ? (
                                    <img
                                        src={croppedImage}
                                        alt="Cropped"
                                        style={{
                                            height: '100%',
                                            width: '500px',
                                            backgroundColor: '#274e61',
                                            p: 0,
                                            m: 0,
                                            alignSelf: 'center',
                                        }}
                                    />
                                ) : (
                                    <Typography variant='subtitle1'
                                                sx={{fontFamily: 'Poppins', fontWeight: 'bold', color: "#FFF"}}>
                                        No Preview Available
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sx={{
                            p: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Paper sx={{
                                ...paperProps,
                                mb: 0,
                                p: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 'fit-content',
                            }}>
                                {/*<CropIcon sx={{color: "#FFF"}} onClick={handleCrop}/>*/}
                                <Button color="success" onClick={handleCrop} variant="contained">
                                    Crop
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{
                backgroundColor: '#274e61',
                p: 3,
            }}>
                <Button color="success" onClick={handleClose} variant="contained">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="error" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AdvImgMultiFile;
