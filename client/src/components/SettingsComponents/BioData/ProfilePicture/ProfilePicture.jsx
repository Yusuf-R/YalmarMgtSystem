'use client';
import React, {useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import CropIcon from '@mui/icons-material/Crop';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import {useRouter, usePathname} from "next/navigation";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import Tabs from "@mui/material/Tabs";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import {useForm} from "react-hook-form";
import LazyComponent from "@/components/LazyComponent/LazyComponent";

function ProfilePicture({staffData}) {
    const pathname = usePathname();
    const router = useRouter();

    const {
        control, handleSubmit, formState: {errors}, setValue, clearErrors, setError, reset, watch
    } = useForm();

    // Break Points
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');

    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('/dashboard/admin/settings/biodata/picture');
    const [picture, setPicture] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [selectedPicture, setSelectedPicture] = useState('');
    const [croppedPicture, setCroppedPicture] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [canCrop, setCanCrop] = useState(false);
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
        setCroppedPicture('');

        if (!['image/png', 'image/jpeg', 'image/svg', 'image/svg+xml', 'image/jpg'].includes(fileType)) {
            setErrorMessage('Invalid file format');
            setPicture('');
            setSelectedPicture('');
            setCroppedPicture('');
            return;
        }

        if (fileSize > 2000000) {
            setErrorMessage('File size exceeds 2MB');
            setPicture('');
            setSelectedPicture('');
            setCroppedPicture('');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setPicture(file.name);
            setSelectedPicture(reader.result);
            setErrorMessage('');
            setCanCrop(true);
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
        if (!croppedArea || (!selectedPicture && !imgSrc)) {
            return;
        }

        const image = new window.Image();
        image.crossOrigin = 'anonymous'; // Enable cross-origin requests
        image.src = selectedPicture || imgSrc;

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

            try {
                const croppedImage = canvas.toDataURL('image/jpeg');
                setCroppedPicture(croppedImage);
            } catch (error) {
                console.error("Failed to crop the image:", error);
                toast.error("Unable to crop the image due to CORS issues.");
            }

            handleClose();
        };

        image.onerror = () => {
            toast.error("Failed to load the image for cropping.");
        };
    };

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ["ProfilePic"],
        mutationFn: AdminUtils.UpdateProfilePicture
    });

    const updateAvatar = async (event) => {
        // Check if event exists and prevent default form submission
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('avatar', croppedPicture || selectedPicture);

            mutation.mutate(formData, {
                onSuccess: (response) => {
                    toast.success(response.message);
                    handleClear();
                    queryClient.invalidateQueries({queryKey: ["BioData"]});
                    queryClient.refetchQueries({queryKey: ["BioData"]});
                    setIsLoading(false);
                    router.push('/dashboard/admin/settings/biodata');
                },
                onError: (error) => {
                    toast.error(error.message);
                    setIsLoading(false);
                },
            });
        } catch (err) {
            toast.error(err.message);
            handleClear();
        }
    };

    // Update Image Source and Crop Button State
    useEffect(() => {
        if (selectedPicture !== '') {
            setImgSrc(selectedPicture);
            setCanCrop(true);
        } else if (staffData.imgURL !== '') {
            setImgSrc(staffData.imgURL);
            setCanCrop(true);
        } else if (staffData.gender === 'Male') {
            setImgSrc('/Avatar-9.svg');
            setCanCrop(false);
        } else {
            setImgSrc('/Avatar-10.svg');
            setCanCrop(false);
        }
    }, [selectedPicture, staffData.imgURL]);

    // Responsive layout adjustments
    const layoutStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        maxWidth: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(to right, #000428, #004e92)',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
        marginLeft: 'auto',
        marginRight: 'auto',
    };

    return (
        <>
            <Box
                component='form'
                onSubmit={handleSubmit(updateAvatar)}
                noValidate
                sx={{
                    padding: xSmall || small ? '5px' : '10px',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%',
                    overflow: 'hidden',
                }}
            >
                {/* Navigation Section */}
                <Stack direction='row' spacing={2} sx={{justifyContent: 'flex-start'}}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        centered
                        sx={{'& .MuiTabs-indicator': {backgroundColor: '#46F0F9'}}}
                    >
                        <Tab label="Settings" component={Link} href="/dashboard/admin/settings"
                             value="/dashboard/admin/settings" sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            fontSize: xSmall || small ? '0.6rem' : '0.9rem',
                            "&.Mui-selected": {color: "#46F0F9"}
                        }}/>
                        <Tab label="Biodata" component={Link} href="/dashboard/admin/settings/biodata"
                             value="/dashboard/admin/settings/biodata" sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            fontSize: xSmall || small ? '0.6rem' : '0.9rem',
                            "&.Mui-selected": {color: "#46F0F9"}
                        }}/>
                        <Tab label="Edit" value="/dashboard/admin/settings/biodata/edit"
                             href="/dashboard/admin/settings/biodata/edit" sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            fontSize: xSmall || small ? '0.6rem' : '0.9rem',
                            "&.Mui-selected": {color: "#46F0F9"}
                        }}/>
                        <Tab label="Avatar" value="/dashboard/admin/settings/biodata/picture"
                             href="/dashboard/admin/settings/biodata/picture" sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            fontSize: xSmall || small ? '0.6rem' : '0.9rem',
                            "&.Mui-selected": {color: "#46F0F9"}
                        }}/>
                        <Tab label="PaySlip" component={Link} href="/dashboard/admin/settings/biodata/payslip"
                             value="/dashboard/admin/settings/biodata/payslip" sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            fontSize: xSmall || small ? '0.6rem' : '0.9rem',
                            "&.Mui-selected": {color: "#46F0F9"}
                        }}/>
                    </Tabs>
                </Stack>
                <br/>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Stack
                            direction={{xs: 'column', sm: 'row'}}
                            spacing={{xs: 2, sm: 3, md: 4}}
                            alignItems="center"
                            justifyContent="center"
                            divider={<Divider orientation="vertical" flexItem
                                              sx={{display: {xs: 'none', sm: 'block'}, border: '2px solid #FFF'}}/>}
                        >
                            <Typography variant="body2"
                                        sx={{fontSize: {xs: '0.8rem', sm: '0.9rem', md: '1rem'}, color: '#FFF'}}>Allowed
                                Types: PNG, JPG, JPEG</Typography>
                            <Typography variant="body2"
                                        sx={{fontSize: {xs: '0.8rem', sm: '0.9rem', md: '1rem'}, color: '#FFF'}}>Max
                                Size: 2MB per picture</Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <br/> <br/>
                <Grid container justifyContent="center" spacing={4}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Paper elevation={5} sx={{padding: '20px', ...layoutStyles}}>
                            <Stack direction='column' spacing={3} alignItems="center">
                                <Box>
                                    <Typography variant='subtitle1' color="#FFF" textAlign='center'>Original
                                        Image</Typography>
                                    <br/>
                                    <img
                                        src={imgSrc}
                                        alt='Original Image Preview'
                                        width={xSmall || small || medium ? 250 : 450}
                                        height={xSmall || small || medium ? 250 : 450}
                                    />
                                    {errorMessage && (<Typography variant='subtitle1' color='error'
                                                                  textAlign='center'>{errorMessage}</Typography>)}
                                </Box>
                                {croppedPicture && (
                                    <Box>
                                        <Typography variant='subtitle1' color="#20fa94" textAlign='center'>Cropped
                                            Image</Typography>
                                        <br/>
                                        <img src={croppedPicture} alt='Cropped Image Preview'
                                             wwidth={xSmall || small || medium ? 250 : 450}
                                             height={xSmall || small || medium ? 250 : 450}
                                        />
                                    </Box>
                                )}
                            </Stack>
                            <Stack direction='column' spacing={2} justifyContent='center'
                                   sx={{marginTop: '20px'}}>
                                <Button variant="contained" onClick={handleClear}
                                        color='success'><NotInterestedIcon/> Clear</Button>
                                <Button variant="contained"
                                        component="label"><CloudUploadIcon/> Upload <VisuallyHiddenInput type="file"
                                                                                                         onChange={handleUpload}/></Button>
                                <Button variant="contained" onClick={handleOpen}
                                        disabled={!canCrop}><CropIcon/> Crop</Button>
                                <Button variant="contained" type='submit'
                                        disabled={!selectedPicture && !croppedPicture}><SendIcon/> Submit</Button>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
                {isLoading && <LazyComponent Command={'Uploading'}/>}
                <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
                    <DialogTitle>Crop Image</DialogTitle>
                    <DialogContent>
                        <Box sx={{position: 'relative', width: '100%', height: 400, bgcolor: 'black'}}>
                            <Cropper
                                image={selectedPicture || imgSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={handleCropComplete}
                            />
                        </Box>
                        <Slider value={zoom} min={1} max={3} step={0.1} onChange={(e, zoom) => setZoom(zoom)}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">Reset</Button>
                        <Button onClick={handleSave} color="primary">Ok</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}

export default ProfilePicture;
