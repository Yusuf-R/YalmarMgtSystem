'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CellTowerIcon from "@mui/icons-material/CellTower";
import MapIcon from "@mui/icons-material/Map";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {LinearProgress} from "@mui/material";
import dayjs from "dayjs";
import {usePathname, useRouter} from "next/navigation";
import AdminUtilities from "@/utils/AdminUtilities";
import useFuelReportStore from "@/store/useFuelReportStore";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import Badge from "@mui/material/Badge";
import Card from "@mui/material/Card";


const txProps = {
    color: "white",
    bgcolor: "#274e61",
    borderRadius: "10px",
    fontSize: '16px',
    fontStyle: 'bold',
    '&:hover': {
        bgcolor: '#051935',
    },
    fontFamily: 'Poppins',
    "& .MuiInputBase-input": {
        color: 'white',
    },
    "& .MuiFormHelperText-root": {
        color: 'red',
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: 'green',
    },
    "& input:-webkit-autofill": {
        WebkitBoxShadow: '0 0 0 1000px #274e61 inset',
        WebkitTextFillColor: 'white',
    },
}
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
    padding: '5px',
    backgroundColor: '#274e61',
    color: '#46F0F9',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
    margin: 0, // Ensure no margin
};
const gridStyle = {
    padding: '5px', // Optional: Add padding inside the Grid to avoid overlapping borders
};
const gridItemStyle = {
    padding: '5px', // Optional: Add padding inside the Grid item to avoid overlapping borders
};


