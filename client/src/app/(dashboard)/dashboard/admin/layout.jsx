'use client';
import React, {useState, useMemo, useEffect} from 'react';
import Box from "@mui/material/Box";
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
import useBioDataStore from "@/store/useBioDataStore";

function AdminLayout({children}) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const setEncryptedStaffData = useBioDataStore((state) => state.setEncryptedStaffData);
    const {staffData: cachedStaffData} = queryClient.getQueryData(['BioData']) || {};

    // States
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [themeMode, setThemeMode] = useState('light');

    // Query
    const {data, isLoading, isError} = useQuery({
        queryKey: ['BioData'],
        queryFn: AdminUtils.Profile,
        staleTime: Infinity,
        enabled: !cachedStaffData,
    });

    // Determine effective staff data
    const effectiveStaffData = cachedStaffData || (data?.staffData ?? null);

    // Encryption effect
    useEffect(() => {
        const encryptAndStore = async () => {
            if (effectiveStaffData) {
                try {
                    const encryptedStaffID = await AdminUtils.encryptObjID(effectiveStaffData._id);
                    const encryptedStaffData = await AdminUtils.encryptData(effectiveStaffData);
                    setEncryptedStaffData(encryptedStaffData, encryptedStaffID);
                } catch (error) {
                    console.error("Encryption Error:", error);
                    // Consider handling this error appropriately
                }
            }
        };

        encryptAndStore();
    }, [effectiveStaffData, setEncryptedStaffData]);

    // Theme selection
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

    // Media queries
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');

    // Calculate sidebar width
    const sideNavWidth = isCollapsed ? '45px' : '170px';

    // Handle loading and error states
    if (isLoading) {
        return <LazyLoading/>;
    }
    if (isError || (!data && !cachedStaffData)) {
        router.push('/error/404');
        return null;
    }

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
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}>
                <AdminTopNav
                    staffData={effectiveStaffData}
                    themeMode={themeMode}
                    setThemeMode={setThemeMode}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />

                <AdminSideNav
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        marginLeft: sideNavWidth,
                        transition: 'margin-left 0.3s ease',
                        paddingLeft: '5px',
                        paddingRight: '5px',
                        overflow: 'hidden',
                        position: 'relative',
                        top: 70,
                        zIndex: 1,
                        background: 'linear-gradient(to right, #141e30, #243b55)',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
                        minHeight: 'calc(100vh - 75px)',
                        maxHeight: 'calc(100vh - 75px)',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        width: 'calc(100% - 5px)',
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