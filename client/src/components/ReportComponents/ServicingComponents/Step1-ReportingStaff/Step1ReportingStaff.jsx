// Step1ReportingStaff.js
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import {Controller, useFormContext} from 'react-hook-form';
import {FormControl} from "@mui/material/";
import useMediaQuery from "@mui/material/useMediaQuery";

function Step1ReportingStaff({allStaff, txProps}) {
    const {control, setValue, clearErrors, watch, formState: {errors}} = useFormContext();
    const fullNames = Array.from(new Set(allStaff.map(staff => staff.fullName)));
    const getFullName = () => fullNames.map((fullName) => (
        <MenuItem key={fullName} value={fullName}>
            {fullName}
        </MenuItem>
    ));
    const handleFullName = (event) => {
        const selectedFullName = event.target.value;
        const selectedStaff = allStaff.find(staff => staff.fullName === selectedFullName);
        if (selectedStaff) {
            setValue('fullName', selectedFullName);
            setValue('email', selectedStaff.email);
            setValue('role', selectedStaff.role);
            setValue('staff_id', selectedStaff._id);
            clearErrors('fullName');
            clearErrors('email');
            clearErrors('role');
        }
    };

    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h6"
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.0rem' : '1.1rem',
                                }}>
                        Reporting Staff Info
                    </Typography>
                </Grid>
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="fullName"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    select
                                    defaultValue='' // <-- Set default value to an empty string
                                    value={field.value || ''}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleFullName(e);
                                    }}
                                    required
                                    label="FullName"
                                    error={!!errors.fullName}
                                    helperText={errors.fullName ? (
                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.fullName.message}
                                                                                </span>
                                    ) : ''}
                                    InputProps={{
                                        sx: txProps,
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
                                                    width: '20%'
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
                                        Select Staff FullName
                                    </MenuItem>
                                    {getFullName()}
                                </TextField>

                            )}
                        />
                    </FormControl>
                </Grid>
                {watch('fullName') !== '' && (
                    <>
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            InputProps={{
                                                sx: txProps,
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
                                                color: "#46F0F9",
                                            }}
                                            label="Email"
                                            variant="outlined"
                                            error={!!errors.email}
                                            helperText={errors.email ? errors.email.message : ''}
                                            type="text"
                                            readOnly
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Role"
                                            error={!!errors.role}
                                            helperText={errors.role?.message}
                                            InputProps={{
                                                sx: txProps,
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
                                                color: "#46F0F9",
                                            }}
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    );
}

export default Step1ReportingStaff;
