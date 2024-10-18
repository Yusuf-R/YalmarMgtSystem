'use client';
import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {mainSection} from "@/utils/data";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import {usePathname, useRouter} from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";


function StaffLandingPage() {
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

    // state components
    const pathname = usePathname();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/staff');
    // useEffect or handling navigation between view and edits
    useEffect(() => {
        if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/staff/new');
        } else if (pathname.includes('all')) {
            setActiveTab('/dashboard/admin/staff/all');
        } else {
            setActiveTab('/dashboard/admin/staff');
        }
    }, [pathname]);
    return (
        <>
            <Box sx={{
                padding: xSmall || small ? '5px' : medium || large ? '10px' : '20px',
                marginTop: '10px',
            }}>
                {/* Navigation Tabs */}
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
                        }}>
                        <Tab
                            label="Staff"
                            value="/dashboard/admin/staff" // Set the value prop for this Tab
                            component={Link}
                            href="/dashboard/admin/staff"
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
                            label="All"
                            value="/dashboard/admin/staff/all" // Set the value prop for this Tab
                            component={Link}
                            href="/dashboard/admin/staff/all"
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
                            label="New +"
                            value="/dashboard/admin/staff/new" // Set the value prop for this Tab
                            component={Link}
                            href="/dashboard/admin/staff/new"
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
                {/* Main Section */}
                <Stack direction='row' spacing={xSmall || small || medium || large ? 5 : 25} alignItems='center'
                       justifyContent='flex-start'>
                    <Stack direction='column' spacing={2} alignItems='center' justifyContent='flex-start'>
                        <Avatar
                            alt="New Staff"
                            src="/NewStaff.svg"
                            sx={{
                                width: xSmall || small || medium || large ? '70px' : '250px',
                                height: xSmall || small || medium || large ? '70px' : '250px',
                                marginBottom: '20px',
                                cursor: 'pointer',
                                // borderRadius: 0,
                            }}
                            onClick={() => router.push('/dashboard/admin/staff/all')}
                        />
                        <Button
                            onClick={() => router.push('/dashboard/admin/staff/all')}
                            variant="contained"
                            color="primary"
                            size="extraSmall"
                            sx={{
                                marginTop: '10px',
                                cursor: 'pointer',
                                color: '#FFF',
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '1.1rem',
                                "&:hover": {
                                    background: 'linear-gradient(to right, #093028 0%, #237A57  51%, #093028  100%)',
                                    color: '#FFF',
                                },
                                background: 'linear-gradient(to right, #780206 0%, #061161  51%, #780206  100%)',
                            }}
                        >
                            All
                        </Button>
                    </Stack>
                    <Stack direction='column' spacing={2} alignItems='center' justifyContent='flex-start'>
                        <Avatar
                            alt="New Staff"
                            src="/New+.svg"
                            sx={{
                                width: xSmall || small || medium || large ? '70px' : '250px',
                                height: xSmall || small || medium || large ? '70px' : '250px',
                                marginBottom: '20px',
                                cursor: 'pointer',
                                // borderRadius: 0,
                            }}
                            onClick={() => router.push('/dashboard/admin/staff/new')}
                        />
                        <Button
                            onClick={() => router.push('/dashboard/admin/staff/new')}
                            variant="contained"
                            color="primary"
                            size="extraSmall"
                            sx={{
                                marginTop: '10px',
                                cursor: 'pointer',
                                color: '#FFF',
                                fontWeight: 'bold',
                                minWidth: 0,
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '1.2rem',
                                "&:hover": {
                                    background: 'linear-gradient(to right, #093028 0%, #237A57  51%, #093028  100%)',
                                    color: '#FFF',
                                },
                                background: 'linear-gradient(to right, #780206 0%, #061161  51%, #780206  100%)',

                            }}
                        >
                            New +
                        </Button>
                    </Stack>

                </Stack>

            </Box>
        </>
    );
}

export default StaffLandingPage;