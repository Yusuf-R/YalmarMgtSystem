'use client';
import Box from "@mui/material/Box";
import {mainSection} from "@/utils/data";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import {usePathname} from "next/navigation";

function AllOtherIncident() {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/incident/others');
    
    // useEffect or handling navigation between new and staff
    useEffect(() => {
        if (pathname.includes('others')) {
            setActiveTab('/dashboard/admin/reports/incident/others');
        } else {
            setActiveTab('/dashboard/admin/reports/incident');
        }
    }, [pathname]);
    return (
        <>
            <Box sx={mainSection}>
                <Paper elevation={5} sx={{
                    alignCenter: 'center',
                    textAlign: 'center',
                    padding: '10px',
                    backgroundColor: '#274e61',
                    color: '#46F0F9',
                    borderRadius: '10px',
                    width: '100%',
                    height: 'auto',
                }}>
                    <Typography variant='h5' sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                        All Others Incident Report Form
                    </Typography>
                </Paper>
                <br/>
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
                            label="Home"
                            component={Link}
                            href="/dashboard/admin/reports/incident"
                            value="/dashboard/admin/reports/incident"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Others"
                            component={Link}
                            href="/dashboard/admin/reports/incident/others"
                            value="/dashboard/admin/reports/incident/others"
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
            </Box>
        </>
    )
}

export default AllOtherIncident;