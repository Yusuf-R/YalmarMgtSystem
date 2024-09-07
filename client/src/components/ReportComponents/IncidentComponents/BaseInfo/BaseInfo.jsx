import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Controller, useFormContext} from "react-hook-form";
import {FormControl} from "@mui/material";
import TextField from "@mui/material/TextField";
import {txProps} from "@/utils/data";
import Paper from "@mui/material/Paper";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import {yupResolver} from '@hookform/resolvers/yup';
import {baseInfoSchema} from "@/SchemaValidator/IncidentValidators/baseInfoSchema";


function BaseInfo({allStaff}) {
    const {control, watch, setValue, clearErrors, formState: {errors}} = useFormContext({
        resolver: yupResolver(baseInfoSchema),
        mode: 'onTouched',
        reValidateMode: 'onChange',
    });
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
    
    const typographyStyle = {
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: '16px',
        textAlign: 'left',
    };
    const paperSx = {
        padding: '10px',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        width: '100%',
        height: 'auto',
    }
    
    return (
        <>
            <Paper elevation={5} sx={paperSx}>
                <Grid container spacing={4}>
                    {/*Admin Approval*/}
                    <Grid item xs={12}>
                        <Typography variant="subtitle 4" sx={typographyStyle}>Admin Approval Staff
                            Info</Typography>
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
                                            },
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
                                                },
                                                readOnly: true
                                            }}
                                            InputLabelProps={{
                                                sx: {
                                                    color: "#46F0F9",
                                                    "&.Mui-focused": {
                                                        color: "white"
                                                    },
                                                    ml: 10,
                                                },
                                                shrink: true
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
                                                },
                                                readOnly: true
                                            }}
                                            InputLabelProps={{
                                                sx: {
                                                    color: "#46F0F9",
                                                    "&.Mui-focused": {
                                                        color: "white"
                                                    },
                                                    ml: 10,
                                                },
                                                shrink: true
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
        </>
    )
}

export default BaseInfo;