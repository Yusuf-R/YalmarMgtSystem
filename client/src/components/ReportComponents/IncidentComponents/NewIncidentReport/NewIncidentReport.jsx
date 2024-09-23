import Box from "@mui/material/Box";
import {autoCompleteSx, baseFields, categoryFields, mainSection, txProps} from "@/utils/data";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React, {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import BaseInfo from "@/components/ReportComponents/IncidentComponents/BaseInfo/BaseInfo";

import IncidentCategorySelector
    from "@/components/ReportComponents/IncidentComponents/IncidentCategorySelector/IncidentCategorySelector"
import {FormProvider, useForm} from 'react-hook-form';
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
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {baseInfoSchema} from "@/SchemaValidator/IncidentValidators/baseInfoSchema";
import {fuelIncidentSchema} from "@/SchemaValidator/IncidentValidators/fuelIncidentSchema";
import {siteIncidentSchema} from "@/SchemaValidator/IncidentValidators/siteIncidentSchema";
import {serviceIncidentSchema} from "@/SchemaValidator/IncidentValidators/serviceIncidentSchema";
import {staffIncidentSchema} from "@/SchemaValidator/IncidentValidators/staffIncidentSchema";
import {categorySelectorSchema} from "@/SchemaValidator/IncidentValidators/categorySelectorSchema";
import {descriptionSchema} from "@/SchemaValidator/IncidentValidators/descriptionSchema";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import {usePathname} from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";


function cleanData(data, selectedCategories) {
    const cleanedData = {};
    
    // Step 1: Add base fields to the cleaned data
    baseFields.forEach(field => {
        if (data[field] !== undefined) {
            cleanedData[field] = data[field];
        }
    });
    
    // Step 2: Add fields related to the selected categories
    selectedCategories.forEach(category => {
        const fields = categoryFields[category];
        fields.forEach(field => {
            if (data[field] !== undefined) {
                cleanedData[field] = data[field];
            }
        });
    });
    
    return cleanedData;
}

function base64ToFile(base64Data, filename) {
    // Split the base64 string to get the MIME type and the actual base64 data
    const arr = base64Data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}

const filterReportData = (data) => {
    const {
        reportCategory,
        staffInfo,
        staffIncidentInfo,
        siteInfo,
        siteIncidentInfo,
        fuelIncidentInfo,
        fuelSiteInfo,
        serviceIncidentInfo,
        serviceSiteInfo,
    } = data;
    
    // Keep base credentials
    const filteredData = {
        adminFullName: data.adminFullName,
        adminEmail: data.adminEmail,
        adminRole: data.adminRole,
        incidentDate: data.incidentDate,
        severity: data.severity,
        reportCategory: data.reportCategory,
        reportDescription: data.reportDescription,
        images: data.images,
        admin_id: data.admin_id,
    };
    
    // Check if Staff category is selected, add only Staff-related info
    if (reportCategory.includes('Staff')) {
        filteredData.staffInfo = staffInfo;
        filteredData.staffIncidentInfo = staffIncidentInfo;
    }
    
    // Check if Site category is selected, add only Site-related info
    if (reportCategory.includes('Site')) {
        filteredData.siteInfo = siteInfo;
        filteredData.siteIncidentInfo = siteIncidentInfo;
    }
    
    // Check if Fuel category is selected, add only Fuel-related info
    if (reportCategory.includes('Fuel')) {
        filteredData.fuelSiteInfo = fuelSiteInfo;
        filteredData.fuelIncidentInfo = fuelIncidentInfo;
    }
    if (reportCategory.includes('Service')) {
        filteredData.serviceSiteInfo = serviceSiteInfo;
        filteredData.serviceIncidentInfo = serviceIncidentInfo;
    }
    
    // You can add similar checks for other categories like Service, Others, etc.
    
    return filteredData;
};
const serializeObject = (obj) => {
    const serialized = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
            // Handle nested objects
            serialized[key] = JSON.stringify(value);
        } else if (Array.isArray(value)) {
            // Handle arrays
            serialized[key] = JSON.stringify(value);
        } else {
            serialized[key] = value;
        }
    }
    return serialized;
};

function generateSchema(selectedCategories) {
    let combinedSchema = yup.object().shape({
        ...baseInfoSchema.fields,
        ...categorySelectorSchema.fields,
        ...descriptionSchema.fields,
    });
    
    if (selectedCategories.includes('Staff')) {
        combinedSchema = combinedSchema.concat(staffIncidentSchema);
    }
    if (selectedCategories.includes('Fuel')) {
        combinedSchema = combinedSchema.concat(fuelIncidentSchema);
    }
    if (selectedCategories.includes('Site')) {
        combinedSchema = combinedSchema.concat(siteIncidentSchema);
    }
    if (selectedCategories.includes('Service')) {
        combinedSchema = combinedSchema.concat(serviceIncidentSchema);
    }
    return combinedSchema;
}

