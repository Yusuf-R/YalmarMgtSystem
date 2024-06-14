'use client';
import {useQuery} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {Suspense, lazy} from "react";

const FuellingReport = lazy(() => import("@/components/FuellingComponents/FuellingReport/FuellingReport"))

function FuelSuppliedReport() {
    const {isLoading, isError, data, error} = useQuery({
        queryKey: ['AllFuelReport'],
        queryFn: AdminUtils.AllFuelReport,
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
    
    const {allFuelReport} = data;
    
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <FuellingReport allFuelReport={allFuelReport}/>
            </Suspense>
        </>
    )
}

export default FuelSuppliedReport