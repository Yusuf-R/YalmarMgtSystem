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
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');

    const isDrawerVisible = useMediaQuery('(max-width: 601px)');

    // Drawer open/close state
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Toggle Drawer
    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    const navigationLinks = ['Home', 'About', 'Services', 'Contacts', 'Careers'];


    const getFontSize = (baseSize) => {
        if (xSmall) {
            return baseSize - 2;
        }
        if (small) {
            return baseSize - 1;
        }
        if (medium) {
            return baseSize;
        }
        if (large) {
            return baseSize + 1;
        }
        if (xLarge || xxLarge) {
            return baseSize + 2;
        }
        return baseSize + 3; // for wide screens and above
    };

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
                <Grid item xs={
                    // isMobile ? 5 : isTablet ? 3.3 : 3
                    xSmall ? 3 : small ? 3.3 : medium ? 3 : large ? 2.5 : xLarge ? 2 : 1.5
                }
                      sx={{display: 'flex', alignItems: 'center',}}>
                    <Image
                        src='/YMS.png'
                        alt="YALMAR Mangement System"
                        width={xSmall ? 30 : small ? 40 : medium ? 50 : large ? 60 : xLarge ? 50 : xxLarge ? 80 : 90}
                        height={xSmall ? 30 : small ? 40 : medium ? 50 : large ? 60 : xLarge ? 50 : xxLarge ? 80 : 90}
                        priority={true}
                    />
                    <Typography variant="h6" sx={{
                        // display: xSmall ? 'none' : undefined,
                        fontFamily: 'Poppins',
                        color: 'white',
                        fontWeight: 'bold',
                        ml: 2,
                        fontSize: xSmall ? '12px' : small ? '12px' : medium ? '16px' : large ? '16px' : xLarge ? '16px' : xxLarge ? '24px' : '26px',
                        whiteSpace: 'nowrap',
                    }}>
                        YALMAR <br/> Management System
                    </Typography>
                </Grid>

                {/* Drawer Trigger for Mobile/Tablet and Navigation Links for Large Screens */}
                <Grid item xs={xSmall ? 5 : small ? 5 : medium ? 5 : large ? 5 : xLarge ? 8 : 8.5}>
                    {xSmall || small || medium || large ? (
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
                        <Stack direction="row" spacing={ultraWide || xWide ? 9 : 2} justifyContent="center"
                               sx={{
                                   ml: xLarge ? 15.5 : xxLarge ? 25.5 : ultraWide ? 20 : 25.5
                               }}>
                            {navigationLinks.map((item) => (
                                <Button
                                    key={item}
                                    variant="text"
                                    sx={navButtonStyle(xLarge, xxLarge)}
                                    onClick={() => window.location = `/${item.toLowerCase().replace(" ", "")}`}
                                >
                                    {item}
                                </Button>
                            ))}
                        </Stack>
                    )}
                </Grid>

                {/* Login Button */}
                <Grid item xs={2} sx={{textAlign: 'right'}}>
                    <Button
                        variant="contained"
                        sx={loginButtonStyle(xSmall, small, medium, large)}
                        onClick={() => window.location = '/login'}
                        size={xSmall ? 'small' : small ? 'small' : medium ? 'medium' : large ? 'medium' : 'large'}
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
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        backdropFilter: 'blur(8px)',
                    },
                }}
            >
                <Box
                    sx={{
                        width: xSmall ? '100%' : small ? '200px' : '250px',
                        margin: 'auto',
                        padding: '16px',
                    }}
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {navigationLinks.map((text) => (
                            <ListItem
                                key={text}
                                onClick={() => window.location = `/${text.toLowerCase().replace(" ", "")}`}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                    borderRadius: '4px',
                                    marginBottom: '8px',
                                }}
                            >
                                <ListItemText
                                    primary={text}
                                    primaryTypographyProps={{
                                        sx: {
                                            fontSize: getFontSize(14),
                                            fontWeight: 'medium',
                                        }
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

const navButtonStyle = (xLarge, xxLarge) => ({
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: xLarge ? '16px' : xxLarge ? '18px' : '20px',
    color: 'white',
    '&:hover': {
        color: '#46F0F9',
    },
});

const loginButtonStyle = (xSmall, small, medium, large) => ({
    backgroundColor: '#46F0F9',
    color: '#0E1E1E',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: xSmall ? '10px' : small ? '10px' : medium ? '12px' : large ? '14px' : '16px',
    '&:hover': {
        backgroundColor: '#34C0D9',
    },
});

export default Nav;
