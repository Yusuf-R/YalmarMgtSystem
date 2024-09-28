// components/Nav.jsx
'use client';
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import React from "react";

function Nav() {
    return (
        <Box sx={{
            px: 3,
            py: 2,
            background: 'linear-gradient(90deg, rgba(11,15,16,1) 0%, rgba(28,24,2,0.8734770275297619) 33%, rgba(4,31,36,1) 97%)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        }}>
            <Grid container alignItems="center" justifyContent="space-between">
                {/* Logo */}
                <Grid item xs={2} sx={{display: 'flex', alignItems: 'center'}}>
                    <Image
                        src='/YML.png'
                        alt="YALMAR Ventures"
                        width={60}
                        height={60}
                        priority={true}
                    />
                    <Typography variant="h6" sx={{
                        fontFamily: 'Poppins',
                        color: 'white',
                        fontWeight: 'bold',
                        ml: 2,
                        fontSize: '22px',
                    }}>
                        YALMAR <br/> Ventures Limited
                    </Typography>
                </Grid>

                {/* Navigation Links */}
                <Grid item xs={6}>
                    <Stack direction="row" spacing={4} justifyContent="center">
                        <Button variant="text" sx={navButtonStyle} onClick={() => window.location = '/'}>
                            Home
                        </Button>
                        <Button variant="text" sx={navButtonStyle} onClick={() => window.location = '/about'}>
                            About
                        </Button>
                        <Button variant="text" sx={navButtonStyle} onClick={() => window.location = '/services'}>
                            Services
                        </Button>
                        <Button variant="text" sx={navButtonStyle} onClick={() => window.location = '/contact'}>
                            Contact Us
                        </Button>
                        <Button variant="text" sx={navButtonStyle} onClick={() => window.location = '#'}>
                            Careers
                        </Button>
                    </Stack>
                </Grid>

                {/* Login Button */}
                <Grid item xs={2} sx={{textAlign: 'right'}}>
                    <Button variant="contained" sx={loginButtonStyle} onClick={() => window.location = '/login'}>
                        Login
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

const navButtonStyle = {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: '18px',
    color: 'white',
    '&:hover': {
        color: '#46F0F9',
    },
};
const loginButtonStyle = {
    backgroundColor: '#46F0F9',
    color: '#0E1E1E',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    '&:hover': {
        backgroundColor: '#34C0D9',
    },
};

export default Nav;
