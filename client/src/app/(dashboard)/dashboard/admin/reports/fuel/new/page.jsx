'use client';

import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {Suspense, lazy} from "react";

const NewFuellingReport = lazy(() => import ("@/components/ReportComponents/FuellingComponents/NewFuellingReport/NewFuellingReport"));

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

    const effectiveSiteData = allSite || data.allSite;
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <NewFuellingReport allSite={effectiveSiteData.allSite}/>
            </Suspense>
        </>
    )

}

export default FuelSupplyReportForm;