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



function ServicingReport({allServicingReport, allSite}) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/servicing/all');
    const createNew = () => router.push('/dashboard/admin/reports/servicing/new');
    const searchRecord = () => router.push('/dashboard/admin/reports/servicing/search');
    const currMonth = new Date().toLocaleString('default', {month: 'long'});
    const currYear = new Date().getFullYear();
    const pathname = usePathname();
    
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
                    <Typography variant='h5'>All Territorial Servicing Reports</Typography>
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
                    <Paper elevation={5} sx={{
                        alignContent: 'start',
                        padding: '10px',
                        backgroundColor: 'inherit',
                        color: '#46F0F9',
                        borderRadius: '10px',
                        width: '100%',
                        height: 'auto',
                    }}>
                        {/* First Row (1 fields) prefix */}
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant='h6'
                                            sx={{
                                                fontFamily: 'Poppins',
                                                fontWeight: 'bold',
                                                color: '#FFF'
                                            }}
                                > Servicing Record for the month: {currMonth} {currYear}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ReportRendering allServicingReport={allServicingReport}/>
                            </Grid>
                        </Grid>
                        <br/><br/>
                    </Paper>
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