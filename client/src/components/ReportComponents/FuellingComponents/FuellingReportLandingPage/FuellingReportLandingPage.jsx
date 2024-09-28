import Box from "@mui/material/Box";
import {mainSection} from "@/utils/data";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";

function FuellingReportLandingPage() {
    return (
        <>
            <Box sx={mainSection}>
                {/*Header*/}
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
                    <Typography variant='h5'>Fuelling Supply Center</Typography>
                </Paper>
                <br/><br/>
                <Stack spacing={2} direction='column'
                       sx={{padding: 0, borderRadius: '10px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}>
                                <Link href='/dashboard/admin/reports/fuel/all'>
                                    <Avatar src='/Diesel.svg' alt='Biodata'
                                            sx={{
                                                width: 250,
                                                height: 250,
                                                alignContent: 'center',

                                            }}/>
                                </Link>
                                <Link href='/dashboard/admin/reports/fuel/all'>
                                    <Typography variant='h6'
                                                sx={{
                                                    // color: '#46F0F9',
                                                    border: '2px solid #46F0F9',
                                                    borderRadius: 5,
                                                    p: '10px',
                                                    bgcolor: '#9966ff',
                                                    color: '#FFF',
                                                }}>
                                        All Territory Report
                                    </Typography>
                                </Link>
                            </Stack>
                        </Grid>
                        <Grid item xs={3}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}>
                                <Link href='/dashboard/admin/reports/fuel/new'>
                                    <Avatar src='/Fuelling-1.svg' alt='New+'
                                            sx={{
                                                width: 250,
                                                height: 250,
                                                alignContent: 'center',

                                            }}/>
                                </Link>
                                <Link href='/dashboard/admin/reports/fuel/new'>
                                    <Typography variant='h6'
                                                sx={{
                                                    // color: '#46F0F9',
                                                    border: '2px solid #46F0F9',
                                                    borderRadius: 5,
                                                    p: '10px',
                                                    bgcolor: '#0059b3',
                                                    color: '#FFF',
                                                }}>
                                        New Fuel Report +
                                    </Typography>
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
        </>
    )
}

export default FuellingReportLandingPage;