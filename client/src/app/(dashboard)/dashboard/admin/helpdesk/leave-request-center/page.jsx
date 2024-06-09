'use client';
import LeaveRequestManagement from "@/components/HelpDeskComponents/LeaveRequestManagement/LeaveRequestManagement"
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";

function LeaveRequestCenter() {
    const router = useRouter();
    const {isLoading, isError, data} = useQuery({
        queryKey: ['AllLeaveRequest'],
        queryFn: AdminUtils.AllLeaveRequest,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
    if (isLoading) {
        return <span>Loading...</span>;
    }
    if (isError) {
        return router.push('/error/404');
    }
    const {leaveReqData} = data;
    return (
        <>
            <LeaveRequestManagement leaveReqData={leaveReqData}/>
        </>
    )
}


export default LeaveRequestCenter;