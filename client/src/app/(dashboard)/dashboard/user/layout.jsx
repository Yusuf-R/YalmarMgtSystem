import Box from "@mui/material/Box";


function UserLayout({children}) {
    
    return (
        <>
            <Box>
                {children}
            </Box>
        </>
    );
}

export default UserLayout;