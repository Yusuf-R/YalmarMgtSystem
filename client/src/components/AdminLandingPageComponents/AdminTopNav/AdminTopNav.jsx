import {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from "@mui/material/Tooltip";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useLogout} from "@/customHooks/useLogout";
import Dialog from "@mui/material/Dialog";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FormatColorResetIcon from '@mui/icons-material/FormatColorReset';
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness3OutlinedIcon from '@mui/icons-material/Brightness3Outlined';

function AdminTopNav({staffData, themeMode, setThemeMode, isCollapsed, setIsCollapsed}) {
    const theme = useTheme();

    // Capture responsive breakpoints
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');

    // State for Logout Confirmation Dialog
    const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

    // State for Profile and Theme Menus
    const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
    const [themeMenuAnchorEl, setThemeMenuAnchorEl] = useState(null);

    // Open/Close status
    const isProfileMenuOpen = Boolean(profileMenuAnchorEl);
    const isThemeMenuOpen = Boolean(themeMenuAnchorEl);

    // Handle Logout
    const handleLogout = useLogout();

    // Handlers for Theme Menu
    const openThemeMenu = (event) => setThemeMenuAnchorEl(event.currentTarget);
    const closeThemeMenu = () => setThemeMenuAnchorEl(null);
    const changeTheme = (theme) => {
        setThemeMode(theme);
        closeThemeMenu();
    };

    // Handlers for Profile Menu
    const openProfileMenu = (event) => setProfileMenuAnchorEl(event.currentTarget);
    const closeProfileMenu = () => setProfileMenuAnchorEl(null);

    // Handlers for Logout Confirmation Dialog
    const handleOpenLogoutDialog = () => setConfirmLogoutOpen(true);
    const handleCloseLogoutDialog = () => setConfirmLogoutOpen(false);

    // Adjust menu styles dynamically based on the screen size
    const menuStyles = {
        width: xSmall ? 120 : small ? 150 : medium ? 200 : 200,
    };

    // Avatar Image (fallback logic)
    const [imgSrc, setImgSrc] = useState('');
    const fallbackImg = staffData.gender === 'Male' ? '/Avatar-9.svg' : '/Avatar-10.svg';
    useEffect(() => {
        setImgSrc(staffData.imgURL || fallbackImg);
    }, [staffData.imgURL]);

    return (
        <Box sx={{
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            color: 'white',
            zIndex: 20,
            px: small || xSmall ? 1 : 2,
            py: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(90deg, rgba(4,3,20,1) 13%, rgba(36,36,101,1) 35%, rgba(44,13,22,1) 52%, rgba(71,24,73,1) 72%, rgba(23,17,68,1) 87%, rgba(23,75,86,1) 100%)',
        }}>
            {/*LHS of the Top Nav*/}
            <Stack direction="row" alignItems="center" spacing={2}>
                {/* Toggle SideNav */}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} sx={{color: 'white'}}>
                    <MenuIcon/>
                </IconButton>

                {/* Yalmar Management System Logo */}
                <Avatar
                    src="/YMS.png"
                    alt="Yalmar Ventures"
                    sx={{
                        width: xSmall || small ? 30 : medium ? 35 : 40,
                        height: xSmall || small ? 30 : medium ? 35 : 40,
                        cursor: 'pointer',
                    }}
                />

                {/* Yalmar Management System Text */}
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                        display: xSmall || small ? 'none' : 'block',
                        ml: medium ? 1 : 2,
                        mr: medium ? 1 : 2,
                        fontSize: medium ? '14px' : large ? '16px' : '18px',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        color: 'white',
                        fontFamily: 'Poppins',
                        '&:hover': {
                            color: '#46F0F9',
                        },
                    }}
                >
                    YALMAR <br/> Management System
                </Typography>
            </Stack>

            {/*RHS of the Top Nav*/}
            <Stack direction="row" alignItems="center" spacing={2}>
                {/* Theme Selection Button */}
                <Tooltip title="Change Theme" placement="bottom">
                    <IconButton color="inherit" onClick={openThemeMenu}>
                        {themeMode === 'light' && <WbSunnyIcon/>} {/* Light Mode Icon */}
                        {themeMode === 'dark' && <Brightness3OutlinedIcon/>} {/* Dark Mode Icon */}
                        {themeMode === 'dracula' && <FormatColorResetIcon/>} {/* Dracula Mode Icon */}
                    </IconButton>
                </Tooltip>

                {/*Greetings*/}
                <Typography variant="h6" sx={{
                    fontSize: xSmall || small ? '10px' : medium ? '14px' : large ? '16px' : '18px',
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'Poppins',
                    '&:hover': {
                        color: '#46F0F9',
                    },
                }}>
                    Hi {staffData.firstName}
                </Typography>

                {/* Avatar and Profile Dropdown */}
                <Tooltip title="Account Settings" placement="bottom">
                    <Button
                        endIcon={<KeyboardArrowDownIcon sx={{color: 'red'}}/>}
                        onClick={openProfileMenu}
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

            {/* Dropdown Menu for Theme Selection */}
            <Menu
                anchorEl={themeMenuAnchorEl}
                open={isThemeMenuOpen}
                onClose={closeThemeMenu}
                MenuListProps={{
                    sx: {
                        ...menuStyles, // Apply dynamic styles for the menu
                        '& .MuiMenuItem-root': {padding: xSmall ? 1 : small ? 1.5 : 2},
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem onClick={() => changeTheme('light')}>
                    <WbSunnyIcon sx={{mr: 1}}/> Light
                </MenuItem>
                <MenuItem onClick={() => changeTheme('dark')}>
                    <Brightness3OutlinedIcon sx={{mr: 1}}/> Dark
                </MenuItem>
                <MenuItem onClick={() => changeTheme('dracula')}>
                    <FormatColorResetIcon sx={{mr: 1}}/> Dracula
                </MenuItem>
            </Menu>

            {/* Dropdown Menu for Profile Settings */}
            <Menu
                anchorEl={profileMenuAnchorEl}
                open={isProfileMenuOpen}
                onClose={closeProfileMenu}
                MenuListProps={{
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
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem onClick={() => router.push('/dashboard/admin/settings/biodata/view')}>
                    <ListItemIcon>
                        <AccountCircleIcon sx={{color: 'green'}}/>
                    </ListItemIcon>
                    <ListItemText>
                        Profile
                    </ListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem onClick={() => router.push('/dashboard/admin/settings')}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" sx={{color: 'black'}}/>
                    </ListItemIcon>
                    <ListItemText>
                        Settings
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleOpenLogoutDialog} sx={{color: 'red'}}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" sx={{color: 'red'}}/>
                    </ListItemIcon>
                    <ListItemText>
                        Logout
                    </ListItemText>
                </MenuItem>
            </Menu>

            {/* Logout Confirmation Dialog */}
            <Dialog open={confirmLogoutOpen} onClose={handleCloseLogoutDialog}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to logout?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseLogoutDialog} variant="contained">No</Button>
                    <Button onClick={handleLogout} color="error" variant="contained">Yes</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default AdminTopNav;
