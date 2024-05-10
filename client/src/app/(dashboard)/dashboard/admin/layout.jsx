'use client';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DashboardTopNav from "@/components/DashboardTopNav/DashboardTopNav";
import {useQuery} from '@tanstack/react-query';
import {userDashboard} from '@/utils/authLogin'; // Ensure this is the correct path
import AdminSideNav from "@/components/AdminSideNav/AdminSideNav";
import CircularProgress from "@mui/material/CircularProgress";
import {useRouter} from "next/navigation";

function AdminLayout({children}) {
    const router = useRouter();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['userDashboard'],
        queryFn: userDashboard,
    });
    if (isLoading) {
        return <CircularProgress/>;
    }
    if (isError || !data) {
        // Ideally, handle this more gracefully
        console.error('Error fetching user data');
        // route the user to error page
        return router.push('/error/404');
    }
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
