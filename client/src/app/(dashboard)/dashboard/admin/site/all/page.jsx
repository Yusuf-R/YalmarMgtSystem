'use client';
import Site from "@/components/SiteComponents/Site/Site"
import AdminUtils from '@/utils/AdminUtilities';
import {useQuery} from '@tanstack/react-query'; // Ensure this import is correct
import {useRouter} from "next/navigation"

function AllSites() {
    // make an api call to get all the site in the DB
    const router = useRouter();
    const {isLoading, isError, data, error} = useQuery({
        queryKey: ['AllSite'],
        queryFn: AdminUtils.AllSite,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
    
    // // Clear session storage when the component mounts
    // sessionStorage.removeItem('siteID');
    // sessionStorage.removeItem('siteData');
    //
    if (isLoading) {
        return <span>Loading...</span>;
    }
    if (isError) {
        return router.push('/error/404');
    }
    const {allSite} = data;
    
    return (
        <>
            <Site allSite={allSite}/>
        </>
    )
    
}

export default AllSites