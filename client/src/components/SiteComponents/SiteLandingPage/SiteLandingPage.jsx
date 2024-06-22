'use client';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import {mainSection} from '@/utils/data';

function SiteLandingPage() {
    // const paperSx = {
    //     alignCenter: 'center',
    //     textAlign: 'center',
    //     backgroundColor: '#274e61',
    //     color: '#46F0F9',
    //     borderRadius: '10px',
    //     width: '90%',
    //     boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
    // }
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
                    <Typography variant='h5'>Site Management Center</Typography>
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
                                <Link href='/dashboard/admin/site/all'>
                                    <Avatar src='/SitesGroup.svg' alt='Biodata'
                                            sx={{
                                                width: 300,
                                                height: 300,
                                                alignContent: 'center',
                                                
                                            }}/>
                                </Link>
                                <Link href='/dashboard/admin/site/all'>
                                    <Typography variant='h6'
                                                sx={{
                                                    // color: '#46F0F9',
                                                    border: '2px solid #46F0F9',
                                                    borderRadius: 5,
                                                    p: '10px',
                                                    bgcolor: '#0059b3',
                                                    color: '#FFF',
                                                }}>
                                        All Territorial Site
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

export default SiteLandingPage;