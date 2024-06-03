'use client';
import Box from "@mui/material/Box";
import {useQuery, useQueryClient} from '@tanstack/react-query';
import BioData from "@/components/BioData/BioData";
import AdminUtils from "@/utils/AdminUtilities";


function PersonalData() {
    const queryClient = useQueryClient();
    const {staffData} = queryClient.getQueryData(['BioData']);
    if (!staffData) {
        const {data, isLoading, isError} = useQuery({
            queryKey: ['AdminBioData'],
            queryFn: AdminUtils.Profile,
            staleTime: Infinity,
            refetchOnWindowFocus: false,
        });
        const {staffData} = data;
        return (
            <BioData staffData={staffData}/>
        )
    }
    return (
        <>
            
            <BioData staffData={staffData}/>
        </>
    )
}

export default PersonalData;
