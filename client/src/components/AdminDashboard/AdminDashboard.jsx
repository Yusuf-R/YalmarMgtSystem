import AdminHeroSection from "@/components/AdminHeroSection/AdminHeroSection";
import Box from "@mui/material/Box";
import styleAdmin from '@/components/AdminDashboard/AdminDashboard.module.css';

function AdminDashboard({userData, accessToken}) {
    return (
        <>
            <Box className={styleAdmin.mainNav}>
                <AdminHeroSection userData={userData} accessToken={accessToken}/>
            </Box>
        </>
    )
}

export default AdminDashboard;
