'use client';
import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';
import {userDashboard} from '@/utils/authLogin';
import {useQuery} from '@tanstack/react-query';
import {CircularProgress} from '@mui/material';

function Dashboard() {
    const router = useRouter();
    
    const {data, isLoading, isError} = useQuery({
        queryKey: ['userDashboard'],
        queryFn: userDashboard,
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
    
    // Set the cookie for the userData
    Cookies.set('userData', JSON.stringify(userData), {
        secure: true,
        sameSite: 'strict',
    });
    
    if (userData.role === 'admin' || userData.role === 'superAdmin') {
        return router.push('/dashboard/admin');
    }
    
    if (userData.role === 'user') {
        return router.push('/dashboard/user');
    }
    
    // Navigate to error page if user role is not recognized
    return router.push('/error/404');
}

export default Dashboard;