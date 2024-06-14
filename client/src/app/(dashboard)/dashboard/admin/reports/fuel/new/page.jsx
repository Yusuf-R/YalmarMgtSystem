'use client';
import NewFuellingReport from "@/components/FuellingComponents/NewFuellingReport/NewFuellingReport";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {Suspense} from "react";

function FuelSupplyReportForm() {
    const queryClient = useQueryClient();
    const allSite = queryClient.getQueryData(['AllSite']);
    const {isLoading, isError, data} = useQuery({
        queryKey: ['AllSite'],
        queryFn: AdminUtils.AllSite,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled: !allSite,
    });
    
    if (isLoading) {
        return <LazyLoading/>;
    }
    
    if (isError || !data) {
        console.error('Error fetching user data');
        return <DataFetchError/>;
    }
    
    const effectiveStaffData = allSite || data.allSite;
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <NewFuellingReport allSite={effectiveStaffData.allSite}/>
            </Suspense>
        </>
    )
    
}

export default FuelSupplyReportForm;