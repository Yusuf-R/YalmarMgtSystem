'use client';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {Controller, useForm, useWatch} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import {mainSection, sitesData, siteStates, siteStatus, type} from "@/utils/data"
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {useState, useEffect} from "react";
import DateComponent from "@/components/DateComponent/DateComponent";
import dayjs from "dayjs";

function NewServicingReport({allStaff, allSite}) {
    const router = useRouter();
    const [staffFullName, setStaffFullName] = useState('');
    const [staffEmail, setStaffEmail] = useState('');
    const [staffRole, setStaffRole] = useState('');
    const [stateMain, setStateMain] = useState('');
    const [cluster, setClusterType] = useState('');
    const [siteID, setSiteID] = useState('');
    const [siteType, setSiteType] = useState('N/A');
    const [location, setLocation] = useState('N/A');
    const [dateSupplied, setDateSupplied] = useState(null);
    
    const {
        control, handleSubmit, formState: {errors}, setError, reset, setValue, clearErrors,
    } = useForm({
        mode: "onTouched",
        // resolver: yupResolver(newFuelSupplyReportSchema),
        reValidateMode: "onChange",
    });
    const Clear = () => {
        // clear the form
        reset();
        setStateMain('');
        setClusterType('');
        setSiteID('');
        setSiteType('N/A');
        setLocation('N/A');
    };
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
    }
    // Staff info Section
    const fullNames = Array.from(new Set(allStaff.map(staff => staff.fullName)));
    
    // staff fullName
    const getFullName = () => {
        return fullNames.map((fullName) => (
            <MenuItem key={fullName} value={fullName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {fullName}
            </MenuItem>
        ));
    };
    const handleFullName = (event) => {
        event.preventDefault();
        setStaffFullName(event.target.value);
        const selectedFullName = event.target.value;
        const selectedEmail = allStaff.find(staff => staff.fullName === selectedFullName).email;
        const selectedRole = allStaff.find(staff => staff.fullName === selectedFullName).role;
        setStaffEmail(selectedEmail);
        setStaffRole(selectedRole);
        setValue('email', selectedEmail);
        setValue('role', selectedRole);
        // Clear errors for email and role
        clearErrors('email');
        clearErrors('role');
    };
    
    
    
    // Site Info Section
    const states = Array.from(new Set(allSite.map(site => site.state)));
    const clusters = Array.from(new Set(allSite.filter(site => site.state === stateMain).map(site => site.cluster)));
    const siteIds = allSite.filter(site => site.cluster === cluster).map(site => site.siteId);
    // extract the site._id from allSite base on the selected siteIds
    const site_id = allSite.filter(site => site.siteId === siteID).map(site => site._id)[0];
    
    // site State
    const getState = () => {
        return states.map((stateData) => (
            <MenuItem key={stateData} value={stateData}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {stateData}
            </MenuItem>
        ));
    };
    const handleState = (event) => {
        event.preventDefault();
        setStateMain(event.target.value);
        setClusterType('');
        setSiteID('');
        setSiteType('N/A');
        setLocation('N/A');
    };
    
    // site cluster
    const getCluster = () => {
        if (!stateMain) {
            return [];
        }
        return clusters.map((clusterData) => (
            <MenuItem key={clusterData} value={clusterData}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {clusterData}
            </MenuItem>
        ));
    };
    const handleCluster = (event) => {
        event.preventDefault();
        setClusterType(event.target.value);
        setSiteID('');
        setSiteType('N/A');
        setLocation('N/A');
    };
    
    // site ID
    const getSiteId = () => {
        if (!stateMain || !cluster) {
            return [];
        }
        return siteIds.map((siteIdData) => (
            <MenuItem key={siteIdData} value={siteIdData}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {siteIdData}
            </MenuItem>
        ));
    };
    const handleSiteId = (event) => {
        event.preventDefault();
        setSiteID(event.target.value);
        const selectedSiteId = event.target.value;
        setSiteID(selectedSiteId);
        
        const selectedSite = allSite.find(site => site.siteId === selectedSiteId);
        if (selectedSite) {
            const newLocation = selectedSite.location || 'N/A';
            const newSiteType = selectedSite.type || 'N/A';
            setLocation(newLocation);
            setSiteType(newSiteType);
            setValue('location', newLocation);
            setValue('type', newSiteType);
            // Clear errors for location and type
            clearErrors('location');
            clearErrors('type');
        } else {
            setSiteType('N/A');
            setLocation('N/A');
        }
    };
    
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
                    <Typography variant='h5'>New Fuelling Supply Report</Typography>
                </Paper>
                <br/><br/>
                <Box
                    component="form"
                    // onSubmit={handleSubmit(SubmitData)}
                    noValidate
                >
                    {/* Main Body */}
                    {/*Staff Info*/}
                    <br/><br/>
                    <Grid container spacing={4}>
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
                                    <Typography variant="subtitle 4">Staff Info</Typography>
                                </Grid>
                                {/*FullName*/}
                                <Grid item xs={4}>
                                    <Controller
                                        name="fullName"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleFullName(e);
                                                    }}
                                                    required
                                                    label="FullName"
                                                    error={!!errors.state}
                                                    helperText={errors.state ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.state.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: {
                                                            ...txProps,
                                                            width: '100%',
                                                        }
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
                                                                    fontSize: '40px',
                                                                    width: '20%'
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
                                                        textAlign: 'left',
                                                    }}>
                                                    {staffFullName !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select Staff FullName
                                                        </MenuItem>
                                                    )}
                                                    {getFullName()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*email*/}
                                {staffFullName && (
                                    <Grid item xs={4}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    InputProps={{
                                                        sx: {
                                                            ...txProps,
                                                            width: '150%',
                                                            ml: 10,
                                                        }
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                            ml: 10,
                                                        }
                                                    }}
                                                    sx={{
                                                        color: "#46F0F9",
                                                    }}
                                                    label="Staff Email"
                                                    variant="outlined"
                                                    error={!!errors.email}
                                                    helperText={errors.email ? errors.email.message : ''}
                                                    type="text"
                                                    value={staffEmail}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                                {/*role*/}
                                {staffFullName && (
                                    <Grid item xs={3}>
                                        <Controller
                                            name="role"
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    InputProps={{
                                                        sx: {...txProps, ml: 20,}
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                            ml: 20,
                                                        }
                                                    }}
                                                    sx={{
                                                        color: "#46F0F9",
                                                    }}
                                                    label="Location"
                                                    variant="outlined"
                                                    error={!!errors.role}
                                                    helperText={errors.role ? errors.role.message : ''}
                                                    type="text"
                                                    value={staffRole}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                    <br/><br/>
                    {/*Site Info*/}
                    <Grid container spacing={4}>
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
                                    <Typography variant="subtitle 4">Site Info</Typography>
                                </Grid>
                                {/*Site State*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="state"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleState(e);
                                                    }}
                                                    required
                                                    label="State"
                                                    error={!!errors.state}
                                                    helperText={errors.state ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.state.message}
                                                                                </span>
                                                    ) : ''}
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
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',
                                                                    
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
                                                        textAlign: 'left',
                                                    }}>
                                                    {stateMain !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select State
                                                        </MenuItem>
                                                    )}
                                                    {getState()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*Site cluster*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="cluster"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleCluster(e);
                                                    }}
                                                    label="Cluster"
                                                    required
                                                    error={!!errors.cluster}
                                                    helperText={errors.cluster ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.cluster.message}
                                                                                </span>
                                                    ) : ''}
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
                                                        textAlign: 'left',
                                                    }}>
                                                    {cluster !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select Cluster
                                                        </MenuItem>
                                                    )}
                                                    {getCluster()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*Site ID*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="siteId"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleSiteId(e);
                                                    }}
                                                    label="Site ID"
                                                    required
                                                    error={!!errors.siteId}
                                                    helperText={errors.siteId ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.siteId.message}
                                                                                </span>
                                                    ) : ''}
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
                                                        textAlign: 'left',
                                                    }}>
                                                    {cluster !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select SiteID
                                                        </MenuItem>
                                                    )}
                                                    {getSiteId()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*Site Type if available*/}
                                {siteID && (
                                    <Grid item xs={3}>
                                        <Controller
                                            name="type"
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
                                                    label="Site Type"
                                                    variant="outlined"
                                                    error={!!errors.type}
                                                    helperText={errors.type ? errors.type.message : ''}
                                                    type="text"
                                                    value={siteType}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                                {/*Location if available*/}
                                {siteID && (
                                    <Grid item xs={8}>
                                        <Controller
                                            name="location"
                                            control={control}
                                            defaultValue=""
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    InputProps={{
                                                        sx: {
                                                            ...txProps,
                                                            width: '500px',
                                                        }
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
                                                    label="Location"
                                                    variant="outlined"
                                                    error={!!errors.location}
                                                    helperText={errors.location ? errors.location.message : ''}
                                                    type="text"
                                                    value={location}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                    <br/><br/>
                    <Grid container spacing={4}>
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
                                    <Typography variant="subtitle 4">Service Info</Typography>
                                </Grid>
                                {/*Site State*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="state"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleState(e);
                                                    }}
                                                    required
                                                    label="State"
                                                    error={!!errors.state}
                                                    helperText={errors.state ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.state.message}
                                                                                </span>
                                                    ) : ''}
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
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',
                                                                    
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
                                                        textAlign: 'left',
                                                    }}>
                                                    {stateMain !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select State
                                                        </MenuItem>
                                                    )}
                                                    {getState()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*Site cluster*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="cluster"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleCluster(e);
                                                    }}
                                                    label="Cluster"
                                                    required
                                                    error={!!errors.cluster}
                                                    helperText={errors.cluster ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.cluster.message}
                                                                                </span>
                                                    ) : ''}
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
                                                        textAlign: 'left',
                                                    }}>
                                                    {cluster !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select Cluster
                                                        </MenuItem>
                                                    )}
                                                    {getCluster()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*Site ID*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="siteId"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleSiteId(e);
                                                    }}
                                                    label="Site ID"
                                                    required
                                                    error={!!errors.siteId}
                                                    helperText={errors.siteId ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.siteId.message}
                                                                                </span>
                                                    ) : ''}
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
                                                        textAlign: 'left',
                                                    }}>
                                                    {cluster !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select SiteID
                                                        </MenuItem>
                                                    )}
                                                    {getSiteId()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*Site Type if available*/}
                                {siteID && (
                                    <Grid item xs={3}>
                                        <Controller
                                            name="type"
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
                                                    label="Site Type"
                                                    variant="outlined"
                                                    error={!!errors.type}
                                                    helperText={errors.type ? errors.type.message : ''}
                                                    type="text"
                                                    value={siteType}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                                {/*Location if available*/}
                                {siteID && (
                                    <Grid item xs={8}>
                                        <Controller
                                            name="location"
                                            control={control}
                                            defaultValue=""
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    InputProps={{
                                                        sx: {
                                                            ...txProps,
                                                            width: '500px',
                                                        }
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
                                                    label="Location"
                                                    variant="outlined"
                                                    error={!!errors.location}
                                                    helperText={errors.location ? errors.location.message : ''}
                                                    type="text"
                                                    value={location}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default NewServicingReport;