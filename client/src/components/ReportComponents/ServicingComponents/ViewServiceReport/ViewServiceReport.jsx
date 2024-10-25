'use client';
import Box from "@mui/material/Box";
import {mainSection} from "@/utils/data";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import useServiceReportStore from "@/store/useServiceReportStore";
import ServicingReportRecord
    from "@/components/ReportComponents/ServicingComponents/ServicingReportRecord/ServicingReportRecord";
import IconButton from "@mui/material/IconButton";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import {usePathname} from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";

function ViewServiceReport() {
    const selectedReport = useServiceReportStore((state) => state.selectedReport);
    const clearReportData = useServiceReportStore((state) => state.clearSelectedReport);
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/servicing/view');

    // Media Queries for responsiveness
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');

    // const isSmallScreen = xSmall || small || medium || large;

    const isSmallScreen = useMediaQuery('(max-width:899px)');

    useEffect(() => {
        // Clear the store after retrieving the data
        return () => {
            clearReportData();
        };
    }, [clearReportData]);

    const pathname = usePathname();

    // useEffect or handling navigation between new and staff
    useEffect(() => {
        if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/reports/servicing/new');
        } else if (pathname.includes('all')) {
            setActiveTab('/dashboard/admin/reports/servicing/all');
        } else if (pathname.includes('search')) {
            setActiveTab('/dashboard/admin/reports/servicing/search');
        } else if (pathname.includes('view')) {
            setActiveTab('/dashboard/admin/reports/servicing/view');
        } else {
            setActiveTab('/dashboard/admin/reports');
        }
    }, [pathname]);

    const goPrev = () => {
        window.history.back();
    }
    if (!selectedReport) {
        return (
            <>
                <Box sx={{
                    padding: isSmallScreen ? '10px' : '20px',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <Stack direction='row' spacing={2} sx={{
                        justifyContent: 'flex-start',
                        width: '100%',
                        overflowX: 'auto',
                    }}>
                        <Tabs
                            value={activeTab}
                            onChange={(e, newValue) => setActiveTab(newValue)}
                            variant={isSmallScreen ? "scrollable" : "standard"}
                            scrollButtons="auto"
                            sx={{
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#46F0F9',
                                },
                            }}
                        >
                            {['Reports', 'All', 'New', 'Search', 'View'].map((label) => (
                                <Tab
                                    key={label}
                                    label={label}
                                    component={Link}
                                    href={`/dashboard/admin/reports${label === 'Reports' ? '' : '/servicing/' + label.toLowerCase()}`}
                                    value={`/dashboard/admin/reports${label === 'Reports' ? '' : '/servicing/' + label.toLowerCase()}`}
                                    sx={{
                                        color: "#FFF",
                                        fontWeight: 'bold',
                                        fontSize: isSmallScreen ? '0.8rem' : '1rem',
                                        "&.Mui-selected": {
                                            color: "#46F0F9",
                                        },
                                    }}
                                />
                            ))}
                        </Tabs>
                    </Stack>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '20px',
                        width: '100%',
                    }}>
                        <Typography variant="h6"
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                        borderRadius: 5,
                                        padding: '10px 15px',
                                        bgcolor: '#0059b3',
                                        color: '#FFF',
                                        width: 'auto',
                                        maxWidth: '90%',
                                        textAlign: 'center',
                                        fontSize: isSmallScreen ? '0.9rem' : '1.1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                            No Record found
                            <IconButton onClick={goPrev} sx={{ml: 1}}>
                                <ArrowBackSharpIcon sx={{color: 'lime', fontSize: isSmallScreen ? 16 : 20}}/>
                            </IconButton>
                        </Typography>
                    </Box>
                </Box>
            </>
        )
    }
    return (
        <>
            <Box>
                {/*Navigation Tabs */}
                <Stack direction='row' spacing={2} sx={{
                    justifyContent: 'flex-start',
                }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        centered
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#46F0F9',
                            },
                        }}
                    >

                        <Tab
                            label="Reports"
                            component={Link}
                            href="/dashboard/admin/reports"
                            value="/dashboard/admin/reports"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="All"
                            component={Link}
                            href="/dashboard/admin/reports/servicing/all"
                            value="/dashboard/admin/reports/servicing/all"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />

                        <Tab
                            label="New"
                            component={Link}
                            href="/dashboard/admin/reports/servicing/new"
                            value="/dashboard/admin/reports/servicing/new"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Search"
                            component={Link}
                            href="/dashboard/admin/reports/servicing/search"
                            value="/dashboard/admin/reports/servicing/search"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="View"
                            component={Link}
                            href="/dashboard/admin/reports/servicing/view"
                            value="/dashboard/admin/reports/servicing/view"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                    </Tabs>
                </Stack>
                <br/>
                <ServicingReportRecord data={selectedReport}/>
            </Box>
        </>
    )
}

export default ViewServiceReport