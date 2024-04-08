import AdminHeroSection from "@/components/AdminHeroSection/AdminHeroSection";
import Box from "@mui/material/Box";
import styleAdmin from '@/components/AdminDashboard/AdminDashboard.module.css';
import Staff from "@/components/Staff/Staff";

function AdminDashboard({userData, accessToken}) {
    return (
        <>
            <Box className={styleAdmin.mainNav}>
                <AdminHeroSection userData={userData} accessToken={accessToken}/>
                <Staff/>
            </Box>
        </>
    )
}

export default AdminDashboard;
