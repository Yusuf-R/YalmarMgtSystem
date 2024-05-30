import Stack from "@mui/material/Stack";
import Image from "next/image";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


function SettingsLandingPage({staffData, healthCheck}) {
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
                    <Typography variant='h5'>Settings</Typography>
                </Paper>
                <br/><br/>
                {/*Body*/}
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
                    {/* Render ProfilePicture component*/}
                    <Stack spacing={2} direction='row'>
                        <Paper elevation={5} sx={{
                            alignCenter: 'center',
                            textAlign: 'center',
                            padding: '10px',
                            backgroundColor: '#274e61',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
                        }}>
                            <Stack direction='column' spacing={2}>
                                <Link href='/dashboard/admin/settings/picture'>
                                    <Image src='/ProfilePic.svg' alt='ProfilePic' width={200} height={200}/>
                                </Link>
                                <Typography variant='h6'>Update Profile Picture</Typography>
                            </Stack>
                        </Paper>
                        {/* Render BioData component*/}
                        <Paper elevation={5} sx={{
                            alignCenter: 'center',
                            textAlign: 'center',
                            padding: '10px',
                            backgroundColor: '#274e61',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
                        }}>
                            <Stack direction='column' spacing={2}>
                                <Link href='/dashboard/admin/settings/biodata'>
                                    <Image src='/BioData.svg' alt='Biodata' width={200} height={200}/>
                                </Link>
                                <Typography variant='h6'>BioData</Typography>
                            </Stack>
                        </Paper>
                        {/* Render CheckHealth component*/}
                        <Paper elevation={5} sx={{
                            alignCenter: 'center',
                            textAlign: 'center',
                            padding: '10px',
                            backgroundColor: '#274e61',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
                        }}>
                            <Stack direction='column' spacing={2}>
                                <Link href='/dashboard/admin/settings/biodata'>
                                    <Image src='/Health.svg' alt='Biodata' width={200} height={200}/>
                                </Link>
                                <Typography variant='h6'>Check Health</Typography>
                            </Stack>
                        </Paper>
                        {/* Render Optimization component*/}
                        <Paper elevation={5} sx={{
                            alignCenter: 'center',
                            textAlign: 'center',
                            padding: '10px',
                            backgroundColor: '#274e61',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
                        }}>
                            <Stack direction='column' spacing={2}>
                                <Link href='/dashboard/admin/settings/biodata'>
                                    <Image src='/Optimization.svg' alt='Optimization' width={200} height={200}/>
                                </Link>
                                <Typography variant='h6'>Optimization</Typography>
                            </Stack>
                        </Paper>
                    </Stack>
                </Paper>
            </Box>
        </>
    )
}

export default SettingsLandingPage;