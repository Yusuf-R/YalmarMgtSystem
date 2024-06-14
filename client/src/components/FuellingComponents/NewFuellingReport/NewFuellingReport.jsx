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
import {newFuelSupplyReportSchema} from "@/SchemaValidator/newFuelSupplyReport";
import DateComponent from "@/components/DateComponent/DateComponent";
import dayjs from "dayjs";

function NewFuellingReport({allSite}) {
    const router = useRouter();
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
        resolver: yupResolver(newFuelSupplyReportSchema),
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
    
    // Fuel supply info Section
    const qtyInitial = useWatch({control, name: 'qtyInitial', defaultValue: 0});
    const qtySupplied = useWatch({control, name: 'qtySupplied', defaultValue: 0});
    const cpd = useWatch({control, name: 'cpd'});
    const customCPD = useWatch({control, name: 'customCPD'});
    
    const newAvailableQty = (Number(qtyInitial) + Number(qtySupplied)) || 0;
    const consumptionPerDay = cpd === 'Others' ? Number(customCPD) : Number(cpd) || 0;
    const duration = consumptionPerDay ? Math.ceil(newAvailableQty / consumptionPerDay) : 0;
    const nextDueDate = dateSupplied ? dayjs(dateSupplied).add(duration, 'day').format('DD/MMM/YYYY') : '';
    
    useEffect(() => {
        setValue('qtyNew', newAvailableQty);
        setValue('duration', duration);
        setValue('nextDueDate', nextDueDate);
    }, [newAvailableQty, consumptionPerDay, dateSupplied]);
    
    // submit data using mutation
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ["NewFuelSupplyReport"],
        mutationFn: AdminUtils.NewFuelSupplyReport,
    });
    const SubmitData = async (data) => {
        try {
            await newFuelSupplyReportSchema.validate(data, {abortEarly: false});
            console.log("Validation passed!"); // Check if validation passes
            data.site_id = site_id;
            // convert dateSupplied to DD/MMM/YYYY
            data.dateSupplied = dayjs(dateSupplied).format('DD/MMM/YYYY');
            mutation.mutate(data, {
                onSuccess: (response) => {
                    if (response) {
                        toast.success('Fuel Supply Record created successfully');
                        //     refresh the query that fetched all the staff
                        queryClient.invalidateQueries({queryKey: ["AllFuelReport"]});
                        //     clear the form fields
                        Clear();
                        //     redirect to all the fuel reports
                        router.push('/dashboard/admin/reports/fuel/all');
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
            e.inner.forEach((error) => {
                // Set form errors
                setError(error.path, {
                    type: error.type,
                    message: error.message,
                });
            });
        }
    }
    console.log({errors});
    
    
    
    return (
        <>
            <Box sx={mainSection}>
                {/*Header*/}
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
                    onSubmit={handleSubmit(SubmitData)}
                    noValidate
                >
                    {/* Main Body */}
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
                                <Grid item xs={4}>
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
                                <Grid item xs={4}>
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
                                <Grid item xs={4}>
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
                                    <Grid item xs={4}>
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
                    {/*Fuel Supply Info*/}
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
                                    <Typography variant="subtitle 4">Fuel Supply Info</Typography>
                                </Grid>
                                {/*Supply Date*/}
                                <Grid item xs={3}>
                                    <DateComponent
                                        name="dateSupplied"
                                        control={control}
                                        errors={errors}
                                        labelText="Supply Date"
                                        setDate={setDateSupplied}
                                    />
                                </Grid>
                                {/*Initial Quantity*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="qtyInitial"
                                        control={control}
                                        defaultValue={0}
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
                                                label="Initial Quantity"
                                                type="number"
                                                error={!!errors.qtyInitial}
                                                helperText={errors.qtyInitial ? errors.qtyInitial.message : ''}
                                                fullWidth
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value) || 0;
                                                    field.onChange(value);
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                {/*Supplied Quantity*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="qtySupplied"
                                        control={control}
                                        defaultValue={0}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Supplied Quantity"
                                                type="number"
                                                error={!!errors.qtySupplied}
                                                helperText={errors.qtySupplied ? errors.qtySupplied.message : ''}
                                                fullWidth
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
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value) || 0;
                                                    field.onChange(value);
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                {/*New Available Quantity*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="qtyNew"
                                        control={control}
                                        defaultValue={0}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="New Available Quantity"
                                                type="number"
                                                InputProps={{
                                                    sx: {...txProps, color: 'green'},
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
                                                value={newAvailableQty}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                {/*Anonymous Spacing*/}
                                <Grid item xs={12}></Grid>
                                {/*CPD*/}
                                <Grid item xs={3}>
                                    {/* CPD selection */}
                                    <Controller
                                        name="cpd"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="CPD"
                                                select
                                                value={field.value}
                                                onChange={(e) => field.onChange(e)}
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
                                                <MenuItem value={50}>50</MenuItem>
                                                <MenuItem value={60}>60</MenuItem>
                                                <MenuItem value={100}>100</MenuItem>
                                                <MenuItem value={120}>120</MenuItem>
                                                <MenuItem value="Others">Others</MenuItem>
                                            </TextField>
                                        )}
                                    />
                                </Grid>
                                {/*Custom CPD*/}
                                {cpd === 'Others' && (
                                    <Grid item xs={3}>
                                        {/* Custom CPD input */}
                                        <Controller
                                            name="customCPD"
                                            control={control}
                                            defaultValue=""
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    label="Enter CPD"
                                                    type="number"
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
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                                {/*supply Duration*/}
                                {cpd && (
                                    <>
                                        <Grid item xs={3}>
                                            <Controller
                                                name="duration"
                                                control={control}
                                                defaultValue={0}
                                                render={({field}) => (
                                                    <TextField
                                                        {...field}
                                                        label="Duration"
                                                        type="number"
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
                                                        value={duration}
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        {/*nextDueDate*/}
                                        <Grid item xs={3}>
                                            <Controller
                                                name="nextDueDate"
                                                control={control}
                                                defaultValue=""
                                                render={({field}) => (
                                                    <TextField
                                                        {...field}
                                                        label="Next Due Date"
                                                        type="text"
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
                                                        value={nextDueDate}
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        
                        </Paper>
                    </Grid>
                    <br/><br/>
                    {/*Submitting button */}
                    <Stack direction='row' gap={2} sx={{marginBottom: '75px'}}>
                        <Button variant="contained" color='success' title='Back'
                                onClick={() => window.location.href = '/dashboard/admin/reports/fuel/all'}>
                            Back
                        </Button>
                        
                        <Button variant="contained" color='secondary' onClick={Clear} type='reset'
                                title='Clear'> Clear </Button>
                        <Button variant="contained" color='error' type='submit' title='Submit'> Submit </Button>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default NewFuellingReport