'use client';
import LeaveRequestManagement from "@/components/HelpDeskComponents/LeaveRequestManagement/LeaveRequestManagement"
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {Suspense} from "react";

function LeaveRequestCenter() {
    const router = useRouter();
    const {isLoading, isError, data} = useQuery({
        queryKey: ['AllLeaveRequest'],
        queryFn: AdminUtils.AllLeaveRequest,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
    if (isLoading) {
        return <LazyLoading/>
    }
    
    if (isError || !data) {
        console.error('Error fetching user data');
        return <DataFetchError/>;
    }
    const {leaveReqData} = data;
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <LeaveRequestManagement leaveReqData={leaveReqData}/>
            </Suspense>
        </>
    )
}


export default LeaveRequestCenter;