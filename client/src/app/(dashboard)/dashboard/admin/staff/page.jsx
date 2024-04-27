import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Staff from '@/components/Staff/Staff';

function AllStaff() {
    // make a get request to the backEnd to get all the staff using tanstack-react-query
    // render the return data as a props to the Staff components
    
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