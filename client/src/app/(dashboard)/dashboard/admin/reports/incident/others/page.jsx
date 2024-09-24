'use client';
import {Suspense, lazy, useEffect, useState} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import useIncidentStore from "@/store/useIncidentStore";
import AdminUtils from "@/utils/AdminUtilities";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const AllOthersIncident = lazy(() =>
    import("@/components/ReportComponents/IncidentComponents/All/AllOthersIncident/AllOthersIncident")
);

function IncidentOthers() {
    const {othersIncidentData, setOthersIncidentData} = useIncidentStore();
    const queryClient = useQueryClient();

    // Fetch cached data from query cache
    const cachedData = queryClient.getQueryData(["OthersIncidentData"]);

    // useQuery for fetching the data if needed
    const {data, error, isLoading} = useQuery({
        queryKey: ["AllIncidentReport"],
        queryFn: AdminUtils.AllIncidentReport,
        enabled: !othersIncidentData && !cachedData, // Only enable fetch if there's no data
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        retry: false,
    });

    // Set Zustand and Query Cache data when the API fetch is successful
    useEffect(() => {
        if (data) {
            const {allIncidentReport} = data;
            const othersIncidents = allIncidentReport.filter(
                (incident) => incident.incidentType === "OthersIncident"
            );
            setOthersIncidentData(othersIncidents);
            queryClient.setQueryData(["OthersIncidentData"], othersIncidents);
        }
    }, [data, setOthersIncidentData, queryClient]);

    // Use cached data if available
    useEffect(() => {
        if (!othersIncidentData && cachedData) {
            setOthersIncidentData(cachedData);
        }
    }, [cachedData, othersIncidentData, setOthersIncidentData]);

    // Loading and Error handling
    if (isLoading) {
        return <LazyLoading/>;
    }
    if (error || (!othersIncidentData && !cachedData)) {
        return <DataFetchError/>;
    }

    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <AllOthersIncident othersIncidentData={othersIncidentData || cachedData}/>
            </Suspense>
        </>
    );
}

export default IncidentOthers;
