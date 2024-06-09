import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Image from "next/image";
import {mainSection} from "@/utils/data";

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
                    </Grid>
                
                </Stack>
            </Box>
        </>
    )
}


export default NotificationsLandingPage