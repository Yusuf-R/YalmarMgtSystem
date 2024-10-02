import {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import {useRouter} from "next/navigation";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useLogout} from "@/customHooks/useLogout";
import Dialog from "@mui/material/Dialog";

function AdminTopNav({staffData, themeMode, setThemeMode, isCollapsed, setIsCollapsed}) {
    const theme = useTheme();
    const router = useRouter();
    // Capture responsive breakpoints
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLargestScreen = useMediaQuery(theme.breakpoints.up("lg"));

    const [confirmExit, setConfirmExit] = useState(false);
    const [themeAnchorEl, setThemeAnchorEl] = useState(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const handleLogout = useLogout();
    const openThemeMenu = Boolean(themeAnchorEl);

    const handleThemeClick = (event) => {
        setThemeAnchorEl(event.currentTarget);
    };
    const handleThemeClose = () => {
        setThemeAnchorEl(null);
    };
    const changeTheme = (theme) => {
        setThemeAnchorEl(null);
        setThemeMode(theme);
    };

    // Avatar section
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
            px: 2,
            py: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            // background: 'linear-gradient(90deg, rgba(4,3,20,1) 13%, rgba(36,36,101,1) 35%, rgba(13,36,44,1) 52%, rgba(39,95,124,1) 72%, rgba(0,11,12,1) 87%, rgba(23,75,86,1) 100%)',
            // linear gradient for darkMode theme
            background: 'linear-gradient(90deg, rgba(4,3,20,1) 13%, rgba(36,36,101,1) 35%, rgba(44,13,22,1) 52%, rgba(71,24,73,1) 72%, rgba(23,17,68,1) 87%, rgba(23,75,86,1) 100%)',
            // linear gradient for lightMode theme


        }}>
            <Stack direction="row" alignItems="center" spacing={2}>
                {/* Toggle SideNav */}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} sx={{color: 'white'}}>
                    <MenuIcon/>
                </IconButton>
                {/* Yalmar Management Icon*/}
                <Avatar
                    src="/YMS.png"
                    alt="Yalmar Ventures"
                    sx={{
                        width: isSmallScreen ? 35 : 40,
                        height: isSmallScreen ? 35 : 40,
                        cursor: 'pointer',
                    }}
                />
                {/* Yalmar Management System Text */}
                <Typography variant="h6" fontWeight="bold" sx={{
                    display: isSmallScreen ? 'none' : isMediumScreen ? 'none' : 'block',
                    ml: isSmallScreen ? 0 : 2,
                    mr: isSmallScreen ? 0 : 0,
                    fontSize: isTablet ? '16px' : '18px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    color: 'white',
                    fontFamily: 'Poppins',
                    '&:hover': {
                        color: '#46F0F9',
                    },
                }}>YALMAR <br/> Management System</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h6" sx={{
                    fontSize: isMobile ? '12px' : isTablet ? '16px' : '18px',
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'Poppins',
                    '&:hover': {
                        color: '#46F0F9',
                    },
                }}>Hi {staffData.firstName}</Typography>
            </Stack>

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
        </Box>
    );
}

export default AdminTopNav;
