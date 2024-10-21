'use client';
import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import {usePathname, useRouter} from "next/navigation";
import Avatar from "@mui/material/Avatar";

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

    const pathname = usePathname();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/staff');

    useEffect(() => {
        if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/staff/new');
        } else if (pathname.includes('all')) {
            setActiveTab('/dashboard/admin/staff/all');
        } else {
            setActiveTab('/dashboard/admin/staff');
        }
    }, [pathname]);

    const isSmallScreen = xSmall || small || medium;
    const headerItems = [
        {title: 'All Staff', src: '/NewStaff.svg', route: '/dashboard/admin/staff/all'},
        {title: 'New +', src: '/New+.svg', route: '/dashboard/admin/staff/new'},
    ];

    return (
        <>
            <Box sx={{
                padding: xSmall || small ? '5px' : medium || large ? '10px' : '20px',
                marginTop: '10px',
            }}>
                <Stack direction='row' spacing={2} sx={{justifyContent: 'flex-start'}}>
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
                            value="/dashboard/admin/staff"
                            component={Link}
                            href="/dashboard/admin/staff"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {color: "#46F0F9"},
                            }}
                        />
                        <Tab
                            label="All"
                            value="/dashboard/admin/staff/all"
                            component={Link}
                            href="/dashboard/admin/staff/all"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {color: "#46F0F9"},
                            }}
                        />
                        <Tab
                            label="New +"
                            value="/dashboard/admin/staff/new"
                            component={Link}
                            href="/dashboard/admin/staff/new"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {color: "#46F0F9"},
                            }}
                        />
                    </Tabs>
                </Stack>
                <br/>

                {/* Main Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'column' : 'row',
                        justifyContent: isSmallScreen ? 'center' : 'flex-start',
                        alignItems: 'center',
                        padding: isSmallScreen ? '10px' : '20px',
                        gap: isSmallScreen ? '20px' : '40px',
                    }}
                >
                    {headerItems.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                cursor: 'pointer',
                                width: isSmallScreen ? '100%' : 'auto',
                            }}
                            onClick={() => router.push(item.route)}
                        >
                            <Stack
                                direction="column"
                                spacing={{xs: 1, sm: 2, md: 3}}
                                alignItems="center"
                            >
                                <Avatar
                                    alt={item.title}
                                    src={item.src}
                                    sx={{
                                        width: isSmallScreen ? '150px' : '200px',
                                        height: isSmallScreen ? '150px' : '200px',
                                        marginBottom: isSmallScreen ? '10px' : '20px',
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#FFF',
                                        fontSize: isSmallScreen ? '1.0rem' : '1.2rem',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        "&:hover": {background: 'green', color: '#FFF'},
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </Stack>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
}

export default StaffLandingPage;
