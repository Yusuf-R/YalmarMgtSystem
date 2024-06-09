'use client';
import ProfilePicture from '@/components/SettingsComponents/ProfilePicture/ProfilePicture';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import AdminUtils from "@/utils/AdminUtilities";
import {router} from "next/client";

function PictureUpload() {
    const queryClient = useQueryClient(); // Accessing the shared QueryClient instance
    const {staffData} = queryClient.getQueryData(['BioData']);
    if (!staffData) {
        const {data, isLoading, isError} = useQuery({
            queryKey: ['BioData'],
            queryFn: AdminUtils.Profile,
            staleTime: Infinity,
        });
        if (isLoading) {
            return <CircularProgress/>;
        }
        if (isError || !data) {
            // Ideally, handle this more gracefully
            console.error('Error fetching user data');
            // route the user to error page
            return router.push('/error/404');
        }
        const {staffData} = data;
        return (
            <ProfilePicture staffData={staffData}/>
        )
    }
    return (
        <>
            <ProfilePicture staffData={staffData}/>
        </>
    )
}

export default PictureUpload