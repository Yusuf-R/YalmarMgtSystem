'use client';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/navigation";

function New() {
    const router = useRouter();
    return (
        <Box>
            <Typography>Add New Staff</Typography>
            <Stack direction='row' spacing={2}>
                <Button onClick={() => router.push('/dashboard/admin/staff')}>Back</Button>
            </Stack>
        </Box>
    )
}


export default New;