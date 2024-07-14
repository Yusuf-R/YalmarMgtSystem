'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {mainSection} from "@/utils/data"
import MultiStepForm from "@/components/ReportComponents/ServicingComponents/MulitStepForm/MultiStepForm";

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
                <br/><br/>
                <MultiStepForm allSite={allSite} allStaff={allStaff}/>
            </Box>
        </>
    )
}

export default NewServicingReport;