function NewIncidentReport({allStaff, allSite}) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/incident');
    
    const pathname = usePathname();
    // useEffect or handling navigation between new and staff
    useEffect(() => {
        if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/reports/incident/new');
        } else {
            setActiveTab('/dashboard/admin/incident');
        }
    }, [pathname]);
    
    const methods = useForm({
        resolver: yupResolver(generateSchema(selectedCategories)),
        mode: 'onTouched',
        reValidateMode: 'onChange',
    });
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ["NewIncidentReport"],
        mutationFn: AdminUtils.NewIncidentReport
    });
    
    const onSubmit = async (data) => {
        console.log({data});
        setIsSubmitting(true);
        const filteredData = filterReportData(data);
        if (filteredData.images) {
            delete filteredData.images;
        }
        const serializedData = serializeObject(filteredData);
        const formData = new FormData();
        // Append each key-value pair to FormData
        Object.entries(serializedData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        // Handle images separately
        if (uploadedImages && uploadedImages.length > 0) {
            uploadedImages.forEach((image, index) => {
                const img = image.isCropped ? image.croppedSrc : image.src;
                // Extract the original filename, if present, from the image object (or data)
                let originalFilename = image.file?.name || `image_${index}`; // Fallback if no filename
                // Extract the file extension (e.g., png or jpg) from the base64 string
                const ext = img.match(/\/(png|jpeg|jpg);base64/)[1];
                // Append a unique identifier to prevent overwriting (e.g., timestamp or random string)
                const uniqueIdentifier = Date.now();
                const filename = `${originalFilename.replace(/\.[^/.]+$/, "")}_${uniqueIdentifier}.${ext}`;
                // Convert the base64 string to a File object
                const file = base64ToFile(img, filename);
                // Append the file to the formData
                formData.append('images', file);
            });
        }
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        // sending the data to the BE
        mutation.mutate(formData, {
            onSuccess: () => {
                queryClient.invalidateQueries('IncidentReports');
                setIsSubmitting(false);
                methods.reset();
                setSelectedCategories([]);
                setUploadedImages([]);
                methods.clearErrors();
                window.location.reload();
                toast.success('Incident Report submitted successfully');
            },
            onError: () => {
                setIsSubmitting(false);
                toast.error('Error: Report submission failed');
            },
        });
    };
    
    useEffect(() => {
        methods.reset({}, {
            keepValues: true,
            resolver: yupResolver(generateSchema(selectedCategories)),
        });
    }, [selectedCategories]);
    
    
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
    
    const onImagesChange = (images) => {
        setUploadedImages(images); // Store the images in the parent component's state
    };
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
    
    const {errors} = methods.formState;
    console.log(errors);
    
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
                    {/*Navigation Tabs */}
                    <Stack direction='row' spacing={2} sx={{
                        justifyContent: 'flex-start',
                    }}>
                        <Tabs
                            value={activeTab}
                            onChange={(e, newValue) => setActiveTab(newValue)}
                            centered
                            sx={{
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#46F0F9',
                                },
                            }}
                        >
                            
                            <Tab
                                label="Home"
                                component={Link}
                                href="/dashboard/admin/reports/incident"
                                value="/dashboard/admin/reports/incident"
                                sx={{
                                    color: "#FFF",
                                    fontWeight: 'bold',
                                    "&.Mui-selected": {
                                        color: "#46F0F9",
                                    },
                                }}
                            />
                            <Tab
                                label="New"
                                component={Link}
                                href="/dashboard/admin/reports/incident/new"
                                value="/dashboard/admin/reports/incident/new"
                                sx={{
                                    color: "#FFF",
                                    fontWeight: 'bold',
                                    "&.Mui-selected": {
                                        color: "#46F0F9",
                                    },
                                }}
                            />
                        </Tabs>
                    </Stack>
                    <br/>
                    <Box
                        component='form'
                        onSubmit={methods.handleSubmit(onSubmit)}
                        noValidate
                    >
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
                        <ImageUpload onImagesChange={onImagesChange}/>
                        <br/>
                        {/*Loading submission screen*/}
                        {isSubmitting && <LazyComponent Command='Submitting'/>}
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
