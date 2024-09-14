'use client';
import {Suspense, useEffect, lazy} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import useIncidentStore from "@/store/useIncidentStore";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";

const AllSiteIncident =
    lazy(() => import("@/components/ReportComponents/IncidentComponents/All/AllSiteIncident/AllSiteIncident"));


function IncidentAllSite() {
    const {siteIncidentData, setSiteIncidentData} = useIncidentStore();
    const queryClient = useQueryClient();
    
    // Fetch cached data from query cache
    const cachedData = queryClient.getQueryData(["SiteIncidentData"]);
    
    // useQuery for fetching the data if needed
    const {data, error, isLoading} = useQuery({
        queryKey: ["AllIncidentReport"],
        queryFn: AdminUtils.AllIncidentReport,
        enabled: !siteIncidentData && !cachedData, // Only enable fetch if there's no data
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
            setSiteIncidentData(fuelIncidents);
            queryClient.setQueryData(["FuelIncidentData"], fuelIncidents);
        }
    }, [data, setSiteIncidentData, queryClient]);
    
    // Use cached data if available
    useEffect(() => {
        if (!siteIncidentData && cachedData) {
            setSiteIncidentData(cachedData);
        }
    }, [cachedData, siteIncidentData, setSiteIncidentData]);
    
    // Loading and Error handling
    if (isLoading) {
        return <LazyLoading/>;
    }
    if (error || (!siteIncidentData && !cachedData)) {
        return <DataFetchError/>;
    }
    
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <AllSiteIncident siteIncidentData={siteIncidentData || cachedData}/>
            </Suspense>
        </>
    )
    
}

export default IncidentAllSite;