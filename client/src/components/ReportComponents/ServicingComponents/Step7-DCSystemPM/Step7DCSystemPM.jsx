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
import useMediaQuery from "@mui/material/useMediaQuery";

const opt1 = ['OK', 'NOT-OK', 'NOT-APPLICABLE'];
const batStat = ['OK', 'NOT-OK', 'NOT-POWERED', 'NOT-APPLICABLE'];
const opt2 = ['YES', 'NO', 'NOT-APPLICABLE'];
const batCount = [0, 4, 8, 12, 16, 32, 48];

function Step7DCSystemPM({txProps}) {
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
    const [
        rectifierStatus,
        backUpBatteries,
        count,
        status,
    ] = watch([
        'dcSystem.rectifierStatus',
        'dcSystem.backUpBatteries',
        'dcSystem.batteryCount',
        'dcSystem.batteryStatus',
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
        setValue('dcSystem.backUpBatteries', backUpBatteriesValue);
        clearErrors('dcSystem.backUpBatteries');
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
        setValue('dcSystem.batteryCount', batteryCountValue);
        clearErrors('dcSystem.batteryCount');
    }
    // status
    const getBatteryStatus = () => {
        return batStat.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleBatteryStatus = (event) => {
        event.preventDefault();
        const batteryStatusValue = event.target.value;
        setValue('dcSystem.batteryStatus', batteryStatusValue);
        clearErrors('dcSystem.batteryStatus');
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
        setValue('dcSystem.rectifierStatus', rectifierStatusValue);
        clearErrors('dcSystem.rectifierStatus');
    }

    useEffect(() => {
        if (backUpBatteries === 'NO' || backUpBatteries === 'NOT-APPLICABLE') {
            setValue('dcSystem.batteryCount', Number(0));
            setValue('dcSystem.batteryStatus', 'NOT-APPLICABLE');
        }
    }, [backUpBatteries]);

    return (
        <>
            <Box>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h6"
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                        color: '#FFF',
                                        fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>
                            DC System PM
                        </Typography>
                    </Grid>
                    <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
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
                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                <Controller
                                    name="dcSystem.batteryCount"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                value={field.value || ''}
                                                type="number"
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                required
                                                label="Battery Count"
                                                error={!!errors.dcSystem?.batteryCount}
                                                helperText={errors.dcSystem?.batteryCount ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.dcSystem?.batteryCount.message}
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

                                                sx={{
                                                    '& .MuiSelect-icon': {
                                                        color: '#fff',
                                                    },
                                                    '& .MuiSelect-icon:hover': {
                                                        color: '#fff',
                                                    },
                                                    textAlign: 'left',
                                                }}>
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        </>
                    )}
                    {backUpBatteries === 'YES' && (
                        <>
                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                <Controller
                                    name="dcSystem.batteryStatus"
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
                                                error={!!errors.dcSystem?.batteryStatus}
                                                helperText={errors.dcSystem?.batteryStatus ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.dcSystem?.batteryStatus.message}
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
                    <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
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
            </Box>
        </>
    )
}

export default Step7DCSystemPM;