import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {streamFromString} from "next/dist/server/stream-utils/node-web-streams-helper";

function AdminBioData({staffData}) {
    // loop through the StaffData object and display it content in text field component
    const RenderTextField = ({data}) => {
        Object.entries(data).forEach(([key, value]) => {
            //     display it in a TextField
            return <TextField
                key={key}
                label={key}
                variant="outlined"
                defaultValue={value}
                fullWidth
            />
        })
    }
    
    return (
        <>
            <Box sx={{
                padding: '20px',
                width: 'calc(100% - 250px)',
                position: 'absolute',
                top: '70px',
                left: '250px',
            }}>
                <Paper>
                    <Stack direction='column' gap={3}>
                        <Typography variant='h6'>Bio Data</Typography>
                        <RenderTextField data={staffData}/>
                    </Stack>
                </Paper>
            </Box>
        
        </>
    )
}

export default AdminBioData;