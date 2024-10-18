'use client';
import React, {useState, useMemo} from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {useRouter} from "next/navigation";
import useMediaQuery from '@mui/material/useMediaQuery';
import AdminTopNav from "@/components/AdminLandingPageComponents/AdminTopNav/AdminTopNav";
import AdminSideNav from "@/components/AdminLandingPageComponents/AdminSideNav/AdminSideNav";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {light, dark, dracula} from '@/components/Themes/adminThemes';

function AdminLayout({children}) {
    const router = useRouter();
    // check the cache key 'Biodata', if it exists then extract staff data
    // if it doesn't exist, then redirect to 404 page
    const queryClient = useQueryClient(); // Accessing the shared QueryClient instance
    const {staffData} = queryClient.getQueryData(['BioData']) || {};

    const {data, isLoading, isError} = useQuery({
        queryKey: ['BioData'],
        queryFn: AdminUtils.Profile,
        staleTime: Infinity,
        enabled: !staffData,
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

    // Sidebar width calculation based on collapsed state
    const sideNavWidth = isCollapsed ? '45px' : '170px';  // Adjust width for different breakpoints

    if (isLoading) {
        return <LazyLoading/>;
    }
    if (isError || !data) {
        return router.push('/error/404');
    }
    const effectiveStaffData = staffData || data.staffData;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundImage: `url('/bg-10.svg')`,
                backgroundSize: xSmall || small ? 'cover' : 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Transparent overlay
            }}>
                {/* Top Navigation Bar */}
                <AdminTopNav
                    staffData={effectiveStaffData}
                    themeMode={themeMode}
                    setThemeMode={setThemeMode}  // Pass the theme setter to TopNav
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />

                {/* Side Navigation */}
                <AdminSideNav
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        marginLeft: isCollapsed ? `${sideNavWidth}` : `${sideNavWidth}`,  // Adjust main content margin based on collapsed state
                        transition: 'margin-left 0.3s ease',  // Smooth transition for expanding/collapsing
                        paddingLeft: '5px',
                        paddingRight: '5px',
                        overflow: 'hidden',  // Ensure no overflow happens
                        position: 'relative',  // Use relative positioning to respect layout boundaries
                        top: 70,
                        zIndex: 1,
                        background: 'linear-gradient(to bottom, #360033, #0b8793)',
                        // background: 'linear-gradient(90deg, rgba(25,44,41,1) 12%, rgba(42,69,151,1) 30%, rgba(69,60,105,1) 77%, rgba(36,33,73,1) 92%, rgba(30,59,126,1) 100%)',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',  // Add box shadow
                        minHeight: 'calc(100vh - 75px)',  // Ensure content takes full height minus TopNav height
                        maxHeight: 'calc(100vh - 75px)',  // Ensure the main content is within the viewable area
                        overflowY: 'auto',  // Only allow vertical scrolling when necessary
                        overflowX: 'hidden',  // Disable horizontal scrolling
                        width: 'calc(100% - 5px)',  // Ensure width does not overflow container
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default AdminLayout;
