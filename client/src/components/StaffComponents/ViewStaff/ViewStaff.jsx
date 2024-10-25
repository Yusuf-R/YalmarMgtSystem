'use client';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import AdminUtilities from "@/utils/AdminUtilities";
import {useState, useEffect} from "react";
import {useRouter, usePathname} from "next/navigation";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {
    yellow,
    blueGrey,
} from "@mui/material/colors";
import dayjs from "dayjs";

import useStaffStore from "@/store/useStaffStore";

const colorSuspended = yellow[200];
const colorDeceased = blueGrey[500];


const getBadgeStyles = (status) => {
    switch (status) {
        case 'Active':
            return {
                backgroundColor: 'success.main',
                color: 'white',
            };
        case 'Suspended':
            return {
                backgroundColor: colorSuspended,
                color: 'black',
            };
        case 'Terminated':
            return {
                backgroundColor: 'error.main',
                color: 'white',
            };
        case 'Deceased':
            return {
                backgroundColor: colorDeceased,
                color: 'white',
            };
        case 'Pending':
            return {
                backgroundColor: 'secondary.main',
                color: 'white',
            };
        default:
            return {
                backgroundColor: 'default',
                color: 'white',
            };
    }
};

import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import Chip from "@mui/material/Chip";

function ViewStaff({id, staffData}) {
    // Break Points
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
    // state variables
    const {setEncryptedStaffData} = useStaffStore.getState();
    const fullName = `${staffData.firstName}  ${staffData.lastName}`;
    const [activeTab, setActiveTab] = useState('/dashboard/admin/staff/view');
    const pathname = usePathname();
    const router = useRouter();
    const editStaff = async () => {
        const encryptedStaffID = await AdminUtilities.encryptObjID(id);
        // encrypt the data and store it in the session storage
        const encryptedStaffData = await AdminUtilities.encryptData(staffData);
        // Set the encrypted data in Zustand store
        setEncryptedStaffData(encryptedStaffData, encryptedStaffID);
        router.push(`/dashboard/admin/staff/edit`);
    };
    useEffect(() => {
        if (pathname.includes('view')) {
            setActiveTab('/dashboard/admin/staff/view');
        } else if (pathname.includes('edit')) {
            setActiveTab('/dashboard/admin/staff/edit');
        } else {
            setActiveTab('/dashboard/admin/staff');
        }
    }, [pathname]);
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
                        }}
                    >
                        <Tab
                            label="Staff"
                            component={Link}
                            href="/dashboard/admin/staff"
                            value="/dashboard/admin/staff"

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
                            component={Link}
                            href="/dashboard/admin/staff/all"
                            value="/dashboard/admin/staff/all"
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
                            component={Link}
                            href="/dashboard/admin/staff/new"
                            value="/dashboard/admin/staff/new"
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
                            label="View"
                            component={Link}
                            href="/dashboard/admin/staff/view"
                            value="/dashboard/admin/staff/view"
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
                            label="Edit"
                            onClick={editStaff}
                            value="/dashboard/admin/staff/edit"
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
                {/*ParentBox*/}
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
                            {staffData.imgURL !== "" ? (
                                <Image
                                    src={staffData.imgURL}
                                    alt={staffData.email}
                                    width={xSmall || small || medium ? 150 : large ? 200 : xLarge ? 150 : 200}
                                    height={xSmall || small || medium ? 150 : large ? 200 : xLarge ? 150 : 200}
                                    style={{borderRadius: '50%'}}
                                />
                            ) : (
                                <Image
                                    src={staffData.gender === 'Male' ? '/Avatar-9.svg' : '/Avatar-10.svg'}
                                    alt={staffData.email}
                                    width={xSmall || small || medium ? 150 : large ? 200 : xLarge ? 250 : 300}
                                    height={xSmall || small || medium ? 150 : large ? 200 : xLarge ? 250 : 300}
                                    style={{borderRadius: '50%'}}
                                />
                            )}
                            <Badge
                                sx={{
                                    '& .MuiBadge-badge': getBadgeStyles(staffData.status)
                                }}
                                overlap="circular"
                                badgeContent={staffData.status}
                            />
                            <Box
                                sx={{
                                    padding: '2px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2px',
                                    maxWidth: '800px',
                                    width: '100%',
                                    borderRadius: '8px',
                                }}
                            >
                                {/* Row 1: Full Name */}
                                <Grid
                                    container
                                    justifyContent={isAbove425px ? 'center' : 'flex-start'}
                                    alignItems="center"
                                    spacing={2}
                                    sx={{textAlign: isAbove425px ? 'center' : 'left'}}
                                >
                                    <Grid item>
                                        <AccountCircleIcon sx={{color: '#FFF', fontSize: 15}}/>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: '#46F0F9',
                                                fontSize: xSmall || small || medium || large ? '1.0rem' : '1.0rem'
                                            }}
                                        >
                                            {fullName}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                {/* Row 2: Role */}
                                <Grid
                                    container
                                    justifyContent={isAbove425px ? 'center' : 'flex-start'}
                                    alignItems="center"
                                    spacing={2}
                                    sx={{textAlign: isAbove425px ? 'center' : 'left'}}
                                >
                                    <Grid item>
                                        <AppRegistrationIcon sx={{color: '#FFF', fontSize: 15}}/>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: '#46F0F9',
                                                fontSize: xSmall || small || medium || large ? '1.0rem' : '1.0rem'
                                            }}
                                        >
                                            {staffData.role}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
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
                        {/* Content for RHS */}
                        <Grid container spacing={4}>
                            {/* Section 1: Personal Information */}
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
                                                Personal Info
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    {/* Full Name */}
                                    <Grid item xs={12} sm={12} md={12} lg={6}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Full Name
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.fullName}
                                            </Typography>
                                        </Card>
                                    </Grid>

                                    {/* Email */}
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
                                                Email
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.email}
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
                                                Role
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.role}
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
                                                Phone Number
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold',
                                                        }}>
                                                {staffData.phone}
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
                                                Date of Birth
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.dob}
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
                                                Gender
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.gender}
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
                                                Marital Status
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.maritalStatus}
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
                                                Religion
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.religion}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* */}
                        </Grid>
                        <br/>
                        {/* Next Kin Info */}
                        <Grid container spacing={4}>
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
                                                Next of Kin Info
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    {/* Full Name */}
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Next of Kin
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.nextOfKin}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    {/* Relationship */}
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                                Relationship
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.nextOfKinRelationship}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    {/* Next of kin Phone */}
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Phone
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.nextOfKinPhone}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* */}
                        </Grid>
                        <br/>
                        {/* Address Info */}
                        <Grid container spacing={4}>
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
                                                Address Info
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    {/* Address */}
                                    <Grid item xs={12} sm={12} md={12} lg={6}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Address
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.address}
                                            </Typography>
                                        </Card>
                                    </Grid>

                                    {/* Origin */}
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                State of Origin
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.stateOfOrigin}
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
                                                LGA
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.lga}
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
                                                State of Residence
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.stateOfResidence}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* */}
                        </Grid>
                        <br/>
                        {/*Education Info*/}
                        <Grid container spacing={4}>
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
                                                Education Info
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={6}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                University
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.institution}
                                            </Typography>
                                        </Card>
                                    </Grid>
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
                                                Course
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.courseOfStudy}
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
                                                Degree
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.highestDegree}
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
                                                Class of Degree
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.classofDegree}
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
                                                Graduation Date
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {dayjs(staffData.graduationDate).format('DD-MMM-YYYY')}
                                            </Typography>
                                        </Card>
                                    </Grid>

                                </Grid>
                            </Grid>
                            {/* */}
                        </Grid>
                        <br/>
                        {/* Employment Info */}
                        <Grid container spacing={4}>
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
                                                            textAlign: 'center'
                                                        }}>
                                                Employment Info
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={6}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Employment Type
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.employmentType}
                                            </Typography>
                                        </Card>
                                    </Grid>

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
                                                Role
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.role}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    {(staffData.role === 'Field Supervisor' || staffData.role === 'Generator Technician') && (
                                        <>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                        Handling Cluster
                                                    </Typography>
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                        {staffData.cluster}
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
                                                        Site Supervision
                                                    </Typography>
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                        {Array.isArray(staffData.siteID) && staffData.siteID.length > 0 ? (
                                                            staffData.siteID.map((id) => (
                                                                <Chip
                                                                    key={id}
                                                                    sx={{
                                                                        margin: '4px',
                                                                        height: 'auto',
                                                                        '& .MuiChip-label': {
                                                                            display: 'block',
                                                                            whiteSpace: 'normal',
                                                                        },
                                                                        color: 'limegreen',
                                                                        background: 'none'
                                                                    }}
                                                                    label={id}
                                                                />
                                                            ))
                                                        ) : (
                                                            <Typography variant="body2"
                                                                        sx={{color: '#FFF', fontSize: '0.9rem'}}>
                                                                No sites assigned
                                                            </Typography>
                                                        )}
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                        </>
                                    )}
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Employment Date
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {dayjs(staffData.employmentDate).format('DD-MMM-YYYY')}
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
                                                Leave Credit
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.leaveCredit}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* */}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ViewStaff;