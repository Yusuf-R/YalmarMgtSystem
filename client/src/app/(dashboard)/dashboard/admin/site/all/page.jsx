'use client';

import AdminUtils from '@/utils/AdminUtilities';
import {useQuery} from '@tanstack/react-query'; // Ensure this import is correct
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {Suspense, lazy} from "react";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";

const AllSite = lazy(() => import ("@/components/SiteComponents/AllSite/AllSite"));

function AllSites() {
    const {isLoading, isError, data, error} = useQuery({
        queryKey: ['AllSite'],
        queryFn: AdminUtils.AllSite,
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
    const {allSite} = data;
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <AllSite allSite={allSite}/>
            </Suspense>
        </>
    )
}

export default AllSites;
