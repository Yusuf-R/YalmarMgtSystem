import Stack from "@mui/material/Stack";
import Image from "next/image";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {mainSection} from "@/utils/data";


function SettingsLandingPage() {
    const paperSx = {
        alignCenter: 'center',
        textAlign: 'center',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        width: '90%',
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
                    <Typography variant='h5'>Settings</Typography>
                </Paper>
                <br/><br/>
                {/*Body*/}
                {/* Render ProfilePicture component*/}
                <Stack spacing={2} direction='column'
                       sx={{padding: 0, borderRadius: '10px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Paper elevation={5} sx={paperSx}>
                                <Stack direction='column' spacing={2}>
                                    <Link href='/dashboard/admin/settings/picture'>
                                        <Image src='/ProfilePic.svg' alt='ProfilePic' width={200} height={200}/>
                                    </Link>
                                    <Typography variant='h6'>Update Profile Picture</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            {/* Render MyBioData component*/}
                            <Paper elevation={5} sx={paperSx}>
                                <Stack direction='column' spacing={2}>
                                    <Link href='/dashboard/admin/settings/biodata'>
                                        <Image src='/BioData.svg' alt='Biodata' width={200} height={200}/>
                                    </Link>
                                    <Typography variant='h6'>MyBioData</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            {/* Render Optimization component*/}
                            <Paper elevation={5} sx={paperSx}>
                                <Stack direction='column' spacing={2}>
                                    <Link href='/dashboard/admin/settings/leave-request'>
                                        <Image src='/LeaveRequest.svg' alt='Optimization' width={200} height={200}/>
                                    </Link>
                                    <Typography variant='h6'>LeaveRequest</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            {/* Render Optimization component*/}
                            <Paper elevation={5} sx={paperSx}>
                                <Stack direction='column' spacing={2}>
                                    <Link href='/dashboard/admin/settings/biodata'>
                                        <Image src='/Payslip.svg' alt='Optimization' width={200} height={200}/>
                                    </Link>
                                    <Typography variant='h6'>PaySlip</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            {/* Render Optimization component*/}
                            <Paper elevation={5} sx={paperSx}>
                                <Stack direction='column' spacing={2}>
                                    <Link href='/dashboard/admin/settings/biodata'>
                                        <Image src='/Optimization.svg' alt='Optimization' width={200} height={200}/>
                                    </Link>
                                    <Typography variant='h6'>Optimization</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            {/* Render CheckHealth component*/}
                            <Paper elevation={5} sx={paperSx}>
                                <Stack direction='column' spacing={2}>
                                    <Link href='/dashboard/admin/settings/biodata'>
                                        <Image src='/Health.svg' alt='Biodata' width={200} height={200}/>
                                    </Link>
                                    <Typography variant='h6'>Check Health</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                
                </Stack>
            </Box>
        </>
    )
}

export default SettingsLandingPage;