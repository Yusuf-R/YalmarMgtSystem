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
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from "@mui/material/styles";
import {useState} from 'react';
import {statesAndLGAs} from "@/utils/data";
import {jobTitle} from "@/utils/data";
import {employmentType} from "@/utils/data";
import {sitesData} from "@/utils/data";
import {siteStates} from "@/utils/data";
import {title} from "@/utils/data";
import {martialStatus} from "@/utils/data";
import {religionIdentity} from "@/utils/data";
import {sex} from "@/utils/data";
import {useForm, Controller} from "react-hook-form";
import {Checkbox, OutlinedInput, Paper} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import {Chip, InputLabel, Select} from "@mui/material/";
import {yupResolver} from "@hookform/resolvers/yup";
import {schemaLogin} from "@/SchemaValidator/login";


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
    const Home = () => {
        window.location.href = '/dashboard/admin/staff';
    }
    const Clear = () => {
        // clear all the content of the fields of the box components
        console.log('Hi User Form');
        alert('Form Cleared');
    }
    
    const [dateValue, setDateValue] = useState(null);
    const [state, setState] = useState('');
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
    
    const getStateOptions = () => {
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
    }
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
        setJobRole(event.target.value);
    }
    const handlePrefixChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setPrefix(event.target.value);
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
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schemaLogin),
    });
    
    const SubmitData = (data) => {
        console.log({data})
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
                 onSubmit={handleSubmit(SubmitData)}
            >
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
                                        name='prefix'
                                        control={control}
                                        defaultValue=''
                                        shouldUpdate={(prev, next) => true}
                                        render={({onChange, value}) => (
                                            <TextField
                                                select
                                                label="Title"
                                                value={value}
                                                onChange={onChange}
                                                required
                                                InputProps={{
                                                    sx: {
                                                        ...txProps,
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
                                                }}>
                                                <MenuItem value="" sx={{color: "#4BF807"}}>
                                                    Select Prefix
                                                </MenuItem>
                                                {getPrefix()}
                                            </TextField>
                                        )}/>
                                </FormControl>
                            </Grid>
                            {/* First Row (3 fields) Name, middle-name, lastname */}
                            <Grid item xs={4}>
                                {/* Name */}
                                <TextField
                                    InputProps={{
                                        sx: txProps
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9", // Set label text color
                                            "&.Mui-focused": { // when focused, set label color to white
                                                color: "white",
                                            },
                                        }
                                    }}
                                    sx={{
                                        color: "#46F0F9",
                                    }}
                                    id="outlined-basic"
                                    required
                                    label="First Name"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {/* Middle Name */}
                                <TextField
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
                                    id="outlined-basic"
                                    label="Middle Name"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {/* Last Name */}
                                <TextField
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
                                    id="outlined-basic"
                                    required
                                    label="Last Name"
                                    variant="outlined"
                                />
                            </Grid>
                            {/* Second Row (3 fields) email, phone, DOB*/}
                            <Grid item xs={4}>
                                {/* Email */}
                                <TextField
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
                                    id="outlined-basic"
                                    required
                                    label="Email Address"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {/* Phone */}
                                <TextField
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
                                    label="Phone Number"
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {/* Date of Birth */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    {/*Date picker for DOB input*/}
                                    <ThemeProvider theme={theme}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker
                                                label="DOB *"
                                                value={dateValue}
                                                onChange={(newValue) => setDateValue(newValue)}
                                                disableFuture
                                                closeOnSelect={false}
                                                localeText={{toolbarTitle: 'Date of Birth'}}
                                                format={'DD/MM/YYYY'}
                                                renderInput={(params) => <TextField {...params} />}
                                                // sx={{
                                                //     "& .MuiButtonBase-root": {
                                                //         color: "#FC2204"
                                                //     },
                                                // }}
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
                                                        },
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
                            </Grid>
                            {/* Third Row (3 fields) Gender, Marital Status , Religion*/}
                            <Grid item xs={4}>
                                {/* Gender */}
                                <FormControl fullWidth>
                                    <TextField
                                        select
                                        label="Gender"
                                        value={gender}
                                        onChange={handleGenderTypeChange}
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
                                            Select Gender
                                        </MenuItem>
                                        {getGenderType()}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                {/* Marital Status */}
                                <FormControl fullWidth>
                                    <TextField
                                        select
                                        label="Marital Status"
                                        value={maritalStatus}
                                        onChange={handleMaritalStatusChange}
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
                                            Select Marital Status
                                        </MenuItem>
                                        {getMaritalStatus()}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                {/* Religion */}
                                <FormControl fullWidth>
                                    <TextField
                                        select
                                        label="Religion"
                                        value={religion}
                                        onChange={handleReligionTypeChange}
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
                                            Select Religion
                                        </MenuItem>
                                        {getReligionType()}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            {/* Second Row (3 fields)  country, state, lga */}
                            <Grid item xs={4}>
                                {/* Country */}
                                <TextField
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
                                    id="outlined-basic"
                                    label="Country"
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {/* State of Origin */}
                                <FormControl fullWidth>
                                    <TextField
                                        select
                                        label="State of Origin"
                                        value={state}
                                        required
                                        onChange={handleStateChange}
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
                            </Grid>
                            <Grid item xs={4}>
                                {/* LGA */}
                                <FormControl fullWidth>
                                    <TextField
                                        select
                                        label="LGA"
                                        value={lga}
                                        required
                                        onChange={handleLGAChange}
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
                            </Grid>
                            {/* fifth Row 1 field residential address  */}
                            <Grid item xs={12}>
                                {/* Residential Address */}
                                <TextField
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
                                <FormControl fullWidth>
                                    <TextField
                                        select
                                        label="Employment Type"
                                        value={empType}
                                        onChange={handleEmpTypeChange}
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
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        select
                                        label="Role"
                                        value={jobRole}
                                        required
                                        onChange={handleJobRoleChange}
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
                                            Select Job Role
                                        </MenuItem>
                                        {getJobTitleOptions()}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            {/*Next row containing 3 fields:= Site information row : state, cluster, siteID*/}
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h6" color='white'>Site Information -: (Applicable to
                                    Technicians
                                    and
                                    Field Supervisors Role)</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                {/*Site State */}
                                <FormControl fullWidth>
                                    <TextField
                                        select
                                        label="Site State"
                                        value={siteState}
                                        disabled={!(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician')}
                                        onChange={handleSiteStateChange}
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
                                            Select Site State
                                        </MenuItem>
                                        {getSiteStateOptions()}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                {/*Cluster*/}
                                <FormControl fullWidth>
                                    <TextField
                                        select
                                        label="Cluster Area"
                                        value={cluster}
                                        onChange={handleClusterChange}
                                        disabled={!(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician')}
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
                                            Select Cluster Area
                                        </MenuItem>
                                        {getClusterOptions()}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                {/*Site ID*/}
                                <FormControl fullWidth>
                                    <InputLabel
                                        id="siteID-label"
                                        sx={{
                                            color: "#46F0F9", // Default color
                                            '&.Mui-focused': {
                                                color: '#fff', // Change color to white when focused
                                            },
                                        }}
                                        required
                                        disabled={!(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician')}
                                    >
                                        Site ID
                                    </InputLabel>
                                    <Select
                                        id="siteID-select"
                                        labelId='siteID-label'
                                        multiple
                                        value={siteID}
                                        onChange={handleSiteChange}
                                        input={<OutlinedInput label="Site ID"/>}
                                        // renderValue={(selected) => selected.join(', ')}
                                        renderValue={(selected) => (
                                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value}
                                                          sx={{backgroundColor: '#00193C', color: 'white'}}/>
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                        options={getSiteOptions()}
                                        disabled={!(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician')}
                                        sx={{
                                            backgroundColor: '#134357',
                                            color: 'white',
                                            maxHeight: 450,
                                            overflow: 'auto',
                                            width: '350px',
                                        }}
                                    >
                                        <MenuItem value="" sx={{color: "#4BF807"}}>
                                            Select Site ID
                                        </MenuItem>
                                        {getSiteOptions()}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <br/>
                <br/>
                {/*Submitting button */}
                <Stack direction='row' gap={2} sx={{
                    marginBottom: '75px',
                }}>
                    <Button
                        variant="contained"
                        color='success'
                        onClick={Home}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color='secondary'
                        onClick={Clear}>
                        Clear
                    </Button>
                    <Button
                        variant="contained"
                        color='error'
                        onClick={SubmitData}
                    >
                        Submit
                    </Button>
                </Stack>
            </Box>
        </>
    )
}

export default NewStaff;