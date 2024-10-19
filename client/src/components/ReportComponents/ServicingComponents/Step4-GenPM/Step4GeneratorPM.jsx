'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {useFormContext, Controller, FormProvider, useForm, useWatch} from 'react-hook-form';
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from 'react';


const genModes = ['GEN-1', 'GEN-1 and GEN-2'];
const defaultOpt = ['Gen1', 'Gen2'];
const genOpt = [
    'CAT',
    'MANTRAC',
    'LISTA-PETER',
    'FG-WILSON',
    'JUBALI-BROS',
    'MIKANO',
    'YOUNES',
    'PERKINGS',
    'SDMO',
    'OTHERS',
    'NOT-APPLICABLE'
];
const opt1 = ['OK', "NOT-OK", 'NOT-APPLICABLE'];
const genWorkingHr = ['Enter Value', 'FAULTY-TELLYS', 'NOT-APPLICABLE',];
const genWorkStatus = ['OK', 'NOT-OK', 'WEAK-GEN', 'NOT-APPLICABLE'];

function Step4GeneratorPM({txProps}) {
    const {control, setValue, watch, clearErrors, formState: {errors}} = useFormContext();
    const [
        siteGenModes,
        defaultOperation,
        gen1Type,
        gen1Display,
        gen2Type,
        gen2Display,
    ] = watch([
        'siteGenModes',
        'generatorPM.defaultOperation',

        'generatorPM.gen1Type',
        'generatorPM.gen1Display',

        'generatorPM.gen2Type',
        'generatorPM.gen2Display',
    ]);

    useEffect(() => {
        setValue('siteGenModes', siteGenModes);
        setValue('generatorPM.defaultOperation', defaultOperation);
        setValue('generatorPM.gen1Type', gen1Type);
        setValue('generatorPM.gen1Display', gen1Display);
        setValue('generatorPM.gen2Type', gen2Type);
        setValue('generatorPM.gen2Display', gen2Display);

    }, [siteGenModes, defaultOperation, setValue, gen1Type, gen1Display, gen2Type, gen2Display]);

    // set default values for gen2 attributes if gen modes is just only Gen1
    useEffect(() => {
        if (siteGenModes === 'GEN-1') {
            setValue('generatorPM.gen2Type', 'NOT-APPLICABLE');
            setValue('generatorPM.gen2Display', 'NOT-APPLICABLE');
            setValue('generatorPM.gen2WorkingStatus', 'NOT-APPLICABLE');
            setValue('generatorPM.gen2OperatingVoltage', 0);
            setValue('generatorPM.gen2OperatingFrequency', 0);
            setValue('generatorPM.gen2Hr', 'NOT-APPLICABLE');
        }
    }, [siteGenModes, setValue]);

    // site gen opt
    const getGenOpt = () => {
        return genOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }

    // site gen modes
    const getSiteGenModes = () => {
        return genModes.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleSiteGenModes = (event) => {
        event.preventDefault();
        const genModeValue = event.target.value;
        setValue('siteGenModes', genModeValue);
    }
    // // default Opt
    const getGenDefaultOperation = () => {
        return defaultOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleDefaultOperation = (event) => {
        event.preventDefault();
        const genDefaultOperationValue = event.target.value;
        setValue('generatorPM.defaultOperation', genDefaultOperationValue);
        clearErrors(event.target.value);
    }

    // gen1 type
    const getGen1Type = () => {
        return genOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen1Type = (event) => {
        event.preventDefault();
        const gen1TypeValue = event.target.value;
        setValue('generatorPM.gen1Type', gen1TypeValue);
    }
    // gen1 display
    const getGen1Display = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen1Display = (event) => {
        event.preventDefault();
        const gen1DisplayValue = event.target.value;
        setValue('generatorPM.gen1Display', gen1DisplayValue);
    }

    // gen1 working hours
    const gen1Hr = useWatch({control, name: 'generatorPM.gen1Hr'});

    const getGen1Hr = () => {
        return genWorkingHr.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen1Hr = (event) => {
        event.preventDefault();
        const selectedValue = event.target.value;
        setValue('generatorPM.gen1Hr', selectedValue);

        if (selectedValue !== 'Enter Value') {
            clearErrors('generatorPM.gen1Hr');
            setValue('generatorPM.customGen1Hr', null);
        }
    }

    // gen1 working status
    const getGen1WorkingStatus = () => {
        return genWorkStatus.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen1WorkingStatus = (event) => {
        event.preventDefault();
        const gen1WorkingStatusValue = event.target.value;
        setValue('generatorPM.gen1WorkingStatus', gen1WorkingStatusValue);
    }

    // gen2 type
    const getGen2Type = () => {
        return genOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen2Type = (event) => {
        event.preventDefault();
        const gen2TypeValue = event.target.value;
        setValue('generatorPM.gen2Type', gen2TypeValue);
    }
    // gen2 display
    const getGen2Display = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen2Display = (event) => {
        event.preventDefault();
        const gen2DisplayValue = event.target.value;
        setValue('generatorPM.gen2Display', gen2DisplayValue);
    }

    // gen2 working hour
    const getGen2Hr = () => {
        return genWorkingHr.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen2Hr = (event) => {
        event.preventDefault();
        const selectedValue = event.target.value;

        setValue('generatorPM.gen2Hr', selectedValue);
        if (selectedValue !== 'Enter Value') {
            setValue('generatorPM.customGen2Hr', null);
        }
    }
    // gen2 working status
    const getGen2WorkingStatus = () => {
        return genWorkStatus.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen2WorkingStatus = (event) => {
        event.preventDefault();
        const gen2WorkingStatusValue = event.target.value;
        setValue('generatorPM.gen2WorkingStatus', gen2WorkingStatusValue);
    }

    return (
        <>
            <br/><br/><br/>
            <Box>
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
                                <Typography variant="subtitle 4">Generator PM</Typography>
                            </Grid>
                            {/*AllSite Gen Modes*/}
                            <Grid item xs={3}>
                                <Controller
                                    name="siteGenModes"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleSiteGenModes(e);
                                                }}
                                                required
                                                label="AllSite Generator Modes"
                                                error={!!errors.siteGenModes}
                                                helperText={errors.siteGenModes?.message ? (
                                                    <span style={{color: "#fc8947"}}>
                                                            {errors.siteGenModes.message}
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
                                                }}
                                            >
                                                {genModes !== '' && (
                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                        Select AllSite Gen Modes
                                                    </MenuItem>
                                                )}
                                                {getSiteGenModes()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Controller
                                    name="generatorPM.defaultOperation"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleDefaultOperation(e);
                                                }}
                                                required
                                                label="AllSite Default Generator"
                                                error={!!(errors.generatorPM?.defaultOperation)}
                                                helperText={errors.generatorPM?.defaultOperation ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM ? errors.generatorPM.defaultOperation.message : undefined}
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
                                                {defaultOperation !== '' && (
                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                        Select Default Operation
                                                    </MenuItem>
                                                )}
                                                {getGenDefaultOperation()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/*Default Operation*/}
                            <Grid item xs={12}>
                                <Typography variant="subtitle 4">Gen-1 PM</Typography>
                            </Grid>
                            {/*Gen 1 model*/}
                            <Grid item xs={3}>
                                <Controller
                                    name="generatorPM.gen1Type"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleGen1Type(e);
                                                }}
                                                label="Gen1 Type"
                                                required
                                                error={!!errors.generatorPM?.gen1Type}
                                                helperText={errors.generatorPM?.gen1Type ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM.gen1Type.message}
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
                                                {gen1Type !== '' && (
                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                        Select Gen1 Type
                                                    </MenuItem>
                                                )}
                                                {getGen1Type()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/*gen1Display*/}
                            <Grid item xs={3}>
                                <Controller
                                    name="generatorPM.gen1Display"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleGen1Display(e);
                                                }}
                                                label="Gen1 Display"
                                                required
                                                error={!!errors.generatorPM?.gen1Display}
                                                helperText={errors.generatorPM?.gen1Display ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM.gen1Display.message}
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
                                                {gen1Display !== '' && (
                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                        Select Gen-1 Display
                                                    </MenuItem>
                                                )}
                                                {getGen1Display()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/*gen1WorkingStatus*/}
                            <Grid item xs={3}>
                                <Controller
                                    name="generatorPM.gen1WorkingStatus"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleGen1WorkingStatus(e);
                                                }}
                                                label="Working Status"
                                                required
                                                error={!!errors.generatorPM?.gen1WorkingStatus}
                                                helperText={errors.generatorPM?.gen1WorkingStatus ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM?.gen1WorkingStatus.message}
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
                                                <MenuItem value='' sx={{color: "#4BF807", disable: true}}>
                                                    Gen1 Working Status
                                                </MenuItem>
                                                {getGen1WorkingStatus()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/*gen1OperatingVoltage*/}
                            <Grid item xs={3}>
                                <Controller
                                    name="generatorPM.gen1OperatingVoltage"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                label="Operating Voltage Reading"
                                                type="number"
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                required
                                                error={!!errors.generatorPM?.gen1OperatingVoltage}
                                                helperText={errors.generatorPM?.gen1OperatingVoltage ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM?.gen1OperatingVoltage.message}
                                                                                </span>
                                                ) : ''}
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
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/*gen1OperatingFrequency*/}
                            <Grid item xs={3}>
                                <Controller
                                    name="generatorPM.gen1OperatingFrequency"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                label="Operating Frequency Reading"
                                                type="number"
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                required
                                                error={!!errors.generatorPM?.gen1OperatingFrequency}
                                                helperText={errors.generatorPM?.gen1OperatingFrequency ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM?.gen1OperatingFrequency.message}
                                                                                </span>
                                                ) : ''}
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
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/*gen1Hr*/}
                            <Grid item xs={3}>
                                <Controller
                                    name="generatorPM.gen1Hr"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleGen1Hr(e);
                                                }}
                                                label="Gen1 Working Hrs"
                                                required
                                                error={!!errors.generatorPM?.gen1Hr}
                                                helperText={errors.generatorPM?.gen1Hr ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM?.gen1Hr.message}
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
                                                <MenuItem value='' sx={{color: "#4BF807", disable: true}}>
                                                    Gen1 Working Hrs
                                                </MenuItem>
                                                {getGen1Hr()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {watch('generatorPM.gen1Hr') === 'Enter Value' && (
                                <Grid item xs={3}>
                                    {/* Custom CPD input */}
                                    <Controller
                                        name="generatorPM.customGen1Hr"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Enter Working Hrs"
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
                            {watch('siteGenModes') === 'GEN-1 and GEN-2' && (
                                <>
                                    {/*Gen 2 Info*/}
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle 4">Gen2 Info</Typography>
                                    </Grid>
                                    {/*Gen 1 model*/}
                                    <Grid item xs={3}>
                                        <Controller
                                            name="generatorPM.gen2Type"
                                            control={control}
                                            render={({field}) => (
                                                <FormControl fullWidth>
                                                    <TextField
                                                        {...field}
                                                        select
                                                        value={field.value || ''}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handleGen2Type(e);
                                                        }}
                                                        label="Gen1 Type"
                                                        required
                                                        error={!!errors.pmInstance}
                                                        helperText={errors.pmInstance ? (
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
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select PM Instance
                                                        </MenuItem>
                                                        {getGen2Type()}
                                                    </TextField>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Controller
                                            name="generatorPM.gen2Display"
                                            control={control}
                                            render={({field}) => (
                                                <FormControl fullWidth>
                                                    <TextField
                                                        {...field}
                                                        select
                                                        value={field.value || ''}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handleGen2Display(e);
                                                        }}
                                                        label="Gen2 Display"
                                                        required
                                                        error={!!errors.generatorPM?.gen2Display}
                                                        helperText={errors.generatorPM?.gen2Display ? (
                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM.gen2Display.message}
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
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select Gen-2 Display
                                                        </MenuItem>
                                                        {getGen2Display()}
                                                    </TextField>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Controller
                                            name="generatorPM.gen2WorkingStatus"
                                            control={control}
                                            render={({field}) => (
                                                <FormControl fullWidth>
                                                    <TextField
                                                        {...field}
                                                        select
                                                        value={field.value || ''}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handleGen2WorkingStatus(e);
                                                        }}
                                                        label="Gen2 Type"
                                                        required
                                                        error={!!errors.generatorPM?.gen2WorkingStatus}
                                                        helperText={errors.generatorPM?.gen2WorkingStatus ? (
                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM?.gen2WorkingStatus.message}
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
                                                        <MenuItem value=''
                                                                  sx={{color: "#4BF807", disable: true}}>
                                                            Gen2 Working Status
                                                        </MenuItem>
                                                        {getGen2WorkingStatus()}
                                                    </TextField>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Controller
                                            name="generatorPM.gen2OperatingVoltage"
                                            control={control}
                                            render={({field}) => (
                                                <FormControl fullWidth>
                                                    <TextField
                                                        {...field}
                                                        label="Operating Voltage Reading"
                                                        type="number"
                                                        required
                                                        error={!!errors.generatorPM?.gen2OperatingVoltage}
                                                        helperText={errors.generatorPM?.gen2OperatingVoltage ? (
                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM.gen2OperatingVoltage.message}
                                                                                </span>
                                                        ) : ''}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Controller
                                            name="generatorPM.gen2OperatingFrequency"
                                            control={control}
                                            render={({field}) => (
                                                <FormControl fullWidth>
                                                    <TextField
                                                        {...field}
                                                        label="Operating Frequency Reading"
                                                        type="number"
                                                        required
                                                        error={!!errors.generatorPM?.gen2OperatingFrequency}
                                                        helperText={errors.generatorPM?.gen2OperatingFrequency ? (
                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM.gen2OperatingFrequency.message}
                                                                                </span>
                                                        ) : ''}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Controller
                                            name="generatorPM.gen2Hr"
                                            control={control}
                                            render={({field}) => (
                                                <FormControl fullWidth>
                                                    <TextField
                                                        {...field}
                                                        select
                                                        value={field.value || ''}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handleGen2Hr(e);
                                                        }}
                                                        label="Gen1 Working Hrs"
                                                        required
                                                        error={!!errors.generatorPM?.gen2Hr}
                                                        helperText={errors.generatorPM?.gen2Hr ? (
                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM?.gen2Hr.message}
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
                                                        <MenuItem value=''
                                                                  sx={{color: "#4BF807", disable: true}}>
                                                            Gen2 Working Hrs
                                                        </MenuItem>
                                                        {getGen2Hr()}
                                                    </TextField>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                    {watch('generatorPM.gen2Hr') === 'Enter Value' && (
                                        <Grid item xs={3}>
                                            {/* Custom CPD input */}
                                            <Controller
                                                name="generatorPM.customGen2Hr"
                                                control={control}
                                                render={({field}) => (
                                                    <TextField
                                                        {...field}
                                                        label="Enter Working Hrs"
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
                                </>
                            )}
                        </Grid>
                    </Paper>

                </Grid>
            </Box>
        </>
    )
}

export default Step4GeneratorPM;