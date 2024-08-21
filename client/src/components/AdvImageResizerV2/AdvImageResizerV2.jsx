'use client';
import {Controller, useFormContext, useWatch} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {mainSection} from "@/utils/data";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState, useRef} from "react";
import {styled} from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Paper from "@mui/material/Paper";
import Image from "next/image";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CropIcon from "@mui/icons-material/Crop";
import SendIcon from "@mui/icons-material/Send";
import Modal from "@mui/material/Modal";
import {Cropper, CropperPreview} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';


function AdvImageResizerV2() {
    const [imgSrc, setImgSrc] = useState('');
    const [croppedPicture, setCroppedPicture] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [crop, setCrop] = useState({});
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
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        border: '2px solid #000',
        height: 500,
        boxShadow: 24,
    };
    const cropperRef = useRef(null);
    const [aspect, setAspect] = useState(1);
    const [cropDataUrl, setCropDataUrl] = useState('');
    
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
        setCroppedPicture('');
        setErrorMessage('');
        setOpen(false);
    };
    
    const onFileSelect = (event) => {
        handleClear();
        const file = event.target.files[0];
        const fileSize = file.size;
        const fileType = file.type;
        
        if (fileSize > 2000000) {
            setErrorMessage('File size exceeds 2MB');
            setImgSrc('');
            return;
        }
        
        if (!['image/png', 'image/jpeg', 'image/svg', 'image/svg+xml', 'image/jpg'].includes(fileType)) {
            setErrorMessage('Invalid file format');
            setImgSrc('');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = () => {
            setImgSrc(reader.result?.toString() || '');
            setErrorMessage('');
        };
        reader.readAsDataURL(file);
    };
    
    const handleOpen = () => {
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
            setCroppedPicture(croppedImage);
            handleClose();
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        
        if (!croppedPicture) {
            formData.append('image', imgSrc);
        } else {
            formData.append('image', croppedPicture);
        }
    };
    const handleCropChange = (cropper) => {
        if (cropper) {
            const canvas = cropper.getCanvas();
            if (canvas) {
                const croppedImageDataUrl = canvas.toDataURL('image/jpeg');
                setCropDataUrl(croppedImageDataUrl);
            }
        }
    };
    return (
        <>
            <Box sx={mainSection}>
                <Paper elevation={5} sx={{
                    alignCenter: 'center',
                    textAlign: 'center',
                    padding: '10px',
                    backgroundColor: '#274e61',
                    color: '#46F0F9',
                    borderRadius: '10px',
                    width: '100%',
                    height: 'auto',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)'
                }}>
                    <Typography variant='h5'>Advance Image Edit v2</Typography>
                </Paper>
                <br/>
                <Paper elevation={5} sx={{
                    alignCenter: 'center',
                    padding: '10px',
                    backgroundColor: '#274e61',
                    color: '#46F0F9',
                    borderRadius: '10px',
                    width: '100%',
                    height: 'auto',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)'
                }}>
                    <Stack direction='column' spacing={2}>
                        <Paper elevation={5} sx={{
                            alignCenter: 'center',
                            textAlign: 'left',
                            padding: '10px',
                            backgroundColor: '#274e61',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)'
                        }}>
                            <Typography variant='subtitle1' color="#FFF">
                                Allowed Types: PNG, JPG, JPEG, SVG.
                            </Typography>
                            <Typography variant='subtitle1' color="#FFF"> Max Size: 2MB. </Typography>
                            <Typography variant='subtitle1' color="#FFF">Further Processing: Use the Advance Cropping
                                Utility.</Typography>
                        </Paper>
                        <Stack direction='column' spacing={2} justifyContent="center" alignItems="center">
                            <Stack direction='row' spacing={5} justifyContent='center' alignItems='center'>
                                <Stack direction='column' spacing={2} justifyContent="center" alignItems="center">
                                    <Typography variant='subtitle1' color="#FFF">Original Image</Typography>
                                    <Image
                                        alt="Profile Picture"
                                        src={imgSrc || '/Avatar-3.svg'}
                                        width={360}
                                        height={360}
                                    />
                                    {errorMessage && (
                                        <Typography variant="subtitle1" color="error">
                                            {errorMessage}
                                        </Typography>
                                    )}
                                </Stack>
                                {croppedPicture && (
                                    <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                                        <Typography variant="subtitle1" color="#20fa94">Cropped Image</Typography>
                                        <Image
                                            src={croppedPicture}
                                            alt="Cropped Image Preview"
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
                                    <VisuallyHiddenInput type="file" onChange={onFileSelect}/>
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleOpen}
                                    disabled={imgSrc === ""}
                                    color='primary'
                                    startIcon={<CropIcon/>}
                                >
                                    Advance Crop Image
                                </Button>
                                <Button
                                    component="label"
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<SendIcon/>}
                                    disabled={imgSrc === ''}
                                    color='error'
                                    type='submit'
                                    title='Submit'
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </Stack>
                            <br/>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
            <Modal open={open} sx={modalStyle} onClose={handleClose}>
                <Paper sx={{...paperProps}}>
                    <Stack direction="column" gap={5}>
                        {/*    house the image and the image preview of the crop*/}
                        <Paper sx={paperProps}>
                            <Stack direction="row" gap={4} justifyContent='center'>
                                <Paper sx={paperProps}>
                                    <Typography variant='subtitle1' color="#FF">Original Image</Typography>
                                    <Cropper
                                        ref={cropperRef}
                                        src={imgSrc}
                                        aspect={aspect}
                                        onChange={(c) => {
                                            setCrop(c);
                                            handleCropChange(c);
                                        }}
                                        style={{height: 350, width: 350}}
                                    />
                                </Paper>
                                <Paper sx={paperProps}>
                                    <Typography variant='subtitle1' color="#20fa94">Cropped Preview</Typography>
                                    {cropDataUrl && (
                                        <img
                                            src={cropDataUrl}
                                            alt="Cropped Image Preview"
                                            width={350}
                                            height={350}
                                            style={{objectFit: 'contain'}}
                                        />
                                    )}
                                </Paper>
                            </Stack>
                        </Paper>
                        {/*buttons for save and close*/}
                        <Stack direction="row" gap={4} justifyContent="flex-end">
                            <Button color="success" onClick={handleClose} variant="contained">
                                Cancel
                            </Button>
                            <Button onClick={handleSave} color="error" variant="contained">
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Modal>
        </>
    );
}

export default AdvImageResizerV2;