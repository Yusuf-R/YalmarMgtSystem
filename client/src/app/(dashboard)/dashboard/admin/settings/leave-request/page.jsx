'use client';

import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {Suspense, lazy, useState, useEffect} from "react";
import useBioDataStore from "@/store/useBioDataStore";

const AllLeaveRequest = lazy(() => import ("@/components/SettingsComponents/LeaveRequest/AllLeaveRequest/AllLeaveRequest"));


function LeaveManagement() {

    // Query setup
    const {data, isLoading, isError} = useQuery({
        queryKey: ['GetLeaveRequest'],
        queryFn: AdminUtils.GetLeaveRequest,
        staleTime: Infinity,
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
        <Suspense fallback={<LazyLoading/>}>
            <AllLeaveRequest leaveReqData={leaveReqData}/>
        </Suspense>
    )
}


export default LeaveManagement;