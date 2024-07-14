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

const opt1 = ['OK', 'NOT-OK', 'NOT-APPLICABLE'];
const opt2 = ['YES', 'NO', 'NOT-APPLICABLE'];
const batCount = [0, 4, 8, 12, 16, 32, 48];

function Step7DCSystemPM({txProps}) {
    const {control, setValue, watch, clearErrors, formState: {errors}} = useFormContext();
    
    const [
        rectifierStatus,
        backUpBatteries,
        count,
        status,
    ] = watch([
        'dcSystem.rectifierStatus',
        'dcSystem.backUpBatteries',
        'dcSystem.count',
        'dcSystem.status',
    ]);
    // DC system PM
    // back up batteries
    const getBackUpBatteries = () => {
        return opt2.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleBackUpBatteries = (event) => {
        event.preventDefault();
        const backUpBatteriesValue = event.target.value;
        console.log({backUpBatteriesValue});
        // handle default when back-up batteries is NO or NOT-APPLICABLE
        setValue('shelterPM.backUpBatteries', backUpBatteriesValue);
        clearErrors('shelterPM.backUpBatteries');
    }
    // counter
    const getBatteryCount = () => {
        return batCount.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleBatteryCount = (event) => {
        event.preventDefault();
        const batteryCountValue = event.target.value;
        setValue('shelterPM.batteryCount', batteryCountValue);
        clearErrors('shelterPM.batteryCount');
    }
    // status
    const getBatteryStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleBatteryStatus = (event) => {
        event.preventDefault();
        const batteryStatusValue = event.target.value;
        setValue('shelterPM.batteryStatus', batteryStatusValue);
        clearErrors('shelterPM.batteryStatus');
    }
    
    // rectifier
    const getRectifierStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleRectifierStatus = (event) => {
        event.preventDefault();
        const rectifierStatusValue = event.target.value;
        setValue('shelterPM.rectifierStatus', rectifierStatusValue);
        clearErrors('shelterPM.rectifierStatus');
    }
    
    useEffect(() => {
        if (backUpBatteries === 'NO' || backUpBatteries === 'NOT-APPLICABLE') {
            setValue('dcSystem.count', Number(0));
            setValue('dcSystem.status', 'NOT-APPLICABLE');
        }
    }, [backUpBatteries]);
    
    return (
        <>
            <br/><br/><br/>
            <Box>
                {/*Dc System OM*/}
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
                                <Typography variant="subtitle 4">DC System PM</Typography>
                            </Grid>
                            <Grid item xs={2.4}>
                                <Controller
                                    name="dcSystem.backUpBatteries"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleBackUpBatteries(e);
                                                }}
                                                required
                                                label="Batteries Availability"
                                                error={!!errors.dcSystem?.backUpBatteries}
                                                helperText={errors.dcSystem?.backUpBatteries ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.dcSystem?.backUpBatteries.message}
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
                                                {backUpBatteries !== '' && (
                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                        Batteries Availability
                                                    </MenuItem>
                                                )}
                                                {getBackUpBatteries()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {backUpBatteries === 'YES' && (
                                <>
                                    <Grid item xs={2.4}>
                                        <Controller
                                            name="dcSystem.count"
                                            control={control}
                                            render={({field}) => (
                                                <FormControl fullWidth>
                                                    <TextField
                                                        {...field}
                                                        select
                                                        value={field.value || ''}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handleBatteryCount(e);
                                                        }}
                                                        required
                                                        label="Battery Count"
                                                        error={!!errors.dcSystem?.count}
                                                        helperText={errors.dcSystem?.count ? (
                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.dcSystem?.count.message}
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
                                                        {count !== '' && (
                                                            <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                Battery Count
                                                            </MenuItem>
                                                        )}
                                                        {getBatteryCount()}
                                                    </TextField>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                </>
                            )}
                            {backUpBatteries === 'YES' && (
                                <>
                                    <Grid item xs={2.4}>
                                        <Controller
                                            name="dcSystem.status"
                                            control={control}
                                            render={({field}) => (
                                                <FormControl fullWidth>
                                                    <TextField
                                                        {...field}
                                                        select
                                                        value={field.value || ''}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handleBatteryStatus(e);
                                                        }}
                                                        required
                                                        label="Battery Status"
                                                        error={!!errors.dcSystem?.status}
                                                        helperText={errors.dcSystem?.status ? (
                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.dcSystem?.status.message}
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
                                                        {status !== '' && (
                                                            <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                Battery Status
                                                            </MenuItem>
                                                        )}
                                                        {getBatteryStatus()}
                                                    </TextField>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={2.4}>
                                <Controller
                                    name="dcSystem.rectifierStatus"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleRectifierStatus(e);
                                                }}
                                                required
                                                label="Rectifier Status"
                                                error={!!errors.dcSystem?.rectifierStatus}
                                                helperText={errors.dcSystem?.rectifierStatus ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.dcSystem?.rectifierStatus.message}
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
                                                {rectifierStatus !== '' && (
                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                        Rectifier Status
                                                    </MenuItem>
                                                )}
                                                {getRectifierStatus()}
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

export default Step7DCSystemPM;