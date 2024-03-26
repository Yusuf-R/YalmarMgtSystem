import styleTopNav from './DashboardTopNav.module.css';
import Image from "next/image";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function DashboardTopNav() {
    return (
        <>
            <Box className={styleTopNav.parent}>
                <Box className={styleTopNav.LHS}>
                    <Box>
                            <Image
                                src="/YMS.png"
                                alt="YALMAR Logo"
                                width={50}
                                height={50}
                            />
                        </Box>
                    <Box>
                        <Typography>
                            YALMAR <br/>Management System
                        </Typography>
                    </Box>
                </Box>
                <Box className={styleTopNav.RHS}>
                    <Box>
                        Moon/Sun
                    </Box>
                    <Box>
                        SettingsIcon
                    </Box>
                    <Box>
                        Logout
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default DashboardTopNav