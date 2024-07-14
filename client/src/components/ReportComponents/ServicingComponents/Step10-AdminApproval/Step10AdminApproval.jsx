import Box from "@mui/material/Box";
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import {Controller, useFormContext} from 'react-hook-form';
import {FormControl} from "@mui/material/";

function Step10AdminApproval({allStaff, txProps}) {
    const {control, setValue, clearErrors, watch, formState: {errors}} = useFormContext();
    const adminFullNames = allStaff.filter(staff => staff.role === 'Admin' || staff.role === 'SuperAdmin').map(staff => staff.fullName);
    
    // admin FullName
    const getAdminFullName = () => {
        return adminFullNames.map((fullName) => (
            <MenuItem key={fullName} value={fullName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {fullName}
            </MenuItem>
        ));
    };
    const handleAdminFullName = (event) => {
        event.preventDefault();
        const selectedFullName = event.target.value;
        const selectedEmail = allStaff.find(staff => staff.fullName === selectedFullName).email;
        const selectedRole = allStaff.find(staff => staff.fullName === selectedFullName).role;
        const admin_id = allStaff.filter(staff => staff.fullName === selectedFullName).map(staff => staff._id)[0];
        // set values
        setValue('adminEmail', selectedEmail);
        setValue('adminRole', selectedRole);
        setValue('admin_id', admin_id);
        // clear errors
        clearErrors('adminFullName');
        clearErrors('adminEmail');
        clearErrors('adminRole');
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
                            <Typography variant="subtitle 4">Admin Approval Staff Info</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="adminFullName"
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
                                                handleAdminFullName(e);
                                            }}
                                            required
                                            label="Admin FullName"
                                            error={!!errors.adminFullName}
                                            helperText={errors.adminFullName ? (
                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.adminFullName.message}
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
                                                Select Admin FullName
                                            </MenuItem>
                                            {getAdminFullName()}
                                        </TextField>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        {watch('adminFullName') !== '' && (
                            <>
                                <Grid item xs={4}>
                                    <Controller
                                        name="adminEmail"
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
                                                label="Admin Email"
                                                variant="outlined"
                                                error={!!errors.adminEmail}
                                                helperText={errors.adminEmail ? errors.adminEmail.message : ''}
                                                type="text"
                                                readOnly
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="adminRole"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Admin Role"
                                                error={!!errors.adminRole}
                                                helperText={errors.adminRole?.message}
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

export default Step10AdminApproval;
