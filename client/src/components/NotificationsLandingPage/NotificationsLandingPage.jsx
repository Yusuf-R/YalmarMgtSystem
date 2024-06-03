import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {Grid} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

function NotificationsLandingPage() {
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
            <Box sx={{
                padding: '20px',
                width: 'calc(100% - 250px)',
                position: 'absolute',
                top: '70px',
                left: '250px',
            }}>
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
                    <Typography variant='h5'>Notification System</Typography>
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
                                    <Typography variant='h6'>Avatar Update Request</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            {/* Render BioData component*/}
                            <Paper elevation={5} sx={paperSx}>
                                <Stack direction='column' spacing={2}>
                                    <Link href='/dashboard/admin/settings/biodata'>
                                        <Image src='/BioData.svg' alt='Biodata' width={200} height={200}/>
                                    </Link>
                                    <Typography variant='h6'>BioData Update Request</Typography>
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
                                    <Typography variant='h6'>Leave Request</Typography>
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
                                        <Image src='/Optimization.svg' alt='Optimization' width={200} height={200}/>
                                    </Link>
                                    <Typography variant='h6'>Incident Report</Typography>
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
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            {/* Render Optimization component*/}
                            <Paper elevation={5} sx={paperSx}>
                                <Stack direction='column' spacing={2}>
                                    <Link href='/dashboard/admin/settings/biodata'>
                                        <Image src='/Optimization.svg' alt='Optimization' width={200} height={200}/>
                                    </Link>
                                    <Typography variant='h6'>Message Center</Typography>
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


export default NotificationsLandingPage