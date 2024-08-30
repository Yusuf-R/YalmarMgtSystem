import Box from "@mui/material/Box";
import {autoCompleteSx, mainSection, modalStyle, txProps} from "@/utils/data";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {useRouter, usePathname} from "next/navigation";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {styled} from '@mui/material/styles';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import BaseInfo from "@/components/ReportComponents/IncidentComponents/BaseInfo/BaseInfo";

import IncidentCategorySelector
    from "@/components/ReportComponents/IncidentComponents/IncidentCategorySelector/IncidentCategorySelector"
import {FormProvider, useForm, Controller, useFormContext} from 'react-hook-form';
import ImageUpload from "@/components/ReportComponents/IncidentComponents/ImageUpload/ImageUpload";
import IncidentDescription
    from "@/components/ReportComponents/IncidentComponents/IncidentDescription/IncidentDescription";
import StaffIncident from "@/components/ReportComponents/IncidentComponents/IncidentCateogry/StaffIncident";
import SiteIncident from "@/components/ReportComponents/IncidentComponents/IncidentCateogry/SiteIncident";
import ServiceIncident from "@/components/ReportComponents/IncidentComponents/IncidentCateogry/ServiceIncident";
import FuelIncident from "@/components/ReportComponents/IncidentComponents/IncidentCateogry/FuelIncident";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LazyComponent from "@/components/LazyComponent/LazyComponent";

function NewIncidentReport({allStaff, allSite}) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const methods = useForm({
        // resolver: yupResolver(newIncidentReportSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
    });
    const onSubmit = (data) => {
        setIsSubmitting(true);
        console.log(data);
        setIsSubmitting(false);
    };
    
    // Report Category
    const incidentReportsCategory = ['Staff', 'Site', 'Fuel', 'Service', 'Others'];
    const onCategoryChange = (categories) => {
        setSelectedCategories(categories);
    };
    
    // Severity
    const incidentReportSeverity = ['Critical', 'Major', 'Minor'];
    
    const handleBack = () => {
        window.history.back();
    }
    const handleClear = () => {
        methods.reset();
        setSelectedCategories([]);
        methods.clearErrors();
    }
    const typographyStyle = {
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: '16px',
        textAlign: 'left',
    };
    const paperSx = {
        padding: '10px',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        width: '100%',
        height: 'auto',
    }
    
    // Incident Section
    const accordionSx = {
        bgcolor: '#274e61',
    }
    const cardSx = {
        bgcolor: '#274e61',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        border: '1px solid rgb(163, 163, 117)',
        p: 0.1,
    }
    return (
        <>
            <FormProvider {...methods}>
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
                            New Incident Report Form
                        </Typography>
                    </Paper>
                    <br/>
                    <Box component='form' onSubmit={methods.handleSubmit(onSubmit)}>
                        {/*BaseInfo*/}
                        <BaseInfo allStaff={allStaff}/>
                        <br/>
                        {/*Incident Category*/}
                        <IncidentCategorySelector
                            incidentReportsCategory={incidentReportsCategory}
                            incidentReportSeverity={incidentReportSeverity}
                            customStyles={{
                                paperSx,
                                typographyStyle,
                                txProps,
                                autoCompleteSx,
                            }}
                            onCategoryChange={onCategoryChange}
                        />
                        <br/>
                        {/* Reveal a corresponding category component */}
                        {selectedCategories.includes('Staff') && (
                            <FormProvider {...methods}>
                                <StaffIncident allStaff={allStaff}/>
                            </FormProvider>
                        )}
                        
                        {selectedCategories.includes('Site') && (
                            <FormProvider {...methods}>
                                <SiteIncident allSite={allSite}/>
                            </FormProvider>
                        )}
                        
                        {selectedCategories.includes('Service') && (
                            <FormProvider {...methods}>
                                <ServiceIncident allSite={allSite}/>
                            </FormProvider>
                        )}
                        
                        {selectedCategories.includes('Fuel') && (
                            <FormProvider {...methods}>
                                <FuelIncident allSite={allSite}/>
                            </FormProvider>
                        )}
                        {/*Summary*/}
                        <IncidentDescription customStyles={{
                            paperSx,
                            typographyStyle,
                            txProps,
                            autoCompleteSx,
                            cardSx,
                        }}/>
                        <br/>
                        {/*Image Upload*/}
                        <ImageUpload/>
                        <br/>
                        {/*    Submission*/}
                        <Stack direction='row' gap={4} sx={{marginBottom: '75px', justifyContent: 'flex-end'}}>
                            <Button
                                variant="contained"
                                color='success'
                                onClick={handleBack}
                                sx={{mr: 1}}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color='error'
                                type="reset"
                                onClick={handleClear}
                            >
                                Reset
                            </Button>
                            <Button
                                variant="contained"
                                color='error'
                                type="submit"
                            >
                                Submit
                            </Button>
                            {isSubmitting && <LazyComponent Command='Submitting'/>}
                        </Stack>
                    </Box>
                </Box>
            </FormProvider>
        </>
    )
}

export default NewIncidentReport;
