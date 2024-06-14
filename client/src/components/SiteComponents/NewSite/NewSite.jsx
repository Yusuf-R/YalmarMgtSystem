'use client';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {
    mainSection,
    sitesData, siteStates, siteStatus, type,
} from "@/utils/data";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import {newSiteSchema} from "@/SchemaValidator/newSiteSchema";

function NewSite() {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/site/new');
    const [stateMain, setStateMain] = useState('');
    const [cluster, setClusterType] = useState('');
    const [status, setStatus] = useState('');
    const [siteType, setSiteType] = useState('');
    const {
        control, handleSubmit, formState: {errors}, setError, reset
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(newSiteSchema),
        reValidateMode: "onChange",
    });
    
    const Clear = () => {
        // clear all the content of the fields of the box components
        reset();
    }
    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
        width: '400px',
    }
    
    // const ITEM_HEIGHT = 48;
    // const ITEM_PADDING_TOP = 8;
    // const MenuProps = {
    //     PaperProps: {
    //         style: {
    //             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    //             backgroundColor: '#274e61',
    //             color: 'white',
    //         },
    //     },
    // };
    
    useEffect(() => {
        if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/site/new');
        } else {
            setActiveTab('/dashboard/admin/site/all');
        }
    }, [pathname]);
    if (Object.keys(errors).length > 0) {
        console.log({errors});
    }
    
    // set state
    const getState = () => {
        return siteStates.map((stateName) => (
            <MenuItem key={stateName} value={stateName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{stateName}</MenuItem>
        ));
    }
    const handleState = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setStateMain(event.target.value);
        // Clear the cluster selection when a new state is selected
        setClusterType('');
    }
    
    // set cluster
    const getCluster = () => {
        if (!stateMain) {
            return [];
        }
        return Object.keys(sitesData).map((clusterName) => (
            <MenuItem key={clusterName} value={clusterName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {clusterName}
            </MenuItem>
        ));
    }
    const handleCluster = (event) => {
        event.preventDefault();
        setClusterType(event.target.value);
    }
    
    // set Type
    const getType = () => {
        return type.map((types) => (
            <MenuItem key={types} value={types}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{types}</MenuItem>
        ));
    }
    const handleType = (event) => {
        event.preventDefault();
        setSiteType(event.target.value);
    }
    
    // set status
    const getStatus = () => {
        return siteStatus.map((status) => (
            <MenuItem key={status} value={status}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{status}</MenuItem>
        ));
    }
    const handleStatus = (event) => {
        event.preventDefault();
        setStatus(event.target.value);
    }
    
    
    if (Object.keys(errors).length > 0) {
        console.log({errors});
    }
    
    
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ["NewSite"],
        mutationFn: AdminUtils.NewSite,
    });
    
    const SubmitData = async (data) => {
        try {
            await newSiteSchema.validate(data, {abortEarly: false});
            console.log("Validation passed!"); // Check if validation passes
            mutation.mutate(data, {
                onSuccess: (response) => {
                    if (response) {
                        toast.success('New Site Entry Created Successfully');
                        //     refresh the query that fetched all the staff
                        queryClient.invalidateQueries({queryKey: ["AllSite"]});
                        //     clear the form fields
                        Clear();
                        router.push('/dashboard/admin/site/all');
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
            <Box sx={mainSection}
                 component='form'
                 noValidate
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
                    <Typography variant='h5'>New Site Form</Typography>
                </Paper>
                <br/>
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
                        }}>
                        <Tab
                            label="Sites"
                            component={Link}
                            href="/dashboard/admin/site/all"
                            value="/dashboard/admin/site/all"
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
                            href="/dashboard/admin/site/new"
                            value="/dashboard/admin/site/new"
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
                                <Typography variant="h6" component="h5" sx={{color: '#FFF'}}>Site Info</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="siteId"
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
                                                label="Site ID"
                                                variant="outlined"
                                                error={!!errors.siteId}
                                                helperText={errors.siteId ? errors.siteId.message : ''}
                                                required
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="type"
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
                                                        handleType(e);
                                                    }}
                                                    required
                                                    label="Site Type"
                                                    error={!!errors.type}
                                                    helperText={errors.type ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.type.message}
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
                                                    {type !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select State
                                                        </MenuItem>
                                                    )}
                                                    {getType()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
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
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
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
                                                            Select Cluster
                                                        </MenuItem>
                                                    )}
                                                    {getCluster()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="status"
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
                                                        handleStatus(e);
                                                    }}
                                                    required
                                                    label="Site Status"
                                                    error={!!errors.status}
                                                    helperText={errors.status ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.status.message}
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
                                                    {stateMain !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select Site Type
                                                        </MenuItem>
                                                    )}
                                                    {getStatus()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            {/* Location Info*/}
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h6" color="white">Site Location</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="longitude"
                                        control={control}
                                        defaultValue={0.00}
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
                                                label="Longitude"
                                                variant="outlined"
                                                error={!!errors.longitude}
                                                helperText={errors.longitude ? errors.longitude.message : ''}
                                                type="number"
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name="latitude"
                                    control={control}
                                    defaultValue={0.00}
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
                                            label="Latitude"
                                            error={!!errors.latitude}
                                            helperText={errors.latitude ? errors.latitude.message : ''}
                                            variant="outlined"
                                            type="number"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="location"
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
                                            label="Location"
                                            variant="outlined"
                                            error={!!errors.location}
                                            helperText={errors.location ? errors.location.message : ''}
                                            type="text"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                {/*Submitting button */}
                <Stack direction='row' gap={2} sx={{marginBottom: '75px'}}>
                    <Link href="/dashboard/admin/site/all">
                        <Button variant="contained" color='success' title='Back'> Back </Button>
                    </Link>
                    <Button variant="contained" color='secondary' onClick={Clear} type='reset'
                            title='Clear'> Clear </Button>
                    <Button variant="contained" color='error' type='submit' title='Submit'> Submit </Button>
                </Stack>
            </Box>
        </>
    )
}

export default NewSite;