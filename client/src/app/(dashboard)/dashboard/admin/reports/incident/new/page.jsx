'use client';
import {Suspense, lazy} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";

const NewIncidentReport = lazy(() => import("@/components/ReportComponents/IncidentComponents/NewIncidentReport/NewIncidentReport"));

function NewIncidentReportPage() {
    const queryClient = useQueryClient();
    
    // Fetch site data
    const {data: siteData, isLoading: isLoadingSite, isError: isErrorSite} = useQuery({
        queryKey: ['AllSite'],
        queryFn: AdminUtils.AllSite,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled: !queryClient.getQueryData(['AllSite']),
    });
    
    // Fetch staff data
    const {data: staffData, isLoading: isLoadingStaff, isError: isErrorStaff} = useQuery({
        queryKey: ['AllStaff'],
        queryFn: AdminUtils.AllStaff,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled: !queryClient.getQueryData(['AllStaff']),
    });
    
    if (isLoadingSite || isLoadingStaff) {
        return <LazyLoading/>;
    }
    
    if (isErrorSite || !siteData || isErrorStaff || !staffData) {
        console.error('Error fetching data');
        return <DataFetchError/>;
    }
    
    const effectiveSiteData = queryClient.getQueryData(['AllSite']) || siteData.allSite;
    const effectiveStaffData = queryClient.getQueryData(['AllStaff']) || staffData.allStaff;
    return (
        <Suspense fallback={<LazyLoading/>}>
            <NewIncidentReport allStaff={effectiveStaffData.allStaff} allSite={effectiveSiteData.allSite}/>
        </Suspense>
    );
}

export default NewIncidentReportPage;