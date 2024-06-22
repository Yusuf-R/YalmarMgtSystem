'use client';
import {useQuery} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {Suspense, lazy} from "react";

const ServicingReport = lazy(() => import("@/components/ReportComponents/ServicingComponents/ServicingReport/ServicingReport"))

function AllServicingReport() {
    const {isLoading, isError, data, error} = useQuery({
        queryKey: ['AllServicingReports'],
        queryFn: AdminUtils.AllServicingReports,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
    
    if (isLoading) {
        return <LazyLoading/>
    }
    
    if (isError || !data) {
        console.error('Error fetching user data');
        return <DataFetchError/>;
    }
    
    const {allServicingReport} = data;
    
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <ServicingReport allServicingReport={allServicingReport}/>
            </Suspense>
        </>
    )
}

export default AllServicingReport