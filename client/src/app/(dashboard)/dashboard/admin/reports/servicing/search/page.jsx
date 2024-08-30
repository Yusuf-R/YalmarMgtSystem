'use client';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {Suspense, lazy} from "react";

const SearchServiceReport = lazy(() => import("@/components/ReportComponents/ServicingComponents/SearchServiceReport/SearchServiceReport"));


function SearchServiceRecord() {
    const queryClient = useQueryClient();
    
    const allSite = queryClient.getQueryData(['AllSite']);
    const {isLoading: isLoadingSite, isError: isErrorSite, data: siteData} = useQuery({
        queryKey: ['AllSite'],
        queryFn: AdminUtils.AllSite,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled: !allSite,
    });
    
    if (isLoadingSite) {
        return <LazyLoading/>
    }
    
    if (isErrorSite) {
        console.error('Error fetching site data');
        return <DataFetchError/>;
    }
    
    const effectiveSiteData = allSite || siteData.allSite;
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <SearchServiceReport allSite={effectiveSiteData.allSite}/>
            </Suspense>
        </>
    )
}

export default SearchServiceRecord;