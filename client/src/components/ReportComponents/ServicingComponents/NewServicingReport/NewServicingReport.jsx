'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {mainSection} from "@/utils/data"
import MultiStepForm from "@/components/ReportComponents/ServicingComponents/MulitStepForm/MultiStepForm";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {useRouter, usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";

function NewServicingReport({allStaff, allSite}) {
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/servicing/search');
    const router = useRouter();
    const pathname = usePathname();

    // Media Queries for responsiveness
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px)');

    const isSmallScreen = xSmall || small || medium || large;

    // useEffect or handling navigation between new and staff
    useEffect(() => {
        if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/reports/servicing/new');
        } else if (pathname.includes('all')) {
            setActiveTab('/dashboard/admin/reports/servicing/all');
        } else if (pathname.includes('search')) {
            setActiveTab('/dashboard/admin/reports/servicing/search');
        } else {
            setActiveTab('/dashboard/admin/reports');
        }
    }, [pathname]);
    return (
        <>
            <Box sx={{
                padding: isSmallScreen ? '10px' : '20px',
                marginTop: '10px',
            }}>
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
                    </Tabs>
                </Stack>
                <br/><br/>
                <MultiStepForm allSite={allSite} allStaff={allStaff}/>
            </Box>
        </>
    )
}

export default NewServicingReport;