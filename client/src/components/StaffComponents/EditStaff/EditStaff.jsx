'use client';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useState} from "react";
import {useRouter, usePathname} from "next/navigation";
import Link from "next/link";
import {toast} from 'react-toastify';
import {Checkbox, Chip, FormHelperText, InputLabel, OutlinedInput, Paper, Select} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {
    Countries,
    martialStatus,
    nextOfKinRelationship,
    religionIdentity,
    sex,
    statesAndLGAs,
    title,
    siteStates,
    employmentType,
    jobTitle,
    sitesData,
    status,
} from "@/utils/data";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import AdminUtils from "@/utils/AdminUtilities";
import {editStaffSchema} from "@/SchemaValidator/StaffValidator/StaffSchema"
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import useMediaQuery from "@mui/material/useMediaQuery";
import AdminUtilities from "@/utils/AdminUtilities";
import useStaffStore from "@/store/useStaffStore";

function EditStaff({id, staffData}) {
    const theme = createTheme({
        components: {
            // Assuming you are using MUI v5; adjust based on your version
            MuiPaper: {  // Often, the calendar uses a Paper component for the dropdown
                styleOverrides: {
                    root: {
                        backgroundColor: "#274e61", // Change to any color you prefer
                        color: '#ffffff',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        color: '#FFF',
                        '&:hover': {
                            backgroundColor: '#191844',
                        },
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: '#FFF',
                    },
                },
            },
            MuiStack: {
                styleOverrides: {
                    root: {
                        // marginTop: '8px !important',
                        width: '200px',
                    },
                },
            },
        }
    });
    // Media Queries for responsiveness
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');

    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/staff/edit');
    const {setEncryptedStaffData} = useStaffStore.getState();


    const [gender, setGender] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [currentStatus, setCurrentStatus] = useState('');
    const [religion, setReligion] = useState('');
    const [employment, setEmployment] = useState('');
    const [dateValue, setDateValue] = useState(null);
    const [stateOfOrigin, setStateOfOrigin] = useState('');
    const [residentState, setResidentState] = useState('');
    const [lga, setLGA] = useState('');
    const [empType, setEmpType] = useState('');
    const [jobRole, setJobRole] = useState(staffData.role || '');
    const [cluster, setCluster] = useState(staffData.cluster || '');
    const [siteID, setSiteID] = useState(staffData.siteID || []);
    const [siteState, setSiteState] = useState('');
    const [prefix, setPrefix] = useState('');
    const [country, setCountry] = useState('')
    const [nextOfKin, setNextOfKin] = useState('')
    const [initialValues, setInitialValues] = useState({});
    const [graduation, setGraduation] = useState('');
    const {
        control, handleSubmit, formState: {errors}, setValue, clearErrors, setError, reset, watch
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(editStaffSchema),
        reValidateMode: "onChange",
    });

    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
    }
    // *********************State Management**********************
    // Gender state
    const getGenderType = () => {
        return sex.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    };
    const handleGenderTypeChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setGender(event.target.value);
    }
    // Current Account Status state
    const getCurrentStatus = () => {
        return status.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ))
    }
    const handleCurrentStatusChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setCurrentStatus(event.target.value);
    }
    // Marital Status state
    const getMaritalStatus = () => {
        return martialStatus.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ))
    }
    const handleMaritalStatusChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setMaritalStatus(event.target.value);
    }
    // Religion state
    const getReligionType = () => {
        return religionIdentity.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    };
    const handleReligionTypeChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setReligion(event.target.value);
    }
    // State of Origin
    const getStateOfOriginOptions = () => {
        return Object.keys(statesAndLGAs).map((stateName) => (
            <MenuItem key={stateName} value={stateName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {stateName}
            </MenuItem>
        ));
    };
    const handleStateOfOriginChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setStateOfOrigin(event.target.value);
        // Clear the LGA selection when a new state is selected
        setLGA('');
    };
    // Country
    const getCountryType = () => {
        return Countries.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    };
    const handleCountryChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setCountry(event.target.value);
    }
    // LGA
    const getLGAOptions = () => {
        if (!stateOfOrigin) {
            return [];
        }
        return statesAndLGAs[stateOfOrigin].map((lgaName) => (
            <MenuItem
                key={lgaName}
                value={lgaName}
                sx={{
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#051935'
                    }
                }}
            >
                {lgaName}
            </MenuItem>
        ));
    };
    const handleLGAChange = (event) => {
        // prevent default action of submitting the form

        event.preventDefault();
        setLGA(event.target.value);
    };
    // Kin
    const getNextOfKinOptions = () => {
        return nextOfKinRelationship.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    }
    const handleNextOfKinChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setNextOfKin(event.target.value);
    }
    // Resident State
    const getResidentStateOptions = () => {
        return Object.keys(statesAndLGAs).map((stateName) => (
            <MenuItem key={stateName} value={stateName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {stateName}
            </MenuItem>
        ));
    };
    const handleResidentStateChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setResidentState(event.target.value);
    };
    // Employment Type
    const getEmploymentType = () => {
        return employmentType.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ))
    }
    const handleEmpTypeChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setEmpType(event.target.value);
    }
    // Job Role
    const getJobTitleOptions = () => {
        return jobTitle.map((title) => (
            <MenuItem key={title} value={title}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{title}</MenuItem>
        ));
    };
    const handleJobRoleChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        const role = event.target.value;
        setJobRole(event.target.value);
        // Clear the cluster and site selection when a new job role is selected
        if (role !== 'Field Supervisor' && role !== 'Generator Technician') {
            setValue('siteState', '');
            setValue('cluster', '');
            setValue('siteID', []);
        }
    }
    // AllSite State Selection
    const getSiteStateOptions = () => {
        return siteStates.map((stateName) => (
            <MenuItem key={stateName} value={stateName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{stateName}</MenuItem>
        ));
    };
    const handleSiteStateChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setSiteState(event.target.value);
        // Clear the site selection when a new state is selected
        setCluster('');
    }
    // Cluster Selection
    const getClusterOptions = () => {
        if (!siteState) {
            return [];
        }
        return Object.keys(sitesData).map((clusterName) => (
            <MenuItem key={clusterName} value={clusterName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {clusterName}
            </MenuItem>
        ));
    };
    const handleClusterChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setCluster(event.target.value);
        // Clear the site selection when a new cluster is selected
        setSiteID([]);
        setValue('siteID', []);
        clearErrors('siteID');
    }
    // AllSite Selection
    const getSiteOptions = () => {
        if (!cluster) {
            return [];
        }
        return sitesData[cluster].map((siteName) => (
            <MenuItem key={siteName} value={siteName}
                      sx={{
                          color: 'white',
                          '&:hover': {
                              backgroundColor: '#051935'
                          },
                          '&.Mui-selected': {
                              backgroundColor: '#051935'
                          }
                      }}>
                <Checkbox color="error" checked={siteID.includes(siteName)}/>
                <ListItemText primary={siteName}/>
            </MenuItem>
        ));
    }
    const handleSiteChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        const {target: {value}} = event;
        setSiteID(typeof value === 'string' ? value.split(',') : value);
    };

    // check if stateOfOrigin is set, and if true auto select it's corresponding lga from the staff data
    // also check if role is Field Supervisor or Generator Technician, and if true auto select the siteState,  cluster and siteID from the staff data
    // all this should only happen when edit page is loaded and only once
    useEffect(() => {
            if (staffData.stateOfOrigin) {
                setStateOfOrigin(staffData.stateOfOrigin);
                setLGA(staffData.lga);
            }
            if (staffData.role === 'Field Supervisor' || staffData.role === 'Generator Technician') {
                setCluster(staffData.cluster);
                setSiteID(staffData.siteID);
                setSiteState(staffData.siteState);
            }
        }, [staffData, setValue]
    );

    // Menu Style props
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                backgroundColor: '#274e61',
                color: 'white',
            },
        },
    };

    // useEffect for handling error changes text across the edit form
    useEffect(() => {
        if (jobRole !== 'Field Supervisor' && jobRole !== 'Generator Technician') {
            setCluster('');
            setSiteID([]);
            setValue('cluster', ''); // Clear cluster in form
            setValue('siteID', []); // Clear siteID in form
            clearErrors(['cluster', 'siteID']); // Clear any validation errors
        }
    }, [jobRole, setValue, clearErrors]);

    // useEffect or handling navigation between view and edits
    useEffect(() => {
        if (pathname.includes('view')) {
            setActiveTab('/dashboard/admin/staff/view');
        } else if (pathname.includes('edit')) {
            setActiveTab('/dashboard/admin/staff/edit');
        } else {
            setActiveTab('/dashboard/admin/staff');
        }
    }, [pathname]);

    // use Effect for closely monitoring if the edit form has had any changes in it's field
    useEffect(() => {
        // Set initial form values
        const initialFormValues = {
            // Populate with staffData fields
            firstName: staffData.firstName,
            middleName: staffData.middleName,
            lastName: staffData.lastName,
            gender: staffData.gender,
            maritalStatus: staffData.maritalStatus,
            religion: staffData.religion,
            employment: staffData.employment,
            phone: staffData.phone,
            country: staffData.country,
            stateOfOrigin: staffData.stateOfOrigin,
            lga: staffData.lga,
            nextOfKin: staffData.nextOfKin,
            nextOfKinRelationship: staffData.nextOfKinRelationship,
            nextOfKinPhone: staffData.nextOfKinPhone,
            nextOfKinEmail: staffData.nextOfKinEmail,
            address: staffData.address,
            stateOfResidence: staffData.stateOfResidence,
            siteState: staffData.siteState,
            cluster: staffData.cluster,
            siteID: staffData.siteID,
            role: staffData.role,
            // Add other fields as needed
        };
        setInitialValues(initialFormValues);

        // Set form values in the useForm
        for (const [key, value] of Object.entries(initialFormValues)) {
            setValue(key, value);
        }
    }, [staffData, setValue]);

    const watchAllFields = watch(); // Watch all form fields

    const queryClient = useQueryClient()

    if (Object.keys(errors).length > 0) {
        console.log(errors);
    }

    // Mutation for updating staff profile
    const mutation = useMutation({
        mutationKey: ["UpdateStaff"],
        mutationFn: AdminUtils.UpdateStaff,
    });

    const viewStaff = async () => {
        const encryptedStaffID = await AdminUtilities.encryptObjID(id);
        // encrypt the data and store it in the session storage
        const encryptedStaffData = await AdminUtilities.encryptData(staffData);
        // Set the encrypted data in Zustand store
        setEncryptedStaffData(encryptedStaffData, encryptedStaffID);
        router.push(`/dashboard/admin/staff/view`);
    };

    const UpdateProfile = async (data) => {
        try {
            await editStaffSchema.validate(data, {abortEarly: false});
            console.log("Validation passed!"); // Check if validation passes
            data._id = staffData._id;
            mutation.mutate(data, {
                onSuccess: (response) => {
                    toast.success(response.message);
                    setTimeout(() => {
                        router.push('/dashboard/admin/staff/all');
                    }, 1500);
                    //     refresh the query that fetched all the staff
                    queryClient.invalidateQueries({queryKey: ["AllStaff"]});
                    queryClient.invalidateQueries({queryKey: ["Biodata"]});

                },
                onError: (error) => {
                    toast.error(error.message);
                    router.refresh();
                }
            });
        } catch (e) {
            toast.error("Form Validation Error");
            e.inner.forEach((error) => {
                setError(error.path, {
                    type: error.type,
                    message: error.message,
                });
            });
        }
    };
    // Compare initial and current form values
    const isFormChanged = JSON.stringify(initialValues) !== JSON.stringify(watchAllFields);
    return (
        <Box
            component='form'
            onSubmit={handleSubmit(UpdateProfile)}
            noValidate
            sx={{
                padding: xSmall || small ? '5px' : medium || large ? '10px' : '5px',
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '100%', // This ensures nothing overflows
                overflow: 'hidden', // Handles overflowing content
            }}
        >
            {/*Nav Section*/}
            <Stack direction='row' spacing={2} sx={{
                justifyContent: 'flex-start',
            }}>
                <Tabs value={activeTab}
                      onChange={(e, newValue) => setActiveTab(newValue)}
                      centered
                      sx={{
                          '& .MuiTabs-indicator': {
                              backgroundColor: '#46F0F9',
                          },
                      }}
                >
                    <Tab
                        label="Staff"
                        component={Link}
                        href="/dashboard/admin/staff"
                        value="/dashboard/admin/staff"
                        sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                            "&.Mui-selected": {
                                color: "#46F0F9",
                            },
                        }}
                    />
                    <Tab
                        label="All"
                        component={Link}
                        href="/dashboard/admin/staff/all"
                        value="/dashboard/admin/staff/all"
                        sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                            "&.Mui-selected": {
                                color: "#46F0F9",
                            },
                        }}
                    />
                    <Tab
                        label="New +"
                        component={Link}
                        href="/dashboard/admin/staff/new"
                        value="/dashboard/admin/staff/new"
                        sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                            "&.Mui-selected": {
                                color: "#46F0F9",
                            },
                        }}
                    />
                    <Tab
                        label="View"
                        component={Link}
                        onClick={viewStaff}
                        href="/dashboard/admin/staff/view"
                        value="/dashboard/admin/staff/view"
                        sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                            "&.Mui-selected": {
                                color: "#46F0F9",
                            },
                        }}
                    />
                    <Tab
                        label="Edit"
                        href="/dashboard/admin/staff/edit"
                        value="/dashboard/admin/staff/edit"
                        sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                            "&.Mui-selected": {
                                color: "#46F0F9",
                            },
                        }}
                    />
                </Tabs>
            </Stack>
            <br/><br/>
            {/* Main Form*/}
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h6"
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.1rem' : '1.2rem',
                                }}>
                        Personal Information
                    </Typography>
                </Grid>
                {/*Title*/}
                <Grid item xs={6}>
                    {/* Prefix */}
                    <FormControl fullWidth>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue={staffData.title}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    label='Titile'
                                    InputProps={{
                                        sx: txProps,
                                        readOnly: true
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            },
                                        }
                                    }}
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#134357',
                                                    color: 'white',
                                                    maxHeight: 450,
                                                    overflow: 'auto',
                                                },
                                            },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#fff',
                                        },
                                        '& .MuiSelect-icon:hover': {
                                            color: '#fff',
                                        },
                                    }}
                                >
                                </TextField>
                            )}
                        />
                    </FormControl>
                </Grid>
                {/*Status*/}
                <Grid item xs={6}>
                    {/* Status */}
                    <FormControl fullWidth>
                        <Controller
                            name="status"
                            control={control}
                            defaultValue={staffData.status || 'N/A'}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    select
                                    value={field.value}
                                    label='Status'
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleCurrentStatusChange(e);
                                    }}
                                    required
                                    error={!!errors.staus}
                                    helperText={errors.status ? errors.status.message : ''}
                                    InputProps={{
                                        sx: txProps,
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            },
                                        }
                                    }}
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#134357',
                                                    color: 'white',
                                                    maxHeight: 450,
                                                    overflow: 'auto',
                                                },
                                            },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#fff',
                                        },
                                        '& .MuiSelect-icon:hover': {
                                            color: '#fff',
                                        },
                                    }}>
                                    <MenuItem value="" sx={{color: "#4BF807"}}>
                                        Select Status
                                    </MenuItem>
                                    {getCurrentStatus()}
                                </TextField>
                            )}
                        />
                    </FormControl>
                </Grid>
                {/*    Personal Info*/}
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue={staffData.firstName}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    label='First Name'
                                    InputProps={{
                                        sx: {
                                            color: "white",
                                            bgcolor: "#274e61",
                                            borderRadius: "10px",
                                        },
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            },
                                        }
                                    }}
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="middleName"
                            control={control}
                            defaultValue={staffData.middleName || ""}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    InputProps={{
                                        sx: txProps
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white",
                                            },
                                        }
                                    }}
                                    sx={{
                                        color: "#46F0F9",
                                    }}
                                    label='Middle Name'
                                    variant="outlined"
                                    error={!!errors.middleName}
                                    helperText={errors.middleName ? errors.middleName.message : ''}
                                    required
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue={staffData.lastName}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    InputProps={{
                                        sx: txProps
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            }
                                        }
                                    }}
                                    sx={{
                                        color: "#46F0F9",
                                    }}
                                    label="Last Name"
                                    variant="outlined"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName ? errors.lastName.message : ''}
                                    required
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue={staffData.email}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    InputProps={{
                                        sx: txProps,
                                        readOnly: true
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            }
                                        }
                                    }
                                    }
                                    sx={{
                                        color: "#46F0F9",
                                    }}
                                    label="Email Address"
                                    variant="outlined"
                                    autoComplete="off"
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email.message : ''}
                                    required
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue={staffData.phone}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    InputProps={{
                                        sx: txProps,
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            }
                                        }
                                    }
                                    }
                                    sx={{
                                        color: "#46F0F9",
                                    }}
                                    label="Phone Number"
                                    variant="outlined"
                                    error={!!errors.phone}
                                    helperText={errors.phone ? errors.phone.message : ''}
                                    required
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="dob"
                            control={control}
                            defaultValue={staffData.dob === '' ? null : dayjs(staffData.dob)}
                            error={errors.dob?.message}
                            clearErrors={clearErrors}
                            render={({field}) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    {/*Date picker for DOB input*/}
                                    <DatePicker
                                        {...field}
                                        value={field.value}
                                        onChange={(newValue) => {
                                            field.onChange(newValue);
                                            setDateValue(newValue);
                                        }}
                                        label={"DOB"}
                                        disableFuture
                                        views={['year', 'month', 'day']}
                                        error={!!errors.dob}
                                        readOnly
                                        helperText={errors.dob ? errors.dob.message : ''}
                                        inputRef={field.ref}
                                        closeOnSelect={false}
                                        localeText={{toolbarTitle: 'Date of Birth'}}
                                        format={'DD/MMM/YYYY'}
                                        slotProps={{
                                            openPickerButton: {
                                                sx: {
                                                    color: 'white',
                                                }
                                            },
                                            textField: {
                                                sx: {
                                                    color: 'white',
                                                    bgcolor: '#274e61',
                                                    borderRadius: '10px',
                                                    "& .MuiInputLabel-root": {
                                                        color: '#46F0F9',
                                                    },
                                                    "& .MuiInputBase-input": { // Target input text
                                                        color: 'white', // Set focused text color to white
                                                    },
                                                    "& .MuiFormHelperText-root": {
                                                        // color: '#FDBFC9',
                                                        color: 'red',
                                                    },
                                                    //     set the border color to red upon error
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        // borderColor: '#F51313',
                                                        borderColor: errors.dob ? 'red' : '',
                                                    },
                                                    // ensure the bgColor does not change when autofill is triggered
                                                    "& input:-webkit-autofill": {
                                                        WebkitBoxShadow: '0 0 0 1000px #274e61 inset',
                                                        WebkitTextFillColor: 'white',
                                                    },
                                                },
                                                helperText: errors.dob ? errors.dob.message : null,
                                            },
                                            actionBar: {
                                                actions: ['cancel', 'clear', 'accept'],
                                            },
                                            toolbar: {
                                                hidden: false,
                                                sx: {
                                                    // set the title 'Select Date' to white text
                                                    '& .MuiTypography-root': {
                                                        color: '#FFF',
                                                    },
                                                },
                                            },
                                            tabs: {
                                                hidden: false
                                            },
                                            layout: {
                                                sx: {
                                                    '& .MuiDayCalendar-weekDayLabel': {
                                                        color: '#F51313',
                                                        backgroundColor: '#0B0337',
                                                        borderRadius: '50px',

                                                    },
                                                },
                                            },
                                            day: {
                                                sx: {
                                                    color: 'white',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 'bold',
                                                    '&:hover': {
                                                        backgroundColor: '#07053B',
                                                    },
                                                }
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue={staffData.gender}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    select
                                    value={field.value}
                                    label="Gender"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleGenderTypeChange(e);
                                    }}
                                    required
                                    error={!!errors.gender}
                                    helperText={errors.gender ? errors.gender.message : ''}
                                    InputProps={{
                                        sx: txProps,
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            },
                                        }
                                    }}
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#134357',
                                                    color: 'white',
                                                    maxHeight: 450,
                                                    overflow: 'auto',
                                                },
                                            },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#fff',
                                        },
                                        '& .MuiSelect-icon:hover': {
                                            color: '#fff',
                                        },
                                    }}>
                                    <MenuItem value="" sx={{color: "#4BF807"}}>
                                        Select Gender
                                    </MenuItem>
                                    {getGenderType()}
                                </TextField>

                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="maritalStatus"
                            control={control}
                            defaultValue={staffData.maritalStatus}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    select
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleMaritalStatusChange(e);
                                    }}
                                    required
                                    label={"Marital Status"}
                                    error={!!errors.maritalStatus}
                                    helperText={errors.maritalStatus ? errors.maritalStatus.message : ''}
                                    InputProps={{
                                        sx: txProps,
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            },
                                        }
                                    }}
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#134357',
                                                    color: 'white',
                                                    maxHeight: 450,
                                                    overflow: 'auto',
                                                },
                                            },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#fff',
                                        },
                                        '& .MuiSelect-icon:hover': {
                                            color: '#fff',
                                        },
                                    }}>
                                    <MenuItem value="" sx={{color: "#4BF807"}}>
                                        Select Marital Status
                                    </MenuItem>
                                    {getMaritalStatus()}
                                </TextField>

                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="religion"
                            control={control}
                            defaultValue={staffData.religion}
                            render={({field}) => (

                                <TextField
                                    {...field}
                                    select
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleReligionTypeChange(e);
                                    }}
                                    required
                                    lable={"Religion"}
                                    error={!!errors.religion}
                                    helperText={errors.religion ? errors.religion.message : ''}
                                    InputProps={{
                                        sx: txProps,
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            },
                                        }
                                    }}
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#134357',
                                                    color: 'white',
                                                    maxHeight: 450,
                                                    overflow: 'auto',
                                                },
                                            },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#fff',
                                        },
                                        '& .MuiSelect-icon:hover': {
                                            color: '#fff',
                                        },
                                    }}>
                                    <MenuItem value="" sx={{color: "#4BF807"}}>
                                        Select Religion
                                    </MenuItem>
                                    {getReligionType()}
                                </TextField>

                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="country"
                            control={control}
                            defaultValue={staffData.country}
                            render={({field}) => (

                                <TextField
                                    {...field}
                                    select
                                    value={field.value}
                                    required
                                    label={"Country"}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleCountryChange(e);
                                    }}
                                    error={!!errors.country}
                                    helperText={errors.country ? errors.country.message : ''}
                                    InputProps={{
                                        sx: txProps,
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            },
                                        }
                                    }}
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#134357',
                                                    color: 'white',
                                                    maxHeight: 450,
                                                    overflow: 'auto',
                                                },
                                            },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#fff',
                                        },
                                        '& .MuiSelect-icon:hover': {
                                            color: '#fff',
                                        },
                                    }}>
                                    <MenuItem value="" sx={{color: "#4BF807"}}>
                                        Select Country
                                    </MenuItem>
                                    {getCountryType()}
                                </TextField>

                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="stateOfOrigin"
                            control={control}
                            defaultValue={staffData.stateOfOrigin || ""}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    select
                                    value={field.value}
                                    required
                                    label={"State of Origin"}
                                    error={!!errors.stateOfOrigin}
                                    helperText={errors.stateOfOrigin ? errors.stateOfOrigin.message : ''}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleStateOfOriginChange(e);
                                    }}
                                    InputProps={{
                                        sx: txProps,
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            },
                                        }
                                    }}
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#134357',
                                                    color: 'white',
                                                    maxHeight: 450,
                                                    overflow: 'auto',
                                                },
                                            },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#fff',
                                        },
                                        '& .MuiSelect-icon:hover': {
                                            color: '#fff',
                                        },
                                    }}>
                                    <MenuItem value="" sx={{color: "#4BF807"}}>
                                        Select State of Origin
                                    </MenuItem>
                                    {getStateOfOriginOptions()}
                                </TextField>

                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="lga"
                            control={control}
                            defaultValue={staffData.lga}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    select
                                    label={"LGA"}
                                    value={field.value}
                                    required
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleLGAChange(e);
                                    }}
                                    error={!!errors.lga}
                                    helperText={errors.lga ? errors.lga.message : ''}
                                    InputProps={{
                                        sx: txProps,
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            },
                                        }
                                    }}
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#134357',
                                                    color: 'white',
                                                    maxHeight: 400,
                                                    overflow: 'auto',
                                                },
                                            },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#fff',
                                        },
                                        '& .MuiSelect-icon:hover': {
                                            color: '#fff',
                                        },
                                    }}>
                                    <MenuItem value="" sx={{color: "#4BF807"}}>Select LGA</MenuItem>
                                    {getLGAOptions()}
                                </TextField>
                            )}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <br/>
            {/*Next of Kin Information*/}
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h6"
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.1rem' : '1.2rem',
                                }}>
                        Next of Kin Information
                    </Typography>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="nextOfKin"
                            control={control}
                            defaultValue={staffData.nextOfKin}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    InputProps={{
                                        sx: txProps
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white",
                                            },
                                        }
                                    }}
                                    sx={{
                                        color: "#46F0F9",
                                    }}
                                    label='Next of Kin'
                                    variant="outlined"
                                    error={!!errors.nextOfKin}
                                    helperText={errors.nextOfKin ? errors.nextOfKin.message : ''}
                                    required
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    {/* Relationship*/}
                    <FormControl fullWidth>
                        <Controller
                            name="nextOfKinRelationship"
                            control={control}
                            defaultValue={staffData.nextOfKinRelationship}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    select
                                    value={field.value}
                                    error={!!errors.nextOfKinRelationship}
                                    label={"Relationship"}
                                    helperText={errors.nextOfKinRelationship ? errors.nextOfKinRelationship.message : ''}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleNextOfKinChange(e);
                                    }}
                                    required
                                    InputProps={{
                                        sx: txProps,
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            },
                                        }
                                    }}
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#134357',
                                                    color: 'white',
                                                    maxHeight: 450,
                                                    overflow: 'auto',
                                                },
                                            },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#fff',
                                        },
                                        '& .MuiSelect-icon:hover': {
                                            color: '#fff',
                                        },
                                    }}>
                                    <MenuItem value="" sx={{color: "#4BF807"}}>
                                        Select Relationship
                                    </MenuItem>
                                    {getNextOfKinOptions()}
                                </TextField>
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    {/* Phone Number*/}
                    <FormControl fullWidth>
                        <Controller
                            name="nextOfKinPhone"
                            control={control}
                            defaultValue={staffData.nextOfKinPhone}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    InputProps={{
                                        sx: txProps
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white",
                                            },
                                        }
                                    }}
                                    sx={{
                                        color: "#46F0F9",
                                    }}
                                    label='Phone Number'
                                    variant="outlined"
                                    error={!!errors.nextOfKinPhone}
                                    helperText={errors.nextOfKinPhone ? errors.nextOfKinPhone.message : ''}
                                    required
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6"
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.1rem' : '1.2rem',
                                }}>Residential Address
                    </Typography>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    {/* Residential Address */}
                    <FormControl fullWidth>
                        <Controller
                            name="address"
                            control={control}
                            defaultValue={staffData.address}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    InputProps={{
                                        sx: txProps
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white",
                                            },
                                        }
                                    }}
                                    sx={{
                                        color: "#46F0F9",
                                    }}
                                    label='Address'
                                    variant="outlined"
                                    error={!!errors.address}
                                    helperText={errors.address ? errors.address.message : ''}
                                    required
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    {/* State of Residence */}
                    <FormControl fullWidth>
                        <Controller
                            name="stateOfResidence"
                            control={control}
                            defaultValue={staffData.stateOfResidence}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    select
                                    label="State of Residence"
                                    value={field.value}
                                    required
                                    error={!!errors.stateOfResidence}
                                    helperText={errors.stateOfResidence ? errors.stateOfResidence.message : ''}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleResidentStateChange(e);
                                    }}
                                    InputProps={{
                                        sx: txProps,
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            },
                                        }
                                    }}
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#134357',
                                                    color: 'white',
                                                    maxHeight: 450,
                                                    overflow: 'auto',
                                                },
                                            },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#fff',
                                        },
                                        '& .MuiSelect-icon:hover': {
                                            color: '#fff',
                                        },
                                    }}>
                                    <MenuItem value="" sx={{color: "#4BF807"}}>
                                        Select State of Residence
                                    </MenuItem>
                                    {getResidentStateOptions()}
                                </TextField>
                            )}
                        />

                    </FormControl>
                </Grid>
            </Grid>
            <br/>
            {/*Education*/}
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h6"
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.1rem' : '1.2rem',
                                }}>
                        Education Information
                    </Typography>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    {/* Eduction Degree */}
                    <FormControl fullWidth>
                        <Controller
                            name="highestDegree"
                            control={control}
                            defaultValue={staffData.highestDegree || ""}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    lable={"Highest Degree"}
                                    InputProps={{
                                        sx: txProps,
                                        readOnly: true
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white",
                                            },
                                        }
                                    }}
                                    sx={{
                                        color: "#46F0F9",
                                    }}
                                    variant="outlined"
                                    helperText={errors.highestDegree ? errors.highestDegree.message : ''}
                                    required

                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    {/* Higher Institution */}
                    <FormControl fullWidth>
                        <Controller
                            name="institution"
                            control={control}
                            defaultValue={staffData.institution || ""}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label={"Institution"}
                                    InputProps={{
                                        sx: txProps,
                                        readOnly: true,
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white",
                                            },
                                        }
                                    }}
                                    sx={{
                                        color: "#46F0F9",
                                    }}
                                    variant="outlined"
                                    error={!!errors.institution}
                                    helperText={errors.institution ? errors.institution.message : ''}
                                    required
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="faculty"
                            control={control}
                            defaultValue={staffData.faculty ? staffData.faculty : ""}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label={"Faculty"}
                                    InputProps={{
                                        sx: txProps,
                                        readOnly: true,
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white",
                                            },
                                        }
                                    }}
                                    sx={{
                                        color: "#46F0F9",
                                    }}
                                    variant="outlined"
                                    error={!!errors.faculty}
                                    helperText={errors.faculty ? errors.faculty.message : ''}
                                    required
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="courseOfStudy"
                            control={control}
                            defaultValue={staffData.courseOfStudy ? staffData.courseOfStudy : ""}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    InputProps={{
                                        sx: txProps
                                    }}
                                    label={"Course of Study"}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white",
                                            },
                                        }
                                    }}
                                    sx={{
                                        color: "#46F0F9",
                                    }}
                                    variant="outlined"
                                    error={!!errors.courseOfStudy}
                                    helperText={errors.courseOfStudy ? errors.courseOfStudy.message : ''}
                                    required
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="classofDegree"
                            control={control}
                            defaultValue={staffData.classofDegree ? staffData.classofDegree : ""}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    InputProps={{
                                        sx: txProps,
                                        readOnly: true,
                                    }}
                                    label={"Class of Degree"}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white",
                                            },
                                        }
                                    }}
                                    sx={{
                                        color: "#46F0F9",
                                    }}
                                    variant="outlined"
                                    error={!!errors.classofDegree}
                                    helperText={errors.classofDegree ? errors.classofDegree.message : ''}
                                    required
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="graduationDate"
                            control={control}
                            defaultValue={staffData.graduationDate === '' ? null : dayjs(staffData.graduationDate)}
                            error={errors.graduationDate?.message}
                            clearErrors={clearErrors}
                            render={({field}) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    {/*Date picker for DOB input*/}
                                    <DatePicker
                                        {...field}
                                        // label="DOB *"
                                        value={field.value}
                                        onChange={(newValue) => {
                                            field.onChange(newValue);
                                            setGraduation(newValue);
                                        }}
                                        label={"Graduation Date"}
                                        disableFuture
                                        views={['year', 'month', 'day']}
                                        error={!!errors.graduationDate}
                                        readOnly
                                        helperText={errors.graduationDate ? errors.graduationDate.message : ''}
                                        inputRef={field.ref}
                                        closeOnSelect={false}
                                        localeText={{toolbarTitle: 'Date of Birth'}}
                                        format={'DD/MMM/YYYY'}
                                        slotProps={{
                                            openPickerButton: {
                                                sx: {
                                                    color: 'white',
                                                }
                                            },
                                            textField: {
                                                sx: {
                                                    color: 'white',
                                                    bgcolor: '#274e61',
                                                    borderRadius: '10px',
                                                    "& .MuiInputLabel-root": {
                                                        color: '#46F0F9',
                                                    },
                                                    "& .MuiInputBase-input": { // Target input text
                                                        color: 'white', // Set focused text color to white
                                                    },
                                                    "& .MuiFormHelperText-root": {
                                                        // color: '#FDBFC9',
                                                        color: 'red',
                                                    },
                                                    //     set the border color to red upon error
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        // borderColor: '#F51313',
                                                        borderColor: errors.dob ? 'red' : '',
                                                    },
                                                    // ensure the bgColor does not change when autofill is triggered
                                                    "& input:-webkit-autofill": {
                                                        WebkitBoxShadow: '0 0 0 1000px #274e61 inset',
                                                        WebkitTextFillColor: 'white',
                                                    },
                                                },
                                                helperText: errors.graduationDate ? errors.graduationDate.message : null,
                                            },
                                            actionBar: {
                                                actions: ['cancel', 'clear', 'accept'],
                                            },
                                            toolbar: {
                                                hidden: false,
                                                sx: {
                                                    // set the title 'Select Date' to white text
                                                    '& .MuiTypography-root': {
                                                        color: '#FFF',
                                                    },
                                                },
                                            },
                                            tabs: {
                                                hidden: false
                                            },
                                            layout: {
                                                sx: {
                                                    '& .MuiDayCalendar-weekDayLabel': {
                                                        color: '#F51313',
                                                        backgroundColor: '#0B0337',
                                                        borderRadius: '50px',

                                                    },
                                                },
                                            },
                                            day: {
                                                sx: {
                                                    color: 'white',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 'bold',
                                                    '&:hover': {
                                                        backgroundColor: '#07053B',
                                                    },
                                                }
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <br/>
            {/*Employment Info*/}
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h6"
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.1rem' : '1.2rem',
                                }}>
                        Employment Information
                    </Typography>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="employmentType"
                            control={control}
                            defaultValue={staffData.employmentType}
                            render={({field}) => (
                                <FormControl fullWidth>
                                    <TextField
                                        {...field}
                                        select
                                        value={field.value}
                                        error={!!errors.employmentType}
                                        helperText={errors.employmentType ? errors.employmentType.message : ''}
                                        lable={"Type"}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleEmpTypeChange(e);
                                        }}
                                        required
                                        InputProps={{
                                            sx: txProps,
                                        }}
                                        InputLabelProps={{
                                            sx: {
                                                color: "#46F0F9",
                                                "&.Mui-focused": {
                                                    color: "white"
                                                },
                                            }
                                        }}
                                        SelectProps={{
                                            MenuProps: {
                                                PaperProps: {
                                                    sx: {
                                                        backgroundColor: '#134357',
                                                        color: 'white',
                                                        maxHeight: 450,
                                                        overflow: 'auto',
                                                    },
                                                },
                                            },
                                        }}
                                        sx={{
                                            '& .MuiSelect-icon': {
                                                color: '#fff',
                                            },
                                            '& .MuiSelect-icon:hover': {
                                                color: '#fff',
                                            },
                                        }}>
                                        <MenuItem value="" sx={{color: "#4BF807"}}>
                                            Select Employment
                                        </MenuItem>
                                        {getEmploymentType()}
                                    </TextField>
                                </FormControl>
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="role"
                            control={control}
                            defaultValue={staffData.role}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    select
                                    value={field.value}
                                    required
                                    error={!!errors.role}
                                    helperText={errors.role ? errors.role.message : ''}
                                    label={"Role"}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleJobRoleChange(e);
                                    }}
                                    InputProps={{
                                        sx: txProps,
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            },
                                        }
                                    }}
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#134357',
                                                    color: 'white',
                                                    maxHeight: 450,
                                                    overflow: 'auto',
                                                },
                                            },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#fff',
                                        },
                                        '& .MuiSelect-icon:hover': {
                                            color: '#fff',
                                        },
                                    }}>
                                    <MenuItem value="" sx={{
                                        color: "#4BF807",
                                        cursor: "not-allowed",
                                    }}>
                                        Select Job Role
                                    </MenuItem>
                                    {getJobTitleOptions()}
                                </TextField>
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="employmentDate"
                            control={control}
                            defaultValue={staffData.employmentDate === '' ? null : dayjs(staffData.employmentDate)}
                            error={errors.employmentDate?.message}
                            clearErrors={clearErrors}
                            render={({field}) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    {/*Date picker for DOB input*/}
                                    <DatePicker
                                        {...field}
                                        // label="DOB *"
                                        value={field.value}
                                        onChange={(newValue) => {
                                            field.onChange(newValue);
                                            setGraduation(newValue);
                                        }}
                                        disableFuture
                                        views={['year', 'month', 'day']}
                                        error={!!errors.employmentDate}
                                        readOnly
                                        helperText={errors.employmentDate ? errors.employmentDate.message : ''}
                                        inputRef={field.ref}
                                        closeOnSelect={false}
                                        localeText={{toolbarTitle: 'Date of Birth'}}
                                        format={'DD/MMM/YYYY'}
                                        slotProps={{
                                            openPickerButton: {
                                                sx: {
                                                    color: 'white',
                                                }
                                            },
                                            textField: {
                                                sx: {
                                                    color: 'white',
                                                    bgcolor: '#274e61',
                                                    borderRadius: '10px',
                                                    width: '350px',
                                                    "& .MuiInputLabel-root": {
                                                        color: '#46F0F9',
                                                    },
                                                    "& .MuiInputBase-input": { // Target input text
                                                        color: 'white', // Set focused text color to white
                                                    },
                                                    "& .MuiFormHelperText-root": {
                                                        // color: '#FDBFC9',
                                                        color: 'red',
                                                    },
                                                    //     set the border color to red upon error
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        // borderColor: '#F51313',
                                                        borderColor: errors.dob ? 'red' : '',
                                                    },
                                                    // ensure the bgColor does not change when autofill is triggered
                                                    "& input:-webkit-autofill": {
                                                        WebkitBoxShadow: '0 0 0 1000px #274e61 inset',
                                                        WebkitTextFillColor: 'white',
                                                    },
                                                },
                                                helperText: errors.employmentDate ? errors.employmentDate.message : null,
                                            },
                                            actionBar: {
                                                actions: ['cancel', 'clear', 'accept'],
                                            },
                                            toolbar: {
                                                hidden: false,
                                                sx: {
                                                    // set the title 'Select Date' to white text
                                                    '& .MuiTypography-root': {
                                                        color: '#FFF',
                                                    },
                                                },
                                            },
                                            tabs: {
                                                hidden: false
                                            },
                                            layout: {
                                                sx: {
                                                    '& .MuiDayCalendar-weekDayLabel': {
                                                        color: '#F51313',
                                                        backgroundColor: '#0B0337',
                                                        borderRadius: '50px',

                                                    },
                                                },
                                            },
                                            day: {
                                                sx: {
                                                    color: 'white',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 'bold',
                                                    '&:hover': {
                                                        backgroundColor: '#07053B',
                                                    },
                                                }
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6"
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.1rem' : '1.2rem',
                                }}>AllSite Information-:<br/>
                        Applicable to Technicians and Field Supervisors Role</Typography>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="siteState"
                            control={control}
                            defaultValue={staffData.siteState || ''}
                            render={({field}) => {
                                const isDisabled = !(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician');
                                return (
                                    <Stack direction="column" spacing={1}>
                                        <Typography variant="subtitle1" gutterBottom>AllSite State *</Typography>
                                        <TextField
                                            {...field}
                                            select
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleSiteStateChange(e);
                                            }}
                                            disabled={isDisabled}
                                            required={!isDisabled}
                                            error={!isDisabled && !!errors.siteState}
                                            helperText={!isDisabled && errors.siteState ? errors.siteState.message : ''}
                                            InputProps={{
                                                sx: txProps,
                                            }}
                                            InputLabelProps={{
                                                sx: {
                                                    color: "#46F0F9",
                                                    "&.Mui-focused": {
                                                        color: "white"
                                                    },
                                                }
                                            }}
                                            SelectProps={{
                                                MenuProps: {
                                                    PaperProps: {
                                                        sx: {
                                                            backgroundColor: '#134357',
                                                            color: 'white',
                                                            maxHeight: 450,
                                                            overflow: 'auto',
                                                        },
                                                    },
                                                },
                                            }}
                                            sx={{
                                                '& .MuiSelect-icon': {
                                                    color: '#fff',
                                                },
                                                '& .MuiSelect-icon:hover': {
                                                    color: '#fff',
                                                },
                                            }}
                                        >
                                            <MenuItem value="" sx={{
                                                color: "#4BF807",
                                                cursor: "not-allowed",
                                                // pointerEvents: "none"
                                            }}>
                                                Select AllSite State
                                            </MenuItem>
                                            {getSiteStateOptions()}
                                        </TextField>
                                    </Stack>
                                );
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="cluster"
                            control={control}
                            defaultValue={staffData.cluster || ""}
                            render={({field}) => {
                                const isDisabled = !(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician');
                                return (
                                    <Stack direction="column" spacing={1}>
                                        <Typography variant="subtitle1" gutterBottom>Cluster *</Typography>
                                        <TextField
                                            {...field}
                                            select
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleClusterChange(e);
                                            }}
                                            disabled={isDisabled}
                                            required={!isDisabled}
                                            error={!isDisabled && !!errors.cluster}
                                            helperText={!isDisabled && errors.cluster ? errors.cluster.message : ''}
                                            InputProps={{
                                                sx: txProps,
                                            }}
                                            InputLabelProps={{
                                                sx: {
                                                    color: "#46F0F9",
                                                    "&.Mui-focused": {
                                                        color: "white"
                                                    },
                                                }
                                            }}
                                            SelectProps={{
                                                MenuProps: {
                                                    PaperProps: {
                                                        sx: {
                                                            backgroundColor: '#134357',
                                                            color: 'white',
                                                            maxHeight: 450,
                                                            overflow: 'auto',
                                                        },
                                                    },
                                                },
                                            }}
                                            sx={{
                                                '& .MuiSelect-icon': {
                                                    color: '#fff',
                                                },
                                                '& .MuiSelect-icon:hover': {
                                                    color: '#fff',
                                                },
                                            }}
                                        >
                                            <MenuItem value="" sx={{
                                                color: "#4BF807",
                                                cursor: "not-allowed",
                                                // pointerEvents: "none"
                                            }}>
                                                Select Cluster Area
                                            </MenuItem>
                                            {getClusterOptions()}
                                        </TextField>
                                    </Stack>
                                );
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="siteID"
                            control={control}
                            defaultValue={staffData.site || []}
                            errors={errors}
                            render={({field}) => {
                                const isDisabled = !(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician');
                                return (
                                    <Stack direction="column" spacing={1}>
                                        <Typography variant="subtitle1" gutterBottom>AllSite IDs *</Typography>
                                        <InputLabel
                                            id="siteID-label"
                                            sx={{
                                                color: "#46F0F9",
                                                '&.Mui-focused': {
                                                    color: '#fff',
                                                },
                                            }}
                                            disabled={isDisabled}
                                            error={!isDisabled && !!errors.siteID}
                                        >
                                        </InputLabel>
                                        <Select
                                            {...field}
                                            id="siteID-select"
                                            labelId="siteID-label"
                                            multiple
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleSiteChange(e);
                                            }}
                                            input={<OutlinedInput label="AllSite ID"/>}
                                            renderValue={(selected) => (
                                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} sx={{
                                                            backgroundColor: '#00193C',
                                                            color: 'white'
                                                        }}/>
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                            disabled={isDisabled}
                                            sx={{
                                                backgroundColor: '#134357',
                                                color: 'white',
                                                maxHeight: 450,
                                                overflow: 'auto',
                                                width: '350px',
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    borderColor: errors.siteID ? 'red' : '',
                                                },
                                                '.MuiSvgIcon-root ': {
                                                    // set the icon to white only when disable is false
                                                    color: isDisabled ? '' : '#fff',

                                                }
                                            }}
                                        >
                                            <MenuItem value="" disabled sx={{
                                                color: "#4BF807",
                                                cursor: "not-allowed"
                                            }}>
                                                Select AllSite ID
                                            </MenuItem>
                                            {getSiteOptions()}
                                        </Select>
                                        <FormHelperText
                                            error={!!(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician') && !!errors.siteID}>
                                            {errors.siteID?.message}
                                        </FormHelperText>
                                    </Stack>
                                );
                            }}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <br/>
            {/*Submitting button */}
            <Stack direction='row' gap={2} sx={{marginBottom: '75px', justifyContent: 'space-around'}}>
                <Link href="/dashboard/admin/staff">
                    <Button variant="contained" color='success' title='Back'> Back </Button>
                </Link>
                <Button variant="contained" color='error' type='submit' title='Submit'>
                    Submit
                </Button>
            </Stack>
        </Box>
    );
}


export default EditStaff;