'use client';
import {useRouter} from 'next/navigation';
import {useQuery} from '@tanstack/react-query';
import {CircularProgress} from '@mui/material';
import AdminUtils from "@/utils/AdminUtilities";


function Dashboard() {
    console.log('Dashboard page');
    const router = useRouter();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['staffDashboard'],
        queryFn: AdminUtils.staffDashboard,
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
    const {staffData, accessToken} = data;
    // Check if staffData or accessToken is missing
    if (!staffData || !accessToken) {
        // Navigate to error page
        return router.push('/error/404');
    }
    if (staffData.role === 'Admin' || staffData.role === 'SuperAdmin') {
        // Navigate to admin dashboard
        return router.push('/dashboard/admin');
    }
    if (staffData.role === 'User') {
        return router.push('/dashboard/user');
    }
    // Navigate to error page if user role is not recognized
    return router.push('/error/404');
}

export default Dashboard;