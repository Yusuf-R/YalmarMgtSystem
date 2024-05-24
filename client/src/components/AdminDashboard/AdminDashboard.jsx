import AdminHeroSection from "@/components/AdminHeroSection/AdminHeroSection";
import Box from "@mui/material/Box";
import styleAdmin from '@/components/AdminDashboard/AdminDashboard.module.css';

function AdminDashboard({staffData, accessToken}) {
    return (
        <>
            <Box className={styleAdmin.mainNav}>
                <AdminHeroSection staffData={staffData} accessToken={accessToken}/>
            </Box>
        </>
    )
}

export default AdminDashboard;
