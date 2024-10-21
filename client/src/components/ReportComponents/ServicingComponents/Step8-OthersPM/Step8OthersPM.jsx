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
const securityOpt = ['LOCKED', "ACCESS-GRANTED", 'UN-AVAILABLE', 'NOT-APPLICABLE'];
const securityOpt1 = ['AVAILABLE', "NOT-AVAILABLE", 'NOT-APPLICABLE'];

function Step8OthersPM({txProps}) {
    const {control, setValue, watch, clearErrors, formState: {errors}} = useFormContext();
    const [
        feederCableStatus,
        changeOverSwitchStatus,
        earthingCableStatus,
        earthingStatus,
        fireExtinguisherStatus,
        securityStatus,
        siteAccess,
        summary,

    ] = watch([
        'otherPM.feederCableStatus',
        'otherPM.changeOverSwitchStatus',
        'otherPM.earthingCableStatus',
        'otherPM.earthingStatus',
        'otherPM.fireExtinguisherStatus',
        'securityPM.securityStatus',
        'securityPM.siteAccess',
        'summary',
    ]);

    // other PM
    // feeder cable stats
    const getFeederCableStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleFeederCable = (event) => {
        event.preventDefault();
        const handledFeederCableValue = event.target.value;
        setValue('otherPM.feederCableStatus', handledFeederCableValue);
        clearErrors('otherPM.feederCableStatus');
    }

    // change over switch status
    const getChangeOverSwitchStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleChangeOverSwitchStatus = (event) => {
        event.preventDefault();
        const handledChangeOverSwitchValue = event.target.value;
        setValue('otherPM.changeOverSwitchStatus', handledChangeOverSwitchValue);
        clearErrors('otherPM.changeOverSwitchStatus');
    }

    // earthingCableStatus
    const getEarthingCableStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleEarthingCableStatus = (event) => {
        event.preventDefault();
        const handledEarthingCableValue = event.target.value;
        setValue('otherPM.earthingCableStatus', handledEarthingCableValue);
        clearErrors('otherPM.earthingCableStatus');
    }

    // earthingStatus
    const getEarthingStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleEarthingStatus = (event) => {
        event.preventDefault();
        const handledEarthingValue = event.target.value;
        setValue('otherPM.earthingStatus', handledEarthingValue);
        clearErrors('otherPM.earthingStatus');
    }

    // fireExtinguisherStatus
    const getFireExtinguisherStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleFireExtinguisherStatus = (event) => {
        event.preventDefault();
        const handledFireExtinguisherValue = event.target.value;
        setValue('otherPM.fireExtinguisherStatus', handledFireExtinguisherValue);
        clearErrors('otherPM.fireExtinguisherStatus');
    }
    // security PM
    // security status
    const getSecurityStatus = () => {
        return securityOpt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleSecurityStatus = (event) => {
        event.preventDefault();
        const handledSecurityValue = event.target.value;
        setValue('securityPM.securityStatus', handledSecurityValue);
        clearErrors('securityPM.securityStatus');
    }
    // site Access
    const getSiteAccess = () => {
        return securityOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleSiteAccess = (event) => {
        event.preventDefault();
        const handledSiteAccessValue = event.target.value;
        setValue('securityPM.siteAccess', handledSiteAccessValue);
        clearErrors('securityPM.siteAccess');
    }
    return (
        <>
            <br/><br/><br/>
            <Box>
                {/*Other PM*/}
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
                                <Typography variant="subtitle 4">Others PM</Typography>
                            </Grid>
                            <Grid item xs={2.4}>
                                <Controller
                                    name="otherPM.feederCableStatus"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleFeederCable(e);
                                                }}
                                                required
                                                label="Feeder Cable Status"
                                                error={!!errors.otherPM?.feederCableStatus}
                                                helperText={errors.otherPM?.feederCableStatus ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.otherPM?.feederCableStatus.message}
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
                                                {feederCableStatus !== '' && (
                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                        Feeder Cable Status
                                                    </MenuItem>
                                                )}
                                                {getFeederCableStatus()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <Controller
                                    name="otherPM.changeOverSwitchStatus"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleChangeOverSwitchStatus(e);
                                                }}
                                                required
                                                label="ChangeOver Switch Status"
                                                error={!!errors.otherPM?.changeOverSwitchStatus}
                                                helperText={errors.otherPM?.changeOverSwitchStatus ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.otherPM?.changeOverSwitchStatus.message}
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
                                                {changeOverSwitchStatus !== '' && (
                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                        ChangeOver Switch Status
                                                    </MenuItem>
                                                )}
                                                {getChangeOverSwitchStatus()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <Controller
                                    name="otherPM.earthingStatus"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleEarthingStatus(e);
                                                }}
                                                required
                                                label="Earthing Status"
                                                error={!!errors.otherPM?.earthingStatus}
                                                helperText={errors.otherPM?.earthingStatus ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.otherPM?.earthingStatus.message}
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
                                                {earthingStatus !== '' && (
                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                        Earth Status
                                                    </MenuItem>
                                                )}
                                                {getEarthingStatus()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <Controller
                                    name="otherPM.earthingCableStatus"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleEarthingCableStatus(e);
                                                }}
                                                required
                                                label="Earthing Cable Status"
                                                error={!!errors.otherPM?.earthingCableStatus}
                                                helperText={errors.otherPM?.earthingCableStatus ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.otherPM?.earthingCableStatus.message}
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
                                                {earthingCableStatus !== '' && (
                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                        Earth Cable Status
                                                    </MenuItem>
                                                )}
                                                {getEarthingCableStatus()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <Controller
                                    name="otherPM.fireExtinguisherStatus"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleFireExtinguisherStatus(e);
                                                }}
                                                required
                                                label="FireExtinguisher Status"
                                                error={!!errors.otherPM?.fireExtinguisherStatus}
                                                helperText={errors.otherPM?.fireExtinguisherStatus ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.otherPM?.fireExtinguisherStatus.message}
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
                                                {fireExtinguisherStatus !== '' && (
                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                        FireExtinguisher Status
                                                    </MenuItem>
                                                )}
                                                {getFireExtinguisherStatus()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <br/><br/>
                            {/*Security PM*/}
                            <Grid item xs={12}>
                                <Typography variant="subtitle 4">Security PM</Typography>
                            </Grid>
                            <Grid item xs={2.4}>
                                <Controller
                                    name="securityPM.securityStatus"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleSecurityStatus(e);
                                                }}
                                                required
                                                label="Security Status"
                                                error={!!errors.securityPM?.securityStatus}
                                                helperText={errors.securityPM?.securityStatus ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.securityPM?.securityStatus.message}
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
                                                {securityStatus !== '' && (
                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                        Security Light Availability
                                                    </MenuItem>
                                                )}
                                                {getSecurityStatus()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <Controller
                                    name="securityPM.siteAccess"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleSiteAccess(e);
                                                }}
                                                required
                                                label="AllSite Access"
                                                error={!!errors.securityPM?.siteAccess}
                                                helperText={errors.securityPM?.siteAccess ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.securityPM?.siteAccess.message}
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
                                                {siteAccess !== '' && (
                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                        Security Light Status
                                                    </MenuItem>
                                                )}
                                                {getSiteAccess()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <br/><br/>
                            {/*Summary info of the Servicing Report*/}
                            <Grid item xs={12}>
                                <Typography variant="subtitle 4">Overall Summary Report</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="summary"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            InputProps={{
                                                sx: {...txProps, width: '100%'}
                                            }}
                                            InputLabelProps={{
                                                sx: {
                                                    color: "#46F0F9",
                                                    "&.Mui-focused": {
                                                        color: "white",
                                                    },
                                                }
                                            }}
                                            label="Summary of Service Report"
                                            multiline
                                            minRows={5}
                                            maxRows={25}
                                            variant="outlined"
                                            placeholder="Provide Summary details of the servicing report"
                                            fullWidth
                                            required
                                            error={!!errors.summary}
                                            helperText={errors.summary ? errors.summary.message : ''}
                                        />
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


export default Step8OthersPM;