'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {keyframes} from '@mui/system';

function Hero() {
    const theme = useTheme();

    // Use the provided media queries
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');

    // Define keyframe animation for circling border effect (button)
    const borderAnimation = keyframes`
        0%, 100% {
            border-image-source: linear-gradient(45deg, red, blue, green, orange);
        }
        25% {
            border-image-source: linear-gradient(45deg, blue, green, orange, purple);
        }
        50% {
            border-image-source: linear-gradient(45deg, green, orange, purple, red);
        }
        75% {
            border-image-source: linear-gradient(45deg, orange, purple, red, blue);
        }
    `;

    // Define keyframe animation for fluid text color change
    const fluidTextAnimation = keyframes`
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    `;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                color: 'white',
                textAlign: 'center',
                padding: xSmall || small ? '16px' : medium || large ? '12px' : xxLarge ? '15px' : '20px',
                marginTop: xSmall ? '80px' : small ? '170px' : medium ? '190px' : large ? '200px' : xxLarge ? '150px' : '300px',
            }}
        >
            <Typography
                variant={xSmall || small || medium ? 'h5' : large || xLarge ? 'h4' : 'h3'}
                sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                    mb: 2,
                    backgroundImage: 'linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ff0000)',
                    backgroundSize: '300% 100%',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: `${fluidTextAnimation} 8s ease infinite`,
                }}
            >
                YALMAR Management System
            </Typography>
            <Typography
                variant={xSmall || small || medium ? 'h6' : 'h5'}
                sx={{fontFamily: 'Poppins', mb: 4}}
            >
                The smart system for managing staff and client operations.
            </Typography>
            <Button
                variant='contained'
                sx={{
                    position: 'relative',
                    width: '200px',
                    height: '50px',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: xSmall || small ? '14px' : medium ? '16px' : large ? '18px' : '20px',
                    backgroundColor: 'black',
                    border: '4px solid',
                    borderImageSlice: 1,
                    borderImageSource: 'linear-gradient(45deg, red, blue, green, orange)',
                    animation: `${borderAnimation} 4s linear infinite`,
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-4px',
                        left: '-4px',
                        right: '-4px',
                        bottom: '-4px',
                        background: 'linear-gradient(45deg, red, blue, green, orange, purple)',
                        borderRadius: '14px',
                        zIndex: -1,
                        filter: 'blur(8px)',
                        animation: `${borderAnimation} 1s linear infinite`,
                    },
                }}
                onClick={() => window.location = '/login'}
            >
                Get Started
            </Button>
        </Box>
    );
}

export default Hero;
