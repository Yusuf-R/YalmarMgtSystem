'use client';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {Suspense, lazy} from "react";

const NewServicingReport = lazy(() => import("@/components/ReportComponents/ServicingComponents/NewServicingReport/NewServicingReport"))

function ServicingReportForm() {
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
            <NewServicingReport allStaff={effectiveStaffData.allStaff} allSite={effectiveSiteData.allSite}/>
        </Suspense>
    );
}

export default ServicingReportForm;
