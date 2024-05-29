'use client';
import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import CropIcon from '@mui/icons-material/Crop';

function ProfilePicture() {
    const [picture, setPicture] = useState('');
    const [selectedPicture, setSelectedPicture] = useState('');
    const [croppedPicture, setCroppedPicture] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
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
    
    const handleClear = () => {
        setPicture('');
        setSelectedPicture('');
        setCroppedPicture('');
        setErrorMessage('');
    };
    const handleUpload = (event) => {
        const file = event.target.files[0];
        const fileSize = file.size;
        const fileType = file.type;
        
        if (fileSize > 2000000) {
            setErrorMessage('File size exceeds 2MB');
            setPicture('');
            return;
        }
        
        if (!['image/png', 'image/jpeg', 'image/svg', 'image/svg+xml', 'image/jpg'].includes(fileType)) {
            setErrorMessage('Invalid file format');
            setPicture('');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = () => {
            setPicture(file.name);
            setSelectedPicture(reader.result);
            setErrorMessage('');
        };
        reader.readAsDataURL(file);
    };
    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = async () => {
        if (!croppedArea || !selectedPicture) return;
        
        const image = new window.Image();
        image.src = selectedPicture;
        
        image.onload = async () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            
            canvas.width = croppedArea.width;
            canvas.height = croppedArea.height;
            
            ctx.drawImage(
                image,
                croppedArea.x * scaleX,
                croppedArea.y * scaleY,
                croppedArea.width * scaleX,
                croppedArea.height * scaleY,
                0,
                0,
                croppedArea.width,
                croppedArea.height
            );
            
            const croppedImage = canvas.toDataURL('image/jpeg');
            setCroppedPicture(croppedImage);
            handleClose();
        };
    };
    const paperProps = {
        alignCenter: 'center',
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        width: '100%',
        height: 'auto',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
    }
    return (
        <>
            <Box sx={{padding: '20px', width: 'calc(100% - 250px)', position: 'absolute', top: '70px', left: '250px'}}>
                <Paper elevation={5} sx={paperProps}>
                    <Typography variant='h5'>Upload Profile Picture</Typography>
                </Paper>
                <br/>
                <Paper elevation={5} sx={paperProps}>
                    <Stack direction='column' spacing={2}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                gap: '10px',
                                padding: '10px',
                                backgroundColor: '#274e61',
                                color: '#46F0F9',
                                borderRadius: '10px',
                                width: '20%',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            <Typography> Allowed Types: PNG, JPG, JPEG, SVG</Typography>
                            <Typography> Max Size: 2MB </Typography>
                        </Box>
                        <Stack direction='column' spacing={2} justifyContent="center" alignItems="center">
                            <Stack direction='row' spacing={5} justifyContent='center' alignItems='center'>
                                <Stack direction='column' spacing={2} justifyContent="center" alignItems="center">
                                    {/*have a typography that says original image*/}
                                    <Typography variant='subtitle1' color="#FFF">Original Image</Typography>
                                    <Image
                                        alt='Profile Picture'
                                        src={selectedPicture || '/Avatar-3.svg'}
                                        width={360}
                                        height={360}
                                    />
                                    {errorMessage && (
                                        <Typography variant='subtitle1' color='error'>
                                            {errorMessage}
                                        </Typography>
                                    )}
                                </Stack>
                                {croppedPicture && (
                                    <Stack direction='column' spacing={2} justifyContent="center" alignItems="center">
                                        {/*have a typography that says cropped image*/}
                                        <Typography variant='subtitle1' color="#20fa94">Cropped Image</Typography>
                                        <Image
                                            src={croppedPicture}
                                            alt='Cropped Image Preview'
                                            width={360}
                                            height={360}
                                        />
                                    </Stack>
                                )}
                            </Stack>
                            <br/><br/>
                            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<NotInterestedIcon/>}
                                    onClick={handleClear}
                                    color='success'
                                >
                                    Clear
                                </Button>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon/>}
                                >
                                    Upload Picture
                                    <VisuallyHiddenInput type="file" onChange={handleUpload}/>
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleOpen}
                                    disabled={!selectedPicture}
                                    color='primary'
                                    startIcon={<CropIcon/>}
                                >
                                    Crop Image
                                </Button>
                                <Button
                                    component="label"
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<SendIcon/>}
                                    disabled={picture === ''}
                                    color='error'
                                    type='submit'
                                    title='Submit'
                                >
                                    Submit
                                </Button>
                            </Stack>
                            <br/>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
            <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
                <DialogTitle>Crop Image</DialogTitle>
                <DialogContent>
                    <Box sx={{position: 'relative', width: '100%', height: 400, bgcolor: 'black'}}>
                        <Cropper
                            image={selectedPicture}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={handleCropComplete}
                        />
                    </Box>
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(e, zoom) => setZoom(zoom)}
                        aria-labelledby="Zoom"
                        style={{marginTop: 20}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Reset
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ProfilePicture;
