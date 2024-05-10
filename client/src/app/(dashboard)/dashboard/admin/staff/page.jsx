import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Staff from '@/components/Staff/Staff';

function AllStaff() {
    return (
        <>
            <Box sx={{
                padding: '20px',
                width: 'calc(100% - 250px)',
                position: 'absolute',
                top: '70px',
                left: '250px',
            }}>
                <Stack direction='column' spacing={2}>
                    <Staff/>
                </Stack>
            </Box>
        </>
    )
}

export default AllStaff;