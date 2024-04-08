'use client';
import {useRouter} from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Staff() {
    const router = useRouter();
    return (
        <>
            <Box sx={{
                border: '5px solid red'
            }}>
                <Typography>Staff</Typography>
                <Stack direction='row' spacing={2}>
                    <Button onClick={() => router.push('/dashboard/admin')}>Back</Button>
                    <Button onClick={() => router.push('/dashboard/admin/staff/new')}>Add</Button>
                </Stack>
            </Box>
        </>
    )
}

export default Staff;