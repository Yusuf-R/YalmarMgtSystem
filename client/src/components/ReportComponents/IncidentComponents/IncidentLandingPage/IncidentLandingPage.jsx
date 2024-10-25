import React, {useEffect, useState} from 'react';
import {useRouter, usePathname} from 'next/navigation';
import Link from 'next/link';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useMediaQuery from "@mui/material/useMediaQuery";

function IncidentLandingPage({allIncidentReport}) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/incident');
    const pathname = usePathname();

    // Media Queries for responsiveness
    const isXSmall = useMediaQuery('(max-width:599.99px)');
    const isSmall = useMediaQuery('(min-width:600px) and (max-width:899.99px)');
    const isMedium = useMediaQuery('(min-width:900px) and (max-width:1199.99px)');
    const isLarge = useMediaQuery('(min-width:1200px)');

    useEffect(() => {
        if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/reports/incident/new');
        } else if (pathname.includes('staff')) {
            setActiveTab('/dashboard/admin/reports/incident/staff');
        } else if (pathname.includes('site')) {
            setActiveTab('/dashboard/admin/reports/incident/site');
        } else if (pathname.includes('service')) {
            setActiveTab('/dashboard/admin/reports/incident/service');
        } else if (pathname.includes('fuel')) {
            setActiveTab('/dashboard/admin/reports/incident/fuel');
        } else if (pathname.includes('others')) {
            setActiveTab('/dashboard/admin/reports/incident/others');
        } else if (pathname.includes('incident')) {
            setActiveTab('/dashboard/admin/reports/incident');
        } else {
            setActiveTab('/dashboard/admin/reports');
        }
    }, [pathname]);

    const headerItems = [
        {title: 'Staff-Incident', src: '/staff-incident.svg', route: '/dashboard/admin/reports/incident/staff'},
        {title: 'Site-Incident', src: '/site-incident.svg', route: '/dashboard/admin/reports/incident/site'},
        {title: 'Service-Incident', src: '/service-incident.svg', route: '/dashboard/admin/reports/incident/service'},
        {title: 'Fuel-Incident', src: '/fuel-incident.jpg', route: '/dashboard/admin/reports/incident/fuel'},
        {title: 'Others-Incident', src: '/others-incident.svg', route: '/dashboard/admin/reports/incident/others'},
    ];

    return (
        <Box sx={{padding: {xs: '10px', sm: '15px', md: '20px'}, marginTop: '10px'}}>
            <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                variant={isXSmall ? "scrollable" : "standard"}
                scrollButtons="auto"
                sx={{
                    '& .MuiTabs-indicator': {backgroundColor: '#46F0F9'},
                    marginBottom: 3
                }}
            >
                <Tab
                    label="Report-Central"
                    component={Link}
                    href="/dashboard/admin/reports"
                    value="/dashboard/admin/reports"
                    sx={{
                        color: "#FFF",
                        fontWeight: 'bold',
                        fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                        "&.Mui-selected": {color: "#46F0F9"},
                    }}
                />
                {['Incident-Center', 'Staff', 'Site', 'Service', 'Fuel', 'Others'].map((label) => (
                    <Tab
                        key={label}
                        label={label}
                        component={Link}
                        href={`/dashboard/admin/reports/incident${label === 'Incident-Center' ? '' : `/${label.toLowerCase()}`}`}
                        value={`/dashboard/admin/reports/incident${label === 'Incident-Center' ? '' : `/${label.toLowerCase()}`}`}
                        sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                            "&.Mui-selected": {color: "#46F0F9"},
                        }}
                    />
                ))}
                <Tab
                    label="New +"
                    component={Link}
                    href="/dashboard/admin/reports/incident/new"
                    value="/dashboard/admin/reports/incident/new"
                    sx={{
                        color: "#FFF",
                        fontWeight: 'bold',
                        fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                        ":hover": {backgroundColor: 'rgb(51, 153, 51)'},
                        backgroundColor: '#ff4d4d',
                        borderRadius: 10,
                        p: 0,
                    }}
                />
            </Tabs>

            <Grid container spacing={3} justifyContent="flex-start">
                {headerItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Box
                            onClick={() => router.push(item.route)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer',
                                '&:hover': {
                                    '& .MuiTypography-root': {
                                        backgroundColor: 'green',
                                        color: '#FFF',
                                    }
                                }
                            }}
                        >
                            <Avatar
                                alt={item.title}
                                src={item.src}
                                sx={{
                                    width: {xs: '120px', sm: '150px', md: '180px', lg: '200px'},
                                    height: {xs: '120px', sm: '150px', md: '180px', lg: '200px'},
                                    marginBottom: {xs: '10px', sm: '15px', md: '20px'},
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#FFF',
                                    fontSize: {xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem'},
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    transition: 'background-color 0.3s, color 0.3s',
                                }}
                            >
                                {item.title}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default IncidentLandingPage;