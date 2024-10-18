'use client';
import AdminDashboard from '@/components/AdminLandingPageComponents/AdminDashboard/AdminDashboard';
import {useQuery} from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import {useRouter} from 'next/navigation';
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";


function Admin() {
    const router = useRouter();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['DashboardData'],
        queryFn: AdminUtils.DashboardData,
    });

    if (isLoading) {
        return <LazyLoading/>;
    }

    if (isError || !data) {
        // Handle error state, possibly navigating to an error page or showing an error message
        console.error('Failed to fetch or no data available');
        router.push('/error/404');
    }

    const {
        allStaffData,
        allSiteData,
        allServicesData,
        allIncidentData,
        staffCount,
        siteCount,
    } = data.dashboardData;

    return (
        <AdminDashboard
            allStaffData={allStaffData}
            allSiteData={allSiteData}
            allServicesData={allServicesData}
            allIncidentData={allIncidentData}
            staffCount={staffCount}
            siteCount={siteCount}
        />
    );
}


export default Admin;
