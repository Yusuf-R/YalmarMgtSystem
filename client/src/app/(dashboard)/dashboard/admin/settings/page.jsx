'use client';
import {useRouter} from "next/navigation";
import {useQuery} from '@tanstack/react-query';
import CircularProgress from "@mui/material/CircularProgress";
import AdminUtils from "@/utils/AdminUtilities";
import SettingsLandingPage from "@/components/SettingsLandingPage/SettingsLandingPage";

function SystemSettings() {
    const router = useRouter();
    // Separate useQuery calls for parallel execution
    const {
        data: bioData,
        isLoading: isBioDataLoading,
        isError: isBioDataError
    } = useQuery({
        queryKey: ['BioData'],
        queryFn: AdminUtils.Profile,
        staleTime: Infinity,
    });
    const {
        data: privateCheckData,
        isLoading: isPrivateCheckLoading,
        isError: isPrivateCheckError
    } = useQuery({
        queryKey: ['privateCheck'],
        queryFn: AdminUtils.privateCheck,
    });
    
    if (isBioDataLoading || isPrivateCheckLoading) {
        return <CircularProgress/>;
    }
    
    if (isBioDataError || isPrivateCheckError || !bioData || !privateCheckData) {
        // Handle error state, possibly navigating to an error page or showing an error message
        console.error('Failed to fetch or no data available');
        router.push('/error/404');
    }
    const {staffData} = bioData;
    const {healthCheck} = privateCheckData;
    
    return (
        <>
            <SettingsLandingPage staffData={staffData} healthCheck={healthCheck}/>
        </>
    )
}


export default SystemSettings;