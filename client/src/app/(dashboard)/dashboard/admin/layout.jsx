'use client';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DashboardTopNav from "@/components/DashboardTopNav/DashboardTopNav";
import {useQuery} from '@tanstack/react-query';
import {userDashboard} from '@/utils/authLogin'; // Ensure this is the correct path
import AdminSideNav from "@/components/AdminSideNav/AdminSideNav";
import CircularProgress from "@mui/material/CircularProgress";

function AdminLayout({children}) {
    const {data, isLoading, isError} = useQuery({
        queryKey: ['userDashboard'],
        queryFn: userDashboard,
    });
    if (isLoading) {
        return <CircularProgress/>;
    }
    if (isError || !data) {
        console.log({data});
        // Ideally, handle this more gracefully
        console.error('Error fetching user data');
        return <div>Error loading user data as data is: {data}</div>;
    }
    console.log({data});
    const {userData} = data;
    return (
        <>
            <Box sx={{position: 'relative'}}>
                <DashboardTopNav userData={userData}/>
                <Stack direction='row' spacing={2} mt={3}>
                    <Box> <AdminSideNav/> </Box>
                    <Box> {children} </Box>
                </Stack>
            </Box>
        </>
    );
}

export default AdminLayout;
