'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard';
import UserDashboard from '@/components/UserDashboard/UserDashboard';

Cookies.defaults = {
    sameSite: 'None',
    secure: true,
    httpOnly: true,
};

function Dashboard() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    
    useEffect(() => {
        const userDataFromCookie = Cookies.get('userData');
        if (!userDataFromCookie) {
            // Redirect to login page if email is not found in cookies
            router.push('/error/404');
            return;
        }
        // If userData exists, initialize state values
        setUserData(JSON.parse(userDataFromCookie));
        setAccessToken(Cookies.get('accessToken'));
        setRefreshToken(Cookies.get('refreshToken'));
        
        // if user did not set remember me clear cookies
        if (Cookies.get('rememberMe')  === 'false') {
            Cookies.remove('email');
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            Cookies.remove('userData');
        }
    }, [router]);

    // Render the appropriate dashboard based on user role
    if (!userData) {
        //render a loading indicator
        return <div>Loading...</div>;
    }
    
    if (userData.role === 'admin' || userData.role === 'superAdmin') {
        return (
                <AdminDashboard
                    userData={userData}
                    accessToken={accessToken}
                    refreshToken={refreshToken}
                />
        );
    }
    
    if (userData.role === 'user') {
        return (
                <UserDashboard
                    userData={userData}
                    accessToken={accessToken}
                    refreshToken={refreshToken}
                />
        );
    }
    router.push('/error/404');
    return null;
}

export default Dashboard;
