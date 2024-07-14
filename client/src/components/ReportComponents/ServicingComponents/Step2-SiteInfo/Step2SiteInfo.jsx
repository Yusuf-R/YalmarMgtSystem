import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import {useFormContext, Controller} from 'react-hook-form';
import MenuItem from "@mui/material/MenuItem";
import {useEffect} from "react";

function Step2SiteInfo({allSite, txProps}) {
    const {control, setValue, watch, clearErrors, formState: {errors}} = useFormContext();
    
    // Get the current values from the form context
    const stateMain = watch('state');
    const cluster = watch('cluster');
    const siteID = watch('siteId');
    
    // Site Info Section
    const states = Array.from(new Set(allSite.map(site => site.state)));
    const clusters = Array.from(new Set(allSite.filter(site => site.state === stateMain).map(site => site.cluster)));
    const siteIds = allSite.filter(site => site.cluster === cluster).map(site => site.siteId);
    
    useEffect(() => {
        if (siteID) {
            const selectedSite = allSite.find(site => site.siteId === siteID);
            if (selectedSite) {
                const newLocation = selectedSite.location || 'N/A';
                const newSiteType = selectedSite.type || 'N/A';
                setValue('location', newLocation);
                setValue('siteType', newSiteType);
                clearErrors('location');
                clearErrors('siteType');
            }
        }
    }, [siteID, allSite, setValue, clearErrors]);
    
    const handleStateChange = (event) => {
        const newState = event.target.value;
        setValue('state', newState);
        setValue('cluster', '');
        setValue('siteId', '');
        setValue('location', 'N/A');
        setValue('siteType', 'N/A');
    };
    
    const handleClusterChange = (event) => {
        const newCluster = event.target.value;
        setValue('cluster', newCluster);
        setValue('siteId', '');
        setValue('location', 'N/A');
        setValue('siteType', 'N/A');
    };
    
    const handleSiteIdChange = (event) => {
        const newSiteId = event.target.value;
        setValue('siteId', newSiteId);
    };
    
    return (
        <>
            <br/><br/><br/>
            <Box>
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
                            {/* Site State */}
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
                                                    handleStateChange(e);
                                                }}
                                                required
                                                label="State"
                                                error={!!errors.state}
                                                helperText={errors.state ?
                                                    <span style={{color: "#fc8947"}}>{errors.state.message}</span> : ''}
                                                InputProps={{sx: txProps}}
                                                InputLabelProps={{
                                                    sx: {
                                                        color: "#46F0F9",
                                                        "&.Mui-focused": {color: "white"}
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
                                                sx={{'& .MuiSelect-icon': {color: '#fff'}, textAlign: 'left'}}
                                            >
                                                <MenuItem value='' sx={{color: "#4BF807"}}>Select State</MenuItem>
                                                {states.map(stateData => (
                                                    <MenuItem key={stateData} value={stateData} sx={{
                                                        color: 'white',
                                                        '&:hover': {backgroundColor: '#051935'}
                                                    }}>
                                                        {stateData}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/* Site Cluster */}
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
                                                    handleClusterChange(e);
                                                }}
                                                required
                                                label="Cluster"
                                                error={!!errors.cluster}
                                                helperText={errors.cluster ? <span
                                                    style={{color: "#fc8947"}}>{errors.cluster.message}</span> : ''}
                                                InputProps={{sx: txProps}}
                                                InputLabelProps={{
                                                    sx: {
                                                        color: "#46F0F9",
                                                        "&.Mui-focused": {color: "white"}
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
                                                sx={{'& .MuiSelect-icon': {color: '#fff'}, textAlign: 'left'}}
                                            >
                                                <MenuItem value='' sx={{color: "#4BF807"}}>Select Cluster</MenuItem>
                                                {clusters.map(clusterData => (
                                                    <MenuItem key={clusterData} value={clusterData} sx={{
                                                        color: 'white',
                                                        '&:hover': {backgroundColor: '#051935'}
                                                    }}>
                                                        {clusterData}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/* Site ID */}
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
                                                    handleSiteIdChange(e);
                                                }}
                                                required
                                                label="Site ID"
                                                error={!!errors.siteId}
                                                helperText={errors.siteId ? <span
                                                    style={{color: "#fc8947"}}>{errors.siteId.message}</span> : ''}
                                                InputProps={{sx: txProps}}
                                                InputLabelProps={{
                                                    sx: {
                                                        color: "#46F0F9",
                                                        "&.Mui-focused": {color: "white"}
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
                                                sx={{'& .MuiSelect-icon': {color: '#fff'}, textAlign: 'left'}}
                                            >
                                                <MenuItem value='' sx={{color: "#4BF807"}}>Select Site ID</MenuItem>
                                                {siteIds.map(siteIdData => (
                                                    <MenuItem key={siteIdData} value={siteIdData} sx={{
                                                        color: 'white',
                                                        '&:hover': {backgroundColor: '#051935'}
                                                    }}>
                                                        {siteIdData}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/*Site Type if available*/}
                            {watch('siteId') && (
                                <>
                                    {/* Site Type */}
                                    <Grid item xs={3}>
                                        <Controller
                                            name="siteType"
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    InputProps={{sx: txProps}}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {color: "white"}
                                                        }
                                                    }}
                                                    sx={{color: "#46F0F9"}}
                                                    label="Site Type"
                                                    variant="outlined"
                                                    error={!!errors.siteType}
                                                    helperText={errors.siteType ? errors.siteType.message : ''}
                                                    type="text"
                                                    value={watch('siteType')}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </Grid>
                                    {/* Location if available */}
                                    <Grid item xs={8}>
                                        <Controller
                                            name="location"
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    InputProps={{sx: {...txProps, width: '500px'}}}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {color: "white"}
                                                        }
                                                    }}
                                                    sx={{color: "#46F0F9"}}
                                                    label="Location"
                                                    variant="outlined"
                                                    error={!!errors.location}
                                                    helperText={errors.location ? errors.location.message : ''}
                                                    type="text"
                                                    value={watch('location')}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Paper>
                </Grid>
            </Box>
        </>
    )
}

export default Step2SiteInfo;