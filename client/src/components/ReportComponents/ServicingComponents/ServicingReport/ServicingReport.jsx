'use client';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {useRouter, usePathname} from "next/navigation";
import Link from "next/link";
import React, {useEffect, useMemo, useState} from "react";
import {mainSection} from "@/utils/data";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ReportRendering from "@/components/ReportComponents/ServicingComponents/ServicingReport/ReportRendering";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as XLSX from 'xlsx';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

function ServicingReport({allServicingReport, allSite}) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/servicing/all');
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedCluster, setSelectedCluster] = useState('all');
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

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const clusters = ['BIRNIN-GWARI', 'KADUNA-CENTRAL', 'ZARIA', 'KACHIA'];

// Generate years array with future years
    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const startYear = 2023; // Base year
        const futureYears = 0; // Number of future years to include

        // Calculate total years to include
        const totalYears = (currentYear - startYear) + futureYears + 1;

        return Array.from({length: totalYears}, (_, i) => {
            return currentYear + futureYears - i;
        }).sort((a, b) => b - a); // Sort in descending order
    }, []);

    const filterReports = (reports) => {
        return reports.filter(report => {
            const reportDate = new Date(report.servicingDate);
            const monthMatch = selectedMonth === 'all' || months[reportDate.getMonth()] === selectedMonth;
            const yearMatch = selectedYear === 'all' || reportDate.getFullYear().toString() === selectedYear;
            const clusterMatch = selectedCluster === 'all' || report.cluster === selectedCluster;
            return monthMatch && yearMatch && clusterMatch;
        });
    };

    const exportToExcel = () => {
        const filteredData = filterReports(allServicingReport);

        const workbookData = filteredData.map(report => ({

            // Site Information
            'Site ID': report.site_id || 'N/A',
            'Site Code': report.siteId || 'N/A',
            'State': report.state || 'N/A',
            'Cluster': report.cluster || 'N/A',
            'Location': report.location || 'N/A',
            'Site Gen Modes': report.siteGenModes || 'N/A',
            'Site Type': report.siteType || 'N/A',
            'Shelter Type': report.shelterType || 'N/A',
            'PM Instance': report.pmInstance || 'N/A',

            // Service Dates
            'Servicing Date': report.servicingDate ? new Date(report.servicingDate).toLocaleDateString() : 'N/A',
            'Next Service Date': report.nextServiceDate ? new Date(report.nextServiceDate).toLocaleDateString() : 'N/A',

            // Generator PM
            'Default Operation': report.generatorPM?.defaultOperation || 'N/A',
            // Gen1 Info
            'Gen1 Type': report.generatorPM?.gen1Type || 'N/A',
            'Gen1 Display': report.generatorPM?.gen1Display || 'N/A',
            'Gen1 Hr': report.generatorPM?.gen1Hr || 'N/A',
            'Gen1 Operating Voltage': report.generatorPM?.gen1OperatingVoltage || 'N/A',
            'Gen1 Operating Frequency': report.generatorPM?.gen1OperatingFrequency || 'N/A',
            'Gen1 Working Status': report.generatorPM?.gen1WorkingStatus || 'N/A',
            // Gen2 Info
            'Gen2 Type': report.generatorPM?.gen2Type || 'N/A',
            'Gen2 Display': report.generatorPM?.gen2Display || 'N/A',
            'Gen2 Hr': report.generatorPM?.gen2Hr || 'N/A',
            'Gen2 Operating Voltage': report.generatorPM?.gen2OperatingVoltage || 'N/A',
            'Gen2 Operating Frequency': report.generatorPM?.gen2OperatingFrequency || 'N/A',
            'Gen2 Working Status': report.generatorPM?.gen2WorkingStatus || 'N/A',

            // Aircon PM
            'AC Installed': report.airconPM?.acInstalled || 'N/A',
            'Number of AC Installed': report.airconPM?.noOfACInstalled || 'N/A',
            'AC1 Status': report.airconPM?.ac1Status || 'N/A',
            'AC2 Status': report.airconPM?.ac2Status || 'N/A',

            // Shelter PM
            'Shelter Cleaning Status': report.shelterPM?.shelterCleaningStatus || 'N/A',
            'Site Cleaning Status': report.shelterPM?.siteCleaningStatus || 'N/A',

            // Lightning PM
            'AWL': report.lightningPM?.awl || 'N/A',
            'Security Light Availability': report.lightningPM?.securityLightAvailability || 'N/A',
            'Security Light Status': report.lightningPM?.securityLightStatus || 'N/A',
            'Flood Light Availability': report.lightningPM?.floodLightAvailability || 'N/A',
            'Flood Light Status': report.lightningPM?.floodLightStatus || 'N/A',

            // DC System
            'Backup Batteries': report.dcSystem?.backUpBatteries || 'N/A',
            'Battery Count': report.dcSystem?.batteryCount || 'N/A',
            'Battery Status': report.dcSystem?.batteryStatus || 'N/A',
            'Rectifier Status': report.dcSystem?.rectifierStatus || 'N/A',

            // Other PM
            'Feeder Cable Status': report.otherPM?.feederCableStatus || 'N/A',
            'Change Over Switch Status': report.otherPM?.changeOverSwitchStatus || 'N/A',
            'Earthing Cable Status': report.otherPM?.earthingCableStatus || 'N/A',
            'Earthing Status': report.otherPM?.earthingStatus || 'N/A',
            'Fire Extinguisher Status': report.otherPM?.fireExtinguisherStatus || 'N/A',

            // Security PM
            'Security Status': report.securityPM?.securityStatus || 'N/A',
            'Site Access': report.securityPM?.siteAccess || 'N/A',

            // Summary and Images
            'Summary': report.summary || 'N/A',
            // 'Image URLs': report.images?.join(', ') || 'N/A',

            // Metadata
            'Created At': report.createdAt ? new Date(report.createdAt).toLocaleString() : 'N/A',
            'Updated At': report.updatedAt ? new Date(report.updatedAt).toLocaleString() : 'N/A'
        }));

        const ws = XLSX.utils.json_to_sheet(workbookData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Servicing Reports');

        // Generate filename based on filters
        const monthStr = selectedMonth === 'all' ? 'All-Months' : selectedMonth;
        const yearStr = selectedYear === 'all' ? 'All-Years' : selectedYear;
        const clusterStr = selectedCluster === 'all' ? 'All-Clusters' : selectedCluster;
        const filename = `Servicing-Report-${monthStr}-${yearStr}-${clusterStr}.xlsx`;

        XLSX.writeFile(wb, filename);
    };

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
                {/* Export Controls */}
                <Paper sx={{p: 2, mb: 2, backgroundColor: '#304f61'}}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel sx={{color: '#fff'}}>Month</InputLabel>
                                <Select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 300,
                                                backgroundColor: '#134357',
                                            }
                                        },
                                    }}
                                    sx={{
                                        backgroundColor: '#134357',
                                        color: 'white',
                                        overflow: 'auto',
                                    }}
                                    variant='filled'>
                                    <MenuItem value="all" sx={{
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#1a5570'
                                        }
                                    }}>All Months</MenuItem>
                                    {months.map(month => (
                                        <MenuItem key={month} sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1a5570'
                                            }
                                        }}
                                                  value={month}>{month}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel sx={{color: '#fff'}}>Year</InputLabel>
                                <Select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 300,
                                                backgroundColor: '#134357',
                                            }
                                        },
                                    }}
                                    sx={{
                                        backgroundColor: '#134357',
                                        color: 'white',
                                        overflow: 'auto',
                                    }}
                                    variant='filled'>
                                    <MenuItem value="all" sx={{
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#1a5570'
                                        }
                                    }}>All Years</MenuItem>
                                    {years.map(year => (
                                        <MenuItem key={year} sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1a5570'
                                            }
                                        }} value={year.toString()}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel sx={{color: '#fff'}}>Cluster</InputLabel>
                                <Select
                                    value={selectedCluster}
                                    onChange={(e) => setSelectedCluster(e.target.value)}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 300,
                                                backgroundColor: '#134357',
                                            }
                                        },
                                    }}
                                    sx={{
                                        backgroundColor: '#134357',
                                        color: 'white',
                                        overflow: 'auto',
                                    }}
                                    variant='filled'
                                >
                                    <MenuItem sx={{
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#1a5570'
                                        }
                                    }} value="all">All Clusters</MenuItem>
                                    {clusters.map(cluster => (
                                        <MenuItem sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1a5570'
                                            }
                                        }} key={cluster} value={cluster}>{cluster}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button
                                onClick={exportToExcel}
                                startIcon={<FileDownloadIcon/>}
                                variant="contained"
                                fullWidth
                            >
                                Export to Excel
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Typography variant="h6"
                            sx={{
                                fontFamily: 'Poppins',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                padding: '10px 15px',
                                background: 'linear-gradient(to right, #004e92, #000428)',
                                color: '#FFF',
                                width: 'auto',
                                textAlign: 'center',
                                fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                    Servicing Report
                </Typography>
                <Box>
                    <Grid container spacing={4}>
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