'use client';
import ProfilePicture from '@/components/SettingsComponents/ProfilePicture/ProfilePicture';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import {useRouter} from 'next/navigation'
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {Suspense} from "react";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";


function PictureUpload() {
    const router = useRouter();
    const queryClient = useQueryClient(); // Accessing the shared QueryClient instance
    const {staffData} = queryClient.getQueryData(['BioData']) || {};
    
    const {data, isLoading, isError} = useQuery({
        queryKey: ['BioData'],
        queryFn: AdminUtils.Profile,
        staleTime: Infinity,
        enabled: !staffData,
    });
    
    if (isLoading) {
        return <LazyLoading/>
    }
    
    if (isError || !data) {
        console.error('Error fetching user data');
        return <DataFetchError/>;
    }
    
    const effectiveStaffData = staffData || data.staffData;
    
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <ProfilePicture staffData={effectiveStaffData}/>
            </Suspense>
        </>
    )
}

export default PictureUpload