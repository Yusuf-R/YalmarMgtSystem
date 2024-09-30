'use client';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DashboardTopNav from "@/components/AdminLandingPageComponents/DashboardTopNav/DashboardTopNav";
import {useQuery} from '@tanstack/react-query';
import AdminSideNav from "@/components/AdminLandingPageComponents/AdminSideNav/AdminSideNav";
import {useRouter} from "next/navigation";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {useState} from "react";

function AdminLayout({children}) {
    const router = useRouter();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['BioData'],
        queryFn: AdminUtils.Profile,
        staleTime: Infinity,
    });
    const [isCollapsed, setIsCollapsed] = useState(false); // State for collapsing the sidebar

    if (isLoading) {
        return <LazyLoading/>;
    }
    if (isError || !data) {
        return router.push('/error/404');
    }
    const {staffData} = data;

    return (
        <Box sx={{position: 'relative', minHeight: '100vh'}}>
            {/* Top Navigation Bar */}
            <DashboardTopNav staffData={staffData}/>

            {/* Main Content with Sidebar */}
            <Stack direction="row" spacing={2} mt={3} sx={{border: '3px solid gold'}}>
                {/* Sidebar with updated position and z-index */}
                <Box sx={{zIndex: 1}}>
                    <AdminSideNav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
                </Box>

                {/* Main Content */}
                <Box sx={{flex: 1, paddingLeft: '20px'}}>
                    {children}
                </Box>
            </Stack>
        </Box>
    );
}

export default AdminLayout;
