'use client';
import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard';
import UserDashboard from '@/components/UserDashboard/UserDashboard';
import {userDashboard} from '@/utils/authLogin';
import {useQuery} from '@tanstack/react-query';

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
        return <div>Loading...</div>;
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
        return (
            <AdminDashboard
                userData={userData}
                accessToken={accessToken}
            />
        );
    }
    
    if (userData.role === 'user') {
        return (
            <UserDashboard
                userData={userData}
                accessToken={accessToken}
            />
        );
    }
    
    // Navigate to error page if user role is not recognized
    return router.push('/error/404');
}

export default Dashboard;