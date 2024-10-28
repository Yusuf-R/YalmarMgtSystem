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
import {
    yellow,
    blueGrey,
} from "@mui/material/colors";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSiteStore from "@/store/useSiteStore";

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


function ViewSite({id, siteData}) {
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
    const setEncryptedSiteData = useSiteStore(state => state.setEncryptedSiteData);
    const [activeTab, setActiveTab] = useState('/dashboard/admin/site/view');
    const pathname = usePathname();
    const router = useRouter();
    const editSite = async () => {
        const encryptedSiteID = await AdminUtilities.encryptObjID(id);
        // encrypt the data and store it in the session storage
        const encryptedSiteData = await AdminUtilities.encryptData(siteData);
        // Set the encrypted data in Zustand store
        setEncryptedSiteData(encryptedSiteData, encryptedSiteID);
        router.push(`/dashboard/admin/site/edit`);
    };
    useEffect(() => {
        if (pathname.includes('view')) {
            setActiveTab('/dashboard/admin/site/view');
        } else if (pathname.includes('edit')) {
            setActiveTab('/dashboard/admin/site/edit');
        } else {
            setActiveTab('/dashboard/admin/site');
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
                            label="Site"
                            component={Link}
                            href="/dashboard/admin/site"
                            value="/dashboard/admin/site"

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
                            href="/dashboard/admin/site/all"
                            value="/dashboard/admin/site/all"
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
                            href="/dashboard/admin/site/new"
                            value="/dashboard/admin/site/new"
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
                            href="/dashboard/admin/site/view"
                            value="/dashboard/admin/site/view"
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
                            onClick={editSite}
                            value="/dashboard/admin/site/edit"
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
                            <Image
                                src="/Tower.svg"
                                alt={siteData.siteId}
                                width={xSmall || small || medium ? 150 : large ? 200 : xLarge ? 150 : 200}
                                height={xSmall || small || medium ? 150 : large ? 200 : xLarge ? 150 : 200}
                                style={{borderRadius: '50%'}}
                            />
                            <Badge
                                sx={{
                                    '& .MuiBadge-badge': getBadgeStyles(siteData.status)
                                }}
                                overlap="circular"
                                badgeContent={siteData.status}
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
                                    {siteData.siteId}
                                </Typography>
                            </Card>
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
                                                Site Information
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
                                                Site ID
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {siteData.siteId}
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
                                                State
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {siteData.state}
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
                                                {siteData.cluster}
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
                                                {siteData.location}
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
                                                {siteData.type}
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
                                                Status
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {siteData.status}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* */}
                        </Grid>
                        <br/>
                        {/* Geo location Info */}
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
                                                Geo Location
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
                                                Longitude
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {siteData.longitude}
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
                                                Latitude
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {siteData.latitude}
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

export default ViewSite;