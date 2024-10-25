import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import React from "react";
import {Controller, useFormContext} from "react-hook-form";
import {FormControl} from "@mui/material/";
import {txProps} from "@/utils/data";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import CardHeader from "@mui/material/CardHeader";
import {yupResolver} from "@hookform/resolvers/yup";
import {staffIncidentSchema} from "@/SchemaValidator/IncidentValidators/staffIncidentSchema";
import useMediaQuery from "@mui/material/useMediaQuery";

function StaffIncident({allStaff}) {
    const {control, setValue, clearErrors, watch, formState: {errors}} = useFormContext({
        mode: 'onTouched',
        resolver: yupResolver(staffIncidentSchema),
        reValidateMode: 'onChange',
    });

    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');


    // Full Name
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
            setValue('staffInfo.fullName', selectedFullName);
            setValue('staffInfo.email', selectedStaff.email);
            setValue('staffInfo.role', selectedStaff.role);
            setValue('staffInfo.staff_id', selectedStaff._id);
            clearErrors('staffInfo.fullName');
            clearErrors('staffInfo.email');
            clearErrors('staffInfo.role');
        }
    };

    // class Action
    const catA = ['Employment', 'Roles', 'Violence', 'Others']
    const catE = ['Employed', 'Promoted', 'Demoted', 'Sacked', 'Resigned', 'Retired', 'Absconded', 'Others'];
    const catR = ['Theft', 'Diversion', 'Conspiracy', 'Insubordination', 'Others'];
    const catV = ['Physical', 'Verbal', 'Sexual', 'Others'];

    const getCat = () => catA.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}>
            {catOpt}
        </MenuItem>
    ));
    const handleCat = (event) => {
        const selectedClassAction = event.target.value;
        setValue('staffIncidentInfo.classAction', selectedClassAction);
        clearErrors('staffIncidentInfo.classAction');
    };
    const selectedClassAction = watch('staffIncidentInfo.classAction');

    // categoryEmployment
    const getCatE = () => catE.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}>
            {catOpt}
        </MenuItem>
    ))
    const handleCatE = (event) => {
        const selectedCatE = event.target.value;
        console.log({selectedCatE});
        setValue('staffIncidentInfo.category.employment', selectedCatE);
        clearErrors('staffIncidentInfo.category.employment');
    }

    // categoryRole
    const getCatR = () => catR.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}>
            {catOpt}
        </MenuItem>
    ))
    const handleCatR = (event) => {
        const selectedCatR = event.target.value;
        setValue('staffIncidentInfo.category.role', selectedCatR);
        clearErrors('staffIncidentInfo.category.role');
    }

    // categoryViolence
    const getCatV = () => catV.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}>
            {catOpt}
        </MenuItem>
    ))
    const handleCatV = (event) => {
        const selectedCatV = event.target.value;
        setValue('staffIncidentInfo.category.violence', selectedCatV);
        clearErrors('staffIncidentInfo.category.violence');
    }

    const accordionSx = {
        bgcolor: '#274e61',
    }
    const paperSx = {
        padding: '10px',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        width: '100%',
        height: 'auto',
    }

    const cardSx = {
        bgcolor: '#274e61',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        // border: '1px solid rgb(163, 163, 117)',
        p: 0.1,
    }

    const typographyStyle = {
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: '16px',
        textAlign: 'left',
        ml: '30px',
    };
    return (
        <>
            <Paper elevation={5} sx={paperSx}>
                <Stack direction='column' gap={1}>
                    <Typography variant='h6' sx={{
                        fontWeight: 'bold',
                        fontFamily: 'Poppins',
                        ml: '30px',
                        fontSize: '16px',
                        borderRadius: '30px',
                        textAlign: 'left',
                        color: '#46F0F9',
                    }}>
                        Staff-Related
                    </Typography>
                    <Card sx={{bgcolor: '#274e61', color: '#FFF'}}>
                        <CardContent>
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: '16px',
                                    }}>
                                        Staff-Info
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <Grid container spacing={4} sx={{mt: 0.5}}>
                                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name="staffInfo.fullName"
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
                                                            error={!!errors.staffInfo?.fullName}
                                                            helperText={errors.staffInfo?.fullName ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.staffInfo?.fullName?.message}
                                                                                </span>
                                                            ) : ''}
                                                            InputProps={{
                                                                sx:
                                                                txProps,
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
                                        {watch('staffInfo.fullName') !== '' && (
                                            <>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="staffInfo.email"
                                                            control={control}
                                                            render={({field}) => (
                                                                <TextField
                                                                    {...field}
                                                                    InputProps={{
                                                                        sx:
                                                                        txProps,
                                                                        readOnly: true,
                                                                    }}
                                                                    InputLabelProps={{
                                                                        sx: {
                                                                            color: "#46F0F9",
                                                                            "&.Mui-focused": {
                                                                                color: "white"
                                                                            },
                                                                        },
                                                                        shrink: true, // Add this line
                                                                    }}
                                                                    sx={{
                                                                        color: "#46F0F9",
                                                                    }}
                                                                    label="Email"
                                                                    variant="outlined"
                                                                    error={!!errors.staffInfo?.email}
                                                                    helperText={errors.staffInfo?.email ? errors.staffInfo.email.message : ''}
                                                                />
                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="staffInfo.role"
                                                            control={control}
                                                            render={({field}) => (
                                                                <TextField
                                                                    {...field}
                                                                    label="Role"
                                                                    error={!!errors.staffInfo?.role}
                                                                    helperText={errors.staffInfo?.role?.message}
                                                                    InputProps={{
                                                                        sx:
                                                                        txProps,
                                                                        readOnly: true,
                                                                    }}
                                                                    InputLabelProps={{
                                                                        sx: {
                                                                            color: "#46F0F9",
                                                                            "&.Mui-focused": {
                                                                                color: "white"
                                                                            },
                                                                        },
                                                                        shrink: true, // Add this line
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
                                </AccordionDetails>
                            </Accordion>
                            <br/>
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: '16px',
                                    }}>
                                        Class-Action
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <Grid container spacing={4} sx={{mt: 0.5}}>
                                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name="staffIncidentInfo.classAction"
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
                                                                handleCat(e);
                                                            }}
                                                            required
                                                            label="Action"
                                                            error={!!errors.staffIncidentInfo?.classAction}
                                                            helperText={errors.staffIncidentInfo?.classAction ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.staffIncidentInfo?.classAction?.message}
                                                                                </span>
                                                            ) : ''}
                                                            InputProps={{
                                                                sx:
                                                                txProps,
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
                                                            <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                Select Class Action
                                                            </MenuItem>
                                                            {getCat()}
                                                        </TextField>
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        {selectedClassAction === 'Employment' && (
                                            <>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="staffIncidentInfo.category.employment"
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
                                                                        handleCatE(e);
                                                                    }}
                                                                    required
                                                                    label="Sub-Action"
                                                                    error={!!errors.staffIncidentInfo?.category?.employment}
                                                                    helperText={errors.staffIncidentInfo?.category?.employment ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.staffIncidentInfo?.category?.employment?.message}
                                                                                </span>
                                                                    ) : ''}
                                                                    InputProps={{
                                                                        sx:
                                                                        txProps,


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
                                                                                    // width: '20%'
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
                                                                        Select Option
                                                                    </MenuItem>
                                                                    {getCatE()}
                                                                </TextField>
                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </>
                                        )}
                                        {selectedClassAction === 'Roles' && (
                                            <>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="staffIncidentInfo.category.role"
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
                                                                        handleCatR(e);
                                                                    }}
                                                                    required
                                                                    label="Sub-Action"
                                                                    error={!!errors.staffIncidentInfo?.category?.role}
                                                                    helperText={errors.staffIncidentInfo?.category?.role ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.staffIncidentInfo?.category?.role?.message}
                                                                                </span>
                                                                    ) : ''}
                                                                    InputProps={{
                                                                        sx:
                                                                        txProps,

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
                                                                    }}>
                                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                        Select Option
                                                                    </MenuItem>
                                                                    {getCatR()}
                                                                </TextField>
                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </>
                                        )}
                                        {selectedClassAction === 'Violence' && (
                                            <>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="staffIncidentInfo.category.violence"
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
                                                                        handleCatV(e);
                                                                    }}
                                                                    required
                                                                    label="Sub-Action"
                                                                    error={!!errors.staffIncidentInfo?.category?.violence}
                                                                    helperText={errors.staffIncidentInfo?.category?.violence ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.staffIncidentInfo?.category?.violence?.message}
                                                                                </span>
                                                                    ) : ''}
                                                                    InputProps={{
                                                                        sx:
                                                                        txProps,
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
                                                                        Select Option
                                                                    </MenuItem>
                                                                    {getCatV()}
                                                                </TextField>
                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </>
                                        )}
                                        {selectedClassAction === 'Others' && (
                                            <>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="staffIncidentInfo.category.others"
                                                            control={control}
                                                            render={({field}) => (
                                                                <TextField
                                                                    {...field}
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
                                                                    label="Others"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    required
                                                                    error={!!errors.staffIncidentInfo?.category?.others}
                                                                    helperText={errors.staffIncidentInfo?.staffIncidentInfo?.category?.others ? errors.staffIncidentInfo.category.others.message : ''}
                                                                />
                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </>
                                        )}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Stack>
            </Paper>
            <br/>
        </>
    )
}

export default StaffIncident;