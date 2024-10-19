import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React, {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import {usePathname} from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import CountUp from 'react-countup';
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

const delay = 1;
const duration = 5;


function AdminDashboard({
                            allStaffData,
                            allSiteData,
                            allServicesData,
                            allIncidentData,
                            staffCount,
                            siteCount
                        }) {
    const theme = useTheme();
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
    const [activeTab, setActiveTab] = useState('/dashboard/admin');

    useEffect(() => {
        if (pathname.includes('admin')) {
            setActiveTab('/dashboard/admin');
        }
    }, [pathname]);

    return (
        <Box sx={{
            padding: xSmall || small ? '5px' : medium || large ? '10px' : '20px',
            marginTop: '10px',
        }}>
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
                    }}>
                    <Tab
                        label="Dashboard"
                        value="/dashboard/admin" // Set the value prop for this Tab
                        component={Link}
                        href="/dashboard/admin"
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
            <Typography
                variant="h5"
                sx={{
                    fontSize: xSmall || small || medium || large ? '0.8rem' : '1.2rem',
                    fontWeight: 'bold',
                    color: '#46F0F9',
                    marginBottom: '20px'
                }}>
                Analytics
            </Typography>

            {/* Analytics Cards Grid */}
            <Grid container spacing={4}>
                {/* AllStaff Count */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        backgroundColor: '#1f3a47',
                        color: '#fff',
                        borderRadius: '15px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                    }}>
                        <CardMedia
                            sx={{
                                width: '120px',
                                height: '120px',
                                marginTop: '20px',
                                borderRadius: '25px',
                            }}
                            image="/StaffGroup.svg"
                            title="StaffGroup"
                        />
                        <CardContent sx={{textAlign: 'center'}}>
                            <Typography variant="h4" sx={{fontSize: xSmall || small ? '1.5rem' : '2.5rem'}}>
                                {<CountUp end={staffCount} duration={duration} delay={delay}/>}
                            </Typography>
                            <Typography variant="h6" sx={{fontSize: xSmall || small ? '0.9rem' : '1.2rem'}}>
                                Staff
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* AllSite Count */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        backgroundColor: '#1f3a47',
                        color: '#fff',
                        borderRadius: '15px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                    }}>
                        <CardMedia
                            sx={{
                                width: '120px',
                                height: '120px',
                                marginTop: '20px',
                                borderRadius: '25px',
                            }}
                            image="/SitesGroup.svg"
                            title="SitesGroup"
                        />
                        <CardContent sx={{textAlign: 'center'}}>
                            <Typography variant="h4" sx={{fontSize: xSmall || small ? '1.5rem' : '2.5rem'}}>
                                {<CountUp end={siteCount} duration={duration} delay={delay}/>}
                            </Typography>
                            <Typography variant="h6" sx={{fontSize: xSmall || small ? '0.9rem' : '1.2rem'}}>
                                Sites
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Generator Count */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{
                        backgroundColor: '#1f3a47',
                        color: '#fff',
                        borderRadius: '15px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                    }}>
                        <CardMedia
                            sx={{
                                width: '120px',
                                height: '120px',
                                marginTop: '20px',
                                borderRadius: '25px',
                            }}
                            image="/GeneratorGroup.jpg"
                            title="GeneratorGroup"
                        />
                        <CardContent sx={{textAlign: 'center'}}>
                            <Typography variant="h4" sx={{fontSize: xSmall || small ? '1.5rem' : '2.5rem'}}>
                                {<CountUp end={145} duration={duration} delay={delay}/>}
                            </Typography>
                            <Typography variant="h6" sx={{fontSize: xSmall || small ? '0.9rem' : '1.2rem'}}>
                                Generators
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Summary Data for some important operations*/}
            <Box sx={{padding: 0, marginTop: '20px'}}>
                {/* Summary Table Header */}
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: xSmall || small || medium || large ? '0.8rem' : '1.2rem',
                        fontWeight: 'bold',
                        color: '#46F0F9',
                        mt: '20px',
                        mb: '20px',
                    }}>
                    Summary
                </Typography>
                {/* AllStaff List */}
                <Stack direction="column" spacing={2}>
                    <Card sx={{
                        padding: '10px',
                        borderRadius: '15px',
                        backgroundColor: '#1f3a47',
                        width: '100%',
                        color: 'white',
                        height: 'auto',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    }}>
                        <Stack direction="row" spacing={2}>
                            <Typography variant="h5" sx={{
                                fontSize: xSmall || small ? '0.8rem' : '1.2rem',
                                fontWeight: 'bold',
                                color: '#FFF',
                            }}>
                                Staff List
                            </Typography>
                            <Link href='/dashboard/admin/staff'>
                                <Typography variant="h5" sx={{
                                    fontSize: xSmall || small ? '0.8rem' : '1.0rem',
                                    fontWeight: 'bold',
                                    color: '#46F0F9',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    ":hover": {
                                        color: "#46F0F9",
                                        textDecoration: "underline",
                                    }
                                }}>
                                    click for more
                                </Typography>
                            </Link>
                        </Stack>
                        <br/>
                        <TableContainer component={Paper} sx={{
                            backgroundColor: '#1f3a47',
                            borderRadius: '10px',
                            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
                        }}>
                            <Table stickyHeader aria-label="staff table" sx={{
                                "& .MuiTableCell-head": {
                                    color: "white",
                                    backgroundColor: "#304f61",
                                },
                                "& .MuiTableCell-body": {
                                    color: "white",
                                    backgroundColor: "#304f61",
                                },
                            }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography variant="h6"
                                                        sx={{
                                                            fontSize: xSmall || small ? '0.8rem' : '1rem',
                                                            fontWeight: 'bold',
                                                            color: '#46F0F9',
                                                        }}>
                                                Surname
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6"
                                                        sx={{
                                                            fontSize: xSmall || small ? '0.8rem' : '1rem',
                                                            fontWeight: 'bold',
                                                            color: '#46F0F9',
                                                        }}>
                                                Name
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6"
                                                        sx={{
                                                            fontSize: xSmall || small ? '0.8rem' : '1rem',
                                                            fontWeight: 'bold',
                                                            color: '#46F0F9',
                                                        }}>
                                                Email
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6"
                                                        sx={{
                                                            fontSize: xSmall || small ? '0.8rem' : '1rem',
                                                            fontWeight: 'bold',
                                                            color: '#46F0F9',
                                                        }}>
                                                Role
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6"
                                                        sx={{
                                                            fontSize: xSmall || small ? '0.8rem' : '1rem',
                                                            fontWeight: 'bold',
                                                            color: '#46F0F9',
                                                        }}>
                                                Phone No
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allStaffData.map((staff, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center"
                                                       sx={{fontSize: xSmall || small ? '0.7rem' : '0.9rem'}}>
                                                {staff.lastName}
                                            </TableCell>
                                            <TableCell align="center"
                                                       sx={{fontSize: xSmall || small ? '0.7rem' : '0.9rem'}}>
                                                {staff.firstName}
                                            </TableCell>
                                            <TableCell align="center"
                                                       sx={{fontSize: xSmall || small ? '0.7rem' : '0.9rem'}}>
                                                {staff.email}
                                            </TableCell>
                                            <TableCell align="center"
                                                       sx={{fontSize: xSmall || small ? '0.7rem' : '0.9rem'}}>
                                                {staff.role}
                                            </TableCell>
                                            <TableCell align="center"
                                                       sx={{fontSize: xSmall || small ? '0.7rem' : '0.9rem'}}>
                                                {staff.phone}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Stack>
                <br/>
                {/* AllSite List*/}
                <Stack direction="column" spacing={2}>
                    <Card sx={{
                        padding: '10px',
                        borderRadius: '15px',
                        backgroundColor: '#1f3a47',
                        width: '100%',
                        color: 'white',
                        height: 'auto',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    }}>
                        <Stack direction="row" spacing={2}>
                            <Typography variant="h5" sx={{
                                fontSize: xSmall || small ? '0.8rem' : '1.2rem',
                                fontWeight: 'bold',
                                color: '#FFF',
                            }}>
                                Site List
                            </Typography>
                            <Link href='/dashboard/admin/site'>
                                <Typography variant="h5" sx={{
                                    fontSize: xSmall || small ? '0.8rem' : '1.0rem',
                                    fontWeight: 'bold',
                                    color: '#46F0F9',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    ":hover": {
                                        color: "#46F0F9",
                                        textDecoration: "underline",
                                    }
                                }}>
                                    click for more
                                </Typography>
                            </Link>
                        </Stack>
                        <br/>
                        <TableContainer component={Paper} sx={{
                            backgroundColor: '#1f3a47',
                            borderRadius: '10px',
                            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
                        }}>
                            <Table stickyHeader aria-label="site table" sx={{
                                "& .MuiTableCell-head": {
                                    color: "white",
                                    backgroundColor: "#304f61",
                                },
                                "& .MuiTableCell-body": {
                                    color: "white",
                                    backgroundColor: "#304f61",
                                },
                            }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography variant="h6"
                                                        sx={{
                                                            fontSize: xSmall || small ? '0.8rem' : '1rem',
                                                            fontWeight: 'bold',
                                                            color: '#46F0F9',
                                                        }}>
                                                ID
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6"
                                                        sx={{
                                                            fontSize: xSmall || small ? '0.8rem' : '1rem',
                                                            fontWeight: 'bold',
                                                            color: '#46F0F9',
                                                        }}>
                                                Cluster
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6"
                                                        sx={{
                                                            fontSize: xSmall || small ? '0.8rem' : '1rem',
                                                            fontWeight: 'bold',
                                                            color: '#46F0F9',
                                                        }}>
                                                Type
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6"
                                                        sx={{
                                                            fontSize: xSmall || small ? '0.8rem' : '1rem',
                                                            fontWeight: 'bold',
                                                            color: '#46F0F9',
                                                        }}>
                                                Location
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allSiteData.map((site, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center"
                                                       sx={{fontSize: xSmall || small ? '0.7rem' : '0.9rem'}}>
                                                {site.siteId}
                                            </TableCell>
                                            <TableCell align="center"
                                                       sx={{fontSize: xSmall || small ? '0.7rem' : '0.9rem'}}>
                                                {site.cluster}
                                            </TableCell>
                                            <TableCell align="center"
                                                       sx={{fontSize: xSmall || small ? '0.7rem' : '0.9rem'}}>
                                                {site.type}
                                            </TableCell>
                                            <TableCell align="center"
                                                       sx={{fontSize: xSmall || small ? '0.7rem' : '0.9rem'}}>
                                                {site.location}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Stack>
                <br/>
                {/*Leave Request*/}
            </Box>
        </Box>
    )
}

export default AdminDashboard;
