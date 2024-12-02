'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {useFormContext, Controller} from 'react-hook-form';
import TextField from "@mui/material/TextField";
import React, {useEffect} from 'react';
import useMediaQuery from "@mui/material/useMediaQuery";


const opt1 = ['OK', "NOT-OK", 'NOT-APPLICABLE'];
const opt2 = ['YES', 'NO', 'NOT-APPLICABLE'];
const noOfAc = [1, 2, 3, 4, 5];

function Step5AirConPM({txProps}) {
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
        acInstalled,
        noOfACInstalled,
        ac1Status,
        ac2Status,
    ] = watch([
        'airconPM.acInstalled',
        'airconPM.noOfACInstalled',
        'airconPM.ac1Status',
        'airconPM.ac2Status',
    ]);


    // Ac PM
    // ac installed
    const getAcInstalled = () => {
        return opt2.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleAcInstalled = (event) => {
        event.preventDefault();
        const acInstalledValue = event.target.value;
        setValue('airconPM.acInstalled', acInstalledValue);
        clearErrors('airconPM.acInstalled');
    }
    // no of AC
    const getNoOfAc = () => {
        return noOfAc.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleNoOfAc = (event) => {
        event.preventDefault();
        const noOfAcValue = event.target.value;
        setValue('airconPM.noOfACInstalled', noOfAcValue);
        clearErrors('airconPM.noOfACInstalled');
    }

    // Ac1 status
    const getAc1Status = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleAc1Status = (event) => {
        event.preventDefault();
        const ac1StatusValue = event.target.value;
        setValue('airconPM.ac1Status', ac1StatusValue);
        clearErrors('airconPM.ac1Status');
    }

    // Ac2 status
    const getAc2Status = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleAc2Status = (event) => {
        event.preventDefault();
        const ac2StatusValue = event.target.value;
        setValue('airconPM.ac2Status', ac2StatusValue);
        clearErrors('airconPM.ac2Status');
    }

    // set default values for ac2Status when no of AC = 1
    useEffect(() => {
        if (noOfACInstalled === 1) {
            setValue('airconPM.ac2Status', 'NOT-APPLICABLE');
        }
    }, [noOfACInstalled, setValue]);

    // set default if AC installed is NO
    useEffect(() => {
        if (acInstalled === 'NO' || acInstalled === 'NOT-APPLICABLE') {
            setValue('airconPM.noOfACInstalled', 0);
            setValue('airconPM.ac1Status', 'NOT-APPLICABLE');
            setValue('airconPM.ac2Status', 'NOT-APPLICABLE');
            clearErrors('airconPM.noOfACInstalled');
            clearErrors('airconPM.ac1Status');
            clearErrors('airconPM.ac2Status');
        }
    }, [acInstalled, setValue]);


    return (
        <>
            <Box>
                {/* Ac PM*/}
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h6"
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                        color: '#FFF',
                                        fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>
                            Aircon PM
                        </Typography>
                    </Grid>
                    {/*AllSite State*/}
                    <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                        <FormControl fullWidth>
                            <Controller
                                name="airconPM.acInstalled"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        select
                                        value={field.value || ''}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleAcInstalled(e);
                                        }}
                                        required
                                        label="AC Installed"
                                        error={!!errors.airconPM?.acInstalled}
                                        helperText={errors.airconPM?.acInstalled ? (
                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.airconPM?.acInstalled?.message}
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
                                        {acInstalled !== '' && (
                                            <MenuItem value='' sx={{color: "#4BF807"}}>
                                                Select AC Installation Status
                                            </MenuItem>
                                        )}
                                        {getAcInstalled()}
                                    </TextField>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    {watch('airconPM.acInstalled') === 'YES' && (
                        <>
                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="airconPM.noOfACInstalled"
                                        control={control}
                                        render={({field}) => (

                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleNoOfAc(e);
                                                }}
                                                required
                                                label="No Of AC"
                                                error={!!errors.airconPM?.noOfACInstalled}
                                                helperText={errors.airconPM?.noOfACInstalled ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.airconPM?.noOfACInstalled?.message}
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
                                                    Select Number of AC Installed
                                                </MenuItem>
                                                {getNoOfAc()}
                                            </TextField>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="airconPM.ac1Status"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleAc1Status(e);
                                                }}
                                                required
                                                label="AC1 Status"
                                                error={!!errors.airconPM?.ac1Status}
                                                helperText={errors.airconPM?.ac1Status ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.airconPM?.ac1Status?.message}
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
                                                    Select AC-1 Status
                                                </MenuItem>
                                                {getAc1Status()}
                                            </TextField>

                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            {watch('airconPM.noOfACInstalled') === 2 && (
                                <>
                                    <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name="airconPM.ac2Status"
                                                control={control}
                                                render={({field}) => (
                                                    <TextField
                                                        {...field}
                                                        select
                                                        value={field.value || ''}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handleAc2Status(e);
                                                        }}
                                                        required
                                                        label="AC2 Status"
                                                        error={!!errors.airconPM?.ac2Status}
                                                        helperText={errors.airconPM?.ac2Status ? (
                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.airconPM?.ac2Status?.message}
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
                                                            Select AC-2 Status
                                                        </MenuItem>
                                                        {getAc2Status()}
                                                    </TextField>

                                                )}
                                            />
                                        </FormControl>
                                    </Grid>
                                </>
                            )}
                        </>
                    )}
                </Grid>
            </Box>
        </>
    )
}

export default Step5AirConPM;