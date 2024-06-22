import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Image from "next/image";
import {mainSection} from "@/utils/data";
import Avatar from "@mui/material/Avatar";

function ReportLandingPage() {
    const paperSx = {
        alignCenter: 'center',
        textAlign: 'center',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        width: '60%',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
    }
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
                                }}>
                        Operational Report Center</Typography>
                </Paper>
                <br/><br/>
                <Stack spacing={2} direction='column'
                       sx={{padding: 3, borderRadius: '10px'}}>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Stack direction='column' spacing={2} sx={{alignItems: 'left'}}>
                                <Link href='/dashboard/admin/reports/servicing'>
                                    <Avatar src='/Servicing.svg' alt='Servicing' sx={{width: 250, height: 250,}}/>
                                </Link>
                                <Link href='#'>
                                    <Typography variant='h6' textAlign='center'
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: 'bold',
                                                    borderRadius: 5,
                                                    ml: 3,
                                                    p: '5px',
                                                    bgcolor: '#0059b3',
                                                    color: '#FFF',
                                                    width: '50%',
                                                }}>
                                        Servicing Reports
                                    </Typography>
                                </Link>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack direction='column' spacing={2}>
                                <Link href='/dashboard/admin/reports/fuel'>
                                    <Avatar src='/Fuelling-2.svg' alt='Fuelling' sx={{width: 250, height: 250,}}/>
                                </Link>
                                <Link href='#'>
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
                                                    ml: 3,
                                                    
                                                }}>Fuelling Reports</Typography>
                                </Link>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack direction='column' spacing={2}>
                                <Link href='#'>
                                    <Avatar src='/Incident.svg' alt='Incident' sx={{width: 250, height: 250,}}/>
                                </Link>
                                <Link href='#'>
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
                                                    ml: 3,
                                                }}>Incident-Reports</Typography>
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            
            </Box>
        </>
    )
}

export default ReportLandingPage