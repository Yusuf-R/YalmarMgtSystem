'use client';
import {Suspense, lazy, useEffect, useState} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import useIncidentStore from "@/store/useIncidentStore";
import AdminUtils from "@/utils/AdminUtilities";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const AllStaffIncident = lazy(() =>
    import("@/components/ReportComponents/IncidentComponents/All/AllStaffIncident/AllStaffIncident")
);

function IncidentStaff() {
    const {staffIncidentData, setStaffIncidentData} = useIncidentStore();
    const queryClient = useQueryClient();

    // Fetch cached data from query cache
    const cachedData = queryClient.getQueryData(["StaffIncidentData"]);

    // useQuery for fetching the data if needed
    const {data, error, isLoading} = useQuery({
        queryKey: ["AllIncidentReport"],
        queryFn: AdminUtils.AllIncidentReport,
        enabled: !staffIncidentData && !cachedData, // Only enable fetch if there's no data
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        retry: false,
    });

    // Set Zustand and Query Cache data when the API fetch is successful
    useEffect(() => {
        if (data) {
            const {allIncidentReport} = data;
            const staffIncidents = allIncidentReport.filter(
                (incident) => incident.incidentType === "StaffIncident"
            );
            setStaffIncidentData(staffIncidents);
            queryClient.setQueryData(["StaffIncidentData"], staffIncidents);
        }
    }, [data, setStaffIncidentData, queryClient]);

    // Use cached data if available
    useEffect(() => {
        if (!staffIncidentData && cachedData) {
            setStaffIncidentData(cachedData);
        }
    }, [cachedData, staffIncidentData, setStaffIncidentData]);

    // Loading and Error handling
    if (isLoading) {
        return <LazyLoading/>;
    }
    if (error || (!staffIncidentData && !cachedData)) {
        return <DataFetchError/>;
    }

    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <AllStaffIncident staffIncidentData={staffIncidentData || cachedData}/>
            </Suspense>
        </>
    );
}

export default IncidentStaff;
