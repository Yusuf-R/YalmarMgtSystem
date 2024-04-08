import styleAdmin from './AdminDashboard.module.css';
import Stack from "@mui/material/Stack";
import AdminHeroSection from "@/components/AdminHeroSection/AdminHeroSection";
import AdminSideNav from "@/components/AdminSideNav/AdminSideNav";
import DashboardTopNav from "@/components/DashboardTopNav/DashboardTopNav";

function AdminDashboard({userData, accessToken}) {
    return (
        <>
            <div className={styleAdmin.adminContainer}>
                <DashboardTopNav userData={userData} accessToken={accessToken}/>
                <Stack direction='row' spacing={2} mt={3}>
                    <div className={styleAdmin.sideNavContainer}>
                        <AdminSideNav/>
                    </div>
                    <div className={styleAdmin.mainViewContainer}>
                        <AdminHeroSection userData={userData} accessToken={accessToken}/>
                    </div>
                </Stack>
            </div>
        </>
    )
}

export default AdminDashboard;
