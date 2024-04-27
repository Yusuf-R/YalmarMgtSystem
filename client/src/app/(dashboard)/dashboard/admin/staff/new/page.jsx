'use client';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/navigation";

function New() {
    const router = useRouter();
    return (
        <Box sx={{
            padding: '20px',
            width: 'calc(100% - 250px)',
            position: 'absolute',
            top: '70px',
            left: '250px',
        }}>
            <Typography>Add New Staff</Typography>
            <Stack direction='row' spacing={2}>
                <Button
                    onClick={() => router.push('/dashboard/admin/staff')}
                    variant="contained"
                    color='success'
                >
                    Back
                </Button>
                <Button
                    onClick={() => router.push('/dashboard/admin/staff')}
                    variant="contained"
                    color='error'
                >
                    Save
                </Button>
            </Stack>
        </Box>
    )
}


export default New;