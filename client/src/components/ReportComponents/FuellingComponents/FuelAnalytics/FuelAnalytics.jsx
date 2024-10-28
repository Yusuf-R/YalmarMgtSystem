import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import React, {useState, useEffect} from "react";
import {useRouter, usePathname} from "next/navigation";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import {LinearProgress} from "@mui/material";
import DateComponent from "@/components/DateComponent/DateComponent";
import {useForm} from "react-hook-form";
import DailyConsumptionTrend
    from "@/components/Analytics/DailyConsumptionTrend/DailyConsumptionTrend";
import GaugeChartCurrentFuel from "@/components/Analytics/GaugeChartCurrentFuel/GaugeChartCurrentFuel";
import AdminUtilities from "@/utils/AdminUtilities";
import useFuelReportStore from "@/store/useFuelReportStore";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

function FuelAnalytics({fuelData, fuelID}) {
    const isXSmall = useMediaQuery('(max-width:599.99px)');


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
    const isLargeScreen = useMediaQuery('(min-width:900px)');
    const isAbove425px = useMediaQuery('(min-width:425px)');

    const {
        control, formState: {errors}, setError, reset
    } = useForm({
        mode: "onTouched",
        // resolver: yupResolver(newFuelReportSchema),
        reValidateMode: "onChange",
    });

    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/fuel/analytics');
    const [customDate, setCustomDate] = useState(null);
    const pathname = usePathname();
    const router = useRouter();

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
        overflow: 'scroll',
    };
    const paperInnerStyle = {
        // textAlign: 'center',
        padding: '5px',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
        margin: 0,
    };
    const gridStyle = {
        padding: '5px', // Optional: Add padding inside the Grid to avoid overlapping borders
    };
    const gridItemStyle = {
        padding: '5px', // Optional: Add padding inside the Grid item to avoid overlapping borders
    };
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    // tabs set up
    useEffect(() => {
        if (pathname.includes('analytics')) {
            setActiveTab('/dashboard/admin/reports/fuel/analytics');
        } else if (pathname.includes('all')) {
            setActiveTab('/dashboard/admin/reports/fuel/all');
        } else if (pathname.includes('edit')) {
            setActiveTab('/dashboard/admin/reports/fuel/edit');
        } else if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/reports/fuel/new');
        } else if (pathname.includes('view')) {
            setActiveTab('/dashboard/admin/reports/fuel/view');
        } else {
            setActiveTab('/dashboard/admin/reports');
        }
    }, [pathname])
    // Inside your component:
    const setEncryptedFuelData = useFuelReportStore(state => state.setEncryptedFuelData);


    const editFuelReport = async () => {
        const encryptedFuelID = await AdminUtilities.encryptObjID(fuelID);
        // encrypt the data and store it in the session storage
        const encryptedFuelData = await AdminUtilities.encryptData(fuelData);
        // Set the encrypted data in Zustand store
        setEncryptedFuelData(encryptedFuelData, encryptedFuelID);
        router.push(`/dashboard/admin/reports/fuel/edit`);
    };
    // function to view staff profile
    const viewFuelReport = async () => {
        const encryptedFuelID = await AdminUtilities.encryptObjID(fuelID);
        // encrypt the data and store it in the session storage
        const encryptedFuelData = await AdminUtilities.encryptData(fuelData);
        // Set the encrypted data in Zustand store
        setEncryptedFuelData(encryptedFuelData, encryptedFuelID);
        router.push(`/dashboard/admin/reports/fuel/view`);
    };

    // extract all our credentials from fuelData

    const analytics = calculateFuelAnalytics(fuelData.dateSupplied, fuelData.nextDueDate, Number(fuelData.qtyInitial), Number(fuelData.qtySupplied), Number(fuelData.cpd));
    const customAnalytics = calculateFuelAnalytics(fuelData.dateSupplied, fuelData.nextDueDate, Number(fuelData.qtyInitial), Number(fuelData.qtySupplied), Number(fuelData.cpd), customDate,);


    return (
        <>
            <Box
                sx={{
                    padding: xSmall || small ? '5px' : medium || large ? '10px' : '5px',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%',
                    flexWrap: 'nowrap',
                }}
            >
                {/*Navigation Tabs */}
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
                                fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                                "&.Mui-selected": {color: "#46F0F9"},
                            }}
                        />

                        <Tab
                            label="Fuel"
                            component={Link}
                            href="/dashboard/admin/reports/fuel"
                            value="/dashboard/admin/reports/fuel"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                                "&.Mui-selected": {color: "#46F0F9"},
                            }}
                        />

                        <Tab
                            label="All"
                            component={Link}
                            href="/dashboard/admin/reports/fuel/all"
                            value="/dashboard/admin/reports/fuel/all"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                                "&.Mui-selected": {color: "#46F0F9"},
                            }}
                        />

                        {['VIEW', 'EDIT', 'ANALYTICS'].map((label) => (
                            <Tab
                                key={label}
                                label={label}
                                component={Link}
                                onClick={label === 'EDIT' ? editFuelReport : 'VIEW' ? viewFuelReport : null}
                                href={`/dashboard/admin/reports/fuel/${label.toLowerCase()}`}
                                value={`/dashboard/admin/reports/fuel/${label.toLowerCase()}`}
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
                            value="/dashboard/admin/reports/fuel/new" // Set the value prop for this Tab
                            component={Link}
                            href="/dashboard/admin/reports/fuel/new"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                    </Tabs>
                </Stack>
                <br/>
                {/*Parent Cover*/}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: isLargeScreen ? '0' : '10px',
                        height: isLargeScreen ? '100vh' : 'auto',
                        overflowY: 'auto',
                        background: 'linear-gradient(to right, #000428, #004e92)'
                    }}
                >
                    <Grid container spacing={3}>
                        {/* Row 1, Column 1 (LHS) */}
                        <Grid item xs={12} md={3}>
                            <Box
                                sx={{
                                    background: 'linear-gradient(to right, #000046, #1cb5e0)',
                                    padding: '16px',
                                    borderRadius: '10px',
                                    height: '100%',
                                }}
                            >
                                <Stack
                                    direction='column'
                                    spacing={2}
                                    sx={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 'auto',
                                    }}
                                >
                                    <Image
                                        src="/Tower.svg"
                                        alt={fuelData.siteId}
                                        width={xSmall || small || medium ? 150 : large ? 200 : xLarge ? 150 : 200}
                                        height={xSmall || small || medium ? 150 : large ? 200 : xLarge ? 150 : 200}
                                        style={{borderRadius: '50%'}}
                                    />
                                    <Card sx={{
                                        background: 'linear-gradient(to right, #1d4350, #a43931)',
                                        padding: '8px',
                                        borderRadius: '10px'
                                    }}>
                                        <Typography variant="body1"
                                                    sx={{
                                                        color: '#FFF',
                                                        fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.0rem',
                                                        fontWeight: 'bold'
                                                    }}>
                                            {fuelData.siteId}
                                        </Typography>
                                    </Card>
                                    <Card sx={{
                                        background: 'linear-gradient(to right, #1d4350, #a43931)',
                                        padding: '8px',
                                        borderRadius: '10px'
                                    }}>
                                        <Typography variant="body1"
                                                    sx={{
                                                        color: '#FFF',
                                                        fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.0rem',
                                                        fontWeight: 'bold'
                                                    }}>
                                            {fuelData.type}
                                        </Typography>
                                    </Card>
                                </Stack>
                            </Box>
                        </Grid>
                        {/* Row 1, Column 2 (RHS) */}
                        <Grid item xs={12} md={9}>
                            <Box
                                sx={{
                                    background: 'linear-gradient(to right, #000046, #1cb5e0)',
                                    padding: '16px',
                                    borderRadius: '10px',
                                    height: '100%',
                                }}
                            >
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold',
                                                            //     align center
                                                            textAlign: 'center'
                                                        }}>
                                                Fuel Supply Information
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    {/* Supplied Date */}
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Supplied Date
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {fuelData.dateSupplied}
                                            </Typography>
                                        </Card>
                                    </Grid>

                                    {/* State */}
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{
                                                            color: '#46F0F9',
                                                            fontSize: '14px',
                                                            mb: 1
                                                        }}>
                                                Initial Quantity (litres)
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {fuelData.qtyInitial}
                                            </Typography>
                                        </Card>
                                    </Grid>

                                    {/* Supplied Qty */}
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Supplied Quantity (litres)
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {fuelData.qtySupplied}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                New Available Quantity (litres)
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold',
                                                        }}>
                                                {fuelData.qtyNew}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Site CPD (litres/day)
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {fuelData.cpd}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Duration (days)
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {fuelData.duration}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Expected Due date
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {fuelData.nextDueDate}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        {/* Row 2 Column 1 LHS */}
                        <Grid item xs={12} md={12}>
                            <Box
                                sx={{
                                    background: 'linear-gradient(to right, #000046, #1cb5e0)',
                                    padding: '16px',
                                    borderRadius: '10px',
                                    height: '100%',
                                }}
                            >
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold',
                                                            textAlign: 'center'
                                                        }}>
                                                Current Day Analytics
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    {/*Analytics*/}
                                    {analytics.dataError ? (
                                        <>
                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    {/* Site ID */}
                                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                                        <Card sx={{
                                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                            padding: '16px',
                                                            borderRadius: '10px'
                                                        }}>
                                                            <Typography variant="subtitle2"
                                                                        sx={{
                                                                            color: '#46F0F9',
                                                                            fontSize: '14px',
                                                                            mb: 1
                                                                        }}>
                                                                Error
                                                            </Typography>
                                                            <Typography variant="body1"
                                                                        sx={{
                                                                            color: '#FFF',
                                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                            fontWeight: 'bold'
                                                                        }}>
                                                                {analytics.dataError}
                                                            </Typography>
                                                        </Card>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                                    ) : (
                                        <>
                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    {/* Site ID */}
                                                    <Grid item xs={12} sm={12} md={12} lg={6}>
                                                        <Card sx={{
                                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                            padding: '16px',
                                                            borderRadius: '10px'
                                                        }}>
                                                            <Typography variant="subtitle2"
                                                                        sx={{
                                                                            color: '#46F0F9',
                                                                            fontSize: '14px',
                                                                            mb: 1
                                                                        }}>
                                                                Current Fuel Available
                                                            </Typography>
                                                            <Typography variant="body1"
                                                                        sx={{
                                                                            color: '#FFF',
                                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                            fontWeight: 'bold'
                                                                        }}>
                                                                {analytics.currentFuelAvailable + ' litres'}
                                                            </Typography>
                                                        </Card>
                                                    </Grid>

                                                    {/* State */}
                                                    <Grid item xs={12} sm={12} md={12} lg={6}>
                                                        <Card sx={{
                                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                            padding: '16px',
                                                            borderRadius: '10px'
                                                        }}>
                                                            <Typography variant="subtitle2"
                                                                        sx={{
                                                                            color: '#46F0F9',
                                                                            fontSize: '14px',
                                                                            mb: 1
                                                                        }}>
                                                                Consumption So far
                                                            </Typography>
                                                            <Typography variant="body1"
                                                                        sx={{
                                                                            color: '#FFF',
                                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                            fontWeight: 'bold'
                                                                        }}>
                                                                {analytics.consumptionSoFar + ' litres'}
                                                            </Typography>
                                                        </Card>
                                                    </Grid>

                                                    {/* Supplied Qty */}
                                                    <Grid item xs={12} sm={6} md={4}>
                                                        <Card sx={{
                                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                            padding: '16px',
                                                            borderRadius: '10px'
                                                        }}>
                                                            <Typography variant="subtitle2"
                                                                        sx={{
                                                                            color: '#46F0F9',
                                                                            fontSize: '14px',
                                                                            mb: 1
                                                                        }}>
                                                                Remaining Fuel Duration
                                                            </Typography>
                                                            <Typography variant="body1"
                                                                        sx={{
                                                                            color: '#FFF',
                                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                            fontWeight: 'bold'
                                                                        }}>
                                                                {analytics.remainingFuelDuration + ' day(s)'}
                                                            </Typography>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={4}>
                                                        <Card sx={{
                                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                            padding: '16px',
                                                            borderRadius: '10px'
                                                        }}>
                                                            <Typography variant="subtitle2"
                                                                        sx={{
                                                                            color: '#46F0F9',
                                                                            fontSize: '14px',
                                                                            mb: 1
                                                                        }}>
                                                                Buffer Stock Status
                                                            </Typography>
                                                            <Typography variant="body1"
                                                                        sx={{
                                                                            color: '#FFF',
                                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.1rem',
                                                                            fontWeight: 'bold',
                                                                            backgroundColor: analytics.bufferStockColor,
                                                                        }}>
                                                                {analytics.bufferStockStatus}
                                                            </Typography>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={4}>
                                                        <Card sx={{
                                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                            padding: '16px',
                                                            borderRadius: '10px'
                                                        }}>
                                                            <Typography variant="subtitle2"
                                                                        sx={{
                                                                            color: '#46F0F9',
                                                                            fontSize: '14px',
                                                                            mb: 1
                                                                        }}>
                                                                Site CPD (litres/day)
                                                            </Typography>
                                                            <Typography variant="body1"
                                                                        sx={{
                                                                            color: '#FFF',
                                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                            fontWeight: 'bold'
                                                                        }}>
                                                                {fuelData.cpd}
                                                            </Typography>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={4}>
                                                        <Card sx={{
                                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                            padding: '16px',
                                                            borderRadius: '10px'
                                                        }}>
                                                            <Typography variant="subtitle2"
                                                                        sx={{
                                                                            color: '#46F0F9',
                                                                            fontSize: '14px',
                                                                            mb: 1
                                                                        }}>
                                                                Current Consumption Days(days)
                                                            </Typography>
                                                            <Typography variant="body1"
                                                                        sx={{
                                                                            color: '#FFF',
                                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                            fontWeight: 'bold'
                                                                        }}>
                                                                {analytics.daysPassed + ' day(s)'}
                                                            </Typography>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={4}>
                                                        <Card sx={{
                                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                            padding: '16px',
                                                            borderRadius: '10px'
                                                        }}>
                                                            <Typography variant="subtitle2"
                                                                        sx={{
                                                                            color: '#46F0F9',
                                                                            fontSize: '14px',
                                                                            mb: 1
                                                                        }}>
                                                                Expected Due date
                                                            </Typography>
                                                            <Typography variant="body1"
                                                                        sx={{
                                                                            color: '#FFF',
                                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                            fontWeight: 'bold'
                                                                        }}>
                                                                {fuelData.nextDueDate}
                                                            </Typography>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={4}>
                                                        <Card sx={{
                                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                            padding: '16px',
                                                            borderRadius: '10px'
                                                        }}>
                                                            <Typography variant="subtitle2"
                                                                        sx={{
                                                                            color: '#46F0F9',
                                                                            fontSize: '14px',
                                                                            mb: 1
                                                                        }}>
                                                                Qty at Start date
                                                            </Typography>
                                                            <Typography variant="body1"
                                                                        sx={{
                                                                            color: '#FFF',
                                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                            fontWeight: 'bold'
                                                                        }}>
                                                                {analytics.totalQty + ' litres'}
                                                            </Typography>
                                                        </Card>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )}
                                    {/*FTD*/}
                                    <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                    fontWeight: 'bold',
                                                                    textAlign: 'center'
                                                                }}>
                                                        Fuel to Date (FTD)
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} sx={gridItemStyle}>
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    spacing={2}
                                                    sx={{width: '100%', backgroundColor: '#000'}}
                                                >
                                                    {analytics.fuelToDatePercentage === null ? (
                                                        // Error or "Data Not Available" case
                                                        <Box
                                                            sx={{
                                                                flexGrow: 1,
                                                                height: 10,
                                                                backgroundColor: '#f5f5f5',
                                                                borderRadius: 1
                                                            }}
                                                        />
                                                    ) : (
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={analytics.fuelToDatePercentage}
                                                            sx={{
                                                                flexGrow: 1,
                                                                height: 10,
                                                                backgroundColor: '#e0e0e0',
                                                                '& .MuiLinearProgress-bar': {
                                                                    backgroundColor: analytics.fuelToDateColor
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                    <Typography sx={{
                                                        marginLeft: 2,
                                                        color: analytics.fuelToDatePercentage === null ? '#666' : analytics.fuelToDateColor,
                                                        fontSize: '1.2rem',
                                                    }}>
                                                        {analytics.fuelToDatePercentage === null
                                                            ? analytics.fuelToDateText
                                                            : `${analytics.fuelToDatePercentage.toFixed(2)}% left`
                                                        }
                                                    </Typography>
                                                </Stack>
                                            </Grid>h
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        {/*Row 2 Column 2 RHS */}
                        <Grid item xs={12} md={12}>
                            <Box
                                sx={{
                                    background: 'linear-gradient(to right, #000046, #1cb5e0)',
                                    padding: '16px',
                                    borderRadius: '10px',
                                    height: '100%',
                                }}
                            >
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold',
                                                            textAlign: 'center'
                                                        }}>
                                                Custom Day Analytics
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold',
                                                            textAlign: 'left'
                                                        }}>
                                                Note: Date must be not be less than supply date or greater than dueDate
                                            </Typography>
                                            <br/>
                                            <Typography variant="subtitle2"
                                                        sx={{
                                                            color: '#46F0F9',
                                                            fontSize: '14px',
                                                            mb: 1
                                                        }}>
                                                Select Custom Date
                                            </Typography>
                                            <DateComponent
                                                name="dateSupplied"
                                                control={control}
                                                errors={errors}
                                                labelText={null}
                                                setDate={setCustomDate}
                                                defaultValue={fuelData.dateSupplied}
                                            />
                                        </Card>
                                    </Grid>
                                    {customDate && (
                                        <>
                                            {customAnalytics.dataError ? (
                                                <>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={3}>
                                                            {/* Site ID */}
                                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                                <Card sx={{
                                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                                    padding: '16px',
                                                                    borderRadius: '10px'
                                                                }}>
                                                                    <Typography variant="subtitle2"
                                                                                sx={{
                                                                                    color: '#46F0F9',
                                                                                    fontSize: '14px',
                                                                                    mb: 1
                                                                                }}>
                                                                        Error
                                                                    </Typography>
                                                                    <Typography variant="body1"
                                                                                sx={{
                                                                                    color: '#FFF',
                                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                                    fontWeight: 'bold'
                                                                                }}>
                                                                        {customAnalytics.dataError}
                                                                    </Typography>
                                                                </Card>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            ) : (
                                                <>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={3}>
                                                            {/* Site ID */}
                                                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                                                <Card sx={{
                                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                                    padding: '16px',
                                                                    borderRadius: '10px'
                                                                }}>
                                                                    <Typography variant="subtitle2"
                                                                                sx={{
                                                                                    color: '#46F0F9',
                                                                                    fontSize: '14px',
                                                                                    mb: 1
                                                                                }}>
                                                                        Current Fuel Available
                                                                    </Typography>
                                                                    <Typography variant="body1"
                                                                                sx={{
                                                                                    color: '#FFF',
                                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                                    fontWeight: 'bold'
                                                                                }}>
                                                                        {customAnalytics.currentFuelAvailable + ' litres'}
                                                                    </Typography>
                                                                </Card>
                                                            </Grid>

                                                            {/* State */}
                                                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                                                <Card sx={{
                                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                                    padding: '16px',
                                                                    borderRadius: '10px'
                                                                }}>
                                                                    <Typography variant="subtitle2"
                                                                                sx={{
                                                                                    color: '#46F0F9',
                                                                                    fontSize: '14px',
                                                                                    mb: 1
                                                                                }}>
                                                                        Consumption So far
                                                                    </Typography>
                                                                    <Typography variant="body1"
                                                                                sx={{
                                                                                    color: '#FFF',
                                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                                    fontWeight: 'bold'
                                                                                }}>
                                                                        {customAnalytics.consumptionSoFar + ' litres'}
                                                                    </Typography>
                                                                </Card>
                                                            </Grid>

                                                            {/* Supplied Qty */}
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <Card sx={{
                                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                                    padding: '16px',
                                                                    borderRadius: '10px'
                                                                }}>
                                                                    <Typography variant="subtitle2"
                                                                                sx={{
                                                                                    color: '#46F0F9',
                                                                                    fontSize: '14px',
                                                                                    mb: 1
                                                                                }}>
                                                                        Remaining Fuel Duration
                                                                    </Typography>
                                                                    <Typography variant="body1"
                                                                                sx={{
                                                                                    color: '#FFF',
                                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                                    fontWeight: 'bold'
                                                                                }}>
                                                                        {customAnalytics.remainingFuelDuration + ' day(s)'}
                                                                    </Typography>
                                                                </Card>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <Card sx={{
                                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                                    padding: '16px',
                                                                    borderRadius: '10px'
                                                                }}>
                                                                    <Typography variant="subtitle2"
                                                                                sx={{
                                                                                    color: '#46F0F9',
                                                                                    fontSize: '14px',
                                                                                    mb: 1
                                                                                }}>
                                                                        Buffer Stock Status
                                                                    </Typography>
                                                                    <Typography variant="body1"
                                                                                sx={{
                                                                                    color: '#FFF',
                                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.1rem',
                                                                                    fontWeight: 'bold',
                                                                                    backgroundColor: customAnalytics.bufferStockColor,
                                                                                }}>
                                                                        {customAnalytics.bufferStockStatus}
                                                                    </Typography>
                                                                </Card>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <Card sx={{
                                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                                    padding: '16px',
                                                                    borderRadius: '10px'
                                                                }}>
                                                                    <Typography variant="subtitle2"
                                                                                sx={{
                                                                                    color: '#46F0F9',
                                                                                    fontSize: '14px',
                                                                                    mb: 1
                                                                                }}>
                                                                        Site CPD (litres/day)
                                                                    </Typography>
                                                                    <Typography variant="body1"
                                                                                sx={{
                                                                                    color: '#FFF',
                                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                                    fontWeight: 'bold'
                                                                                }}>
                                                                        {fuelData.cpd}
                                                                    </Typography>
                                                                </Card>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <Card sx={{
                                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                                    padding: '16px',
                                                                    borderRadius: '10px'
                                                                }}>
                                                                    <Typography variant="subtitle2"
                                                                                sx={{
                                                                                    color: '#46F0F9',
                                                                                    fontSize: '14px',
                                                                                    mb: 1
                                                                                }}>
                                                                        Current Consumption Days(days)
                                                                    </Typography>
                                                                    <Typography variant="body1"
                                                                                sx={{
                                                                                    color: '#FFF',
                                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                                    fontWeight: 'bold'
                                                                                }}>
                                                                        {customAnalytics.daysPassed + ' day(s)'}
                                                                    </Typography>
                                                                </Card>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <Card sx={{
                                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                                    padding: '16px',
                                                                    borderRadius: '10px'
                                                                }}>
                                                                    <Typography variant="subtitle2"
                                                                                sx={{
                                                                                    color: '#46F0F9',
                                                                                    fontSize: '14px',
                                                                                    mb: 1
                                                                                }}>
                                                                        Expected Due date
                                                                    </Typography>
                                                                    <Typography variant="body1"
                                                                                sx={{
                                                                                    color: '#FFF',
                                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                                    fontWeight: 'bold'
                                                                                }}>
                                                                        {fuelData.nextDueDate}
                                                                    </Typography>
                                                                </Card>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} md={4}>
                                                                <Card sx={{
                                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                                    padding: '16px',
                                                                    borderRadius: '10px'
                                                                }}>
                                                                    <Typography variant="subtitle2"
                                                                                sx={{
                                                                                    color: '#46F0F9',
                                                                                    fontSize: '14px',
                                                                                    mb: 1
                                                                                }}>
                                                                        Qty at Start date
                                                                    </Typography>
                                                                    <Typography variant="body1"
                                                                                sx={{
                                                                                    color: '#FFF',
                                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                                    fontWeight: 'bold'
                                                                                }}>
                                                                        {customAnalytics.totalQty + ' litres'}
                                                                    </Typography>
                                                                </Card>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            )}
                                            {/*FTD*/}
                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                                        <Card sx={{
                                                            background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
                                                            padding: '16px',
                                                            borderRadius: '10px'
                                                        }}>
                                                            <Typography variant="body1"
                                                                        sx={{
                                                                            color: '#FFF',
                                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                            fontWeight: 'bold',
                                                                            textAlign: 'center'
                                                                        }}>
                                                                Fuel to Date (FTD)
                                                            </Typography>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={12} sx={gridItemStyle}>
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            spacing={2}
                                                            sx={{width: '100%', backgroundColor: '#000'}}
                                                        >
                                                            {customAnalytics.fuelToDatePercentage === null ? (
                                                                // Error or "Data Not Available" case
                                                                <Box
                                                                    sx={{
                                                                        flexGrow: 1,
                                                                        height: 10,
                                                                        backgroundColor: '#f5f5f5',
                                                                        borderRadius: 1
                                                                    }}
                                                                />
                                                            ) : (
                                                                <LinearProgress
                                                                    variant="determinate"
                                                                    value={customAnalytics.fuelToDatePercentage}
                                                                    sx={{
                                                                        flexGrow: 1,
                                                                        height: 10,
                                                                        backgroundColor: '#e0e0e0',
                                                                        '& .MuiLinearProgress-bar': {
                                                                            backgroundColor: customAnalytics.fuelToDateColor
                                                                        }
                                                                    }}
                                                                />
                                                            )}
                                                            <Typography sx={{
                                                                marginLeft: 2,
                                                                color: customAnalytics.fuelToDatePercentage === null ? '#666' : customAnalytics.fuelToDateColor,
                                                                fontSize: '1.2rem',
                                                            }}>
                                                                {customAnalytics.fuelToDatePercentage === null
                                                                    ? customAnalytics.fuelToDateText
                                                                    : `${customAnalytics.fuelToDatePercentage.toFixed(2)}% left`
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box
                                sx={{
                                    padding: '16px',
                                    borderRadius: '10px',
                                    height: '100%',
                                }}
                            >
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Card sx={{
                                        background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
                                        padding: '16px',
                                        borderRadius: '10px'
                                    }}>
                                        <Typography variant="body1"
                                                    sx={{
                                                        color: '#FFF',
                                                        fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                        fontWeight: 'bold',
                                                        textAlign: 'center'
                                                    }}>
                                            Daily Consumption Trend
                                        </Typography>
                                        <DailyConsumptionTrend dateSupplied={fuelData.dateSupplied} cpd={fuelData.cpd}/>
                                    </Card>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box
                                sx={{
                                    background: 'linear-gradient(to right, #000046, #1cb5e0)',
                                    padding: '16px',
                                    borderRadius: '10px',
                                    height: '100%',
                                }}
                            >
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Card sx={{
                                        background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
                                        padding: '16px',
                                        borderRadius: '10px',
                                    }}>
                                        <Typography variant="body1"
                                                    sx={{
                                                        color: '#FFF',
                                                        fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                        fontWeight: 'bold',
                                                        textAlign: 'center'
                                                    }}>
                                            Daily Consumption Trend
                                        </Typography>
                                        <GaugeChartCurrentFuel
                                            currentFuelAvailable={fuelData.qtyNew - (selectedDate.diff(dayjs(fuelData.dateSupplied, "DD/MMM/YYYY"), 'day') * fuelData.cpd)}
                                            totalQty={fuelData.qtyNew}/>
                                    </Card>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default FuelAnalytics

const safeParseNumber = (value) => {
    // If value is already a number, return it
    if (typeof value === 'number') {
        return value;
    }
    // If value is a string, try to convert it
    if (typeof value === 'string') {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
    }
    // If value is undefined or null, return null
    return null;
};
const calculateFuelAnalytics = (dateSupplied, nextDueDate, initialQty, suppliedQty, cpd, customDate = null) => {
    // Debug input values immediately
    console.log('Raw input values:', {
        dateSupplied,
        nextDueDate,
        customDate,
        initialQty,
        suppliedQty,
        cpd
    });

    // Input validation
    const validateInputs = () => {
        if (!dateSupplied || !nextDueDate) {
            throw new Error('Dates are required');
        }

        // Safely parse numbers
        const numInitialQty = safeParseNumber(initialQty);
        const numSuppliedQty = safeParseNumber(suppliedQty);
        const numCpd = safeParseNumber(cpd);

        console.log('Parsed numbers:', {
            numInitialQty,
            numSuppliedQty,
            numCpd
        });

        if (numInitialQty === null || numSuppliedQty === null || numCpd === null) {
            throw new Error('Quantity and CPD values must be valid numbers');
        }

        if (numInitialQty < 0 || numSuppliedQty < 0 || numCpd < 0) {
            throw new Error('Quantity and CPD values must be non-negative');
        }

        return {numInitialQty, numSuppliedQty, numCpd};
    };

    try {
        // Validate inputs first
        const {numInitialQty, numSuppliedQty, numCpd} = validateInputs();

        // Parse dates flexibly
        const referenceDate = customDate ? dayjs(customDate) : dayjs();
        const dateSuppliedDayjs = dayjs(dateSupplied);
        const nextDueDateDayjs = dayjs(nextDueDate);

        // Validate all dates
        if (!dateSuppliedDayjs.isValid() || !nextDueDateDayjs.isValid() || !referenceDate.isValid()) {
            throw new Error('Invalid date(s) provided');
        }

        // Create the "Data Not Available" response object
        const dataNotAvailableResponse = {
            dataError: 'Data Not Available',
            currentFuelAvailable: 'N/A',
            consumptionSoFar: 'N/A',
            remainingFuelDuration: 'N/A',
            bufferStockStatus: 'N/A',
            bufferStockColor: '#gray',
            fuelToDatePercentage: null,
            fuelToDateColor: '#gray',
            fuelToDateText: 'Data Not Available',
            daysPassed: 'N/A',
            totalQty: numInitialQty + numSuppliedQty,
            referenceDate: referenceDate.format('YYYY-MM-DD')
        };

        // Check if reference date is before supply date
        if (referenceDate.isBefore(dateSuppliedDayjs)) {
            return {
                ...dataNotAvailableResponse,
                dataError: 'Data Not Available: Selected date is before supply date'
            };
        }

        // Check if reference date is after due date
        if (referenceDate.isAfter(nextDueDateDayjs)) {
            return {
                ...dataNotAvailableResponse,
                dataError: 'Data Not Available: Selected date is after due date'
            };
        }

        const totalQty = numInitialQty + numSuppliedQty;

        // Debug logging
        console.log('Validated values:', {
            dateSupplied,
            nextDueDate,
            customDate,
            referenceDate: referenceDate.format('YYYY-MM-DD'),
            dateSuppliedDayjs: dateSuppliedDayjs.format('YYYY-MM-DD'),
            nextDueDateDayjs: nextDueDateDayjs.format('YYYY-MM-DD'),
            numInitialQty,
            numSuppliedQty,
            numCpd,
            totalQty
        });

        const daysPassed = referenceDate.diff(dateSuppliedDayjs, 'day');
        const consumptionSoFar = daysPassed * numCpd;
        const currentFuelAvailable = Math.max(0, totalQty - consumptionSoFar);
        const remainingFuelDuration = Math.floor(currentFuelAvailable / numCpd);

        let bufferStockStatus = "";
        let bufferStockColor = "";

        if (remainingFuelDuration <= 1) {
            bufferStockStatus = "SITE DOWN";
            bufferStockColor = "red";
        } else if (remainingFuelDuration <= 5) {
            bufferStockStatus = "REFUEL ALERT";
            bufferStockColor = "#ff66cc";
        } else {
            bufferStockStatus = "ACTIVE OPERATION";
            bufferStockColor = "green";
        }

        // Ensure fuelToDatePercentage is always a number, even if 0
        const fuelToDatePercentage = totalQty === 0 ? 0 : Number(((currentFuelAvailable / totalQty) * 100).toFixed(2));
        let fuelToDateColor = "";
        let fuelToDateText = "";

        if (fuelToDatePercentage === 0) {
            fuelToDateColor = "#ff3300";
            fuelToDateText = "0% left";
        } else if (fuelToDatePercentage <= 20) {
            fuelToDateColor = "#ff3300";
            fuelToDateText = "<= 20% left";
        } else if (fuelToDatePercentage <= 40) {
            fuelToDateColor = "#ff66cc";
            fuelToDateText = "<= 40% left";
        } else if (fuelToDatePercentage <= 75) {
            fuelToDateColor = "#00ccff";
            fuelToDateText = "<= 75% left";
        } else {
            fuelToDateColor = "#33cc33";
            fuelToDateText = "75-100% left";
        }
        console.log({fuelToDatePercentage});

        return {
            currentFuelAvailable,
            consumptionSoFar,
            remainingFuelDuration,
            bufferStockStatus,
            bufferStockColor,
            fuelToDatePercentage,
            fuelToDateColor,
            fuelToDateText,
            daysPassed,
            totalQty,
            referenceDate: referenceDate.format('YYYY-MM-DD')
        };
    } catch (error) {
        console.error('Error in calculateFuelAnalytics:', error);
        return {
            dataError: error.message,
            fuelToDatePercentage: null, // Changed to null instead of 0
            fuelToDateText: 'Data Not Available',
            details: {
                dateSupplied,
                nextDueDate,
                customDate,
                initialQty,
                suppliedQty,
                cpd
            }
        };
    }
};