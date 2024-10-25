import React, {useState, useRef} from 'react';
import {Cropper} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const AdvImgMultiFile = ({open, onClose, image, onSave}) => {
    const [croppedImage, setCroppedImage] = useState(null);
    const cropperRef = useRef(null);
    const theme = useTheme();

    // Improved breakpoint handling
    const isXsScreen = useMediaQuery(theme.breakpoints.down('sm')); // Small screen (below 600px)
    const isSmScreen = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Medium screen (600px - 899px)
    const isMdScreen = useMediaQuery(theme.breakpoints.between('md', 'lg')); // Large screen (900px - 1199px)
    const isLgScreen = useMediaQuery(theme.breakpoints.up('lg')); // Extra large screen (1200px+)

    const handleCrop = () => {
        const cropper = cropperRef.current;
        if (cropper) {
            const canvas = cropper.getCanvas();
            if (canvas) {
                const croppedDataUrl = canvas.toDataURL();
                setCroppedImage(croppedDataUrl);
            }
        }
    };

    const handleSave = () => {
        const cropper = cropperRef.current;
        if (cropper) {
            const canvas = cropper.getCanvas();
            if (canvas) {
                const croppedData = canvas.toDataURL();
                onSave(croppedData);
                onClose();
            }
        }
    };

    const paperProps = {
        backgroundColor: '#274e61',
        borderRadius: '10px',
        p: 2,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const imageContainerStyle = {
        width: '100%',
        height: isXsScreen ? '250px' : isSmScreen ? '300px' : '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#1e3d4d',
        borderRadius: '8px',
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            fullScreen={isXsScreen}
            PaperProps={{
                sx: {
                    backgroundColor: '#274e61',
                    margin: isXsScreen ? 0 : 2,
                    maxHeight: '90vh',
                }
            }}
        >
            <DialogContent sx={{p: {xs: 1, sm: 2, md: 3}}}>
                <Stack spacing={2}>
                    {/* Headers */}
                    <Stack
                        direction={isLgScreen ? 'row' : 'column'}
                        spacing={2}
                        sx={{width: '100%'}}
                    >
                        <Typography
                            variant={isXsScreen ? 'subtitle2' : 'subtitle1'}
                            sx={{
                                color: '#FFF',
                                fontWeight: 'bold',
                                flex: 1,
                                textAlign: 'center'
                            }}
                        >
                            Original Image
                        </Typography>
                        <Typography
                            variant={isXsScreen ? 'subtitle2' : 'subtitle1'}
                            sx={{
                                color: '#FFF',
                                fontWeight: 'bold',
                                flex: 1,
                                textAlign: 'center'
                            }}
                        >
                            Cropped Preview
                        </Typography>
                    </Stack>

                    {/* Image Containers */}
                    <Stack
                        direction={isLgScreen ? 'row' : 'column'}
                        spacing={2}
                        sx={{width: '100%'}}
                    >
                        {/* Original Image with Cropper */}
                        <Paper sx={paperProps}>
                            <Box sx={imageContainerStyle}>
                                {image && image.src ? (
                                    <Cropper
                                        ref={cropperRef}
                                        src={image.src}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                ) : (
                                    <Typography sx={{color: '#FFF'}}>
                                        Image not available
                                    </Typography>
                                )}
                            </Box>
                        </Paper>

                        {/* Cropped Preview */}
                        <Paper sx={paperProps}>
                            <Box sx={imageContainerStyle}>
                                {croppedImage ? (
                                    <img
                                        src={croppedImage}
                                        alt="Cropped"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                ) : (
                                    <Typography sx={{color: '#FFF'}}>
                                        No Preview Available
                                    </Typography>
                                )}
                            </Box>
                        </Paper>
                    </Stack>

                    {/* Crop Button */}
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            color="success"
                            onClick={handleCrop}
                            variant="contained"
                            size={isXsScreen ? 'small' : 'medium'}
                        >
                            Generate Preview
                        </Button>
                    </Box>
                </Stack>
            </DialogContent>

            <Divider sx={{backgroundColor: '#1e3d4d'}}/>

            <DialogActions sx={{p: 2, backgroundColor: '#274e61'}}>
                <Button
                    color="error"
                    onClick={onClose}
                    variant="contained"
                    size={isXsScreen ? 'small' : 'medium'}
                >
                    Cancel
                </Button>
                <Button
                    color="success"
                    onClick={handleSave}
                    variant="contained"
                    size={isXsScreen ? 'small' : 'medium'}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AdvImgMultiFile;
