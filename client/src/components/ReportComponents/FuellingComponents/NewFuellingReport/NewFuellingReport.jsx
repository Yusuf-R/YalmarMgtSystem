'use client';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Controller, useForm, useWatch} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {usePathname, useRouter} from "next/navigation";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import React, {useState, useEffect} from "react";
import {newFuelSupplyReportSchema} from "@/SchemaValidator/newFuelSupplyReport";
import DateComponent from "@/components/DateComponent/DateComponent";
import dayjs from "dayjs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";


function NewFuellingReport({allSite}) {
    const router = useRouter();
    const [stateMain, setStateMain] = useState('');
    const [cluster, setClusterType] = useState('');
    const [siteID, setSiteID] = useState('');
    const [siteType, setSiteType] = useState('N/A');
    const [location, setLocation] = useState('N/A');
    const [dateSupplied, setDateSupplied] = useState(null);

    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/fuel/new');
    const isXSmall = useMediaQuery('(max-width:599.99px)');


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
    const isLargeScreen = useMediaQuery('(min-width:900px)');
    const isAbove425px = useMediaQuery('(min-width:425px)');

    const pathname = usePathname();


    const {
        control, handleSubmit, formState: {errors}, setError, reset, setValue, clearErrors,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(newFuelSupplyReportSchema),
        reValidateMode: "onChange",
        defaultValues: {
            cpd: '',
            customCPD: ''
        }
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
        fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.0rem' : '1.1rem',
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

    // AllSite Info Section
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
            // check if customCpd was entered, and if so we set cpd value to customCpd
            if (cpd === 'Others' && customCPD) {
                data.cpd = Number(customCPD);
            }
            await newFuelSupplyReportSchema.validate(data, {abortEarly: false});
            data.site_id = site_id;
            // convert dateSupplied to DD/MMM/YYYY
            data.dateSupplied = dayjs(dateSupplied).format('DD/MMM/YYYY');
            // remove customCPD from data
            delete data.customCPD;
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
    const goPrev = () => {
        window.history.back();
    }

    return (
        <>
            <Box
                sx={{
                    padding: xSmall || small ? '5px' : medium || large ? '10px' : '5px',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%',
                    flexWrap: 'nowrap',
                }}
            >
                {/*Navigation Tabs */}
                <Stack direction='row' spacing={2} sx={{
                    justifyContent: 'flex-start',
                }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        variant={isXSmall ? "scrollable" : "standard"}
                        centered
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#46F0F9',
                            },
                        }}
                    >
                        <Tab
                            label="Reports"
                            component={Link}
                            href="/dashboard/admin/reports"
                            value="/dashboard/admin/reports"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                                "&.Mui-selected": {color: "#46F0F9"},
                            }}
                        />


                        <Tab
                            label="All"
                            component={Link}
                            href="/dashboard/admin/reports/fuel/all"
                            value="/dashboard/admin/reports/fuel/all"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                                "&.Mui-selected": {color: "#46F0F9"},
                            }}
                        />

                        <Tab
                            label="New +"
                            value="/dashboard/admin/reports/fuel/new" // Set the value prop for this Tab
                            component={Link}
                            href="/dashboard/admin/reports/fuel/new"
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
                <br/>
                <Card sx={{
                    background: 'linear-gradient(to right, #000046, #1cb5e0)',
                    padding: '16px',
                    borderRadius: '10px'
                }}>
                    <Typography variant="body1"
                                sx={{
                                    color: '#FFF',
                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>
                        New Fuelling Report Form
                    </Typography>
                </Card>
                <br/>
                <Box
                    component="form"
                    onSubmit={handleSubmit(SubmitData)}
                    noValidate
                >
                    {/*Site Info*/}
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6"
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            color: '#FFF',
                                            fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.0rem' : '1.1rem',
                                        }}>
                                Site Information
                            </Typography>
                        </Grid>
                        {/*AllSite State*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="state"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (

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
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*AllSite cluster*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="cluster"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
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
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*AllSite ID*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="siteId"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            select
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleSiteId(e);
                                            }}
                                            label="AllSite ID"
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
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*AllSite Type if available*/}
                        {siteID && (
                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                <FormControl fullWidth>
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
                                                label="AllSite Type"
                                                variant="outlined"
                                                error={!!errors.type}
                                                helperText={errors.type ? errors.type.message : ''}
                                                type="text"
                                                value={siteType}
                                                readOnly
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        )}
                        {/*Location if available*/}
                        {siteID && (
                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="location"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                InputProps={{
                                                    sx:
                                                    txProps,
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
                                </FormControl>
                            </Grid>
                        )}
                    </Grid>
                    <br/>
                    {/*Fuel Info*/}
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6"
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            color: '#FFF',
                                            fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.0rem' : '1.1rem',
                                        }}>
                                Fuel Supply Info
                            </Typography>
                        </Grid>
                        {/*Initial Quantity*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="qtyInitial"
                                    control={control}
                                    // defaultValue={0}
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
                            </FormControl>
                        </Grid>
                        {/*Supplied Quantity*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="qtySupplied"
                                    control={control}
                                    // defaultValue={0}
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
                            </FormControl>
                        </Grid>
                        {/*Date of supply */}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <DateComponent
                                name="dateSupplied"
                                control={control}
                                errors={errors}
                                labelText="Supply Date"
                                setDate={setDateSupplied}
                                defaultValue={dayjs()}
                            />
                        </Grid>
                        {/*New Available Quantity*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
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
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            {/* CPD selection */}
                            <FormControl fullWidth>
                                <Controller
                                    name="cpd"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="CPD"
                                            select
                                            type='number'
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
                                            <MenuItem value={30}>30</MenuItem>
                                            <MenuItem value={35}>35</MenuItem>
                                            <MenuItem value={40}>40</MenuItem>
                                            <MenuItem value={50}>50</MenuItem>
                                            <MenuItem value={60}>60</MenuItem>
                                            <MenuItem value={100}>100</MenuItem>
                                            <MenuItem value={120}>120</MenuItem>
                                            <MenuItem value="Others">Others</MenuItem>
                                        </TextField>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*Custom CPD*/}
                        {cpd === 'Others' && (
                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                {/* Custom CPD input */}
                                <FormControl fullWidth>
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
                                </FormControl>
                            </Grid>
                        )}

                        {/*supply Duration*/}
                        {cpd && (
                            <>
                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                    <FormControl fullWidth>
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
                                    </FormControl>
                                </Grid>
                                {/*nextDueDate*/}
                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                    <FormControl fullWidth>
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
                                    </FormControl>
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <br/>
                    {/*Submitting button */}
                    <Stack direction='row' gap={2} sx={{marginBottom: '75px'}}>
                        <Button variant="contained" title='Back' onClick={goPrev} size='small'
                                sx={{
                                    color: '#FFF',
                                    backgroundColor: 'red',
                                    '&:hover': {
                                        backgroundColor: '#46F0F9',
                                    },
                                }}
                        >
                            Back
                        </Button>

                        <Button variant="contained" onClick={Clear} type='reset'
                                title='Clear' size='small'
                                sx={{
                                    color: '#FFF',
                                    backgroundColor: 'grey',
                                    '&:hover': {
                                        backgroundColor: '#46F0F9',
                                    },
                                }}
                        >
                            Clear
                        </Button>
                        <Button variant="contained" type='submit' title='Submit' size='small'
                                sx={{
                                    color: '#FFF',
                                    backgroundColor: 'linear-gradient(to right, #000046, #1cb5e0)',
                                    '&:hover': {
                                        backgroundColor: '#891f9c',
                                    },
                                }}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default NewFuellingReport