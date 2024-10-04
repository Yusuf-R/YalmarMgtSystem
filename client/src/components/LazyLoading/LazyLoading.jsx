import {mainSection} from "@/utils/data";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import HashLoader from "react-spinners/HashLoader";

function LazyLoading() {
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
                                }}>
                        Loading
                    </Typography>
                    <HashLoader color="#07ebf1" size={55}/>
                </Stack>
            </Box>
        </Box>
    )
}

export default LazyLoading;
