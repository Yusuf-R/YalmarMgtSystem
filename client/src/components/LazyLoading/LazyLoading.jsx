'use client';
import {mainSection} from "@/utils/data";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import HashLoader from "react-spinners/HashLoader";
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function LazyLoading() {
    const theme = useTheme();

    // Media Queries for responsiveness
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');

    // Dynamically adjust loader size and font size based on screen size
    const loaderSize = xSmall || small ? 35 : medium || large ? 45 : 55;
    const fontSize = xSmall || small ? '1rem' : medium || large ? '1.5rem' : '2rem';

    return (
        <Box sx={mainSection}>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',  // Semi-transparent background
                    zIndex: 9999,  // Ensure it overlays everything else
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant='h5'
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    fontSize: fontSize,  // Responsive font size
                                }}>
                        Loading
                    </Typography>
                    <HashLoader color="#07ebf1" size={loaderSize}/> {/* Responsive loader size */}
                </Stack>
            </Box>
        </Box>
    )
}

export default LazyLoading;
