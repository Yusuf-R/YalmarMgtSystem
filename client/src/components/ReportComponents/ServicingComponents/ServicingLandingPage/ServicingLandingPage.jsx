import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import {mainSection} from "@/utils/data";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function ServicingLandingPage() {
    return (
        <>
            <Box sx={mainSection}>
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
                    <Typography variant='h5'>Sites PM Management</Typography>
                </Paper>
                <br/><br/>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Stack direction='column' gap={4}
                               justifyContent="center"
                               alignItems="center"
                        >
                            <Link href={'/dashboard/admin/reports/servicing/all'}>
                                <Avatar src='/Servicing-2.svg'
                                        alt='Servicing'
                                        sx={{
                                            width: 300,
                                            height: 300,
                                        }}
                                />
                            </Link>
                            <Link href={'/dashboard/admin/reports/servicing/all'}>
                                <Typography variant='h6'
                                            sx={{
                                                fontFamily: 'Poppins',
                                                fontWeight: 'bold',
                                                // color: '#46F0F9',
                                                border: '2px solid #46F0F9',
                                                borderRadius: 5,
                                                p: '10px',
                                                bgcolor: '#0059b3',
                                                color: '#FFF',
                                            }}>
                                    All Sites PM Reports
                                </Typography>
                            </Link>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default ServicingLandingPage