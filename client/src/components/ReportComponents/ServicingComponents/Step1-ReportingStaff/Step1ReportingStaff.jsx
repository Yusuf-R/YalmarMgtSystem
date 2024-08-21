// Step1ReportingStaff.js
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import {Controller, useFormContext} from 'react-hook-form';
import {FormControl} from "@mui/material/";

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
    
    return (
        <>
            <br/><br/><br/>
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
                            <Typography variant="subtitle 4">Reporting Staff Info</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="fullName"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <FormControl fullWidth>
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
                                                sx: {
                                                    ...txProps,
                                                    width: '100%',
                                                }
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
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        {watch('fullName') !== '' && (
                            <>
                                <Grid item xs={4}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                InputProps={{
                                                    sx: {
                                                        ...txProps,
                                                        width: '150%',
                                                        ml: 10,
                                                    }
                                                }}
                                                InputLabelProps={{
                                                    sx: {
                                                        color: "#46F0F9",
                                                        "&.Mui-focused": {
                                                            color: "white"
                                                        },
                                                        ml: 10,
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
                                </Grid>
                                <Grid item xs={4}>
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
                                                    sx: {
                                                        ...txProps,
                                                        ml: 10,
                                                    }
                                                }}
                                                InputLabelProps={{
                                                    sx: {
                                                        color: "#46F0F9",
                                                        "&.Mui-focused": {
                                                            color: "white"
                                                        },
                                                        ml: 10,
                                                    }
                                                }}
                                                sx={{
                                                    color: "#46F0F9",
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </>
    );
}

export default Step1ReportingStaff;
