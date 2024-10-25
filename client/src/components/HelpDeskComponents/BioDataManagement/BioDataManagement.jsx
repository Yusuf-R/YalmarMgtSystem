'use client'

import useMediaQuery from "@mui/material/useMediaQuery";
import {usePathname, useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


function BioDataManagement() {
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

    const isXSmall = useMediaQuery('(max-width:599.99px)');

    const pathname = usePathname();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/helpdesk/biodata-center');

    const isSmallScreen = xSmall || small || medium;
    const isMediumScreen = large || xLarge;
    const isLargeScreen = xxLarge || wide || xWide || ultraWide;

    // useEffect or handling navigation between view and edits
    useEffect(() => {
        if (pathname.includes('biodata-center')) {
            setActiveTab('/dashboard/admin/helpdesk/biodata-center');
        } else if (pathname.includes('leave-request-center')) {
            setActiveTab('/dashboard/admin/helpdesk/leave-request-center');
        } else {
            setActiveTab('/dashboard/admin/helpdesk');
        }
    }, [pathname]);

    return (
        <>
            <Box sx={{
                padding: xSmall || small ? '5px' : medium || large ? '10px' : '20px',
                marginTop: '10px',
            }}>
                <Stack direction='row' spacing={2} sx={{
                    justifyContent: 'flex-start',
                }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        variant={isXSmall ? "scrollable" : "standard"}
                        centered={!isXSmall}
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#46F0F9',
                            },
                        }}>
                        <Tab
                            label="Helpdesk"
                            value="/dashboard/admin/helpdesk" // Set the value prop for this Tab
                            component={Link}
                            href="/dashboard/admin/helpdesk"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="BioData"
                            value="/dashboard/admin/helpdesk/biodata-center" // Set the value prop for this Tab
                            component={Link}
                            href="/dashboard/admin/helpdesk/biodata-center"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Leave-Request"
                            value="/dashboard/admin/helpdesk/leave-request-center" // Set the value prop for this Tab
                            component={Link}
                            href="/dashboard/admin/helpdesk/leave-request-center"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                    </Tabs>
                </Stack>
                <br/>

                <Box>
                    <Typography variant='h5'
                                sx={{
                                    color: "#FFF",
                                    fontWeight: 'bold',
                                    fontSize: xSmall || small || medium || large ? '1.0rem' : '1.1rem',
                                }}
                    >
                        BioData Management under construction
                    </Typography>
                </Box>
            </Box>

        </>
    )
}

export default BioDataManagement;