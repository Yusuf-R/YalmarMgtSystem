'use client';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import MyBioData from "@/components/SettingsComponents/MyBioData/MyBioData";
import AdminUtils from "@/utils/AdminUtilities";
import {Suspense} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";

function PersonalData() {
    const queryClient = useQueryClient();
    const {staffData} = queryClient.getQueryData(['BioData']);
    
    const {data, isLoading, isError} = useQuery({
        queryKey: ['BioData'],
        queryFn: AdminUtils.Profile,
        staleTime: Infinity,
        enabled: !staffData,
    });
    
    if (isLoading) {
        return <LazyLoading/>;
    }
    
    if (isError || !data) {
        console.error('Error fetching user data');
        return <DataFetchError/>;
    }
    
    const effectiveStaffData = staffData || data.staffData;
    
    return (
        <Suspense fallback={<LazyLoading/>}>
            <MyBioData staffData={effectiveStaffData}/>
        </Suspense>
    );
}

export default PersonalData;