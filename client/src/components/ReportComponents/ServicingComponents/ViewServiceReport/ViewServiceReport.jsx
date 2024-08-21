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

function ViewServiceReport() {
    const selectedReport = useServiceReportStore((state) => state.selectedReport);
    const clearReportData = useServiceReportStore((state) => state.clearSelectedReport);
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/servicing/view');
    
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
                <Box sx={mainSection}>
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
                    <Typography variant='h6'
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    ml: 60,
                                    mt: 5,
                                    p: 2,
                                    border: '1px solid rgb(255, 153, 153)',
                                    borderRadius: 10,
                                    width: '30%',
                                    textAlign: 'center',
                                }}>
                        Oops!!! No Service Report found. <IconButton><ArrowBackSharpIcon
                        sx={{color: 'lime', fontSize: 30}} onClick={goPrev}/></IconButton>
                    </Typography>
                </Box>
            </>
        )
    }
    return (
        <>
            <Box sx={mainSection}>
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