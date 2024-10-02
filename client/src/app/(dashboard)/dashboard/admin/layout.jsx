'use client';
import React, {useState, useMemo} from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {useQuery} from '@tanstack/react-query';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {useRouter} from "next/navigation";
import useMediaQuery from '@mui/material/useMediaQuery';
import AdminTopNav from "@/components/AdminLandingPageComponents/AdminTopNav/AdminTopNav";
import AdminSideNav from "@/components/AdminLandingPageComponents/AdminSideNav/AdminSideNav";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {light, dark, dracula} from '@/components/Themes/adminThemes';

// const {light, dark, dracula} = require('@/components/Themes/adminThemes');

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
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isTab = useMediaQuery("(min-width:900px) and (max-width:999px)");
    const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLargestScreen = useMediaQuery(theme.breakpoints.up("lg"));

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
                    backgroundSize: isSmallScreen
                        ? 'cover'
                        : isMediumScreen
                            ? 'contain'
                            : isTablet
                                ? '100% 80%'
                                : '100% 100%',
                    backgroundPosition: isSmallScreen || isMediumScreen
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
                    isSmallScreen={isSmallScreen}
                />

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        padding: 3,
                        marginLeft: () => {
                            if (isSmallScreen) {
                                return '0px'; // On small screens, the side nav may be hidden, so no margin
                            } else if (isCollapsed) {
                                return isTab ? '60px' : isTablet ? '80px' : '100px'; // Adjust for collapsed side nav based on screen size
                            } else {
                                return isTab ? '180px' : isTablet ? '200px' : '240px'; // Full size side nav based on screen size
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
