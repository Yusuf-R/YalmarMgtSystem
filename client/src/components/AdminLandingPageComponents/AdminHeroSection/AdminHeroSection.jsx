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
import {mainSection} from "@/utils/data";
import Box from "@mui/material/Box";

function AdminHeroSection({staffData, accessToken}) {
    const delay = 1;
    const duration = 5;
    return (
        <>
            <Box sx={mainSection}>
                <Stack spacing={2} direction='column'
                       sx={{padding: 0, borderRadius: '10px'}}>
                    <Card sx={{backgroundColor: '#274e61', color: '#46F0F9', borderRadius: '10px'}}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/ProfilePic.svg"
                            alt="ProfilePic"
                        />
                        <CardContent>
                            <Typography variant='h6'>Welcome, {staffData.name}</Typography>
                            <Typography variant='body1'>Staff ID: {staffData.staffId}</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{backgroundColor: '#274e61', color: '#46F0F9', borderRadius: '10px'}}>
                        <CardContent>
                            <Typography variant='h6'>Dashboard Overview</Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Staff ID</TableCell>
                                            <TableCell align="right">Name</TableCell>
                                            <TableCell align="right">Role</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={staffData.staffId}>
                                            <TableCell component="th" scope="row">
                                                {staffData.staffId}
                                            </TableCell>
                                            <TableCell align="right">{staffData.name}</TableCell>
                                            <TableCell align="right">{staffData.role}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
        </>
    )
}

export default AdminHeroSection;