'use client';
import {useRouter} from 'next/navigation';
import {useQuery} from '@tanstack/react-query';
import {CircularProgress} from '@mui/material';
import UserUtils from "@/utils/UserUtilities";


function Dashboard() {
    console.log('Dashboard page');
    const router = useRouter();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['userDashboard'],
        queryFn: UserUtils.userDashboard,
    });
    
    if (isError) {
        // Navigate to error page
        return router.push('/error/404');
    }
    if (isLoading) {
        return <CircularProgress/>;
    }
    if (!data) {
        console.error('No data received');
        // Navigate to error page
        return router.push('/error/404');
    }
    const {userData, accessToken} = data;
    // Check if userData or accessToken is missing
    if (!userData || !accessToken) {
        // Navigate to error page
        return router.push('/error/404');
    }
    if (userData.role === 'Admin' || userData.role === 'SuperAdmin') {
        // Navigate to admin dashboard
        return router.push('/dashboard/admin');
    }
    if (userData.role === 'User') {
        return router.push('/dashboard/user');
    }
    // Navigate to error page if user role is not recognized
    return router.push('/error/404');
}

export default Dashboard;