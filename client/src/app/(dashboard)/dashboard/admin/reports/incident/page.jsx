'use client';
import {useEffect} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import useIncidentStore from "@/store/useIncidentStore";
import {lazy, Suspense} from "react";

const IncidentLandingPage = lazy(() =>
    import("@/components/ReportComponents/IncidentComponents/IncidentLandingPage/IncidentLandingPage")
);

function IncidentReport() {
    const queryClient = useQueryClient();
    const {
        setAllIncidentData,
        setStaffIncidentData,
        setSiteIncidentData,
        setFuelIncidentData,
        setServiceIncidentData,
        setOthersIncidentData,
    } = useIncidentStore();
    
    const {isLoading, isError, data, error} = useQuery({
        queryKey: ["AllIncidentReport"],
        queryFn: AdminUtils.AllIncidentReport,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
    
    useEffect(() => {
        if (data) {
            const {allIncidentReport} = data;
            
            // Categorize the data
            const staffIncidents = allIncidentReport.filter(
                (incident) => incident.incidentType === "StaffIncident"
            );
            const siteIncidents = allIncidentReport.filter(
                (incident) => incident.incidentType === "SiteIncident"
            );
            const fuelIncidents = allIncidentReport.filter(
                (incident) => incident.incidentType === "FuelIncident"
            );
            const serviceIncidents = allIncidentReport.filter(
                (incident) => incident.incidentType === "ServiceIncident"
            );
            const othersIncidents = allIncidentReport.filter(
                (incident) => incident.incidentType === "OthersIncident"
            );
            
            // Set the data in Zustand store
            setAllIncidentData(allIncidentReport);
            setStaffIncidentData(staffIncidents);
            setSiteIncidentData(siteIncidents);
            setFuelIncidentData(fuelIncidents);
            setServiceIncidentData(serviceIncidents);
            setOthersIncidentData(othersIncidents);
            
            // Set the data in TanStack Query cache
            queryClient.setQueryData(["StaffIncidentData"], staffIncidents);
            queryClient.setQueryData(["SiteIncidentData"], siteIncidents);
            queryClient.setQueryData(["FuelIncidentData"], fuelIncidents);
            queryClient.setQueryData(["ServiceIncidentData"], serviceIncidents);
            queryClient.setQueryData(["OthersIncidentData"], othersIncidents);
        }
    }, [data, setAllIncidentData, setStaffIncidentData, setSiteIncidentData, setFuelIncidentData, setServiceIncidentData, setOthersIncidentData, queryClient]);
    
    if (isLoading) {
        return <LazyLoading/>;
    }
    
    if (isError || !data || error) {
        console.error("Error fetching user data");
        return <DataFetchError/>;
    }
    
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <IncidentLandingPage allIncidentReport={data.allIncidentReport}/>
            </Suspense>
        </>
    );
}

export default IncidentReport;
