'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {keyframes} from '@mui/system';

function Hero() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTab = useMediaQuery('(min-width:900px) and (max-width:999px)');
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLargestScreen = useMediaQuery(theme.breakpoints.up('lg'));

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
                padding: isMobile ? '16px' : isTab ? '12px' : isTablet ? '15px' : '12px',
                marginTop: isMobile ? '180px' : isTab ? '350px' : isTablet ? '200px' : isLargestScreen ? '250px' : '300px',
            }}
        >
            <Typography
                variant={isMobile ? 'h5' : isTab ? 'h4' : isTablet ? 'h4' : 'h4'}
                sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                    mb: 2,
                    textAlign: 'center',
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
                variant={isMobile ? 'h6' : isTablet ? 'h5' : 'h4'}
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
                    fontSize: isMobile ? '16px' : isTablet ? '18px' : '18px',
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