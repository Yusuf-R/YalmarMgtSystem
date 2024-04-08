import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";


function DashboardLayout({children}) {
    return (
        <>
            <Box>
                <Stack direction='row' spacing={2}>
                    {children}
                </Stack>
            </Box>
        </>
    );
}

export default DashboardLayout;