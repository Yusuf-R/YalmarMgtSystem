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
    sitesData, siteStates, siteStatus, type,
} from "@/utils/data";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import {editSiteSchema} from "@/SchemaValidator/SiteValidator/SiteSchema"
import useMediaQuery from "@mui/material/useMediaQuery";
import useSiteStore from "@/store/useSiteStore";
import AdminUtilities from "@/utils/AdminUtilities"; // Zustand store for site

function EditSite({id, siteData}) {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/site/edit');
    const [stateMain, setStateMain] = useState(siteData.state || '');
    const [cluster, setClusterType] = useState(siteData.cluster || '');
    const [status, setStatus] = useState(siteData.status || '');
    const [siteType, setSiteType] = useState(siteData.type || '');

    // Media Queries
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');

    const {setEncryptedSiteData} = useSiteStore.getState();

    const {
        control,
        handleSubmit,
        formState: {errors},
        setError,
        reset,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(editSiteSchema), // Use edit schema
        defaultValues: {
            siteId: siteData.siteId || '',
            type: siteData.type || '',
            state: siteData.state || '',
            cluster: siteData.cluster || '',
            status: siteData.status || '',
            longitude: siteData.longitude || 0.00,
            latitude: siteData.latitude || 0.00,
            location: siteData.location || '',
        },
        reValidateMode: "onChange",
    });

    const Clear = () => {
        reset();
    };

    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
    };

    // function to view site profile
    const viewSite = async () => {
        const encryptedSiteID = await AdminUtilities.encryptUserID(id);
        // encrypt the data and store it in the session storage
        const encryptedSiteData = await AdminUtilities.encryptData(siteData);
        // Set the encrypted data in Zustand store
        setEncryptedSiteData(encryptedSiteData, encryptedSiteID);
        router.push(`/dashboard/admin/site/view`);
    };

    useEffect(() => {
        if (pathname.includes('view')) {
            setActiveTab('/dashboard/admin/site/view');
        } else if (pathname.includes('edit')) {
            setActiveTab('/dashboard/admin/site/edit');
        } else {
            setActiveTab('/dashboard/admin/site');
        }
    }, [pathname]);

    // Set state
    const getState = () => {
        return siteStates.map((stateName) => (
            <MenuItem key={stateName} value={stateName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {stateName}
            </MenuItem>
        ));
    };
    const handleState = (event) => {
        event.preventDefault();
        setStateMain(event.target.value);
        setClusterType('');
    };

    // Set cluster
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
    };
    const handleCluster = (event) => {
        event.preventDefault();
        setClusterType(event.target.value);
    };

    // Set type
    const getType = () => {
        return type.map((types) => (
            <MenuItem key={types} value={types}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {types}
            </MenuItem>
        ));
    };
    const handleType = (event) => {
        event.preventDefault();
        setSiteType(event.target.value);
    };

    // Set status
    const getStatus = () => {
        return siteStatus.map((status) => (
            <MenuItem key={status} value={status}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {status}
            </MenuItem>
        ));
    };
    const handleStatus = (event) => {
        event.preventDefault();
        setStatus(event.target.value);
    };

    const queryClient = useQueryClient();
    // Update Mutation instance
    const mutation = useMutation({
        mutationKey: ["UpdateSite"],
        mutationFn: AdminUtils.UpdateSite,
    });

    const submitUpdate = async (data) => {
        await editSiteSchema.validate(data, {abortEarly: false});
        console.log("Validation passed!"); // Check if validation passes
        data._id = siteData._id;
        mutation.mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["AllSite"]});
                toast.success('Site updated successfully');
                router.push('/dashboard/admin/site/all');
            },
            onError: (error) => {
                toast.error('Error updating site data');
                console.error("Update failed", error);
            }
        });
    };

    return (
        <>
            <Box
                component='form'
                noValidate
                onSubmit={handleSubmit(submitUpdate)}
                sx={{
                    padding: xSmall || small ? '5px' : medium || large ? '10px' : '5px',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%',
                    overflow: 'hidden',
                }}
            >
                {/* Navigation Tabs */}
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
                            label="Site"
                            component={Link}
                            href="/dashboard/admin/site"
                            value="/dashboard/admin/site"
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
                            href="/dashboard/admin/site/all"
                            value="/dashboard/admin/site/all"
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
                            onClick={viewSite}
                            value="/dashboard/admin/site/view"
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
                            component={Link}
                            href="/dashboard/admin/site/edit"
                            value="/dashboard/admin/site/edit"
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
                <Box sx={{
                    padding: xSmall ? '2px' : small ? '4px' : '6px',
                    backgroundColor: 'inherit',
                    color: '#46F0F9',
                    borderRadius: '10px',
                    width: '100%', // Ensures Paper doesn't exceed its parent
                    maxWidth: '100%',
                }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6"
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            color: '#FFF',
                                            fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.0rem' : '1.2rem',
                                        }}>
                                Site Information
                            </Typography>
                        </Grid>
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="siteId"
                                    control={control}
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
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="type"
                                    control={control}
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
                                                label="Type"
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
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="state"
                                    control={control}
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
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="cluster"
                                    control={control}
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
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="status"
                                    control={control}
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
                                                label="Status"
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
                                                        Select AllSite Type
                                                    </MenuItem>
                                                )}
                                                {getStatus()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <br/>
                    {/* Location Info*/}
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6"
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            color: '#FFF',
                                            fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.0rem' : '1.2rem',
                                        }}>
                                Location Information
                            </Typography>
                        </Grid>
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
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
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
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
                            </FormControl>
                        </Grid>
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="location"
                                    control={control}
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
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <br/>
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
    );
}

export default EditSite;
