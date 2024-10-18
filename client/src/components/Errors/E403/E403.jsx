'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function E403() {
    const GoHome = () => {
        window.location.href = "/home";
    }

    return (
        <Box sx={{
            padding: '40px 0',
            // backgroundColor: '#fff',
            fontFamily: 'Arvo, serif',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{maxWidth: '600px', textAlign: 'center'}}>
                {/* Background image and 404 number */}
                <Box
                    sx={{
                        backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
                        height: '400px',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '80px',
                            fontWeight: 'bold',
                            color: '#000000'
                        }}
                    >
                        404
                    </Typography>
                </Box>

                {/* Content box with the message */}
                <Box sx={{marginTop: '-50px'}}>
                    <Typography variant="h4" sx={{fontSize: '24px', fontWeight: 'bold'}}>
                        Looks like you're lost
                    </Typography>

                    <Typography sx={{fontSize: '18px', margin: '20px 0'}}>
                        The page you are looking for is not available!
                    </Typography>

                    <Button
                        variant="contained"
                        color="success"
                        sx={{padding: '10px 20px', marginTop: '20px', textTransform: 'none'}}
                        onClick={GoHome}
                    >
                        Go to Home
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default E403;
