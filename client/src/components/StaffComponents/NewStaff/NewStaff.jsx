'use client';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useEffect, useState} from 'react';
import {
    Countries,
    employmentType,
    jobTitle,
    martialStatus,
    nextOfKinRelationship,
    religionIdentity,
    sex,
    sitesData,
    siteStates,
    statesAndLGAs,
    title,
    highestDegree,
    institutions,
    faculties,
    classOfDegree,
    status, mainSection,
} from "@/utils/data";
import {Controller, useForm} from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper"
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {yupResolver} from "@hookform/resolvers/yup";
import {newStaffSchema} from "@/SchemaValidator/newStaffSchema";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import Link from "next/link";
import {useRouter, usePathname} from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useMediaQuery from "@mui/material/useMediaQuery";


function NewStaff() {
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
    const pathname = usePathname();
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
                        marginTop: '-8px !important',
                    },
                },
            },
        }
    });
    // create a theme for this form strictly for setting the form error text color to #EFC3CA

    const {
        control, handleSubmit, formState: {errors}, setValue, clearErrors, setError, reset
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(newStaffSchema),
        reValidateMode: "onChange",
    });
    const router = useRouter();
    const Clear = () => {
        // clear all the content of the fields of the box components
        reset();
        setDateValue(null);
    }
    const [activeTab, setActiveTab] = useState('/dashboard/admin/staff/new');
    const [dateValue, setDateValue] = useState(null);
    const [stateOfOrigin, setStateOfOrigin] = useState('');
    const [residentState, setResidentState] = useState('');
    const [lga, setLGA] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [currentStatus, setCurrentStatus] = useState('');
    const [empType, setEmpType] = useState('');
    const [cluster, setCluster] = useState('');
    const [siteID, setSiteID] = useState([]);
    const [siteState, setSiteState] = useState('');
    const [prefix, setPrefix] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('')
    const [religion, setReligion] = useState('')
    const [gender, setGender] = useState('')
    const [country, setCountry] = useState('')
    const [nextOfKin, setNextOfKin] = useState('')
    const [degree, setDegree] = useState('')
    const [degreeClass, setDegreeClass] = useState('')
    const [institution, setInstitution] = useState('')
    const [graduation, setGraduation] = useState('')
    const [employment, setEmployment] = useState('')
    const [faculty, setFaculty] = useState('')

    const getStateOfOriginOptions = () => {
        return Object.keys(statesAndLGAs).map((stateName) => (
            <MenuItem key={stateName} value={stateName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {stateName}
            </MenuItem>
        ));
    };
    const getResidentStateOptions = () => {
        return Object.keys(statesAndLGAs).map((stateName) => (
            <MenuItem key={stateName} value={stateName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {stateName}
            </MenuItem>
        ));
    };
    /**
     * Generates a list of job title options based on the given array of job titles.
     *
     * @return {Array<JSX.Element>} An array of MenuItem components representing the job titles.
     */
    const getJobTitleOptions = () => {
        return jobTitle.map((title) => (
            <MenuItem key={title} value={title}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{title}</MenuItem>
        ));
    };
    /**
     * Generates a list of employment type options based on the given array of employment types.
     *
     * @return {Array<JSX.Element>} An array of MenuItem components representing the employment types.
     */
    const getEmploymentType = () => {
        return employmentType.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ))
    }
    const getPrefix = () => {
        return title.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ))
    }
    const getGenderType = () => {
        return sex.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    };
    const getReligionType = () => {
        return religionIdentity.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    };
    const getCountryType = () => {
        return Countries.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    };
    const getMaritalStatus = () => {
        return martialStatus.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ))
    }
    /**
     * Function to generate LGA options based on the selected state
     *
     * @returns {Array<JSX.Element>} An array of MenuItem components representing the LGA options
     */
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
    const getNextOfKinOptions = () => {
        return nextOfKinRelationship.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    }
    const getSiteStateOptions = () => {
        return siteStates.map((stateName) => (
            <MenuItem key={stateName} value={stateName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{stateName}</MenuItem>
        ));
    }
    const getClusterOptions = () => {
        if (!siteState) return [];
        return Object.keys(sitesData).map((clusterName) => (
            <MenuItem key={clusterName} value={clusterName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {clusterName}
            </MenuItem>
        ));
    };
    const getSiteOptions = () => {
        if (!cluster) return [];
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
    const getDegreeOptions = () => {
        return highestDegree.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    }
    const getDegreeClassOptions = () => {
        return classOfDegree.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    }
    const getInstitutionOptions = () => {
        return institutions.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    }
    const getFacultyOption = () => {
        return faculties.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    }
    const handleStateOfOriginChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setStateOfOrigin(event.target.value);
        // Clear the LGA selection when a new state is selected
        setLGA('');
    };
    const handleResidentStateChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setResidentState(event.target.value);
    };
    // Handle LGA selection
    const handleLGAChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setLGA(event.target.value);
    };
    // Handle Job Role selection
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
    const handlePrefixChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setPrefix(event.target.value);
    }
    const handleCountryChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setCountry(event.target.value);
    }
    const handleGenderTypeChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setGender(event.target.value);
    }
    const handleReligionTypeChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setReligion(event.target.value);
    }
    const handleMaritalStatusChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setMaritalStatus(event.target.value);
    }
    const handleNextOfKinChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setNextOfKin(event.target.value);
    }
    // Handle Employment Type selection
    const handleEmpTypeChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setEmpType(event.target.value);
    }
    const handleSiteStateChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setSiteState(event.target.value);
        // Clear the site selection when a new state is selected
        setCluster('');
    }
    // Handle Cluster selection
    const handleClusterChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setCluster(event.target.value);
        // Clear the site selection when a new cluster is selected
        setSiteID([]);
        setValue('siteID', []);
        clearErrors('siteID');
    }
    // Handle Site selection
    const handleSiteChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        const {target: {value}} = event;
        setSiteID(typeof value === 'string' ? value.split(',') : value);
    }
    const handleDegreeChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setDegree(event.target.value);
    }
    const handleDegreeClassChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setDegreeClass(event.target.value);
    }
    const handleInstitutionChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setInstitution(event.target.value);
    }
    const handleFacultyChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setFaculty(event.target.value);
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

    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
    }

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

    useEffect(() => {
        if (jobRole !== 'Field Supervisor' && jobRole !== 'Generator Technician') {
            setCluster('');
            setSiteID([]);
            setValue('cluster', ''); // Clear cluster in form
            setValue('siteID', []); // Clear siteID in form
            clearErrors(['cluster', 'siteID']); // Clear any validation errors
        }
    }, [jobRole, setValue, clearErrors]);

    // useEffect or handling navigation between new and staff
    useEffect(() => {
        if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/staff/new');
        } else {
            setActiveTab('/dashboard/admin/staff');
        }
    }, [pathname]);
    if (Object.keys(errors).length > 0) {
        console.log({errors});
    }
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ["NewStaff"],
        mutationFn: AdminUtils.NewStaff
    });
    const SubmitData = async (data) => {
        try {
            await newStaffSchema.validate(data, {abortEarly: false});
            console.log("Validation passed!"); // Check if validation passes
            mutation.mutate(data, {
                onSuccess: (response) => {
                    if (response) {
                        toast.success('New AllStaff Account Created Successfully');
                        //     refresh the query that fetched all the staff
                        queryClient.invalidateQueries({queryKey: ["AllStaff"]});
                        queryClient.invalidateQueries({queryKey: ["DashboardData"]});
                        //     clear the form fields
                        Clear();
                        router.push('/dashboard/admin/staff/all');
                    } else {
                        toast.error('Failed to create new staff account');
                    }
                },
                onError: (error) => {
                    toast.error(error.message);
                    console.log(error);
                }
            });
        } catch (e) {
            console.log({e});
            e.inner.forEach((error) => {
                setError(error.path, {
                    type: error.type,
                    message: error.message,
                });
            });
        }
    }

    return (
        <>
            <Box
                component='form'
                noValidate
                onSubmit={handleSubmit(SubmitData)}
                sx={{
                    padding: xSmall || small ? '5px' : medium || large ? '10px' : '5px',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%', // This ensures nothing overflows
                    overflow: 'hidden', // Handles overflowing content
                }}
            >
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
                            label="New"
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
                    </Tabs>
                </Stack>
                <br/><br/>
                {/*Main Form Container*/}
                <Box sx={{
                    padding: xSmall ? '2px' : small ? '4px' : '6px',
                    backgroundColor: 'inherit',
                    color: '#46F0F9',
                    borderRadius: '10px',
                    width: '100%', // Ensures Paper doesn't exceed its parent
                    maxWidth: '100%',
                }}>
                    {/* Personal Imfo Section*/}
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
                        <Grid item xs={12}>
                            {/* Prefix */}
                            <FormControl fullWidth>
                                <Controller
                                    name="title"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Title"
                                            error={!!errors.title}
                                            helperText={errors.title ? errors.title.message : ''}
                                            InputProps={{
                                                sx: {
                                                    color: "white",
                                                    bgcolor: "#274e61",
                                                    borderRadius: "10px",
                                                    width: '100px',
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
                                            <MenuItem value="" sx={{color: "#4BF807"}}>
                                                Select Prefix
                                            </MenuItem>
                                            {getPrefix()}
                                        </TextField>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*FirstName*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue=""
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
                                            label="First Name"
                                            variant="outlined"
                                            error={!!errors.firstName}
                                            helperText={errors.firstName ? errors.firstName.message : ''}
                                            required
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/* Middle Name*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="middleName"
                                    control={control}
                                    defaultValue=""
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
                                            label="Middle Name"
                                            error={!!errors.middleName}
                                            helperText={errors.middleName ? errors.middleName.message : ''}
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/* Last Name*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    defaultValue=""
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
                        {/* Second Row (3 fields) email, phone, DOB*/}
                        {/*Email*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
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
                        {/* Phone NO*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="phone"
                                    control={control}
                                    defaultValue=""
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
                        {/*DOB*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            {/* Date of Birth */}
                            <FormControl fullWidth>
                                <Controller
                                    name="dob"
                                    control={control}
                                    defaultValue={null}
                                    error={errors.dob?.message}
                                    clearErrors={clearErrors}
                                    render={({field}) => (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            {/*Date picker for DOB input*/}
                                            <ThemeProvider theme={theme}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker
                                                        {...field}
                                                        label="DOB *"
                                                        value={field.value}
                                                        onChange={(newValue) => {
                                                            field.onChange(newValue);
                                                            setDateValue(newValue);
                                                        }}
                                                        disableFuture
                                                        views={['year', 'month', 'day']}
                                                        error={!!errors.dob}
                                                        helperText={errors.dob ? errors.dob.message : ''}
                                                        inputRef={field.ref}
                                                        closeOnSelect={false}
                                                        localeText={{toolbarTitle: 'Date of Birth'}}
                                                        format={'DD/MM/YYYY'}
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
                                                </DemoContainer>
                                            </ThemeProvider>
                                        </LocalizationProvider>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*Gender*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            {/* Gender */}
                            <FormControl fullWidth>
                                <Controller
                                    name="gender"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                label="Gender"
                                                value={field.value}
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
                                        </FormControl>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*Marital Status*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            {/* Marital Status */}
                            <FormControl fullWidth>
                                <Controller
                                    name="maritalStatus"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                label="Marital Status"
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleMaritalStatusChange(e);
                                                }}
                                                required
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
                                        </FormControl>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*Religion*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            {/* Religion */}
                            <FormControl fullWidth>
                                <Controller
                                    name="religion"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                label="Religion"
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleReligionTypeChange(e);
                                                }}
                                                required
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
                                        </FormControl>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*Country*/}
                        {/* Fourth Row (3 fields) country, state, lga */}
                        {/* Country */}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="country"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Country"
                                            value={field.value}
                                            required
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
                        {/* State of Origin */}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="stateOfOrigin"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (

                                        <TextField
                                            {...field}
                                            select
                                            label="State of Origin"
                                            value={field.value}
                                            required
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
                        {/* LGA */}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="lga"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="LGA"
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
                        {/*    Nex of Kin*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            {/* NextOfKin */}
                            <FormControl fullWidth>
                                <Controller
                                    name="nextOfKin"
                                    control={control}
                                    defaultValue=""
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
                                                    },
                                                }
                                            }}
                                            id="outlined-basic"
                                            label="Name"
                                            variant="outlined"
                                            error={!!errors.nextOfKin}
                                            helperText={errors.nextOfKin ? errors.nextOfKin.message : ''}
                                            required

                                        />

                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/* Sixth row 1 field, Relationship*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="nextOfKinRelationship"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (

                                        <TextField
                                            {...field}
                                            select
                                            label="Relationship"
                                            value={field.value}
                                            error={!!errors.nextOfKinRelationship}
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
                        {/* nextOfKinPhoneNo*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            {/* NextOfKin */}
                            <FormControl fullWidth>
                                <Controller
                                    name="nextOfKinPhone"
                                    control={control}
                                    defaultValue=""
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
                                                    },
                                                }
                                            }}
                                            id="outlined-basic"
                                            label="Contact No"
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
                                    defaultValue=""
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
                                                    },
                                                }
                                            }}
                                            id="outlined-basic"
                                            label="Residential Address *"
                                            variant="outlined"
                                            error={!!errors.address}
                                            helperText={errors.address ? errors.address.message : ''}
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
                                    defaultValue=""
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

                </Box>
                <br/>
                {/* Educational Section*/}
                <Box sx={{
                    padding: xSmall ? '2px' : small ? '4px' : '6px',
                    backgroundColor: 'inherit',
                    color: '#46F0F9',
                    borderRadius: '10px',
                    width: '100%',
                    maxWidth: '100%',
                }}>
                    {/* Education Section*/}
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
                                    defaultValue=""
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Highest Degree"
                                            value={field.value}
                                            error={!!errors.highestDegree}
                                            helperText={errors.highestDegree ? errors.highestDegree.message : ''}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleDegreeChange(e);
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
                                                Select Highest Degree
                                            </MenuItem>
                                            {getDegreeOptions()}
                                        </TextField>

                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*Institution Attended*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            {/* Higher Institution */}
                            <FormControl fullWidth>
                                <Controller
                                    name="institution"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Institution"
                                            value={field.value}
                                            required
                                            error={!!errors.institution}
                                            helperText={errors.institution ? errors.institution.message : ''}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleInstitutionChange(e);
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
                                                Select Institution
                                            </MenuItem>
                                            {getInstitutionOptions()}
                                        </TextField>

                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*Clas of Degree*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            {/* Class of Degree */}
                            <FormControl fullWidth>
                                <Controller
                                    name="classofDegree"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Class of Degree"
                                            value={field.value}
                                            error={!!errors.classofDegree}
                                            helperText={errors.classofDegree ? errors.classofDegree.message : ''}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleDegreeClassChange(e);
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
                                                Select Highest Degree
                                            </MenuItem>
                                            {getDegreeClassOptions()}
                                        </TextField>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*Faculty*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            {/* Field of Study */}
                            <FormControl fullWidth>
                                <Controller
                                    name="faculty"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (

                                        <TextField
                                            {...field}
                                            select
                                            label="Faculty"
                                            value={field.value}
                                            error={!!errors.faculty}
                                            helperText={errors.faculty ? errors.faculty.message : ''}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleFacultyChange(e);
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
                                                Select Highest Degree
                                            </MenuItem>
                                            {getFacultyOption()}
                                        </TextField>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/* Course of Study*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="courseOfStudy"
                                    control={control}
                                    defaultValue=""
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
                                                        color: "white",
                                                    },
                                                }
                                            }}
                                            sx={{
                                                color: "#46F0F9",
                                            }}
                                            label="Course Of Study"
                                            variant="outlined"
                                            error={!!errors.courseOfStudy}
                                            helperText={errors.courseOfStudy ? errors.courseOfStudy.message : ''}
                                            required
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*Year of Graduation*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            {/* Date of Graduation */}
                            <Controller
                                name="graduationDate"
                                control={control}
                                defaultValue={null}
                                error={errors.graduationDate?.message}
                                clearErrors={clearErrors}
                                render={({field}) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        {/*Date picker for DOB input*/}
                                        <ThemeProvider theme={theme}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    {...field}
                                                    sx={{
                                                        border: '2px solid salmon',
                                                        width: '260px',
                                                    }}
                                                    label="Graduation Date"
                                                    value={field.value}
                                                    onChange={(newValue) => {
                                                        field.onChange(newValue);
                                                        setGraduation(newValue);
                                                    }}
                                                    disableFuture
                                                    views={['year', 'month', 'day']}
                                                    error={!!errors.graduationDate}
                                                    helperText={errors.graduationDate ? errors.graduationDate.message : ''}
                                                    inputRef={field.ref}
                                                    closeOnSelect={false}
                                                    localeText={{toolbarTitle: 'Date of Graduation'}}
                                                    format={'DD/MM/YYYY'}
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
                                                                // border: '3px solid salmon',
                                                                // width: '300px !important', // add !important
                                                                borderRadius: '10px',
                                                                "& .MuiInputLabel-root": {
                                                                    color: '#46F0F9',
                                                                },
                                                                "& .MuiInputBase-input": { // Target input text
                                                                    color: 'white', // Set focused text color to white
                                                                },
                                                                "& .MuiFormHelperText-root": {
                                                                    color: '#EFC3CA',
                                                                    // color: 'red',
                                                                },
                                                                //     set the border color to red upon error
                                                                "& .MuiOutlinedInput-notchedOutline": {
                                                                    // borderColor: '#F51313',
                                                                    borderColor: errors.graduationDate ? 'red' : '',
                                                                },
                                                                // ensure the bgColor does not change when autofill is triggered
                                                                "& input:-webkit-autofill": {
                                                                    WebkitBoxShadow: '0 0 0 1000px #274e61 inset',
                                                                    WebkitTextFillColor: 'white',
                                                                },
                                                                "& .MuiStack-root": {
                                                                    //     set the padding top to be 0px
                                                                    paddingTop: '0px',
                                                                }
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
                                            </DemoContainer>
                                        </ThemeProvider>
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <br/>
                {/* Employment Section*/}
                <Box sx={{
                    padding: xSmall ? '2px' : small ? '4px' : '6px',
                    backgroundColor: 'inherit',
                    color: '#46F0F9',
                    borderRadius: '10px',
                    width: '100%',
                    maxWidth: '100%',
                }}>
                    {/* Education Section*/}
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

                            {/* Employment Type */}
                            <FormControl fullWidth>
                                <Controller
                                    name="employmentType"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (

                                        <TextField
                                            {...field}
                                            select
                                            label="Employment Type"
                                            value={field.value}
                                            error={!!errors.employmentType}
                                            helperText={errors.employmentType ? errors.employmentType.message : ''}
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

                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            {/* Job Role */}
                            <FormControl fullWidth>
                                <Controller
                                    name="role"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (

                                        <TextField
                                            {...field}
                                            select
                                            label="Role"
                                            value={field.value}
                                            required
                                            error={!!errors.role}
                                            helperText={errors.role ? errors.role.message : ''}
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
                        {/*Year of Employment*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            {/* Year of Employment */}
                            <Controller
                                name="employmentDate"
                                control={control}
                                defaultValue={null}
                                error={errors.employmentDate?.message}
                                clearErrors={clearErrors}
                                render={({field}) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        {/*Date picker for Employment date input*/}
                                        <ThemeProvider theme={theme}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    {...field}
                                                    sx={{'.mui-bgwg5s-MuiStack-root': {paddingTop: 0}}}
                                                    label="Employment Date *"
                                                    value={field.value}
                                                    onChange={(newValue) => {
                                                        field.onChange(newValue);
                                                        setEmployment(newValue);
                                                    }}
                                                    disableFuture
                                                    views={['year', 'month', 'day']}
                                                    error={!!errors.employmentDate}
                                                    helperText={errors.employmentDate ? errors.employmentDate.message : ''}
                                                    inputRef={field.ref}
                                                    closeOnSelect={false}
                                                    localeText={{toolbarTitle: 'Date of Employment'}}
                                                    format={'DD/MM/YYYY'}
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
                                                                // width: '350px',
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
                                                                    borderColor: errors.employmentDate ? 'red' : '',
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
                                            </DemoContainer>
                                        </ThemeProvider>
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>
                        {/*Next row containing 3 fields:= Site information row : state, cluster, siteID*/}
                        <Grid item xs={12}>
                            <Typography variant="h6"
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            color: '#FFF',
                                            fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.1rem' : '1.2rem',
                                        }}>Site Information-:<br/>
                                Applicable to Technicians and Field Supervisors Role</Typography>
                        </Grid>
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="siteState"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => {
                                        const isDisabled = !(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician');
                                        return (
                                            <TextField
                                                {...field}
                                                select
                                                label="Site State"
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
                                                    Select Site State
                                                </MenuItem>
                                                {getSiteStateOptions()}
                                            </TextField>

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
                                    defaultValue=""
                                    render={({field}) => {
                                        const isDisabled = !(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician');
                                        return (
                                            <TextField
                                                {...field}
                                                select
                                                label="Cluster Area"
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
                                    defaultValue={[]}
                                    render={({field}) => {
                                        const isDisabled = !(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician');
                                        return (
                                            <>
                                                <InputLabel
                                                    id="siteID-label"
                                                    sx={{
                                                        color: "#46F0F9",
                                                        '&.Mui-focused': {color: '#fff'},
                                                    }}
                                                    error={!isDisabled && !!errors.siteID}
                                                >
                                                    Site ID
                                                </InputLabel>
                                                <Select
                                                    {...field}
                                                    labelId="siteID-label"
                                                    multiple
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleSiteChange(e);
                                                    }}
                                                    input={<OutlinedInput label="Site ID"/>}
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
                                                        // width: '350px',
                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: errors.siteID ? 'red' : '',
                                                        },
                                                        '.MuiSvgIcon-root': {
                                                            color: isDisabled ? '' : '#fff',
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="" disabled
                                                              sx={{color: "#4BF807", cursor: "not-allowed"}}>
                                                        Select Site ID
                                                    </MenuItem>
                                                    {getSiteOptions()}
                                                </Select>

                                                <FormHelperText
                                                    error={!!(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician') && !!errors.siteID}>
                                                    {errors.siteID?.message}
                                                </FormHelperText>
                                            </>
                                        );
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <br/>
                {/* Security Section*/}
                <Box sx={{
                    padding: xSmall ? '2px' : small ? '4px' : '6px',
                    backgroundColor: 'inherit',
                    color: '#46F0F9',
                    borderRadius: '10px',
                    width: '100%',
                    maxWidth: '100%',
                }}>
                    {/* Education Section*/}
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6"
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            color: '#FFF',
                                            fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.1rem' : '1.2rem',
                                        }}>
                                Security Information
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6"
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            color: '#FFF',
                                            fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.1rem' : '1.2rem',
                                        }}>
                                Set default password as &quot;Staff@123&quot;
                            </Typography>
                        </Grid>
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
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
                                            label="Password"
                                            variant="outlined"
                                            error={!!errors.password}
                                            helperText={errors.password ? errors.password.message : ''}
                                            required
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            {/* Job Role */}
                            <FormControl fullWidth>
                                <Controller
                                    name="status"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Role"
                                            value={field.value}
                                            required
                                            error={!!errors.status}
                                            helperText={errors.status ? errors.status.message : ''}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleCurrentStatusChange(e);
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
                                            {getCurrentStatus()}
                                        </TextField>

                                    )}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <br/>
                {/*Submitting button */}
                <Stack direction='row' gap={2} sx={{marginBottom: '50px'}}>
                    <Link href="/dashboard/admin/staff">
                        <Button variant="contained" color='success' title='Back' size="small">
                            Back
                        </Button>
                    </Link>
                    <Button variant="contained" color='info' onClick={Clear} type='reset' title='Clear'
                            size="small">
                        Clear
                    </Button>
                    <Button variant="contained" color='error' type='submit' title='Submit' size="small">
                        Submit
                    </Button>
                </Stack>
            </Box>
        </>
    )
}

export default NewStaff;