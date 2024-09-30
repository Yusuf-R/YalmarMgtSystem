'use client';
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import React, {useState} from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

function Nav() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTab = useMediaQuery('(min-width:900px) and (max-width:999px)');
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLargestScreen = useMediaQuery(theme.breakpoints.up('lg'));

    // Drawer open/close state
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Toggle Drawer
    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    const navigationLinks = ['Home', 'About', 'Services', 'Contacts', 'Careers'];

    return (
        <Box sx={{
            px: 3,
            py: 2,
            background: 'linear-gradient(90deg, rgba(11,15,16,1) 0%, rgba(28,24,2,0.8734770275297619) 33%, rgba(4,31,36,1) 97%)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
        }}>
            <Grid container alignItems="center" justifyContent="space-between">
                {/* Logo and Branding */}
                <Grid item xs={isMobile ? 5 : isTablet ? 3.3 : 3}
                      sx={{display: 'flex', alignItems: 'center',}}>
                    <Image
                        src='/YML.png'
                        alt="YALMAR Ventures"
                        width={isMobile ? 45 : isTablet ? 55 : 70}
                        height={isMobile ? 45 : isTablet ? 55 : 70}
                        priority={true}
                    />
                    <Typography variant="h6" sx={{
                        fontFamily: 'Poppins',
                        color: 'white',
                        fontWeight: 'bold',
                        ml: 2,
                        fontSize: isMobile ? '16px' : isTab ? '16px' : isTablet ? '18px' : '20px',
                        whiteSpace: 'nowrap',
                    }}>
                        YALMAR <br/> Management System
                    </Typography>
                </Grid>

                {/* Drawer Trigger for Mobile/Tablet and Navigation Links for Large Screens */}
                <Grid item xs={isMobile ? 3 : 6.6}>
                    {isMobile ? (
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{color: 'white', float: 'right'}}
                        >
                            <MenuIcon/>
                        </IconButton>
                    ) : (
                        <Stack direction="row" spacing={2} justifyContent="center"
                               sx={{
                                   ml: isTab ? 2.5 : null,
                               }}>
                            {navigationLinks.map((item) => (
                                <Button
                                    key={item}
                                    variant="text"
                                    sx={navButtonStyle}
                                    onClick={() => window.location = `/${item.toLowerCase().replace(" ", "")}`}
                                >
                                    {item}
                                </Button>
                            ))}
                        </Stack>
                    )}
                </Grid>

                {/* Login Button */}
                <Grid item xs={isMobile ? 2 : 2} sx={{textAlign: 'right'}}>
                    <Button
                        variant="contained"
                        sx={loginButtonStyle(isMobile)}
                        onClick={() => window.location = '/login'}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>

            {/* Drawer for Mobile and Tablet */}
            <Drawer
                anchor='top'
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darken the drawer background
                        color: 'white', // Text color inside the drawer
                        backdropFilter: 'blur(8px)', // Blur the background behind the drawer
                    },
                }}
            >
                <Box sx={{
                    width: 150,
                }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    <List>
                        {navigationLinks.map((text) => (
                            <ListItem key={text}
                                      onClick={() => window.location = `/${text.toLowerCase().replace(" ", "")}`}>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

const navButtonStyle = (isTab) => ({
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: isTab ? '16px' : '18px',
    color: 'white',
    '&:hover': {
        color: '#46F0F9',
    },
});

const loginButtonStyle = (isMobile) => ({
    backgroundColor: '#46F0F9',
    color: '#0E1E1E',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: isMobile ? '14px' : '16px',
    '&:hover': {
        backgroundColor: '#34C0D9',
    },
});

export default Nav;
