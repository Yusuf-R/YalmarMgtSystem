'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {useFormContext, Controller, FormProvider, useForm, useWatch} from 'react-hook-form';
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from 'react';

const opt1 = ['OK', "NOT-OK", 'NOT-APPLICABLE'];
const opt2 = ['YES', 'NO', 'NOT-APPLICABLE'];
const lightOpt = ['WORKING', "NOT-WORKING", 'NOT-APPLICABLE'];

function Step6ShelterPM({txProps}) {
    const {control, setValue, watch, clearErrors, formState: {errors}} = useFormContext();
    
    const [
        siteCleaningStatus,
        shelterCleaningStatus,
        securityLightAvailability,
        securityLightStatus,
        floodLightAvailability,
        floodLightStatus
    ] = watch([
        'shelterPM.siteCleaningStatus',
        'shelterPM.shelterCleaningStatus',
        'lightningPM.securityLightAvailability',
        'lightningPM.securityLightStatus',
        'lightningPM.floodLightAvailability',
        'lightningPM.floodLightStatus'
    ]);
    
    
    
    // shelter PM
    // cleaning status
    // Site
    const getSiteCleaningStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleSiteCleaningStatus = (event) => {
        event.preventDefault();
        const siteCleaningStatusValue = event.target.value;
        setValue('shelterPM.siteCleaningStatus', siteCleaningStatusValue);
        clearErrors('shelterPM.siteCleaningStatus');
    }
    // Shelter
    const getShelterCleaningStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleShelterCleaningStatus = (event) => {
        event.preventDefault();
        const shelterCleaningStatusValue = event.target.value;
        setValue('shelterPM.shelterCleaningStatus', shelterCleaningStatusValue);
        clearErrors('shelterPM.shelterCleaningStatus');
    }
    
    // Light PM
    // security light availability
    const getSecurityLightAvailability = () => {
        return opt2.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleSecurityLightAvailability = (event) => {
        event.preventDefault();
        const securityLightAvailabilityValue = event.target.value;
        setValue('lightningPM.securityLightAvailability', securityLightAvailabilityValue);
        clearErrors('lightningPM.securityLightAvailability');
    }
    // security light status
    const getSecurityLightStatus = () => {
        return lightOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleSecurityLightStatus = (event) => {
        event.preventDefault();
        const securityLightStatusValue = event.target.value;
        setValue('lightningPM.securityLightStatus', securityLightStatusValue);
        clearErrors('lightningPM.securityLightStatus');
    }
    // floodlight availability
    const getFloodLightAvailability = () => {
        return opt2.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleFloodLightAvailability = (event) => {
        event.preventDefault();
        const floodLightAvailabilityValue = event.target.value;
        setValue('lightningPM.floodLightAvailability', floodLightAvailabilityValue);
        clearErrors('lightningPM.floodLightAvailability');
    }
    // floodlight status
    const getFloodLightStatus = () => {
        return lightOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleFloodLightStatus = (event) => {
        event.preventDefault();
        const floodLightStatusValue = event.target.value;
        setValue('lightningPM.floodLightStatus', floodLightStatusValue);
        clearErrors('lightningPM.floodLightStatus');
    }
    
    // light PM
    //awl working status
    const getAwlWorkingStatus = () => {
        return lightOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleAwlWorkingStatus = (event) => {
        event.preventDefault();
        const awlWorkingStatusValue = event.target.value;
        setValue('lightningPM.awl', awlWorkingStatusValue);
        clearErrors('lightningPM.awlWorkingStatus');
    }
    
    // if security light availability is NO, then set the status to NOT-APPLICABLE
    useEffect(() => {
        if (securityLightAvailability === 'NO') {
            setValue('lightningPM.securityLightStatus', 'NOT-APPLICABLE');
            clearErrors('lightningPM.securityLightStatus');
        }
    }, [securityLightAvailability]);
    
    // if floodlight availability is NO, then set the status to NOT-APPLICABLE
    useEffect(() => {
        if (floodLightAvailability === 'NO') {
            setValue('lightningPM.floodLightStatus', 'NOT-APPLICABLE');
            clearErrors('lightningPM.floodLightStatus');
        }
    }, [floodLightAvailability]);
    
    return (
        <>
            <br/><br/><br/>
            <Box>
                {/*Shelter and Light PM*/}
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
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle 4">Shelter PM</Typography>
                            </Grid>
                            {/*Site cleaning*/}
                            <Grid item xs={4}>
                                <Controller
                                    name="shelterPM.siteCleaningStatus"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleSiteCleaningStatus(e);
                                                }}
                                                required
                                                label="Site Cleaning Status"
                                                error={!!errors.shelterPM?.siteCleaningStatus}
                                                helperText={errors.shelterPM?.siteCleaningStatus ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.shelterPM?.siteCleaningStatus.message}
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
                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                    Cleaning Status
                                                </MenuItem>
                                                {getSiteCleaningStatus()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/*Shelter cleaning*/}
                            <Grid item xs={4}>
                                <Controller
                                    name="shelterPM.shelterCleaningStatus"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleShelterCleaningStatus(e);
                                                }}
                                                required
                                                label="Shelter Cleaning Status"
                                                error={!!errors.shelterPM?.shelterCleaningStatus}
                                                helperText={errors.shelterPM?.shelterCleaningStatus ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.shelterPM?.shelterCleaningStatus.message}
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
                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                    Shelter Cleaning Status
                                                </MenuItem>
                                                {getShelterCleaningStatus()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <br/><br/>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle 4">Lightning PM</Typography>
                            </Grid>
                            <Grid item xs={2.4}>
                                <Controller
                                    name="lightningPM.securityLightAvailability"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleSecurityLightAvailability(e);
                                                }}
                                                required
                                                label="Secuity Light Availability"
                                                error={!!errors.lightningPM?.securityLightAvailability}
                                                helperText={errors.lightningPM?.securityLightAvailability ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.lightningPM?.securityLightAvailability.message}
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
                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                    Security Light Availability
                                                </MenuItem>
                                                {getSecurityLightAvailability()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {watch('lightningPM.securityLightAvailability') === 'YES' && (
                                <>
                                    <Grid item xs={2.4}>
                                        <Controller
                                            name="lightningPM.securityLightStatus"
                                            control={control}
                                            render={({field}) => (
                                                <FormControl fullWidth>
                                                    <TextField
                                                        {...field}
                                                        select
                                                        value={field.value || ''}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handleSecurityLightStatus(e);
                                                        }}
                                                        required
                                                        label="Security Light Status"
                                                        error={!!errors.lightningPM?.securityLightStatus}
                                                        helperText={errors.lightningPM?.securityLightStatus ? (
                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.lightningPM?.securityLightStatus.message}
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
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Security Light Status
                                                        </MenuItem>
                                                        {getSecurityLightStatus()}
                                                    </TextField>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                </>
                            )}
                            
                            <Grid item xs={2.4}>
                                <Controller
                                    name="lightningPM.floodLightAvailability"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleFloodLightAvailability(e);
                                                }}
                                                required
                                                label="FloodLight Availablility"
                                                error={!!errors.lightningPM?.floodLightAvailability}
                                                helperText={errors.lightningPM?.floodLightAvailability ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.lightningPM?.floodLightAvailability.message}
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
                                                {floodLightAvailability !== '' && (
                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                        Flood Light Status
                                                    </MenuItem>
                                                )}
                                                {getFloodLightAvailability()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {watch('lightningPM.floodLightAvailability') === 'YES' && (
                                <>
                                    <Grid item xs={2.4}>
                                        <Controller
                                            name="lightningPM.floodLightStatus"
                                            control={control}
                                            render={({field}) => (
                                                <FormControl fullWidth>
                                                    <TextField
                                                        {...field}
                                                        select
                                                        value={field.value || ''}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handleFloodLightStatus(e);
                                                        }}
                                                        required
                                                        label="FlodLight Status"
                                                        error={!!errors.lightningPM?.floodLightStatus}
                                                        helperText={errors.lightningPM?.floodLightStatus ? (
                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.lightningPM?.floodLightStatus.message}
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
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            FloodLight Status
                                                        </MenuItem>
                                                        {getFloodLightStatus()}
                                                    </TextField>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={2.4}>
                                <Controller
                                    name="lightningPM.awl"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleAwlWorkingStatus(e);
                                                }}
                                                required
                                                label="Aviation Warning Ligth"
                                                error={!!errors.lightningPM?.awl}
                                                helperText={errors.lightningPM?.awl ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.lightningPM?.awl.message}
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
                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                    Select AWL Status
                                                </MenuItem>
                                                {getAwlWorkingStatus()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Box>
        </>
    )
}

export default Step6ShelterPM;