'use client';
import React, {useState, useRef} from 'react';
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
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import CropIcon from '@mui/icons-material/Crop';
import Modal from '@mui/material/Modal';
import {useDebounceEffect} from "@/customHooks/useDebounceEffect";
import {canvasPreview} from "@/utils/canvasPreview";
import {mainSection} from "@/utils/data";

function AdvancedImageResizer() {
    // we have imageSrc, croppedImage
    const [imgSrc, setImgSrc] = useState('');
    // the cropped picture
    const [croppedPicture, setCroppedPicture] = useState('');
    // error messages
    const [errorMessage, setErrorMessage] = useState('');
    // for opening the modal
    const [open, setOpen] = useState(false);
    // for setting the crop area : 1 indicates 100%, 0.5 is 50%
    // const [crop, setCrop] = useState({aspect: 1});
    const [crop, setCrop] = useState();
    // when I'm done cropping
    const [completedCrop, setCompletedCrop] = useState(null);
    const [aspect, setAspect] = useState(49 / 33);
    const imageRef = useRef(null);
    const previewCanvasRef = useRef(null);
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
            setImgSrc("");
            return;
        }
        
        if (!['image/png', 'image/jpeg', 'image/svg', 'image/svg+xml', 'image/jpg'].includes(fileType)) {
            setErrorMessage('Invalid file format');
            setImgSrc("")
            return;
        }
        // create a file reader object
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
        if (!completedCrop || !previewCanvasRef.current || !imageRef.current) {
            return;
        }
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;
        const image = imageRef.current;
        
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        
        canvas.width = crop.width;
        canvas.height = crop.height;
        
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        
        const croppedImage = canvas.toDataURL('image/jpeg');
        setCroppedPicture(croppedImage);
        handleClose();
    };
    
    function onImageLoad(event) {
        if (aspect) {
            const {width, height} = event.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }
    
    // This is to demonstrate how to make and center a % aspect crop
    // which is a bit trickier, so we use some helper functions.
    function centerAspectCrop(
        mediaWidth,
        mediaHeight,
        aspect,
    ) {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                aspect,
                mediaWidth,
                mediaHeight,
            ),
            mediaWidth,
            mediaHeight,
        )
    }
    
    // this is used when you're cropping and moving that cropping area in whatever direction of your choice
    // we needed a custom hook called useDebounce effect to manage the changes
    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imageRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                await canvasPreview(
                    imageRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                )
            }
        },
        100,
        [completedCrop],
    )
    
    // submit the image to the BE
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        // if cropping was not done, then we send the original selected picture as it is else we send the cropped picture to the BE
        if (!croppedPicture) {
            formData.append('image', imgSrc);
        } else {
            formData.append('image', croppedPicture);
        }
        // using tan-stack query to submit it to the BE
    }
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
                    <Typography variant='h5'>Advance Image Edit</Typography>
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
                                        alt='Profile Picture'
                                        src={imgSrc || '/Avatar-3.svg'}
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
                                    <ReactCrop
                                        crop={crop}
                                        // implementing percentCrop strategy
                                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                                        onComplete={(c) => setCompletedCrop(c)}
                                        keepSelection
                                    >
                                        <Image
                                            ref={imageRef}
                                            src={imgSrc}
                                            alt="Crop me"
                                            width={350}
                                            height={350}
                                            onLoad={onImageLoad}
                                        />
                                    </ReactCrop>
                                </Paper>
                                <Paper sx={paperProps}>
                                    <Typography variant='subtitle1' color="#20fa94">Cropped Preview</Typography>
                                    <canvas
                                        ref={previewCanvasRef}
                                        style={{
                                            objectFit: 'contain',
                                            width: completedCrop?.width,
                                            height: completedCrop?.height
                                        }}
                                    />
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

export default AdvancedImageResizer;
