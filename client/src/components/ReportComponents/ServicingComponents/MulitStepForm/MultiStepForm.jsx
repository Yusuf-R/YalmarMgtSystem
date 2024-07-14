// MultiStepForm.js
import React, {useCallback, useMemo, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {newServiceReportSchema} from '@/SchemaValidator/newServiceReport';
import Step1ReportingStaff
    from '@/components/ReportComponents/ServicingComponents/Step1-ReportingStaff/Step1ReportingStaff';
import Step2SiteInfo from "@/components/ReportComponents/ServicingComponents/Step2-SiteInfo/Step2SiteInfo";
import Step3ServiceInfo from "@/components/ReportComponents/ServicingComponents/Step3-ServiceInfo/Step3ServiceInfo";
import Step4GeneratorPM from "@/components/ReportComponents/ServicingComponents/Step4-GenPM/Step4GeneratorPM";
import Step5AirconPM from "@/components/ReportComponents/ServicingComponents/Step5-AirConPM/Step5AirconPM";
import Step6ShelterPM from "@/components/ReportComponents/ServicingComponents/Step6-ShelterPM/Step6ShelterPM";
import Step7DCSystemPM from "@/components/ReportComponents/ServicingComponents/Step7-DCSystemPM/Step7DCSystemPM";
import Step8OthersPM from "@/components/ReportComponents/ServicingComponents/Step8-OthersPM/Step8OthersPM";
import Step10AdminApproval
    from "@/components/ReportComponents/ServicingComponents/Step10-AdminApproval/Step10AdminApproval";
import Step11DataPreview from "@/components/ReportComponents/ServicingComponents/Step11-DataPreview/Step11DataPreview";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stack from "@mui/material/Stack";
import AdvImgResizerMultiFile from "@/components/AdvImgResizerMultiFile/AdvImgResizerMultiFile";
import {merge} from 'lodash';

const steps = [
    'Reporting Staff-Info',
    'Site-Info',
    'Service-Info',
    'Gen-PM',
    'AirCon-PM',
    'Shelter-PM',
    'DC-System-PM',
    'Others-PM',
    'Picture-Upload',
    'Admin-Approval',
    'Data-Preview',
    'Submit'
];
const txProps = {
    color: "white",
    bgcolor: "#274e61",
    borderRadius: "10px",
    width: '250px',
    fontSize: '16px',
    fontStyle: 'bold',
    '&:hover': {
        bgcolor: '#051935',
    },
    fontFamily: 'Poppins',
    "& .MuiInputBase-input": {
        color: 'white',
    },
    "& .MuiFormHelperText-root": {
        color: 'red',
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: 'green',
    },
    "& input:-webkit-autofill": {
        WebkitBoxShadow: '0 0 0 1000px #274e61 inset',
        WebkitTextFillColor: 'white',
    },
};

function MultiStepForm({allStaff, allSite}) {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        adminFullName: '',
        email: '',
        adminEmail: '',
        role: '',
        adminRole: '',
        state: '',
        cluster: '',
        siteId: '',
        location: '',
        shelterType: '',
        siteType: '',
        pmInstance: '',
        servicingDate: null,
        siteGenModes: '',
        generatorPM: {
            defaultOperation: '',
            gen1Type: '',
            gen1Display: '',
            gen1Hr: '',
            customGen1Hr: null,
            gen1OperatingVoltage: '',
            gen1OperatingFrequency: '',
            gen1WorkingStatus: '',
            gen2Type: null,
            gen2Display: null,
            gen2Hr: null,
            customGen2Hr: null,
            gen2OperatingVoltage: null,
            gen2OperatingFrequency: null,
            gen2WorkingStatus: null,
        },
        airconPM: {
            acInstalled: '',
            noOfACInstalled: '',
            ac1Status: '',
            ac2Status: '',
        },
        shelterPM: {
            siteCleaningStatus: '',
            shelterCleaningStatus: '',
        },
        lightningPM: {
            awl: '',
            securityLightAvailability: '',
            securityLightStatus: null,
            floodLightAvailability: '',
            floodLightStatus: null,
        },
        securityPM: {
            securityStatus: '',
            siteAccess: '',
        },
        otherPM: {
            feederCableStatus: '',
            changeOverSwitchStatus: '',
            earthingStatus: '',
            earthingCableStatus: '',
            fireExtinguisherStatus: '',
        },
        images: [] // This will store the uploaded images
    });
    const memoizedImages = useMemo(() => formData.images, [formData.images]);
    
    const methods = useForm({
        defaultValues: formData,
        resolver: yupResolver(newServiceReportSchema),
        mode: 'onTouched',
        reValidateMode: 'onChange',
    });
    
    const handleNext = async () => {
        console.log(activeStep)
        const currentStepFields = getFieldsForStep(activeStep);
        const stepIsValid = await methods.trigger(currentStepFields);
        if (stepIsValid) {
            if (activeStep === 8 && formData.images.length === 0) {
                toast.error("Please upload at least one image before proceeding.");
                return;
            }
            console.log({formData});
            const stepData = methods.getValues(currentStepFields);
            // Deep merge stepData into formData
            setFormData(prevData => merge({}, prevData, stepData));
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        } else {
            console.log("Please fill all required fields correctly");
        }
    };
    
    // Helper function to get fields for each step
    const getFieldsForStep = (step) => {
        switch (step) {
            case 0:
                return ['fullName', 'email', 'role'];
            case 1:
                return ['state', 'cluster', 'siteId', 'location', 'siteType'];
            case 2:
                return ['shelterType', 'pmInstance', 'servicingDate', 'nextServiceDate'];
            case 3:
                return [
                    'siteGenModes',
                    'generatorPM.defaultOperation',
                    'generatorPM.gen1Type',
                    'generatorPM.gen1Display',
                    'generatorPM.gen1Hr',
                    'generatorPM.customGen1Hr',
                    'generatorPM.gen1OperatingVoltage',
                    'generatorPM.gen1OperatingFrequency',
                    'generatorPM.gen1WorkingStatus',
                    'generatorPM.gen2Type',
                    'generatorPM.gen2Display',
                    'generatorPM.gen2Hr',
                    'generatorPM.customGen2Hr',
                    'generatorPM.gen2OperatingVoltage',
                    'generatorPM.gen2OperatingFrequency',
                    'generatorPM.gen2WorkingStatus',
                ];
            case 4:
                return [
                    'airconPM.acInstalled',
                    'airconPM.noOfACInstalled',
                    'airconPM.ac1Status',
                    'airconPM.ac2Status',
                ];
            case 5:
                return [
                    'shelterPM.siteCleaningStatus',
                    'shelterPM.shelterCleaningStatus',
                    'lightningPM.securityLightAvailability',
                    'lightningPM.securityLightStatus',
                    'lightningPM.floodLightAvailability',
                    'lightningPM.floodLightStatus',
                    'lightningPM.awl',
                ];
            case 6:
                return [
                    'dcSystem.rectifierStatus',
                    'dcSystem.backUpBatteries',
                    'dcSystem.count',
                    'dcSystem.status',
                ];
            case 7:
                return [
                    'securityPM.securityStatus',
                    'securityPM.siteAccess',
                    'otherPM.feederCableStatus',
                    'otherPM.changeOverSwitchStatus',
                    'otherPM.earthingStatus',
                    'otherPM.earthingCableStatus',
                    'otherPM.fireExtinguisherStatus',
                    'summary',
                ];
            case 8:
                return [];
            case 9:
                return ['admin_id', 'adminFullName', 'adminEmail', 'adminRole'];
            case 10:
                return [];
            default:
                return [];
        }
    };
    
    const handleBack = () => {
        setFormData((prevData) => ({...prevData, ...methods.getValues()}));
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const handleReset = async () => {
        setFormData({
            fullName: '',
            adminFullName: '',
            email: '',
            adminEmail: '',
            role: '',
            adminRole: '',
            state: '',
            cluster: '',
            siteId: '',
            location: '',
            shelterType: '',
            siteType: '',
            pmInstance: '',
            servicingDate: null,
            siteGenModes: '',
            generatorPM: {
                defaultOperation: '',
                gen1Type: '',
                gen1Display: '',
                gen1Hr: '',
                customGen1Hr: null,
                gen1OperatingVoltage: '',
                gen1OperatingFrequency: '',
                gen1WorkingStatus: '',
                gen2Type: null,
                gen2Display: null,
                gen2Hr: null,
                customGen2Hr: null,
                gen2OperatingVoltage: null,
                gen2OperatingFrequency: null,
                gen2WorkingStatus: null,
            },
            airconPM: {
                acInstalled: '',
                noOfACInstalled: '',
                ac1Status: '',
                ac2Status: '',
            },
            shelterPM: {
                siteCleaningStatus: '',
                shelterCleaningStatus: '',
            },
            lightningPM: {
                awl: '',
                securityLightAvailability: '',
                securityLightStatus: null,
                floodLightAvailability: '',
                floodLightStatus: null,
            },
            securityPM: {
                securityStatus: '',
                siteAccess: '',
            },
            otherPM: {
                feederCableStatus: '',
                changeOverSwitchStatus: '',
                earthingStatus: '',
                earthingCableStatus: '',
                fireExtinguisherStatus: '',
            },
            summary: '',
            images: [],
            
        });
        setActiveStep(0);
        methods.reset();
    };
    const onSubmit = async (data) => {
        if (activeStep === steps.length - 1) {
            // Final submission logic here
            console.log("Final form data:", {...formData, ...data});
        } else {
            
            const isStepValid = await methods.trigger();
            if (isStepValid) {
                setFormData((prevData) => ({...prevData, ...methods.getValues()}));
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                console.log({formData});
            }
        }
    };
    // const handleImagesChange = (newImages) => {
    //     // setFormData((prevData) => ({...prevData, images: newImages}));
    //     // methods.setValue('images', newImages);
    //     // Assuming `formData` is your centralized form data state
    //     setFormData(prevData => ({
    //         ...prevData,
    //         images: newImages.map(image => {
    //             // Find the corresponding existing image
    //             const existingImage = prevData.images.find(existingImage => existingImage.id === image.id);
    //
    //             // Update the existing image if found, otherwise add a new image
    //             return existingImage ? {...existingImage, ...image} : image;
    //         })
    //     }));
    //
    //     // Update the form values in react-hook-form
    //     methods.setValue("images", newImages);
    // };
    const handleImagesChange = useCallback((newImages) => {
        setFormData(prevData => {
            const updatedImages = newImages.map(newImage => {
                const existingImage = prevData.images.find(img => img.id === newImage.id);
                return existingImage ? {...existingImage, ...newImage} : newImage;
            });
            return {...prevData, images: updatedImages};
        });
        methods.setValue("images", newImages);
    }, [methods]);
    
    return (
        <FormProvider {...methods} >
            <Box>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{fontFamily: 'Poppins', fontWeight: 'bold'}}>
                                All steps completed
                            </Typography>
                            <br/><br/>
                            <Button variant="contained" color='success' onClick={handleReset}>Reset</Button>
                        </React.Fragment>
                    ) : (
                        <>
                            {activeStep === 0 && <Step1ReportingStaff allStaff={allStaff} txProps={txProps}/>}
                            {activeStep === 1 && <Step2SiteInfo allSite={allSite} txProps={txProps}/>}
                            {activeStep === 2 && <Step3ServiceInfo txProps={txProps}/>}
                            {activeStep === 3 && <Step4GeneratorPM txProps={txProps}/>}
                            {activeStep === 4 && <Step5AirconPM txProps={txProps}/>}
                            {activeStep === 5 && <Step6ShelterPM txProps={txProps}/>}
                            {activeStep === 6 && <Step7DCSystemPM txProps={txProps}/>}
                            {activeStep === 7 && <Step8OthersPM txProps={txProps}/>}
                            {activeStep === 8 && (
                                <AdvImgResizerMultiFile
                                    key={`image-uploader-${activeStep}`}
                                    initialImages={memoizedImages}
                                    onImagesChange={handleImagesChange}
                                />
                            )}
                            {activeStep === 9 && <Step10AdminApproval allStaff={allStaff} txProps={txProps}/>}
                            {activeStep === 10 && <Step11DataPreview allStaff={allStaff} txProps={txProps}/>}
                            <br/><br/>
                            <Stack direction='row' gap={4} sx={{marginBottom: '75px'}}>
                                <Button
                                    variant="contained"
                                    color='success'
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{mr: 1}}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color='error'
                                    onClick={handleNext}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Stack>
                        </>
                    )}
                </form>
            </Box>
        </FormProvider>
    );
}

export default MultiStepForm;
