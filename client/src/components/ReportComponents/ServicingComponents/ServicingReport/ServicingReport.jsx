'use client';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {useRouter, usePathname} from "next/navigation";
import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {mainSection} from "@/utils/data";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ReportRendering from "@/components/ReportComponents/ServicingComponents/ServicingReport/ReportRendering";
import useMediaQuery from "@mui/material/useMediaQuery";


function ServicingReport({allServicingReport, allSite}) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/servicing/all');
    const createNew = () => router.push('/dashboard/admin/reports/servicing/new');
    const searchRecord = () => router.push('/dashboard/admin/reports/servicing/search');
    const currMonth = new Date().toLocaleString('default', {month: 'long'});
    const currYear = new Date().getFullYear();
    const pathname = usePathname();

    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');

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
                padding: xSmall || small ? '5px' : medium || large ? '10px' : '20px',
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
                <br/>
                <Box>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="body1"
                                        sx={{
                                            color: '#FFF',
                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                            fontWeight: 'bold',
                                        }}>
                                Servicing Record for the month: {currMonth} {currYear}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ReportRendering allServicingReport={allServicingReport}/>
                        </Grid>
                    </Grid>
                </Box>
                <br/><br/>
                {/*</Card>*/}
                <Stack direction='row' spacing={5}>
                    <Link href="/dashboard/admin/reports/servicing">
                        <Button variant="contained" color='success' title='Back'> Back </Button>
                    </Link>
                </Stack>
            </Box>
        </>
    )
}

export default ServicingReport;