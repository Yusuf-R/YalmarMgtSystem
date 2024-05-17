'use client';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CountUp from 'react-countup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow'
import {Paper} from "@mui/material";



function AdminHeroSection({userData, accessToken}) {
    const delay = 1;
    const duration = 5;
    return (
        <>
            <Stack
                direction='column'
                spacing={2}
                sx={{
                    width: '100vw',
                    overflow: 'hidden',
                    padding: '10px',
                }}
            >
                <Stack direction='column' spacing={4}>
                    <Typography variant="h4">
                        Analytics
                    </Typography>
                    {/*Analytics*/}
                    <Stack direction='row' spacing={12}
                           sx={{
                               alignItems: 'top',
                               justifyContent: 'flex-start',
                               // boxShadow: '0px 2px 8px rgba(0,0,0,0.12)',
                               // backgroundColor: '#304f61',
                           }}
                    >
                        {/* Staff Count */}
                        <Card sx={{
                            padding: '10px',
                            borderRadius: '10px',
                            width: '20%',
                            backgroundColor: '#304f61',
                            color: 'white',
                            height: '350px',
                            // boxShadow: '0px 2px 8px rgba(0,0,0,0.32)'
                        }}>
                            <CardMedia
                                sx={{
                                    height: '80%',
                                }}
                                image="/StaffGroup.svg"
                                title="StaffGroup"
                            />
                            <CardContent>
                                <Typography variant="h3">
                                    Staff: {<CountUp end={35} duration={duration} delay={delay}/>}
                                </Typography>
                            </CardContent>
                        </Card>
                        
                        {/* Site Counts */}
                        <Card sx={{
                            padding: '10px',
                            borderRadius: '10px',
                            width: '20%',
                            backgroundColor: '#304f61',
                            color: 'white',
                            height: '350px',
                            // boxShadow: '0px 2px 8px rgba(0,0,0,0.32)'
                        }}>
                            <CardMedia
                                sx={{
                                    height: '80%',
                                }}
                                image="/SitesGroup.svg"
                                title="SitesGroup"
                            />
                            <CardContent>
                                <Typography variant="h3">
                                    Sites: {<CountUp end={110} duration={duration} delay={delay}/>}
                                </Typography>
                            </CardContent>
                        </Card>
                        
                        {/* Generator Count /> */}
                        <Card sx={{
                            padding: '10px',
                            borderRadius: '10px',
                            width: '20%',
                            backgroundColor: '#304f61',
                            color: 'white',
                            height: '350px',
                            // boxShadow: '0px 2px 8px rgba(0,0,0,0.32)'
                        }}>
                            <CardMedia
                                sx={{
                                    height: '80%',
                                }}
                                image="/GeneratorGroup.jpg"
                                title="GeneratorGroup"
                            />
                            <CardContent>
                                <Typography variant="h3">
                                    Gen: {<CountUp end={145} duration={duration} delay={delay}/>}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                </Stack>
                <br/><br/><br/>
                
                
                {/* Staff List*/}
                <Stack>
                    <Card sx={{
                        padding: '10px',
                        borderRadius: '10px',
                        backgroundColor: '#304f61',
                        width: '80%',
                        color: 'white',
                        height: '350px',
                        // boxShadow: '0px 2px 8px rgba(0,0,0,0.32)'
                    }}>
                        <Typography variant="h5">
                            Staff List
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table stickyHeader aria-label="sticky table" sx={{
                                "& .MuiTableCell-head": {
                                    color: "white",
                                    backgroundColor: "#304f61",
                                },
                            }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                FirstName
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                LastName
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Email
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Role
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                PhoneNo
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                
                                </TableHead>
                                <TableBody sx={{
                                    "& .MuiTableCell-body": {
                                        color: "white",
                                        backgroundColor: "#304f61",
                                    },
                                }}>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.firstName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.lastName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.role}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.phoneNo ? userData.phoneNo : 'Not Available'}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Stack>
                
                <br/><br/><br/>
                {/*Site List*/}
                <Stack>
                    <Card sx={{
                        padding: '10px',
                        borderRadius: '10px',
                        width: '80%',
                        backgroundColor: '#304f61',
                        color: 'white',
                        height: '350px',
                        // boxShadow: '0px 2px 8px rgba(0,0,0,0.32)'
                    }}>
                        <Typography variant="h5">
                            Site List
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table stickyHeader aria-label="sticky table" sx={{
                                "& .MuiTableCell-head": {
                                    color: "white",
                                    backgroundColor: "#304f61",
                                },
                            }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                SiteID
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Location
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Longitude
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Latitude
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                EmcTechnician
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                
                                </TableHead>
                                <TableBody sx={{
                                    "& .MuiTableCell-body": {
                                        color: "white",
                                        backgroundColor: "#304f61",
                                    },
                                }}>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.firstName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.lastName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.role}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.phoneNo ? userData.phoneNo : 'Not Available'}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Stack>
                
                <br/><br/><br/>
                {/*Gen List*/}
                <Stack>
                    <Card sx={{
                        padding: '10px',
                        borderRadius: '10px',
                        width: '80%',
                        backgroundColor: '#304f61',
                        color: 'white',
                        height: '350px',
                        // boxShadow: '0px 2px 8px rgba(0,0,0,0.32)'
                    }}>
                        <Typography variant="h5">
                            Gen List
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table stickyHeader aria-label="sticky table" sx={{
                                "& .MuiTableCell-head": {
                                    color: "white",
                                    backgroundColor: "#304f61",
                                },
                            }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                GenID
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                SiteID
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Location
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Longitude
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                Latitude
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                EmcTechnician
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                
                                <TableBody sx={{
                                    "& .MuiTableCell-body": {
                                        color: "white",
                                        backgroundColor: "#304f61",
                                    },
                                }}>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.firstName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.lastName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.role}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.phoneNo ? userData.phoneNo : 'Not Available'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6">
                                                {userData.phoneNo ? userData.phoneNo : 'Not Available'}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Stack>
            </Stack>
        </>
    )
}

export default AdminHeroSection;