'use client';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import {usePathname, useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function FuellingReportLandingPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports');
    const pathname = usePathname();

    // Media query for responsive design
    const isSmallScreen = useMediaQuery('(max-width:899px)');

    useEffect(() => {
        if (pathname.includes('servicing')) {
            setActiveTab('/dashboard/admin/reports/servicing');
        } else if (pathname.includes('fuel')) {
            setActiveTab('/dashboard/admin/reports/fuel');
        } else if (pathname.includes('incident')) {
            setActiveTab('/dashboard/admin/reports/incident');
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
                <Stack direction='row' spacing={2} sx={{justifyContent: 'flex-start', overflowX: 'auto'}}>
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
                        {['Report-Central', 'Servicing', 'Fuelling', 'Incident'].map((label, index) => {
                            let route = label.toLowerCase();
                            if (label === 'Fuelling') {
                                route = 'fuel';
                            } // Modify the route for Fuelling

                            return (
                                <Tab
                                    key={index}
                                    label={label}
                                    value={`/dashboard/admin/reports${index === 0 ? '' : '/' + route}`}
                                    component={Link}
                                    href={`/dashboard/admin/reports${index === 0 ? '' : '/' + route}`}
                                    sx={{
                                        color: "#FFF",
                                        fontWeight: 'bold',
                                        fontSize: isSmallScreen ? '0.6rem' : '0.9rem',
                                        "&.Mui-selected": {color: "#46F0F9"},
                                    }}
                                />
                            );
                        })}

                    </Tabs>
                </Stack>
                <Box sx={{
                    display: 'flex',
                    justifyContent: isSmallScreen ? 'center' : 'flex-start',
                    alignItems: 'center',
                    marginTop: '20px',
                }}>
                    <Stack
                        direction='column'
                        spacing={2}
                        alignItems={isSmallScreen ? 'center' : 'flex-start'}
                        sx={{
                            padding: 3,
                            borderRadius: '10px',
                        }}
                    >
                        <Avatar
                            src={'/Fuelling-main.svg'}
                            alt={'Fuelling'}
                            sx={{
                                width: isSmallScreen ? '150px' : '250px',
                                height: isSmallScreen ? '150px' : '250px',
                                cursor: 'pointer',
                            }}
                            onClick={() => router.push('/dashboard/admin/reports/fuel/all')}
                        />
                        <Typography
                            variant='h6'
                            sx={{
                                fontFamily: 'Poppins',
                                fontWeight: 'bold',
                                borderRadius: 5,
                                padding: '5px 10px',
                                bgcolor: '#0059b3',
                                color: '#FFF',
                                width: isSmallScreen ? '80%' : '250px',
                                textAlign: 'center',
                                fontSize: isSmallScreen ? '0.8rem' : '1rem',
                                cursor: 'pointer',
                            }}
                            onClick={() => router.push('/dashboard/admin/reports/fuel/all')}
                        >
                            Fuel Reports
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default FuellingReportLandingPage;