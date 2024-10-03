'use client';
import React, {useState, useMemo} from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {useQuery} from '@tanstack/react-query';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {useRouter} from "next/navigation";
import AdminTopNav from "@/components/AdminLandingPageComponents/AdminTopNav/AdminTopNav";
import AdminSideNav from "@/components/AdminLandingPageComponents/AdminSideNav/AdminSideNav";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {light, dark, dracula} from '@/components/Themes/adminThemes';
import useMediaQuery from "@mui/material/useMediaQuery";

function AdminLayout({children}) {
    const router = useRouter();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['BioData'],
        queryFn: AdminUtils.Profile,
        staleTime: Infinity,
    });

    const [isCollapsed, setIsCollapsed] = useState(false);  // State for collapsing SideNav
    const [themeMode, setThemeMode] = useState('light');    // State for toggling theme

    // Memoized theme selection based on the current themeMode
    const theme = useMemo(() => {
        switch (themeMode) {
            case 'dark':
                return createTheme(dark);
            case 'dracula':
                return createTheme(dracula);
            default:
                return createTheme(light);
        }
    }, [themeMode]);

    // Capture responsive breakpoints
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');

    if (isLoading) {
        return <LazyLoading/>;
    }
    if (isError || !data) {
        return router.push('/error/404');
    }
    const {staffData} = data;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundImage: `url('/bg-10.svg')`,
                    backgroundSize: small
                        ? 'cover'
                        : medium
                            ? 'contain'
                            : large
                                ? '100% 80%'
                                : '100% 100%',
                    backgroundPosition: small || medium
                        ? 'top center'
                        : 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Transparent overlay
                }}>
                {/* Top Navigation Bar */}
                <AdminTopNav
                    staffData={staffData}
                    themeMode={themeMode}
                    setThemeMode={setThemeMode}  // Pass the theme setter to TopNav
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />

                {/* Side Navigation (collapsible) */}
                <AdminSideNav
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    small={small}
                />

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        padding: small ? 2 : 3,
                        marginLeft: () => {
                            if (small) {
                                return '0px'; // On small screens, side nav hidden
                            } else if (isCollapsed) {
                                return large ? '80px' : '100px'; // Adjust for collapsed side nav based on screen size
                            } else {
                                return large ? '180px' : '240px'; // Full size side nav based on screen size
                            }
                        },
                        transition: 'margin 0.3s',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default AdminLayout;
