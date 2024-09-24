'use client';
import {Suspense, lazy, useEffect, useState} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import useIncidentStore from "@/store/useIncidentStore";
import AdminUtils from "@/utils/AdminUtilities";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const AllServiceIncident = lazy(() =>
    import("@/components/ReportComponents/IncidentComponents/All/AllServiceIncident/AllServiceIncident")
);

function IncidentService() {
    const {serviceIncidentData, setServiceIncidentData} = useIncidentStore();
    const queryClient = useQueryClient();

    // Fetch cached data from query cache
    const cachedData = queryClient.getQueryData(["ServiceIncidentData"]);

    // useQuery for fetching the data if needed
    const {data, error, isLoading} = useQuery({
        queryKey: ["AllIncidentReport"],
        queryFn: AdminUtils.AllIncidentReport,
        enabled: !serviceIncidentData && !cachedData, // Only enable fetch if there's no data
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        retry: false,
    });

    // Set Zustand and Query Cache data when the API fetch is successful
    useEffect(() => {
        if (data) {
            const {allIncidentReport} = data;
            const serviceIncidents = allIncidentReport.filter(
                (incident) => incident.incidentType === "ServiceIncident"
            );
            setServiceIncidentData(serviceIncidents);
            queryClient.setQueryData(["ServiceIncidentData"], serviceIncidents);
        }
    }, [data, setServiceIncidentData, queryClient]);

    // Use cached data if available
    useEffect(() => {
        if (!serviceIncidentData && cachedData) {
            setServiceIncidentData(cachedData);
        }
    }, [cachedData, serviceIncidentData, setServiceIncidentData]);

    // Loading and Error handling
    if (isLoading) {
        return <LazyLoading/>;
    }
    if (error || (!serviceIncidentData && !cachedData)) {
        return <DataFetchError/>;
    }

    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <AllServiceIncident serviceIncidentData={serviceIncidentData || cachedData}/>
            </Suspense>
        </>
    );
}

export default IncidentService;
