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
    title
} from "@/utils/data";
import {Controller, useForm} from "react-hook-form";
import {Checkbox, FormHelperText, OutlinedInput, Paper} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import {Chip, InputLabel, Select} from "@mui/material/";
import {yupResolver} from "@hookform/resolvers/yup";
import {userSchema} from "@/SchemaValidator/userSchema";
import {useMutation} from "@tanstack/react-query";
import UserUtils from "@/utils/UserUtilities";
import {toast} from "react-toastify";


function NewStaff() {
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
        }
    });
    const {
        control, handleSubmit, formState: {errors}, setValue, clearErrors, setError, reset
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(userSchema),
        reValidateMode: "onChange",
    });
    
    const Home = () => {
        window.location.href = '/dashboard/admin/staff';
    }
    const Clear = () => {
        // clear all the content of the fields of the box components
        console.log('Hi User Form');
        reset();
        setDateValue(null);
    }
    const [dateValue, setDateValue] = useState(null);
    const [state, setState] = useState('');
    const [residentState, setResidentState] = useState('');
    const [lga, setLGA] = useState('');
    const [jobRole, setJobRole] = useState('');
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
    
    
    const getStateOptions = () => {
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
        if (!state) return [];
        return statesAndLGAs[state].map((lgaName) => (
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
    const handleStateChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setState(event.target.value);
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
    
    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
        width: '400px',
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
    
    
    if (Object.keys(errors).length > 0) {
        console.log({errors});
    }
    const mutation = useMutation({
        mutationKey: ["newStaff"],
        mutationFn: UserUtils.NewUser
    });
    
    const SubmitData = async (data) => {
        try {
            await userSchema.validate(data, {abortEarly: false});
            console.log("Validation passed!"); // Check if validation passes
            mutation.mutate(data, {
                onSuccess: (response) => {
                    if (response) {
                        toast.success('New Staff Account Created Successfully');
                        setTimeout(() => {
                            Clear();
                        }, 2500);
                    } else {
                        toast.error('Failed to create new staff account');
                    }
                },
                onError: (error) => {
                    console.log({error});
                    toast.error(error.message);
                    setTimeout(() => {
                    }, 1500);
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
            <Box sx={{
                padding: '20px',
                width: 'calc(100% - 250px)',
                position: 'absolute',
                top: '70px',
                left: '250px',
            }}
                 component='form'
                 noValidate
                 onSubmit={handleSubmit(SubmitData)}>
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
                    <Typography variant='h5'>New User Account Form</Typography>
                </Paper>
                {/*registration form here*/}
                {/*<Grid container spacing={2}>*/}
                <br/>
                <br/>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h5">Personal Information</Typography>
                    </Grid>
                    
                    <Paper elevation={5} sx={{
                        alignContent: 'start',
                        padding: '30px',
                        backgroundColor: 'inherit',
                        color: '#46F0F9',
                        borderRadius: '10px',
                        width: '100%',
                        height: 'auto',
                        margin: '25px'
                    }}>
                        {/* First Row (1 fields) prefix */}
                        <Grid container spacing={4}>
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
                            {/* First Row (3 fields) Name, middle-name, lastname */}
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
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
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
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
                            </Grid>
                            {/* Second Row (3 fields) email, phone, DOB*/}
                            <Grid item xs={4}>
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
                            </Grid>
                            <Grid item xs={4}>
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
                            </Grid>
                            <Grid item xs={4}>
                                {/* Date of Birth */}
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
                            </Grid>
                            {/* Third Row (3 fields) Gender, Marital Status , Religion*/}
                            <Grid item xs={4}>
                                {/* Gender */}
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
                            </Grid>
                            <Grid item xs={4}>
                                {/* Marital Status */}
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
                            </Grid>
                            <Grid item xs={4}>
                                {/* Religion */}
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
                            </Grid>
                            {/* Fourth Row (3 fields) country, state, lga */}
                            <Grid item xs={4}>
                                {/* Country */}
                                <Controller
                                    name="country"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth>
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
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {/* State of Origin */}
                                <Controller
                                    name="state"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                label="State of Origin"
                                                value={field.value}
                                                required
                                                error={!!errors.state}
                                                helperText={errors.state ? errors.state.message : ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleStateChange(e);
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
                                                    Select State
                                                </MenuItem>
                                                {getStateOptions()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {/* LGA */}
                                <Controller
                                    name="lga"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth>
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
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/* fifth row 1 field nextOfKin Information text*/}
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h6" color="white">Next of Kin
                                    Information</Typography>
                            </Grid>
                            {/* sixth row 3 field nextOfKin, relationship, nextOfKinPhoneNo*/}
                            <Grid item xs={4}>
                                {/* NextOfKin */}
                                <Controller
                                    name="nextOfKin"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth>
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
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/* Sixth row 1 field, Relationship*/}
                            <Grid item xs={4}>
                                <Controller
                                    name="nextOfKinRelationship"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth>
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
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/* nextOfKinPhoneNo*/}
                            <Grid item xs={4}>
                                {/* NextOfKin */}
                                <Controller
                                    name="nextOfKinPhone"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth>
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
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h6" color="white">Residential Address</Typography>
                            </Grid>
                            {/* Eight Row 1 field residential address  */}
                            <Grid item xs={4}>
                                {/* Residential Address */}
                                <Controller
                                    name="address"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                InputProps={{
                                                    sx: {...txProps, width: '550px'},
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
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {/* State of Residence */}
                                <Controller
                                    name="stateOfResidence"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth>
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
                                                    marginLeft: '100px',
                                                }}>
                                                <MenuItem value="" sx={{color: "#4BF807"}}>
                                                    Select State of Residence
                                                </MenuItem>
                                                {getResidentStateOptions()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                    {/* **************************** ********************** ******************* */}
                    {/* Next section will contain Employment info*/}
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h5">Employment Information</Typography>
                    </Grid>
                    <Paper elevation={5} sx={{
                        alignContent: 'start',
                        padding: '30px',
                        backgroundColor: 'inherit',
                        color: '#46F0F9',
                        borderRadius: '10px',
                        width: '100%',
                        height: 'auto',
                        margin: '25px'
                    }}>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                {/* Employment Type */}
                                <Controller
                                    name="employmentType"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth>
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
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {/* Job Role */}
                                <Controller
                                    name="role"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth>
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
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/*Next row containing 3 fields:= Site information row : state, cluster, siteID*/}
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h6" color='white'>Site Information -: (Applicable to
                                    Technicians
                                    and
                                    Field Supervisors Role)</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="siteState"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => {
                                        const isDisabled = !(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician');
                                        return (
                                            <FormControl fullWidth>
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
                                            </FormControl>
                                        );
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="cluster"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => {
                                        const isDisabled = !(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician');
                                        return (
                                            <FormControl fullWidth>
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
                                            </FormControl>
                                        );
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="siteID"
                                    control={control}
                                    defaultValue={[]}
                                    errors={errors}
                                    render={({field}) => {
                                        const isDisabled = !(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician');
                                        return (
                                            <FormControl fullWidth>
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
                                                    Site ID
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
                                                        Select Site ID
                                                    </MenuItem>
                                                    {getSiteOptions()}
                                                </Select>
                                                <FormHelperText
                                                    error={!!(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician') && !!errors.siteID}>
                                                    {errors.siteID?.message}
                                                </FormHelperText>
                                            </FormControl>
                                        );
                                    }}
                                />
                            </Grid>
                        
                        </Grid>
                    </Paper>
                </Grid>
                <br/>
                <br/>
                
                {/*Submitting button */}
                <Stack direction='row' gap={2} sx={{marginBottom: '75px'}}>
                    <Button variant="contained" color='success' onClick={Home} title='Back'> Back </Button>
                    <Button variant="contained" color='secondary' onClick={Clear} type='reset'
                            title='Clear'> Clear </Button>
                    <Button variant="contained" color='error' type='submit' title='Submit'> Submit </Button>
                </Stack>
            </Box>
        </>
    )
}

export default NewStaff;