'use client';
import Box from "@mui/material/Box";
import {createTheme, ThemeProvider} from '@mui/material/styles';
// import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
// import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
// import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
// import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {useState} from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {jobTitle, sitesData, siteStates} from "@/utils/data";
import Stack from "@mui/material/Stack";
import {Checkbox, Chip, FormHelperText, InputLabel, OutlinedInput, Select} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";

function Demo() {
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
    const [date, setDate] = useState(null)
    const [jobRole, setJobRole] = useState('');
    const [empType, setEmpType] = useState('');
    const [cluster, setCluster] = useState('');
    const [siteID, setSiteID] = useState([]);
    const [siteState, setSiteState] = useState('');
    const schema = yup.object().shape({
        // dob: yup.date().nullable().required('Date of Birth is required'),
        role: yup.string().required('Role is required'),
        siteState: yup.string().when('role', {
            is: (role) => role === 'Field Supervisor' || role === 'Generator Technician',
            then: () => yup.string().required('Site State is required'),
            otherwise: () => yup.string().notRequired(),
        }),
        cluster: yup.string().when('role', {
            is: (role) => role === 'Field Supervisor' || role === 'Generator Technician',
            then: () => yup.string().required('Cluster is required'),
            otherwise: () => yup.string().notRequired(),
        }),
        siteID: yup.array().when('role', {
            is: (role) => role === 'Field Supervisor' || role === 'Generator Technician',
            then: () => yup.array().of(yup.string()).min(1, 'Site ID is required').required('Site ID is required'),
            otherwise: () => yup.array().of(yup.string()).notRequired(),
        }),
    });
    const {
        control, handleSubmit, formState: {errors}, setValue, clearErrors, setError,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        reValidateMode: "onChange",
    });
    if (Object.keys(errors).length > 0) {
        console.log({errors});
    }
    
    const SubmitDOB = async (data) => {
        try {
            await schema.validate(data, {abortEarly: false});
            console.log("Validation passed!"); // Check if validation passes
            console.log({data});
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
    
    const getJobTitleOptions = () => {
        return jobTitle.map((title) => (
            <MenuItem key={title} value={title}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{title}</MenuItem>
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
    const handleSiteStateChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setSiteState(event.target.value);
        // Clear the site selection when a new state is selected
        setCluster('');
    }
    const handleClusterChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setCluster(event.target.value);
        // Clear the site selection when a new cluster is selected
        setSiteID([]);
        setValue('siteID', []);
        clearErrors('siteID');
    }
    const handleSiteChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        const {target: {value}} = event;
        setSiteID(typeof value === 'string' ? value.split(',') : value);
    }
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
    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column'
                
            }}
                 component='form'
                 onSubmit={handleSubmit(SubmitDOB)}
                 noValidate
            >
                <Typography>Demo</Typography>
                <Stack spacing={4} direction='column' alignItems='center'>
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
                                    <MenuItem value="" sx={{color: "#4BF807"}}>
                                        Select Job Role
                                    </MenuItem>
                                    {getJobTitleOptions()}
                                </TextField>
                            </FormControl>
                        )}
                    />
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
                                        <MenuItem value="" sx={{color: "#4BF807"}}>
                                            Select Site State
                                        </MenuItem>
                                        {getSiteStateOptions()}
                                    </TextField>
                                </FormControl>
                            );
                        }}
                    />
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
                                        <MenuItem value="" sx={{color: "#4BF807"}}>
                                            Select Cluster Area
                                        </MenuItem>
                                        {getClusterOptions()}
                                    </TextField>
                                </FormControl>
                            );
                        }}
                    />
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
                                            borderWidth: 1, // Set a fixed border width
                                            borderRadius: '4px', // Optional: Add rounded corners
                                            '.MuiOutlinedInput-notchedOutline': {
                                                borderColor: errors.siteID ? 'red' : '',
                                            },
                                            // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            //     borderColor: '#FB0128',
                                            // },
                                            // '&:hover .MuiOutlinedInput-notchedOutline': {
                                            //     borderColor: '#FB0128',
                                            // },
                                            '.MuiSvgIcon-root ': {
                                                // set the icon to white only when disable is false
                                                color: isDisabled ? '' : '#fff',
                                            }
                                        }}
                                    >
                                        <MenuItem value="" disabled sx={{
                                            color: "#4BF807",
                                            cursor: "not-allowed",
                                            
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
                </Stack>
                <br/>
                <Button type='submit' variant='contained' color='primary'>Submit</Button>
            </Box>
        </>
    );
}

export default Demo;