import Box from "@mui/material/Box";
import {mainSection} from "@/utils/data";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";

function IncidentLandingPage() {
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
                    <Typography variant='h6' textAlign='center'
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    fontSize: '25px',
                                }}>
                        Incident Report Center</Typography>
                </Paper>
                <br/><br/>
                <Stack spacing={2} direction='column'
                       sx={{padding: 3, borderRadius: '10px'}}>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Stack direction='column' spacing={2} sx={{alignItems: 'left'}}>
                                <Link href='/dashboard/admin/reports/incident/all'>
                                    <Avatar src='/AllIncident-1.jpg' alt='AllIncident'
                                            sx={{width: 250, height: 250, borderRadius: 10}}/>
                                </Link>
                                <Link href='/dashboard/admin/reports/incident/all'>
                                    <Typography variant='h6' textAlign='center'
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: 'bold',
                                                    borderRadius: 5,
                                                    ml: -1,
                                                    mt: 2,
                                                    p: '5px',
                                                    bgcolor: '#0059b3',
                                                    color: '#FFF',
                                                    width: '50%',
                                                }}>
                                        All Reports
                                    </Typography>
                                </Link>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack direction='column' spacing={2}>
                                <Link href='/dashboard/admin/reports/incident/current'>
                                    <Avatar src='/AllIncident.svg' alt='CurrentIncident'
                                            sx={{width: 250, height: 250, borderRadius: 10, border: '1px solid #FFF'}}/>
                                </Link>
                                <Link href='/dashboard/admin/reports/incident/current'>
                                    <Typography variant='h6' textAlign='center'
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: 'bold',
                                                    // color: '#46F0F9',
                                                    borderRadius: 5,
                                                    p: '5px',
                                                    bgcolor: '#0059b3',
                                                    color: '#FFF',
                                                    width: '50%',
                                                    ml: -1,
                                                    mt: 2,
                                                    
                                                }}>Current Month Reports</Typography>
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            
            </Box>
        </>
    )
}

export default IncidentLandingPage;