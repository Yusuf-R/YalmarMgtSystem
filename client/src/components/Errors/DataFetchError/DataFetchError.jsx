'use client';
import Stack from "@mui/material/Stack";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {mainSection} from "@/utils/data";

function DataFetchError({fetchError}) {
    const goDashboard = () => {
        // take him to the page before
        window.history.back();
    }
    return (
        <Box sx={mainSection}>
            <Stack direction="column" spacing={5} alignItems="center" justifyContent="center">
                <Image
                    src="/DataError.svg"
                    alt="Data Error"
                    width={700}
                    height={700}
                />
                <Typography variant="h5">
                    Error in Fetching Data
                </Typography>
                {fetchError &&
                    <Typography variant="h6">
                        {fetchError}
                    </Typography>
                }
                <Button onClick={goDashboard} variant="contained" color="primary" startIcon={<ArrowBackIcon/>}>
                    Back
                </Button>
            </Stack>
        </Box>
    );
}

export default DataFetchError;
