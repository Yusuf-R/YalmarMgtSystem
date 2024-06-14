import {mainSection} from "@/utils/data";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

function LazyLoading() {
    return (
        <Box sx={mainSection}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                    minHeight: '100vh',  // Ensure the container is large enough to center the content
                }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h4">Loading</Typography>
                    <Box
                        sx={{
                            border: '16px solid #f3f3f3',
                            borderRadius: '50%',
                            borderTop: '16px solid blue',
                            borderBottom: '16px solid blue',
                            animation: 'spin 2s linear infinite',
                            '@keyframes spin': {
                                '0%': {transform: 'rotate(0deg)'},
                                '100%': {transform: 'rotate(360deg)'},
                            },
                        }}
                    />
                </Stack>
            </Box>
        </Box>
    )
}

export default LazyLoading;
