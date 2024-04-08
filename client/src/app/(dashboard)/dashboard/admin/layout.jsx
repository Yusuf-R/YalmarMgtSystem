'use client';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DashboardTopNav from "@/components/DashboardTopNav/DashboardTopNav";
import Cookies from "js-cookie";
import {useRouter} from 'next/navigation';
import AdminSideNav from "@/components/AdminSideNav/AdminSideNav";


function AdminLayout({children}) {
    const userData = JSON.parse(Cookies.get('userData') || null)
    const router = useRouter();
    if (!userData) {
        return router.push('/error/404')
    }
    return (
        <>
            <Box sx={{position: 'relative'}}>
                <DashboardTopNav userData={userData}/>
                <Stack direction='row' spacing={2} mt={3}>
                    <AdminSideNav/>
                    {children}
                </Stack>
            </Box>
        </>
    );
}

export default AdminLayout;