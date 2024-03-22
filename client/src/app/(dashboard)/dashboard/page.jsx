'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard';
import UserDashboard from '@/components/UserDashboard/UserDashboard';
import useAuthGuard from "@/customHooks/useAuthGuard";
import DashboardLayout from "@/app/(dashboard)/layout";

function Dashboard() {
    useAuthGuard();
    const [userData, setUserData] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    
    useEffect(() => {
        // Retrieve user data and tokens from cookies
        const userDataFromCookie = Cookies.get('userData');
        const accessTokenFromCookie = Cookies.get('accessToken');
        const refreshTokenFromCookie = Cookies.get('refreshToken');
        
        if (userDataFromCookie) {
            setUserData(JSON.parse(userDataFromCookie));
        }
        if (accessTokenFromCookie) {
            setAccessToken(accessTokenFromCookie);
        }
        if (refreshTokenFromCookie) {
            setRefreshToken(refreshTokenFromCookie);
        }
        
        const rememberMe = Cookies.get('rememberMe') === 'true';
        if (!rememberMe) {
            // Delete cookies if remember me was not checked
            Cookies.remove('email');
            Cookies.remove('userData');
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
        }
    }, []); // Empty dependency array ensures that this effect runs only once after the initial render
    
    // Render the appropriate dashboard based on user role
    if (userData && userData.isAdmin) {
        return (
            <DashboardLayout>
                <AdminDashboard userData={userData} accessToken={accessToken} refreshToken={refreshToken} />
            </DashboardLayout>
        );
    } else if (userData) {
        return (
            <DashboardLayout>
                <UserDashboard userData={userData} accessToken={accessToken} refreshToken={refreshToken} />
            </DashboardLayout>
        );
    }
    return null;
}

export default Dashboard;