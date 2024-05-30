'use client';
import Box from "@mui/material/Box";
import {useQuery, useQueryClient} from '@tanstack/react-query';
import AdminBioData from "@/components/AdminBioData/AdminBioData";
import AdminUtils from "@/utils/AdminUtilities";


function BioData() {
    const queryClient = useQueryClient();
    const {staffData} = queryClient.getQueryData(['BioData']);
    if (!staffData) {
        const {data, isLoading, isError} = useQuery({
            queryKey: ['AdminBioData'],
            queryFn: AdminUtils.Profile,
            staleTime: Infinity,
        });
        const {staffData} = data;
        return (
            <AdminBioData staffData={staffData}/>
        )
    }
    return (
        <>
            
            <AdminBioData staffData={staffData}/>
        </>
    )
}

export default BioData;
