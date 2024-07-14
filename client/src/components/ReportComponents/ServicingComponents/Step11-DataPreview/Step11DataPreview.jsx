import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

function Step11DataPreview() {
    return (
        <>
            <br/><br/><br/>
            <Box>
                {/* All data preview */}
                <Paper elevation={5} sx={{
                    alignContent: 'start',
                    padding: '30px',
                    backgroundColor: 'inherit',
                    color: '#46F0F9',
                    borderRadius: '10px',
                    width: '100%',
                    height: 'auto',
                    margin: '25px'
                }}>
                    <Typography variant="subtitle1">Data Preview</Typography>
                    <br/><br/>
                    <Stack direction='row' gap={4}>
                        <Typography variant="subtitle1">Data Preview</Typography>
                    </Stack>
                </Paper>
            </Box>
        </>
    )
}

export default Step11DataPreview;