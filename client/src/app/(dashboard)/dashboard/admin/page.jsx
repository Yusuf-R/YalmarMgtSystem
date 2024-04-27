'use client';
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard';
import {userDashboard} from '@/utils/authLogin';
import {useQuery} from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import {useRouter} from 'next/navigation';

function Admin() {
    const router = useRouter();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['userDashboard'],
        queryFn: userDashboard,
    });
    
    if (isLoading) {
        return <CircularProgress/>;
    }
    
    if (isError || !data) {
        // Handle error state, possibly navigating to an error page or showing an error message
        console.error('Failed to fetch or no data available');
        return router.push('/error/404');
    }
    
    const {userData, accessToken} = data;
    
    return (
        <AdminDashboard
            userData={userData}
            accessToken={accessToken}
        />
    );
}


export default Admin;
