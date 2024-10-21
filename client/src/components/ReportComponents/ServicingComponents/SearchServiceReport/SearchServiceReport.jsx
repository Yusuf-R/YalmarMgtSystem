import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {useRouter, usePathname} from "next/navigation";
import Link from "next/link";
import React, {useEffect, useMemo, useState} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import {autoCompleteSx} from "@/utils/data";
import {Controller, useForm} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import YearDropdown from "@/components/Utilities/YearDropdown";
import MonthDropdown from "@/components/Utilities/MonthDropdown";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import FormHelperText from "@mui/material/FormHelperText";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import AdminUtils from "@/utils/AdminUtilities";
import ServicingReportRecord
    from "@/components/ReportComponents/ServicingComponents/ServicingReportRecord/ServicingReportRecord"
import LazyComponent from "@/components/LazyComponent/LazyComponent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomPopper = (props) => {
    return (
        <Popper
            {...props}
            sx={{
                '& .MuiAutocomplete-listbox': {
                    bgcolor: '#274e61', // Background color of the dropdown list
                    color: 'white',
                    fontSize: '16px',
                    fontFamily: 'Poppins',
                    fontWeight: '500',
                },
                '& .MuiAutocomplete-option': {
                    '&[aria-selected="true"]': {
                        bgcolor: '#051935 !important', // Background color of the selected option
                        color: 'white !important', // Ensure the text color of the selected option is white
                    },
                    '&:hover': {
                        bgcolor: '#1a3a4f !important', // Background color of the hovered option
                        color: 'white !important', // Ensure the text color of the hovered option is white
                    },
                },
            }}
        />
    );
};

