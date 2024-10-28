'use client';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import RingLoader from "react-spinners/RingLoader";

function LazyComponent({Command}) {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // Ensure it covers any scrollable content
                overflow: 'hidden',
                // Handle mobile browsers' viewport behavior
                minHeight: '-webkit-fill-available',
                // Prevent any scrolling while overlay is active
                '& ~ *': {
                    overflow: 'hidden !important'
                }
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                    // Add a subtle background to make text more readable
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '12px',
                    padding: '16px 24px',
                    // Ensure the stack stays centered
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    // Add a subtle animation
                    animation: 'fadeIn 0.3s ease-in-out',
                    '@keyframes fadeIn': {
                        from: {
                            opacity: 0,
                            transform: 'translate(-50%, -48%)'
                        },
                        to: {
                            opacity: 1,
                            transform: 'translate(-50%, -50%)'
                        }
                    }
                }}
            >
                <Typography
                    variant='h6'
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 'bold',
                        color: '#FFF',
                        // Prevent text from wrapping
                        whiteSpace: 'nowrap',
                        // Add text shadow for better readability
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                >
                    {Command}...
                </Typography>
                <RingLoader
                    color="#07ebf1"
                    size={30}
                    cssOverride={{
                        // Ensure loader is vertically aligned with text
                        display: 'inline-block',
                        verticalAlign: 'middle'
                    }}
                />
            </Stack>
        </Box>
    );
}

export default LazyComponent;