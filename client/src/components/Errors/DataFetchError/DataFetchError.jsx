'use client';
import Stack from "@mui/material/Stack";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {mainSection} from "@/utils/data";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function DataFetchError({fetchError}) {
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

    const goDashboard = () => {
        // Go back to the previous page
        window.history.back();
    }

    // Dynamically adjust image size, text size, and button size based on screen size
    const imageSize = xSmall || small ? 200 : medium ? 250 : 300;
    const fontSizeTitle = xSmall || small ? '1.2rem' : medium ? '1.5rem' : '2rem';
    const fontSizeSubtitle = xSmall || small ? '1rem' : medium ? '1.2rem' : '1.5rem';
    const buttonSize = xSmall || small ? 'small' : medium ? 'medium' : 'large';

    return (
        <Box>
            <Stack direction="column" spacing={5} alignItems="center" justifyContent="center">
                <Image
                    src="/DataError.svg"
                    alt="Data Error"
                    width={imageSize * 2}  // Adjust width dynamically
                    height={imageSize * 2}  // Adjust height dynamically
                    style={{
                        paddingLeft: xSmall || small || medium ? 40 : undefined,
                        paddingRight: xSmall || small || medium ? 40 : undefined,
                    }}
                />
                <Typography variant="h5" sx={{fontSize: fontSizeTitle, fontWeight: 'bold'}}>
                    Error in Fetching Data
                </Typography>
                {fetchError &&
                    <Typography variant="h6" sx={{fontSize: fontSizeSubtitle}}>
                        {fetchError}
                    </Typography>
                }
                <Button
                    onClick={goDashboard}
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBackIcon/>}
                    size={buttonSize}  // Adjust button size dynamically
                >
                    Back
                </Button>
            </Stack>
        </Box>
    );
}

export default DataFetchError;
