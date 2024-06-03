'use client';
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard';
import {useQuery} from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import {useRouter} from 'next/navigation';
import AdminUtils from "@/utils/AdminUtilities";


function Admin() {
    const router = useRouter();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['staffDashboard'],
        queryFn: AdminUtils.staffDashboard,
    });
    
    if (isLoading) {
        return <CircularProgress/>;
    }
    
    if (isError || !data) {
        // Handle error state, possibly navigating to an error page or showing an error message
        console.error('Failed to fetch or no data available');
        router.push('/error/404');
    }
    
    const {staffData, accessToken} = data;
    
    return (
        <AdminDashboard
            staffData={staffData}
            accessToken={accessToken}
        />
    );
}


export default Admin;
