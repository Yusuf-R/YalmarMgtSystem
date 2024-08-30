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

function StaffIncident({allStaff}) {
    const {control, setValue, clearErrors, watch, formState: {errors}} = useFormContext();
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
            setValue('fullName', selectedFullName);
            setValue('email', selectedStaff.email);
            setValue('role', selectedStaff.role);
            setValue('staff_id', selectedStaff._id);
            clearErrors('fullName');
            clearErrors('email');
            clearErrors('role');
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
        setValue('classAction', selectedClassAction);
        clearErrors('cat');
    };
    const selectedClassAction = watch('classAction');
    
    // categoryEmployment
    const getCatE = () => catE.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}>
            {catOpt}
        </MenuItem>
    ))
    const handleCatE = (event) => {
        const selectedCatE = event.target.value;
        setValue('categoryEmployment', selectedCatE);
        clearErrors('catE');
    }
    
    // categoryRole
    const getCatR = () => catR.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}>
            {catOpt}
        </MenuItem>
    ))
    const handleCatR = (event) => {
        const selectedCatR = event.target.value;
        setValue('categoryRole', selectedCatR);
        clearErrors('catR');
    }
    
    // categoryViolence
    const getCatV = () => catV.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}>
            {catOpt}
        </MenuItem>
    ))
    const handleCatV = (event) => {
        const selectedCatV = event.target.value;
        setValue('categoryViolence', selectedCatV);
        clearErrors('catV');
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
                                                                    },
                                                                    readOnly: true,
                                                                }}
                                                                InputLabelProps={{
                                                                    sx: {
                                                                        color: "#46F0F9",
                                                                        "&.Mui-focused": {
                                                                            color: "white"
                                                                        },
                                                                        ml: 10,
                                                                    },
                                                                    shrink: true, // Add this line
                                                                }}
                                                                sx={{
                                                                    color: "#46F0F9",
                                                                }}
                                                                label="Email"
                                                                variant="outlined"
                                                                error={!!errors.email}
                                                                helperText={errors.email ? errors.email.message : ''}
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
                                                                    },
                                                                    readOnly: true,
                                                                }}
                                                                InputLabelProps={{
                                                                    sx: {
                                                                        color: "#46F0F9",
                                                                        "&.Mui-focused": {
                                                                            color: "white"
                                                                        },
                                                                        ml: 10,
                                                                    },
                                                                    shrink: true, // Add this line
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
                                        <Grid item xs={4}>
                                            <Controller
                                                name="classAction"
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
                                                                handleCat(e);
                                                            }}
                                                            required
                                                            label="Action"
                                                            error={!!errors.fullName}
                                                            helperText={errors.fullName ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.fullName.message}
                                                                                </span>
                                                            ) : ''}
                                                            InputProps={{
                                                                sx: {
                                                                    ...txProps,
                                                                    // width: '25%',
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
                                                                Select Class Action
                                                            </MenuItem>
                                                            {getCat()}
                                                        </TextField>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        {selectedClassAction === 'Employment' && (
                                            <>
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="categoryEmployment"
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
                                                                        handleCatE(e);
                                                                    }}
                                                                    required
                                                                    label="Sub-Action"
                                                                    error={!!errors.fullName}
                                                                    helperText={errors.fullName ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.fullName.message}
                                                                                </span>
                                                                    ) : ''}
                                                                    InputProps={{
                                                                        sx: {
                                                                            ...txProps,
                                                                            // width: '25%',
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
                                                            </FormControl>
                                                        )}
                                                    />
                                                </Grid>
                                            </>
                                        )}
                                        {selectedClassAction === 'Roles' && (
                                            <>
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="categoryRoles"
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
                                                                        handleCatR(e);
                                                                    }}
                                                                    required
                                                                    label="Sub-Action"
                                                                    error={!!errors.fullName}
                                                                    helperText={errors.fullName ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.fullName.message}
                                                                                </span>
                                                                    ) : ''}
                                                                    InputProps={{
                                                                        sx: {
                                                                            ...txProps,
                                                                            // width: '25%',
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
                                                                    {getCatR()}
                                                                </TextField>
                                                            </FormControl>
                                                        )}
                                                    />
                                                </Grid>
                                            </>
                                        )}
                                        {selectedClassAction === 'Violence' && (
                                            <>
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="categoryViolence"
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
                                                                        handleCatV(e);
                                                                    }}
                                                                    required
                                                                    label="Sub-Action"
                                                                    error={!!errors.fullName}
                                                                    helperText={errors.fullName ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.fullName.message}
                                                                                </span>
                                                                    ) : ''}
                                                                    InputProps={{
                                                                        sx: {
                                                                            ...txProps,
                                                                            // width: '25%',
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
                                                                    {getCatV()}
                                                                </TextField>
                                                            </FormControl>
                                                        )}
                                                    />
                                                </Grid>
                                            </>
                                        )}
                                        {selectedClassAction === 'Others' && (
                                            <>
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="categoryStaffOthers"
                                                        control={control}
                                                        render={({field}) => (
                                                            <TextField
                                                                {...field}
                                                                InputProps={{
                                                                    sx: {...txProps, width: '50%'}
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
                                                                error={!!errors.others}
                                                                helperText={errors.categoryStaffOthers ? errors.categoryStaffOthers.message : ''}
                                                            />
                                                        )}
                                                    />
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