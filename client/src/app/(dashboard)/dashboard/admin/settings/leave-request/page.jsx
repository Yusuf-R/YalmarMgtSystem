'use client';
import LeaveRequest from "@/components/SettingsComponents/LeaveRequest/LeaveRequest";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import MyBioData from "@/components/SettingsComponents/MyBioData/MyBioData";


function LeaveManagement() {
    const queryClient = useQueryClient();
    const {staffData} = queryClient.getQueryData(['BioData']);
    if (!staffData) {
        const {data, isLoading, isError} = useQuery({
            queryKey: ['AdminBioData'],
            queryFn: AdminUtils.Profile,
            staleTime: Infinity,
            refetchOnWindowFocus: false,
        });
        const {staffData} = data;
        return (
            <MyBioData staffData={staffData}/>
        )
    }
    return <>
        <LeaveRequest staffData={staffData}/>
    </>
}


export default LeaveManagement;
