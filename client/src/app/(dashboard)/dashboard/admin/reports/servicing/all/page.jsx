'use client';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {Suspense, lazy} from "react";

const ServicingReport = lazy(() => import("@/components/ReportComponents/ServicingComponents/ServicingReport/ServicingReport"))

function AllServicingReport() {
    const queryClient = useQueryClient();
    
    const {isLoading, isError, data, error} = useQuery({
        queryKey: ['AllServicingReports'],
        queryFn: AdminUtils.AllServicingReports,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
    
    const allSite = queryClient.getQueryData(['AllSite']);
    const {isLoading: isLoadingSite, isError: isErrorSite} = useQuery({
        queryKey: ['AllSite'],
        queryFn: AdminUtils.AllSite,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled: !allSite,
    });
    
    if (isLoading || isLoadingSite) {
        return <LazyLoading/>
    }
    
    if (isError || !data) {
        console.error('Error fetching user data');
        return <DataFetchError/>;
    }
    
    if (isErrorSite) {
        console.error('Error fetching user data');
        return <DataFetchError/>;
    }
    
    const {allServicingReport} = data;
    const effectiveSiteData = allSite || data.allSite;
    
    
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <ServicingReport allServicingReport={allServicingReport} allSite={effectiveSiteData.allSite}/>
            </Suspense>
        </>
    )
}

export default AllServicingReport