function SearchServiceReport({allSite}) {
    const router = useRouter();
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state
    const [searchInitiated, setSearchInitiated] = useState(false);
    const [stateMain, setStateMain] = useState('');
    const [cluster, setClusterType] = useState('');
    const [siteID, setSiteID] = useState('');
    const [siteType, setSiteType] = useState('N/A');
    const [location, setLocation] = useState('N/A');
    const [pmInstance, setPmInstance] = useState('');
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/servicing/search');

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

    const pmInstances = ['PM1', 'PM2'];
    const serviceRecordSchema = yup.object().shape({
        state: yup.string().required('State is required'),
        cluster: yup.string().required('Cluster is required'),
        siteId: yup.string().required('AllSite ID is required'),
        month: yup.string().required('Month is required'),
        year: yup.string().required('Year is required'),
        pmInstance: yup.string().required('PM Instance is required'),
        location: yup.string().required('Location is required'),
        siteType: yup.string().required('AllSite Type is required'),
    });

    const {
        control, handleSubmit, formState: {errors}, watch, setError, reset, setValue, clearErrors,
    } = useForm({
        resolver: yupResolver(serviceRecordSchema),
        mode: 'onTouched',
        reValidateMode: 'onChange',
    });


    // AllSite Info Section
    const states = Array.from(new Set(allSite.map(site => site.state)));
    const clusters = Array.from(new Set(allSite.filter(site => site.state === stateMain).map(site => site.cluster)));
    const siteIds = allSite.filter(site => site.cluster === cluster).map(site => site.siteId);


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
            setValue('siteType', newSiteType);
            // Clear errors for location and type
            clearErrors('location');
            clearErrors('siteType');
        } else {
            setSiteType('N/A');
            setLocation('N/A');
        }
    };

    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
        fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
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

    // Reset the form
    const Clear = async () => {
        // clear the form
        reset();
        setStateMain('');
        setClusterType('');
        setSiteID('');
        setSiteType('N/A');
        setLocation('N/A');
        setReportData(null);
        setSearchInitiated(false);
        setLoading(false);
    }
    // Submit data using mutation
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ["GetServicingReport"],
        mutationFn: AdminUtils.GetServicingReport,
    });

    const clearCache = async () => {
        await queryClient.clear();
    }

    const pathname = usePathname();
    // useEffect or handling navigation between new and staff
    useEffect(() => {
        if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/reports/servicing/new');
        } else if (pathname.includes('all')) {
            setActiveTab('/dashboard/admin/reports/servicing/all');
        } else if (pathname.includes('search')) {
            setActiveTab('/dashboard/admin/reports/servicing/search');
        } else {
            setActiveTab('/dashboard/admin/reports');
        }
    }, [pathname]);

    const SearchRecords = async (data) => {
        try {
            setSearchInitiated(true);
            setLoading(true);
            // Validate data first
            const isValid = await serviceRecordSchema.isValid(data);
            if (!isValid) {
                throw new Error('Validation failed');
            }
            const cacheKey = ["GetServicingReport", data];
            // await clearCache();
            // Check if data exists in the cache
            const cachedData = queryClient.getQueryData(cacheKey);
            if (cachedData) {
                setReportData(cachedData);
                if (cachedData.emptyBit) {
                    toast.error('No Record found', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else if (!cachedData.emptyBit) {
                    toast.success('Record found', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                setLoading(false);
                return;
            }
            // If not found in cache, make the request
            mutation.mutate(data, {
                onSuccess: (response) => {
                    // Set the query data in the cache with the correct key
                    queryClient.setQueryData(cacheKey, response);
                    // check if errorBit is true in the response
                    if (response.emptyBit) {
                        toast.error('No Record found', {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else if (!response.emptyBit) {
                        toast.success('Record found', {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    setReportData(response);
                    setLoading(false);
                },
                onError: (error) => {
                    toast.error(error.message);
                    setReportData({servicingReport: [], emptyBit: true});
                    setLoading(false);
                    setLoading(false);
                },
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <Box sx={{
                padding: xSmall || small ? '5px' : medium || large ? '10px' : '20px',
                marginTop: '10px',

            }}>
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
                            label="Reports"
                            component={Link}
                            href="/dashboard/admin/reports"
                            value="/dashboard/admin/reports"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="All"
                            component={Link}
                            href="/dashboard/admin/reports/servicing/all"
                            value="/dashboard/admin/reports/servicing/all"
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
                            href="/dashboard/admin/reports/servicing/new"
                            value="/dashboard/admin/reports/servicing/new"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Search"
                            component={Link}
                            href="/dashboard/admin/reports/servicing/search"
                            value="/dashboard/admin/reports/servicing/search"
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
                <br/>
                <Box
                    component="form"
                    onSubmit={handleSubmit(SearchRecords)}
                    noValidate
                >
                    {/* First Row (1 fields) prefix */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6"
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            color: '#FFF',
                                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                        }}> Select Site
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
                                        <FormControl fullWidth>
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
                            </FormControl>
                        </Grid>
                        {/*AllSite Type if available*/}
                        {siteID && (
                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="siteType"
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
                                                error={!!errors.siteType}
                                                helperText={errors.siteType ? errors.siteType.message : ''}
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
                    {/* First Row (1 fields) prefix */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6"
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            color: '#FFF',
                                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                        }}> Select Year, Month and PM Instance
                            </Typography>
                        </Grid>
                        {/*Select Year*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large || xLarge ? 6 : xxLarge || wide ? 3 : 2}>
                            <FormControl fullWidth>
                                <Controller
                                    name="year"
                                    control={control}
                                    defaultValue=""
                                    render={({field: {onChange, value}}) => (
                                        <FormControl fullWidth>
                                            <YearDropdown
                                                value={value}
                                                onChange={(newValue) => {
                                                    onChange(newValue);
                                                }}
                                            />
                                            {errors.year && (
                                                <FormHelperText style={{color: "#fc8947"}}>
                                                    {errors.year.message}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*Select Month*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large || xLarge ? 6 : xxLarge || wide ? 3 : 2}>
                            <FormControl fullWidth>
                                <Controller
                                    name="month"
                                    control={control}
                                    defaultValue=""
                                    render={({field: {onChange, value}}) => (
                                        <FormControl fullWidth>
                                            <MonthDropdown
                                                value={value}
                                                onChange={(newValue) => {
                                                    onChange(newValue);
                                                }}
                                            />
                                            {errors.month && (
                                                <FormHelperText style={{color: "#fc8947"}}>
                                                    {errors.month.message}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/*Select PM instance*/}
                        <Grid item xs={xSmall || small || medium ? 12 : large || xLarge ? 6 : xxLarge || wide ? 3 : 2}>
                            <FormControl fullWidth>
                                <Controller
                                    name="pmInstance"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                {...field}
                                                options={pmInstances}
                                                PopperComponent={CustomPopper}
                                                renderInput={(params) => <
                                                    TextField {...params} label="PM Instance" variant="outlined"
                                                              sx={autoCompleteSx}/>}
                                                onChange={(event, value) => {
                                                    field.onChange(value);
                                                    setPmInstance(value);
                                                    clearErrors('pmInstance');
                                                }}
                                            />
                                            {errors.pmInstance && (
                                                <FormHelperText style={{color: "#fc8947"}}>
                                                    {errors.pmInstance.message}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={xSmall || small || medium ? 12 : large || xLarge ? 6 : xxLarge || wide ? 3 : 6}>
                            <Stack direction="row" spacing={3}>
                                <Button
                                    endIcon={<SearchRoundedIcon/>}
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                        color: '#FFF',
                                        bgcolor: '#1a3a4f',
                                        '&:hover': {
                                            bgcolor: '#051935',
                                        },
                                        borderRadius: '10px',
                                        display: 'flex',
                                        paddingTop: 3,
                                        justifyContent: 'flex-end', // Align the content to the bottom
                                        alignItems: 'flex-start', // Align text to the left within the button
                                    }}
                                    size='large'
                                    type='submit'
                                    title='Submit'
                                    color='info'
                                >
                                    Search
                                </Button>
                                <Button
                                    endIcon={<SearchOffIcon/>}
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                        color: '#FFF',
                                        bgcolor: '#1a3a4f',
                                        '&:hover': {
                                            bgcolor: '#051935',
                                        },
                                        borderRadius: '10px',
                                        display: 'flex',
                                        paddingTop: 3,
                                        justifyContent: 'flex-end', // Align the content to the bottom
                                        alignItems: 'flex-start', // Align text to the left within the button
                                    }}
                                    title='Clear'
                                    type='reset'
                                    size='large'
                                    onClick={Clear}
                                    color='secondary'
                                >
                                    Clear
                                </Button>
                            </Stack>
                        </Grid>
                        {loading && <LazyComponent Command={"Searching"}/>}
                        {searchInitiated ? (
                            reportData && !reportData.emptyBit ? (
                                <>
                                    <Grid item xs={xSmall || small || medium ? 12 : large ? 12 : 12}>
                                        <Box>
                                            <ServicingReportRecord data={reportData.servicingReport}/>
                                        </Box>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid item xs={xSmall || small || medium ? 12 : large ? 12 : 12}>
                                        <Typography variant="h6"
                                                    sx={{
                                                        fontFamily: 'Poppins',
                                                        fontWeight: 'bold',
                                                        color: '#FFF',
                                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: '10px',
                                                        borderRadius: '10px',
                                                        bgcolor: '#0059b3',
                                                    }}>
                                            Oops!!! No Record found
                                        </Typography>
                                    </Grid>
                                </>
                            )
                        ) : null}
                    </Grid>
                </Box>
                <br/><br/>
                {/*</Card>*/}
                <Stack direction='row' spacing={5}>
                    <Link href="/dashboard/admin/reports/servicing/all">
                        <Button variant="contained" color='success' title='Back'> Back </Button>
                    </Link>
                </Stack>
            </Box>
        </>
    )
}

export default SearchServiceReport;