function ViewFuelReport({fuelData, fuelID}) {
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/fuel/view');
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

    const {setEncryptedFuelData} = useFuelReportStore.getState();
    const router = useRouter();
    const pathname = usePathname();

    //Analytics on the FuelData
    // function to view staff profile
    const ViewAnalytics = async () => {
        const encryptedFuelID = await AdminUtilities.encryptObjID(fuelID);
        // encrypt the data and store it in the session storage
        const encryptedFuelData = await AdminUtilities.encryptData(fuelData);
        // Set the encrypted data in Zustand store
        setEncryptedFuelData(encryptedFuelData, encryptedFuelID);
        router.push('/dashboard/admin/reports/fuel/analytics');
    };

    const editFuelReport = async () => {
        const encryptedFuelID = await AdminUtilities.encryptObjID(fuelID);
        // encrypt the data and store it in the session storage
        const encryptedFuelData = await AdminUtilities.encryptData(fuelData);
        // Set the encrypted data in Zustand store
        setEncryptedFuelData(encryptedFuelData, encryptedFuelID);
        router.push(`/dashboard/admin/reports/fuel/edit`);
    };

    // useEffect or handling navigation between new and staff
    useEffect(() => {
        if (pathname.includes('view')) {
            setActiveTab('/dashboard/admin/reports/fuel/view');
        } else if (pathname.includes('edit')) {
            setActiveTab('/dashboard/admin/reports/fuel/edit');
        } else if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/reports/fuel/new');
        } else if (pathname.includes('all')) {
            setActiveTab('/dashboard/admin/reports/fuel/all');
        } else {
            setActiveTab('/dashboard/admin/reports/fuel');
        }
    }, [pathname]);

    const analytics = calculateFuelAnalytics(fuelData.dateSupplied, fuelData.nextDueDate, Number(fuelData.qtyInitial), Number(fuelData.qtySupplied), Number(fuelData.cpd));

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
                                fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                                "&.Mui-selected": {color: "#46F0F9"},
                            }}
                        />

                        {['ALL', 'VIEW', 'EDIT'].map((label) => (
                            <Tab
                                key={label}
                                label={label}
                                component={Link}
                                onClick={label === 'EDIT' ? editFuelReport : null}
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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isLargeScreen ? 'row' : 'column',
                        justifyContent: 'space-between',
                        alignItems: isLargeScreen ? 'flex-start' : 'flex-start',  // Align to top for both screens
                        flexWrap: 'nowrap',  // Ensure LHS and RHS remain side by side
                        height: isLargeScreen ? '100vh' : 'auto',
                        padding: isLargeScreen ? '0' : '10px',
                    }}
                >
                    {/* LHS */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            p: '1px',
                            width: isLargeScreen ? '30%' : '100%',
                            maxWidth: isLargeScreen ? '30%' : '100%',
                            height: isLargeScreen ? '100vh' : 'auto',  // LHS should fill the viewport height on large screens
                            overflowY: 'auto',  // Add scroll if LHS content exceeds the height
                        }}
                    >
                        {/* Content for the left side */}
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
                            <Button variant="contained" color='info' onClick={ViewAnalytics} sx={{
                                borderRadius: '10px'
                            }}>
                                <Typography variant="body1"
                                            sx={{
                                                color: 'FFF',
                                                fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.0rem',
                                                fontWeight: 'bold'
                                            }}>
                                    Click to View Analytics
                                </Typography>
                            </Button>
                            <br/>
                        </Stack>
                    </Box>
                    {/*RHS*/}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            padding: '10px',
                            width: isLargeScreen ? '70%' : '100%',
                            maxWidth: '100%',
                            height: isLargeScreen ? '100vh' : 'auto',  // RHS should fill the viewport height on large screens
                            overflowY: 'auto',  // Allow RHS to scroll when content overflows
                            background: 'linear-gradient(to right, #000428, #004e92)'
                        }}
                    >
                        <Grid container spacing={4}>
                            {/* Section 1: Site Information */}
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #000046, #1cb5e0)',
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
                                                Site Information
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    {/* Site ID */}
                                    <Grid item xs={12} sm={12} md={12} lg={6}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Site ID
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {fuelData.siteId}
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
                                                State
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {fuelData.state}
                                            </Typography>
                                        </Card>
                                    </Grid>

                                    {/* Phone */}
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Cluster
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {fuelData.cluster}
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
                                                Location
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold',
                                                        }}>
                                                {fuelData.location}
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
                                                Site Type
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {fuelData.type}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Fuel Information */}
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #000046, #1cb5e0)',
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
                                    {/* Site ID */}
                                    <Grid item xs={12} sm={12} md={12} lg={6}>
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
                            </Grid>
                            {/* Analytics*/}
                            {analytics.dataError ? (
                                <>
                                    <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #000046, #1cb5e0)',
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
                                                        Analytics
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                            {/* Site ID */}
                                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
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
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #000046, #1cb5e0)',
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
                                                        Analytics
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                            {/* Site ID */}
                                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
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
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
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
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
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
                                            <Grid item xs={12} sm={6} md={4}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
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
                                            background: 'linear-gradient(to right, #000046, #1cb5e0)',
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
                                                Fuel To Date (FTD)
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sx={gridItemStyle}>
                                        <Stack direction="row" alignItems="center" spacing={2} sx={{width: '100%'}}>
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
                                            <Typography sx={{marginLeft: 2, color: analytics.fuelToDateColor}}>
                                                {(analytics.fuelToDatePercentage ?? 0).toFixed(2)}% left
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br/>
                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default ViewFuelReport;

// First, let's create a helper function to safely parse numbers
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

const calculateFuelAnalytics = (dateSupplied, nextDueDate, initialQty, suppliedQty, cpd) => {
    // Input validation
    const validateInputs = () => {
        if (!dateSupplied || !nextDueDate) {
            throw new Error('Dates are required');
        }

        // Safely parse numbers
        const numInitialQty = safeParseNumber(initialQty);
        const numSuppliedQty = safeParseNumber(suppliedQty);
        const numCpd = safeParseNumber(cpd);

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

        // Parse dates more flexibly
        const today = dayjs();
        const dateSuppliedDayjs = dayjs(dateSupplied); // Removed strict format requirement
        const nextDueDateDayjs = dayjs(nextDueDate); // Removed strict format requirement

        // Validate dates are valid but don't enforce format
        if (!dateSuppliedDayjs.isValid() || !nextDueDateDayjs.isValid()) {
            throw new Error('Invalid dates provided');
        }

        const totalQty = numInitialQty + numSuppliedQty;

        if (today.isBefore(dateSuppliedDayjs)) {
            return {
                dataError: 'Unavailable Analytics: Consumption has not started',
                fuelToDatePercentage: 100 // Provide a default percentage
            };
        }

        const daysPassed = today.isAfter(dateSuppliedDayjs) ? today.diff(dateSuppliedDayjs, 'day') : 0;
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
            totalQty
        };
    } catch (error) {
        console.error('Error in calculateFuelAnalytics:', error);
        return {
            dataError: error.message,
            fuelToDatePercentage: 0, // Provide a default percentage even in error case
            details: {
                dateSupplied,
                nextDueDate,
                initialQty,
                suppliedQty,
                cpd
            }
        };
    }
};
