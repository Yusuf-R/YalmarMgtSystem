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
import useMediaQuery from "@mui/material/useMediaQuery";

function Step2SiteInfo({allSite, txProps}) {
    const {control, setValue, watch, clearErrors, formState: {errors}} = useFormContext();

    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');

    // Get the current values from the form context
    const stateMain = watch('state');
    const cluster = watch('cluster');
    const siteID = watch('siteId');

    // AllSite Info Section
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
        const site_id = allSite.filter(site => site.siteId === newSiteId).map(site => site._id)[0];
        setValue('site_id', site_id);
        setValue('siteId', newSiteId);

    };

    return (
        <>
            <Box>
                {/*AllSite Info*/}
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h6"
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                        color: '#FFF',
                                        fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>
                            Site Info
                        </Typography>
                    </Grid>
                    {/* AllSite State */}
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

                                )}
                            />
                        </FormControl>
                    </Grid>
                    {/* AllSite Cluster */}
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

                                )}
                            />
                        </FormControl>
                    </Grid>
                    {/* AllSite ID */}
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
                                            handleSiteIdChange(e);
                                        }}
                                        required
                                        label="AllSite ID"
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
                                        <MenuItem value='' sx={{color: "#4BF807"}}>Select AllSite ID</MenuItem>
                                        {siteIds.map(siteIdData => (
                                            <MenuItem key={siteIdData} value={siteIdData} sx={{
                                                color: 'white',
                                                '&:hover': {backgroundColor: '#051935'}
                                            }}>
                                                {siteIdData}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                )}
                            />
                        </FormControl>
                    </Grid>
                    {/*AllSite Type if available*/}
                    {watch('siteId') && (
                        <>
                            {/* AllSite Type */}
                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                <FormControl fullWidth>
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
                                                label="AllSite Type"
                                                variant="outlined"
                                                error={!!errors.siteType}
                                                helperText={errors.siteType ? errors.siteType.message : ''}
                                                type="text"
                                                value={watch('siteType')}
                                                readOnly
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            {/* Location if available */}
                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="location"
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
                                </FormControl>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Box>
        </>
    )
}

export default Step2SiteInfo;