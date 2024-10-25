import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Controller, useFormContext} from "react-hook-form";
import {FormControl} from "@mui/material";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import {yupResolver} from '@hookform/resolvers/yup';
import {baseInfoSchema} from "@/SchemaValidator/IncidentValidators/baseInfoSchema";
import useMediaQuery from "@mui/material/useMediaQuery";


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

    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');

    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');

    const ultraWide = useMediaQuery('(min-width:1920px)');


    const txProps = {
        color: "red",
        bgcolor: "#274e61",
        borderRadius: "10px",
        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.2rem',
        fontStyle: 'bold',
        '&:hover': {
            bgcolor: '#051935',
        },
        fontFamily: 'Poppins',
        "& .MuiInputBase-input": {
            color: 'white',
        },
        "& .MuiFormHelperText-root": {
            color: 'red',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: 'green',
        },
        "& input:-webkit-autofill": {
            WebkitBoxShadow: '0 0 0 1000px #274e61 inset',
            WebkitTextFillColor: 'white',
        },
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
                    <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                        <FormControl fullWidth>
                            <Controller
                                name="adminFullName"
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
                                        {getAdminFullName()}
                                    </TextField>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    {watch('adminFullName') !== '' && (
                        <>
                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="adminEmail"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                InputProps={{
                                                    sx: txProps,
                                                    readOnly: true
                                                }}
                                                InputLabelProps={{
                                                    sx: {
                                                        color: "#46F0F9",
                                                        "&.Mui-focused": {
                                                            color: "white"
                                                        },
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
                                </FormControl>
                            </Grid>
                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                <FormControl fullWidth>
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
                                                    sx: txProps,
                                                    ml: 10,
                                                    readOnly: true
                                                }}
                                                InputLabelProps={{
                                                    sx: {
                                                        color: "#46F0F9",
                                                        "&.Mui-focused": {
                                                            color: "white"
                                                        },
                                                    },
                                                    shrink: true
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
            </Paper>
        </>
    )
}

export default BaseInfo;