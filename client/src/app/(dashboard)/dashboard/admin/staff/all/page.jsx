'use client';
import {useQuery} from '@tanstack/react-query'; // Ensure this import is correct
import AdminUtils from '@/utils/AdminUtilities';
import {useRouter} from "next/navigation";
import {lazy, Suspense} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import E404 from "@/components/Errors/E404/E404";

const AllStaff = lazy(() => import ("@/components/StaffComponents/AllStaff/AllStaff"));

function Staff() {

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

    if (isError || error) {
        return <E404/>
    }

    if (!data) {
        return <DataFetchError/>
    }

    const {allStaff} = data;
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <AllStaff allStaff={allStaff}/>
            </Suspense>
        </>
    );
}

export default Staff;