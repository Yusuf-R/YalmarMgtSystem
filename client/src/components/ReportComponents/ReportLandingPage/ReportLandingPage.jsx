'use client';
import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import {usePathname, useRouter} from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function ReportLandingPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports');

    // Media Queries for responsiveness
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px)');

    const isSmallScreen = xSmall || small || medium || large;

    const pathname = usePathname();

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

    const reportItems = [
        {title: 'Servicing', src: '/Servicing.jpg', route: '/dashboard/admin/reports/servicing'},
        {title: 'Fuelling', src: '/Fuel.svg', route: '/dashboard/admin/reports/fuel'},
        {title: 'Incident', src: '/Incident.svg', route: '/dashboard/admin/reports/incident'},
    ];

    return (
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
                    {['Home', 'Servicing', 'Fuelling', 'Incidents'].map((label, index) => (
                        <Tab
                            key={index}
                            label={label}
                            value={`/dashboard/admin/reports${index === 0 ? '' : '/' + label.toLowerCase()}`}
                            component={Link}
                            href={`/dashboard/admin/reports${index === 0 ? '' : '/' + label.toLowerCase()}`}
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: isSmallScreen ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {color: "#46F0F9"},
                            }}
                        />
                    ))}
                </Tabs>
            </Stack>

            <Stack
                direction={isSmallScreen ? 'column' : 'row'}
                spacing={isSmallScreen ? 2 : 4}
                sx={{
                    padding: 3,
                    borderRadius: '10px',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
            >
                {reportItems.map((item, index) => (
                    <Stack key={index} direction='column' spacing={1} alignItems='center'>
                        <Avatar
                            src={item.src}
                            alt={item.title}
                            sx={{
                                width: isSmallScreen ? '150px' : '250px',
                                height: isSmallScreen ? '150px' : '250px',
                                cursor: 'pointer',
                            }}
                            onClick={() => router.push(item.route)}
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
                                width: isSmallScreen ? '80%' : '50%',
                                textAlign: 'center',
                                fontSize: isSmallScreen ? '0.8rem' : '1rem',
                                cursor: 'pointer',
                            }}
                            onClick={() => router.push(item.route)}
                        >
                            {item.title}
                        </Typography>
                        <br/> <br/>
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
}

export default ReportLandingPage;