'use client';
import {Suspense, lazy, useEffect, useState} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import useIncidentStore from "@/store/useIncidentStore";
import AdminUtils from "@/utils/AdminUtilities";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const AllFuelIncident = lazy(() =>
    import("@/components/ReportComponents/IncidentComponents/All/AllFuelIncident/AllFuelIncident")
);

function IncidentFuel() {
    const {fuelIncidentData, setFuelIncidentData} = useIncidentStore();
    const queryClient = useQueryClient();
    
    // Fetch cached data from query cache
    const cachedData = queryClient.getQueryData(["FuelIncidentData"]);
    
    // useQuery for fetching the data if needed
    const {data, error, isLoading} = useQuery({
        queryKey: ["AllIncidentReport"],
        queryFn: AdminUtils.AllIncidentReport,
        enabled: !fuelIncidentData && !cachedData, // Only enable fetch if there's no data
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        retry: false,
    });
    
    // Set Zustand and Query Cache data when the API fetch is successful
    useEffect(() => {
        if (data) {
            const {allIncidentReport} = data;
            const fuelIncidents = allIncidentReport.filter(
                (incident) => incident.incidentType === "FuelIncident"
            );
            setFuelIncidentData(fuelIncidents);
            queryClient.setQueryData(["FuelIncidentData"], fuelIncidents);
        }
    }, [data, setFuelIncidentData, queryClient]);
    
    // Use cached data if available
    useEffect(() => {
        if (!fuelIncidentData && cachedData) {
            setFuelIncidentData(cachedData);
        }
    }, [cachedData, fuelIncidentData, setFuelIncidentData]);
    
    // Loading and Error handling
    if (isLoading) {
      return <LazyLoading/>;
    }
    if (error || (!fuelIncidentData && !cachedData)) {
      return <DataFetchError/>;
    }
    
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <AllFuelIncident fuelIncidentData={fuelIncidentData || cachedData}/>
            </Suspense>
        </>
    );
}

export default IncidentFuel;
