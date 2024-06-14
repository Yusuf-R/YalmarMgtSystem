'use client';
import LeaveRequest from "@/components/SettingsComponents/LeaveRequest/LeaveRequest";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import MyBioData from "@/components/SettingsComponents/MyBioData/MyBioData";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {Suspense} from "react";


function LeaveManagement() {
    const queryClient = useQueryClient();
    const {staffData} = queryClient.getQueryData(['BioData']);
    
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
        return <DataFetchError/>
    }
    
    const effectiveStaffData = staffData || data.staffData;
    
    return (
        <Suspense fallback={<LazyLoading/>}>
            <LeaveRequest staffData={effectiveStaffData}/>
        </Suspense>
    )
}


export default LeaveManagement;