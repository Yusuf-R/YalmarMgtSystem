'use client';
import Box from "@mui/material/Box";
import {useQuery, useQueryClient} from '@tanstack/react-query';
import MyBioData from "@/components/SettingsComponents/MyBioData/MyBioData";
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
            <MyBioData staffData={staffData}/>
        )
    }
    return (
        <>
            
            <MyBioData staffData={staffData}/>
        </>
    )
}

export default PersonalData;
