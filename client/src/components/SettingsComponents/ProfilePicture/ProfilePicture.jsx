'use client';
import {useState, useEffect} from 'react';
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
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import {useRouter, usePathname} from "next/navigation";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import Tabs from "@mui/material/Tabs";
import Skeleton from '@mui/material/Skeleton';
import {mainSection} from "@/utils/data";

function PreloadSkeleton() {
    return (
        <>
            <Stack spacing={1}>
                {/* For variant="text", adjust the height via font-size */}
                <Skeleton variant="text" sx={{fontSize: '1rem'}}/>
                {/* For other variants, adjust the size with `width` and `height` */}
                <Skeleton variant="circular" width={40} height={40}/>
                <Skeleton variant="rectangular" width={210} height={60}/>
                <Skeleton variant="rounded" width={210} height={60}/>
            </Stack>
        </>
    )
}

function ProfilePicture({staffData}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [activeTab, setActiveTab] = useState('/dashboard/admin/settings/picture');
    const [picture, setPicture] = useState('');
    const [imgSrc, setImgSrc] = useState('');
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
        console.log(event);
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
        if (!croppedArea || !selectedPicture) {
            return;
        }
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
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ["ProfilePic"],
        mutationFn: AdminUtils.UpdateProfilePicture
    });
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            setUploadProgress(0);
            // if we have croppedPicture we send it to the BE else we send the original selected picture
            const formData = new FormData();
            if (!croppedPicture) {
                formData.append('avatar', selectedPicture);
            } else {
                formData.append('avatar', croppedPicture);
            }
            // using tan-stack query to submit it to the BE
            mutation.mutate(formData, {
                onSuccess: (response) => {
                    toast.success(response.message);
                    setPicture('');
                    setSelectedPicture('');
                    setCroppedPicture('');
                    setErrorMessage('');
                    queryClient.invalidateQueries({queryKey: ["BioData"]})
                    queryClient.invalidateQueries({queryKey: ["AllStaff"]})
                    queryClient.refetchQueries({queryKey: ["BioData"]}); // Manually re-fetch the user data
                    queryClient.refetchQueries({queryKey: ["AllStaff"]})
                    setIsLoading(false);
                    router.push('/dashboard/admin/settings');
                    // window.location.reload();
                },
                onError: (error) => {
                    toast.error(error.message);
                    console.error("Error", error);
                    setIsLoading(false);
                },
            });
        } catch (err) {
            toast.error(err.message);
            setPicture('');
            setSelectedPicture('');
            setCroppedPicture('');
            setErrorMessage('');
            window.location.reload();
        }
    }
    // useEffect or handling navigation between view and edits
    useEffect(() => {
        if (pathname.includes('picture')) {
            setActiveTab('/dashboard/admin/settings/picture');
        } else {
            setActiveTab('/dashboard/admin/settings');
        }
    }, [pathname]);
    
    useEffect(() => {
        if (selectedPicture !== '') {
            setImgSrc(selectedPicture);
        } else if (staffData.imgURL !== '') {
            setImgSrc(staffData.imgURL);
        } else if (staffData.gender === 'Male') {
            setImgSrc('/Avatar-9.svg');
        } else {
            setImgSrc('/Avatar-10.svg');
        }
    }, [selectedPicture, staffData.imgURL]);
    
    return (
        <>
            <Box sx={mainSection}>
                <Paper elevation={5} sx={paperProps}>
                    <Typography variant='h5'>Upload Profile Picture</Typography>
                </Paper>
                <br/>
                <Stack direction='row' spacing={2} sx={{
                    justifyContent: 'flex-start',
                }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        centered
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#46F0F9',
                            },
                        }}
                    >
                        <Tab
                            label="Settings"
                            component={Link}
                            href="/dashboard/admin/settings"
                            value="/dashboard/admin/settings"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Avatar"
                            component={Link}
                            href="/dashboard/admin/settings/picture"
                            value="/dashboard/admin/settings/picture"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                    </Tabs>
                </Stack>
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
                                    {imgSrc ? (
                                        <Image
                                            src={imgSrc}
                                            alt='Original Image Preview'
                                            width={360}
                                            height={360}
                                            priority={true}
                                        />
                                    ) : (
                                        <PreloadSkeleton/>
                                    )}
                                    {errorMessage && (
                                        <Typography variant='subtitle1' color='error'>
                                            {errorMessage}
                                        </Typography>
                                    )}
                                
                                </Stack>
                                {croppedPicture && (
                                    <Stack direction='column' spacing={2} justifyContent="center"
                                           alignItems="center">
                                        {/*have a typography that says cropped image*/}
                                        <Typography variant='subtitle1' color="#20fa94">Cropped Image</Typography>
                                        <Image
                                            src={croppedPicture}
                                            alt='Cropped Image Preview'
                                            width={360}
                                            height={360}
                                            priority={true}
                                        />
                                    </Stack>
                                )}
                            </Stack>
                            <br/>
                            {isLoading && <ProgressBar/>}
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
    )
}

export default ProfilePicture;
