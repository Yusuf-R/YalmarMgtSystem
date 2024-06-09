'use client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Staff from '@/components/StaffComponents/Staff/Staff';
import {useQuery} from '@tanstack/react-query'; // Ensure this import is correct
import AdminUtils from '@/utils/AdminUtilities';
import {useRouter} from "next/navigation";
import {useEffect} from "react";

function AllStaff() {
    const router = useRouter();
    const {isLoading, isError, data, error} = useQuery({
        queryKey: ['AllStaff'],
        queryFn: AdminUtils.AllStaff,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
    
    // Clear session storage when the component mounts
    sessionStorage.removeItem('staffID');
    sessionStorage.removeItem('staffData');
    
    if (isLoading) {
        return <span>Loading...</span>;
    }
    
    if (isError) {
        return router.push('/error/404');
    }
    const {allStaff} = data;
    return (
        <>
            <Staff allStaff={allStaff}/>
        </>
    );
}

export default AllStaff;