'use client';
import Staff from '@/components/StaffComponents/Staff/Staff';
import {useQuery} from '@tanstack/react-query'; // Ensure this import is correct
import AdminUtils from '@/utils/AdminUtilities';
import {useRouter} from "next/navigation";
import {Suspense} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";


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
        return <LazyLoading/>
    }
    
    if (isError) {
        return <DataFetchError/>
    }
    const {allStaff} = data;
    return (
        <Suspense fallback={<LazyLoading/>}>
            <Staff allStaff={allStaff}/>
        </Suspense>
    );
}

export default AllStaff;