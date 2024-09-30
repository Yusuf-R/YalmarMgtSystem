'use client';
import {useState, useEffect} from 'react';
import {useRouter} from "next/navigation";
import {useLogout} from "@/customHooks/useLogout";
import {
    Box,
    Stack,
    Typography,
    Button,
    Menu,
    MenuItem,
    Divider,
    IconButton,
    Avatar,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image";

function DashboardTopNav({staffData}) {
    const handleLogout = useLogout();
    const router = useRouter();
    const [confirmExit, setConfirmExit] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleDialog = () => setConfirmExit(true);

    const [imgSrc, setImgSrc] = useState('');
    const fallbackImg = staffData.gender === 'Male' ? '/Avatar-9.svg' : '/Avatar-10.svg';

    useEffect(() => {
        setImgSrc(staffData.imgURL ? staffData.imgURL : fallbackImg);
    }, [staffData.imgURL]);

    return (
        <>
            {/* Top Navigation Bar */}
            <Box sx={{
                width: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: '#355e75',
                color: 'white',
                zIndex: 20,
                px: 2,
                py: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
                {/* Left Side: Logo and Title */}
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Image src={"/YMS.png"} alt="YALMAR Logo" width={50} height={50} quality={100}/>
                    <Typography variant="h5" component="h1" fontWeight="bold">
                        YALMAR <br/> Management System
                    </Typography>
                </Stack>

                {/* Right Side: Welcome and Avatar */}
                <Stack direction="row" alignItems="center" spacing={4}>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        Welcome {staffData.email || 'Anonymous'}
                    </Typography>

                    <Tooltip title="Account Settings">
                        <Button
                            endIcon={<KeyboardArrowDownIcon sx={{color: 'salmon'}}/>}
                            onClick={handleClick}
                            size="small"
                            sx={{
                                color: 'white',
                                '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.1)'}
                            }}
                        >
                            <Avatar src={imgSrc} alt="Avatar" sx={{width: 40, height: 40}}/>
                        </Button>
                    </Tooltip>
                </Stack>
            </Box>

            {/* Dropdown Menu for Account Settings */}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 1,
                    sx: {
                        mt: 1.5,
                        '& .MuiAvatar-root': {width: 32, height: 32},
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem onClick={() => router.push('/dashboard/admin/settings/biodata/view')}>
                    <Avatar sx={{color: 'black'}}/> Profile
                </MenuItem>
                <Divider/>
                <MenuItem onClick={() => router.push('/dashboard/admin/settings')}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" sx={{color: 'black'}}/>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleDialog} sx={{color: 'red'}}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" sx={{color: 'red'}}/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

            {/* Logout Confirmation Dialog */}
            <Dialog open={confirmExit} onClose={() => setConfirmExit(false)}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to logout?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmExit(false)} variant="contained">No</Button>
                    <Button onClick={handleLogout} color="error" variant="contained">Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DashboardTopNav;
