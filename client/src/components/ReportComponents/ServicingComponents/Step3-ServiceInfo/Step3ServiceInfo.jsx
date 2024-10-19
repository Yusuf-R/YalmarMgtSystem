import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {useFormContext, Controller, FormProvider, useForm} from 'react-hook-form';
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {DayPicker} from "react-day-picker";
import "react-day-picker/dist/style.css";

function Step3ServiceInfo({txProps}) {
    const siteShelterType = ['Containerized', 'Open'];
    const pmInstanceType = ['PM1', 'PM2'];
    const {control, setValue, watch, clearErrors, formState: {errors}} = useFormContext();

    // servicing info
    const shelterType = watch('shelterType');
    const pmInstance = watch('pmInstance');
    const servicingDate = watch('servicingDate')

    // shelterType and PM instance
    useEffect(() => {
        setValue('shelterType', shelterType);
        setValue('pmInstance', pmInstance);
    }, [shelterType, pmInstance, setValue]);

    // next service date
    useEffect(() => {
        const calculatedNextDueDate = servicingDate ? dayjs(servicingDate).add(14, 'day').format('DD/MMM/YYYY') : '';
        setValue('nextServiceDate', calculatedNextDueDate);
        clearErrors('nextServiceDate');
    }, [servicingDate, setValue, clearErrors]);

    // servicing section
    const getShelterType = () => {
        return siteShelterType.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleShelterType = (event) => {
        event.preventDefault();
        const shelterStruct = event.target.value;
        setValue('shelterType', shelterStruct);
    }

    // pm section
    const getPmType = () => {
        return pmInstanceType.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handlePmType = (event) => {
        event.preventDefault();
        const pmValue = event.target.value;
        setValue('pmInstance', pmValue);
    }

    // servicing date
    const [showCalendar, setShowCalendar] = useState(false);

    const handleToggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateSelect = (date) => {
        setValue('servicingDate', date);
        setShowCalendar(false); // Hide the date picker after selecting a date
    };


    return (
        <>
            <br/><br/><br/>
            <Box>
                {/*Servicing Info*/}
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
                                <Typography variant="subtitle 4">Service Info</Typography>
                            </Grid>
                            {/*AllSite State*/}
                            <Grid item xs={3}>
                                <Controller
                                    name="shelterType"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleShelterType(e);
                                                }}
                                                required
                                                label="Shelter Type"
                                                error={!!errors.shelterType}
                                                helperText={errors.shelterType ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.shelterType.message}
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
                                                    Select Shelter Type
                                                </MenuItem>
                                                {getShelterType()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/*Pm Instance*/}
                            <Grid item xs={3}>
                                <Controller
                                    name="pmInstance"
                                    control={control}
                                    render={({field}) => (
                                        <FormControl fullWidth>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handlePmType(e);
                                                }}
                                                label="PM Instance"
                                                required
                                                error={!!errors.pmInstance}
                                                helperText={errors.pmInstance ? (
                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.pmInstance.message}
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
                                                {getPmType()}
                                            </TextField>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            {/*Service Date*/}
                            <Grid item xs={3}>
                                <Controller
                                    name="servicingDate"
                                    control={control}
                                    render={({onChange}) => (
                                        <TextField
                                            onClick={handleToggleCalendar}
                                            value={servicingDate ? servicingDate.toLocaleDateString() : 'Enter Service Date'}
                                            InputProps={{sx: txProps, readOnly: true}}
                                            lable='Service Date'
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
                                        />
                                    )}
                                />
                                {showCalendar && (
                                    <>
                                        <DayPicker
                                            mode="single"
                                            captionLayout="dropdown"
                                            selected={servicingDate}
                                            onSelect={handleDateSelect}
                                            onToggle={handleToggleCalendar}
                                            numberOfMonths={2}
                                            required
                                            modifiers={{
                                                today: new Date(),
                                            }}
                                            style={{
                                                '--rdp-background-color': '#cc00cc',
                                            }}
                                            styles={{
                                                caption: {
                                                    color: '#FFF',
                                                },
                                                day: {
                                                    color: '#FFF',
                                                },
                                            }}
                                            modifiersStyles={{
                                                today: {
                                                    color: '#FFF',
                                                    backgroundColor: 'red',
                                                },
                                                selected: {
                                                    backgroundColor: 'rgb(0, 153, 0)',
                                                },
                                            }}
                                        />
                                    </>
                                )}
                            </Grid>
                            {/*Next Service Date*/}
                            <Grid item xs={3}>
                                {watch('servicingDate') && (
                                    <TextField
                                        value={watch('nextServiceDate')}
                                        InputProps={{sx: txProps, readOnly: true}}
                                        InputLabelProps={{
                                            sx: {
                                                color: "#46F0F9",
                                                "&.Mui-focused": {color: "white"}
                                            }
                                        }}
                                        label='Next Service Date'
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Box>
        </>
    )
}

export default Step3ServiceInfo;