'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {mainSection} from "@/utils/data"
import MultiStepForm from "@/components/ReportComponents/ServicingComponents/MulitStepForm/MultiStepForm";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function NewServicingReport({allStaff, allSite}) {
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
                    <Typography variant='h5' sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                        New Servicing Report
                    </Typography>
                </Paper>
                <br/>
                <ArrowCircleLeftIcon
                    sx={{
                        color: '#00cc99',
                        fontSize: '40px',
                        cursor: 'pointer',
                        '&:hover': {
                            color: '#00ffcc',
                        },
                    }}
                    onClick={() => window.history.back()}
                    titleAccess="Back"
                    aria-label="Back"
                    role="button"
                />
                <br/><br/><br/>
                <MultiStepForm allSite={allSite} allStaff={allStaff}/>
            </Box>
        </>
    )
}

export default NewServicingReport;