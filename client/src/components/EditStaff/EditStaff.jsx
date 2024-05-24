import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {toast} from 'react-toastify';
import {Checkbox, Chip, FormHelperText, InputLabel, OutlinedInput, Paper, Select} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {
    Countries,
    martialStatus,
    nextOfKinRelationship,
    religionIdentity,
    sex,
    statesAndLGAs,
    title,
    siteStates,
    employmentType,
    jobTitle,
    sitesData,
} from "@/utils/data";
import {Label} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import AdminUtils from "@/utils/AdminUtilities";
import {editStaffSchema} from "@/SchemaValidator/editStaffSchema";

function EditStaff({id, staffData}) {
    const router = useRouter();
    const [gender, setGender] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [religion, setReligion] = useState('');
    const [employment, setEmployment] = useState('');
    const [dateValue, setDateValue] = useState(null);
    const [stateOfOrigin, setStateOfOrigin] = useState('');
    const [residentState, setResidentState] = useState('');
    const [lga, setLGA] = useState('');
    const [empType, setEmpType] = useState('');
    const [jobRole, setJobRole] = useState(staffData.role || '');
    const [cluster, setCluster] = useState(staffData.cluster || '');
    const [siteID, setSiteID] = useState(staffData.siteID || []);
    const [siteState, setSiteState] = useState('');
    const [prefix, setPrefix] = useState('');
    const [country, setCountry] = useState('')
    const [nextOfKin, setNextOfKin] = useState('')
    
    // const [formData, setFormData] = useState({
    //     title: staffData.title || "",
    //     firstName: staffData.firstName || "",
    //     middleName: staffData.middleName || "",
    //     lastName: staffData.lastName || "",
    //     gender: staffData.gender || "",
    //     religion: staffData.religion || "",
    //     phone: staffData.phone || "",
    //     country: staffData.country || "",
    //     address: staffData.address || "",
    //     lga: staffData.lga || "",
    //     stateOfOrigin: staffData.stateOfOrigin || "",
    //     stateOfResidence: staffData.stateOfResidence || "",
    //     nextOfKin: staffData.nextOfKin || "",
    //     nextOfKinPhone: staffData.nextOfKinPhone || "",
    //     nextOfKinRelationship: staffData.nextOfKinRelationship || "",
    //     role: staffData.role || "",
    //     cluster: staffData.cluster || "",
    //     siteID: staffData.siteID || "",
    //     siteState: staffData.siteState || "",
    //     employment: staffData.employment || ""
    // });
    const {
        control, handleSubmit, formState: {errors}, setValue, clearErrors, setError, reset
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(editStaffSchema),
        reValidateMode: "onChange",
    });
    
    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
        width: '270px',
    };
    // *********************State Management**********************
    // Gender state
    const getGenderType = () => {
        return sex.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    };
    const handleGenderTypeChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setGender(event.target.value);
    }
    // Marital Status state
    const getMaritalStatus = () => {
        return martialStatus.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ))
    }
    const handleMaritalStatusChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setMaritalStatus(event.target.value);
    }
    // Religion state
    const getReligionType = () => {
        return religionIdentity.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    };
    const handleReligionTypeChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setReligion(event.target.value);
    }
    // State of Origin
    const getStateOfOriginOptions = () => {
        return Object.keys(statesAndLGAs).map((stateName) => (
            <MenuItem key={stateName} value={stateName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {stateName}
            </MenuItem>
        ));
    };
    const handleStateOfOriginChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setStateOfOrigin(event.target.value);
        // Clear the LGA selection when a new state is selected
        setLGA('');
    };
    // Country
    const getCountryType = () => {
        return Countries.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    };
    const handleCountryChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setCountry(event.target.value);
    }
    // LGA
    const getLGAOptions = () => {
        if (!stateOfOrigin) {
            return [];
        }
        return statesAndLGAs[stateOfOrigin].map((lgaName) => (
            <MenuItem
                key={lgaName}
                value={lgaName}
                sx={{
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#051935'
                    }
                }}
            >
                {lgaName}
            </MenuItem>
        ));
    };
    const handleLGAChange = (event) => {
        // prevent default action of submitting the form
        
        event.preventDefault();
        setLGA(event.target.value);
    };
    // Kin
    const getNextOfKinOptions = () => {
        return nextOfKinRelationship.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    }
    const handleNextOfKinChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setNextOfKin(event.target.value);
    }
    // Resident State
    const getResidentStateOptions = () => {
        return Object.keys(statesAndLGAs).map((stateName) => (
            <MenuItem key={stateName} value={stateName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {stateName}
            </MenuItem>
        ));
    };
    const handleResidentStateChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setResidentState(event.target.value);
    };
    // Employment state
    const getEmploymentType = () => {
        return employmentType.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ))
    }
    const handleEmpTypeChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setEmpType(event.target.value);
    }
    // Job Role
    const getJobTitleOptions = () => {
        return jobTitle.map((title) => (
            <MenuItem key={title} value={title}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{title}</MenuItem>
        ));
    };
    const handleJobRoleChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        const role = event.target.value;
        setJobRole(event.target.value);
        // Clear the cluster and site selection when a new job role is selected
        if (role !== 'Field Supervisor' && role !== 'Generator Technician') {
            setValue('siteState', '');
            setValue('cluster', '');
            setValue('siteID', []);
        }
    }
    // Site State Selection
    const getSiteStateOptions = () => {
        return siteStates.map((stateName) => (
            <MenuItem key={stateName} value={stateName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{stateName}</MenuItem>
        ));
    };
    const handleSiteStateChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setSiteState(event.target.value);
        // Clear the site selection when a new state is selected
        setCluster('');
    }
    // Cluster Selection
    const getClusterOptions = () => {
        if (!siteState) {
            return [];
        }
        return Object.keys(sitesData).map((clusterName) => (
            <MenuItem key={clusterName} value={clusterName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {clusterName}
            </MenuItem>
        ));
    };
    const handleClusterChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setCluster(event.target.value);
        // Clear the site selection when a new cluster is selected
        setSiteID([]);
        setValue('siteID', []);
        clearErrors('siteID');
    }
    // Site Selection
    const getSiteOptions = () => {
        if (!cluster) {
            return [];
        }
        return sitesData[cluster].map((siteName) => (
            <MenuItem key={siteName} value={siteName}
                      sx={{
                          color: 'white',
                          '&:hover': {
                              backgroundColor: '#051935'
                          },
                          '&.Mui-selected': {
                              backgroundColor: '#051935'
                          }
                      }}>
                <Checkbox color="error" checked={siteID.includes(siteName)}/>
                <ListItemText primary={siteName}/>
            </MenuItem>
        ));
    }
    const handleSiteChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        const {target: {value}} = event;
        setSiteID(typeof value === 'string' ? value.split(',') : value);
    };
    
    // check if stateOfOrigin is set, and if true auto select it's corresponding lga from the staff data
    // also check if role is Field Supervisor or Generator Technician, and if true auto select the siteState,  cluster and siteID from the staff data
    // all this should only happen when edit page is loaded and only once
    useEffect(() => {
            if (staffData.stateOfOrigin) {
                setStateOfOrigin(staffData.stateOfOrigin);
                setLGA(staffData.lga);
            }
            if (staffData.role === 'Field Supervisor' || staffData.role === 'Generator Technician') {
                setCluster(staffData.cluster);
                setSiteID(staffData.siteID);
                setSiteState(staffData.siteState);
            }
        }, [staffData, setValue]
    );
    
    // Menu Style props
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                backgroundColor: '#274e61',
                color: 'white',
            },
        },
    };
    
    // useEffect for handling error changes text across the edit form
    useEffect(() => {
        if (jobRole !== 'Field Supervisor' && jobRole !== 'Generator Technician') {
            setCluster('');
            setSiteID([]);
            setValue('cluster', ''); // Clear cluster in form
            setValue('siteID', []); // Clear siteID in form
            clearErrors(['cluster', 'siteID']); // Clear any validation errors
        }
    }, [jobRole, setValue, clearErrors]);
    
    const queryClient = useQueryClient()
    
    if (Object.keys(errors).length > 0) {
        console.log(errors);
    }
    
    // Mutation for updating staff profile
    const mutation = useMutation({
        mutationKey: ["updateStaff"],
        mutationFn: AdminUtils.UpdateStaff,
    });
    
    const UpdateProfile = async (data) => {
        try {
            await editStaffSchema.validate(data, {abortEarly: false});
            console.log("Validation passed!"); // Check if validation passes
            mutation.mutate(data, {
                onSuccess: (response) => {
                    if (response) {
                        toast.success(response.message);
                        setTimeout(() => {
                            router.push('/dashboard/admin/staff');
                        }, 1500);
                        //     refresh the query that fetched all the staff
                        queryClient.invalidateQueries({queryKey: ["AllStaff"]});
                        
                    } else {
                        toast.error(response.message);
                        router.refresh();
                    }
                },
                onError: (error) => {
                    toast.error(error.message);
                    router.refresh();
                }
            });
        } catch (e) {
            toast.error("Form Validation Error");
            e.inner.forEach((error) => {
                setError(error.path, {
                    type: error.type,
                    message: error.message,
                });
            });
        }
    }
    return (
        <Box sx={{
            padding: '20px',
            width: 'calc(100% - 250px)',
            position: 'absolute',
            top: '70px',
            left: '250px',
        }}
             component='form'
             onSubmit={handleSubmit(UpdateProfile)}
             noValidate
        >
            <Paper elevation={5} sx={{
                alignCenter: 'center',
                textAlign: 'center',
                padding: '10px',
                backgroundColor: '#274e61',
                color: '#46F0F9',
                borderRadius: '10px',
                width: '100%',
                height: 'auto',
            }}>
                <Typography variant='h5'>Edit Staff Account Form</Typography>
            </Paper>
            <br/><br/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h5">Staff Profile</Typography>
                </Grid>
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
                    
                    {/*    First Row: Title field*/}
                    <Grid container spacing={4}>
                        {/*    First Row: Title field*/}
                        <Grid item xs={4}>
                            {/* Prefix */}
                            <FormControl fullWidth>
                                <Controller
                                    name="title"
                                    control={control}
                                    defaultValue={staffData.title}
                                    render={({field}) => (
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Title</Typography>
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                InputProps={{
                                                    sx: {
                                                        color: "white",
                                                        bgcolor: "#274e61",
                                                        borderRadius: "10px",
                                                        width: '100px',
                                                    },
                                                    readOnly: true
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
                                                }}
                                            >
                                            </TextField>
                                        </Stack>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            {/* Prefix */}
                            <FormControl fullWidth>
                                <Controller
                                    name="_id"
                                    control={control}
                                    defaultValue={staffData._id}
                                    render={({field}) => (
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Staff ID</Typography>
                                            <TextField
                                                {...field}
                                                variant="outlined"
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
                                                    }
                                                }}
                                                // SelectProps={{
                                                //     MenuProps: {
                                                //         PaperProps: {
                                                //             sx: {
                                                //                 backgroundColor: '#134357',
                                                //                 color: 'white',
                                                //                 maxHeight: 450,
                                                //                 overflow: 'auto',
                                                //             },
                                                //         },
                                                //     },
                                                // }}
                                                sx={{
                                                    '& .MuiSelect-icon': {
                                                        color: '#fff',
                                                    },
                                                    '& .MuiSelect-icon:hover': {
                                                        color: '#fff',
                                                    },
                                                }}
                                            >
                                            </TextField>
                                        </Stack>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/* Second Row: FirstName, MiddleName, LastName*/}
                        <Grid item xs={4}>
                            {/* firstName */}
                            <FormControl fullWidth>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue={staffData.firstName}
                                    render={({field}) => (
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>First Name</Typography>
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
                                                sx={{
                                                    color: "#46F0F9",
                                                }}
                                                variant="outlined"
                                                error={!!errors.firstName}
                                                helperText={errors.firstName ? errors.firstName.message : ''}
                                                required
                                            />
                                        </Stack>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            {/* MiddleName */}
                            <FormControl fullWidth>
                                <Controller
                                    name="middleName"
                                    control={control}
                                    defaultValue={staffData.middleName ? staffData.middleName : ""}
                                    render={({field}) => (
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Middle Name</Typography>
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
                                                sx={{
                                                    color: "#46F0F9",
                                                }}
                                                variant="outlined"
                                                error={!!errors.middleName}
                                                helperText={errors.middleName ? errors.middleName.message : ''}
                                                required
                                            />
                                        </Stack>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            {/* Prefix */}
                            <FormControl fullWidth>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    defaultValue={staffData.lastName ? staffData.lastName : ""}
                                    render={({field}) => (
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Last Name</Typography>
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
                                                sx={{
                                                    color: "#46F0F9",
                                                }}
                                                variant="outlined"
                                                error={!!errors.lastName}
                                                helperText={errors.lastName ? errors.lastName.message : ''}
                                                required
                                            />
                                        </Stack>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/* Third Row: Email, PhoneNo, DOB*/}
                        <Grid item xs={4}>
                            {/* Email */}
                            <FormControl fullWidth>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue={staffData.email}
                                    render={({field}) => (
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Email</Typography>
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
                                                            color: "white",
                                                        },
                                                    }
                                                }}
                                                sx={{
                                                    color: "#46F0F9",
                                                }}
                                                variant="outlined"
                                                error={!!errors.email}
                                                helperText={errors.email ? errors.email.message : ''}
                                                required
                                            />
                                        </Stack>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            {/* PhoneNo */}
                            <FormControl fullWidth>
                                <Controller
                                    name="phone"
                                    control={control}
                                    defaultValue={staffData.phone ? staffData.phone : ""}
                                    render={({field}) => (
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Mobile No *</Typography>
                                            <TextField
                                                {...field}
                                                InputProps={{
                                                    sx: txProps,
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
                                                variant="outlined"
                                                error={!!errors.phone}
                                                helperText={errors.phone ? errors.phone.message : ''}
                                                required
                                            />
                                        </Stack>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            {/* DOB */}
                            <FormControl fullWidth>
                                <Controller
                                    name="dob"
                                    control={control}
                                    defaultValue={staffData.dob ? staffData.dob : ""}
                                    render={({field}) => (
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>DOB *</Typography>
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
                                                            color: "white",
                                                        },
                                                    }
                                                }}
                                                sx={{
                                                    color: "#46F0F9",
                                                }}
                                                variant="outlined"
                                                error={!!errors.dob}
                                                helperText={errors.dob ? errors.dob.message : ''}
                                                required
                                            />
                                        </Stack>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {/* Fourth Row: Gender, Marital Status, Religion*/}
                        <Grid item xs={4}>
                            {/* Gender */}
                            <Controller
                                name="gender"
                                control={control}
                                defaultValue={staffData.gender}
                                render={({field}) => (
                                    <FormControl fullWidth>
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Gender *</Typography>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleGenderTypeChange(e);
                                                }}
                                                required
                                                error={!!errors.gender}
                                                helperText={errors.gender ? errors.gender.message : ''}
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
                                                <MenuItem value="" sx={{color: "#4BF807"}}>
                                                    Select Gender
                                                </MenuItem>
                                                {getGenderType()}
                                            </TextField>
                                        </Stack>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            {/* Marital Status */}
                            <Controller
                                name="maritalStatus"
                                control={control}
                                defaultValue={staffData.maritalStatus}
                                render={({field}) => (
                                    <FormControl fullWidth>
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Marital Status *</Typography>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleMaritalStatusChange(e);
                                                }}
                                                required
                                                error={!!errors.maritalStatus}
                                                helperText={errors.maritalStatus ? errors.maritalStatus.message : ''}
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
                                                <MenuItem value="" sx={{color: "#4BF807"}}>
                                                    Select Marital Status
                                                </MenuItem>
                                                {getMaritalStatus()}
                                            </TextField>
                                        </Stack>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            {/* Religion */}
                            <Controller
                                name="religion"
                                control={control}
                                defaultValue={staffData.religion}
                                render={({field}) => (
                                    <FormControl fullWidth>
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Religion *</Typography>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleReligionTypeChange(e);
                                                }}
                                                required
                                                error={!!errors.religion}
                                                helperText={errors.religion ? errors.religion.message : ''}
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
                                                <MenuItem value="" sx={{color: "#4BF807"}}>
                                                    Select Religion
                                                </MenuItem>
                                                {getReligionType()}
                                            </TextField>
                                        </Stack>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        {/* Fifth Row: Country, State, LGA */}
                        <Grid item xs={4}>
                            {/* Country */}
                            <Controller
                                name="country"
                                control={control}
                                defaultValue={staffData.country}
                                render={({field}) => (
                                    <FormControl fullWidth>
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Country *</Typography>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value}
                                                required
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleCountryChange(e);
                                                }}
                                                error={!!errors.country}
                                                helperText={errors.country ? errors.country.message : ''}
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
                                                <MenuItem value="" sx={{color: "#4BF807"}}>
                                                    Select Country
                                                </MenuItem>
                                                {getCountryType()}
                                            </TextField>
                                        </Stack>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            {/* State of Origin */}
                            <Controller
                                name="stateOfOrigin"
                                control={control}
                                defaultValue={staffData.stateOfOrigin || ""}
                                render={({field}) => (
                                    <FormControl fullWidth>
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>State of Origin *</Typography>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value}
                                                required
                                                error={!!errors.stateOfOrigin}
                                                helperText={errors.stateOfOrigin ? errors.stateOfOrigin.message : ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleStateOfOriginChange(e);
                                                }}
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
                                                // FormHelperTextProps={{
                                                //     sx: {
                                                //         color: "#E4080A",
                                                //     }
                                                // }}
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
                                                }}>
                                                <MenuItem value="" sx={{color: "#4BF807"}}>
                                                    Select State of Origin
                                                </MenuItem>
                                                {getStateOfOriginOptions()}
                                            </TextField>
                                        </Stack>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            {/* LGA */}
                            <Controller
                                name="lga"
                                control={control}
                                defaultValue={staffData.lga}
                                render={({field}) => (
                                    <FormControl fullWidth>
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>LGA *</Typography>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value}
                                                required
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleLGAChange(e);
                                                }}
                                                error={!!errors.lga}
                                                helperText={errors.lga ? errors.lga.message : ''}
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
                                                                maxHeight: 400,
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
                                                <MenuItem value="" sx={{color: "#4BF807"}}>Select LGA</MenuItem>
                                                {getLGAOptions()}
                                            </TextField>
                                        </Stack>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        {/* Sixth row 1 field nextOfKin Information text*/}
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h6" color="white">Next of Kin
                                Information</Typography>
                        </Grid>
                        {/* Seventh row 4 field nextOfKin, relationship, nextOfKinPhoneNo*/}
                        <Grid item xs={4}>
                            {/* NextOfKin */}
                            <Controller
                                name="nextOfKin"
                                control={control}
                                defaultValue={staffData.nextOfKin}
                                render={({field}) => (
                                    <FormControl fullWidth>
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Next of Kin *</Typography>
                                            <TextField
                                                {...field}
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
                                                id="outlined-basic"
                                                variant="outlined"
                                                error={!!errors.nextOfKin}
                                                helperText={errors.nextOfKin ? errors.nextOfKin.message : ''}
                                                required
                                            
                                            />
                                        </Stack>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="nextOfKinRelationship"
                                control={control}
                                defaultValue={staffData.nextOfKinRelationship}
                                render={({field}) => (
                                    <FormControl fullWidth>
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Next of Kin Relationship
                                                *</Typography>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value}
                                                error={!!errors.nextOfKinRelationship}
                                                helperText={errors.nextOfKinRelationship ? errors.nextOfKinRelationship.message : ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleNextOfKinChange(e);
                                                }}
                                                required
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
                                                <MenuItem value="" sx={{color: "#4BF807"}}>
                                                    Select Relationship
                                                </MenuItem>
                                                {getNextOfKinOptions()}
                                            </TextField>
                                        </Stack>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            {/* NextOfKin */}
                            <Controller
                                name="nextOfKinPhone"
                                control={control}
                                defaultValue={staffData.nextOfKinPhone}
                                render={({field}) => (
                                    <FormControl fullWidth>
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Next of Kin Phone Number
                                                *</Typography>
                                            <TextField
                                                {...field}
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
                                                id="outlined-basic"
                                                variant="outlined"
                                                error={!!errors.nextOfKinPhone}
                                                helperText={errors.nextOfKinPhone ? errors.nextOfKinPhone.message : ''}
                                                required
                                            />
                                        </Stack>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        {/* Eight Row : Residential Address Info*/}
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h6" color="white">Residential Address</Typography>
                        </Grid>
                        {/* Eight Row 1 field residential address  */}
                        <Grid item xs={6}>
                            {/* Residential Address */}
                            <Controller
                                name="address"
                                control={control}
                                defaultValue={staffData.address}
                                render={({field}) => (
                                    <FormControl fullWidth>
                                        <Stack direction='column' spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Residential Address
                                                *</Typography>
                                            <TextField
                                                {...field}
                                                InputProps={{
                                                    sx: {...txProps, width: '550px'},
                                                }}
                                                InputLabelProps={{
                                                    sx: {
                                                        color: "#46F0F9",
                                                        "&.Mui-focused": {
                                                            color: "white"
                                                        },
                                                    }
                                                }}
                                                id="outlined-basic"
                                                variant="outlined"
                                                error={!!errors.address}
                                                helperText={errors.address ? errors.address.message : ''}
                                            />
                                        </Stack>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {/* State of Residence */}
                            <Controller
                                name="stateOfResidence"
                                control={control}
                                defaultValue={staffData.stateOfResidence}
                                render={({field}) => (
                                    <FormControl fullWidth>
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Address *</Typography>
                                            <TextField
                                                {...field}
                                                select
                                                label="State of Residence"
                                                value={field.value}
                                                required
                                                error={!!errors.stateOfResidence}
                                                helperText={errors.stateOfResidence ? errors.stateOfResidence.message : ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleResidentStateChange(e);
                                                }}
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
                                                    marginLeft: '100px',
                                                }}>
                                                <MenuItem value="" sx={{color: "#4BF807"}}>
                                                    Select State of Residence
                                                </MenuItem>
                                                {getResidentStateOptions()}
                                            </TextField>
                                        </Stack>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        {/*    Ninth Row: Employment Info*/}
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h6" color="white">Employment Info</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            {/* Employment Type */}
                            <Controller
                                name="employmentType"
                                control={control}
                                defaultValue={staffData.employment}
                                render={({field}) => (
                                    <FormControl fullWidth>
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Employment Type *</Typography>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value}
                                                error={!!errors.employmentType}
                                                helperText={errors.employmentType ? errors.employmentType.message : ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleEmpTypeChange(e);
                                                }}
                                                required
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
                                                <MenuItem value="" sx={{color: "#4BF807"}}>
                                                    Select Employment
                                                </MenuItem>
                                                {getEmploymentType()}
                                            </TextField>
                                        </Stack>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {/* Job Role */}
                            <Controller
                                name="role"
                                control={control}
                                defaultValue={staffData.role}
                                render={({field}) => (
                                    <FormControl fullWidth>
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1" gutterBottom>Job Role *</Typography>
                                            <TextField
                                                {...field}
                                                select
                                                value={field.value}
                                                required
                                                error={!!errors.role}
                                                helperText={errors.role ? errors.role.message : ''}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleJobRoleChange(e);
                                                }}
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
                                                <MenuItem value="" sx={{
                                                    color: "#4BF807",
                                                    cursor: "not-allowed",
                                                }}>
                                                    Select Job Role
                                                </MenuItem>
                                                {getJobTitleOptions()}
                                            </TextField>
                                        </Stack>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        {/*Next row containing 3 fields:= Site information row : state, cluster, siteID*/}
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h6" color='white'>Site Information -: (Applicable to
                                Technicians
                                and
                                Field Supervisors Role)</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="siteState"
                                control={control}
                                defaultValue={staffData.siteState || ''}
                                render={({field}) => {
                                    const isDisabled = !(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician');
                                    return (
                                        <FormControl fullWidth>
                                            <Stack direction="column" spacing={2}>
                                                <Typography variant="subtitle1" gutterBottom>Site State *</Typography>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleSiteStateChange(e);
                                                    }}
                                                    disabled={isDisabled}
                                                    required={!isDisabled}
                                                    error={!isDisabled && !!errors.siteState}
                                                    helperText={!isDisabled && errors.siteState ? errors.siteState.message : ''}
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
                                                    }}
                                                >
                                                    <MenuItem value="" sx={{
                                                        color: "#4BF807",
                                                        cursor: "not-allowed",
                                                        // pointerEvents: "none"
                                                    }}>
                                                        Select Site State
                                                    </MenuItem>
                                                    {getSiteStateOptions()}
                                                </TextField>
                                            </Stack>
                                        </FormControl>
                                    );
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="cluster"
                                control={control}
                                defaultValue={staffData.cluster || ""}
                                render={({field}) => {
                                    const isDisabled = !(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician');
                                    return (
                                        <FormControl fullWidth>
                                            <Stack direction="column" spacing={2}>
                                                <Typography variant="subtitle1" gutterBottom>Cluster *</Typography>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleClusterChange(e);
                                                    }}
                                                    disabled={isDisabled}
                                                    required={!isDisabled}
                                                    error={!isDisabled && !!errors.cluster}
                                                    helperText={!isDisabled && errors.cluster ? errors.cluster.message : ''}
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
                                                    }}
                                                >
                                                    <MenuItem value="" sx={{
                                                        color: "#4BF807",
                                                        cursor: "not-allowed",
                                                        // pointerEvents: "none"
                                                    }}>
                                                        Select Cluster Area
                                                    </MenuItem>
                                                    {getClusterOptions()}
                                                </TextField>
                                            </Stack>
                                        </FormControl>
                                    );
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Controller
                                name="siteID"
                                control={control}
                                defaultValue={staffData.site || []}
                                errors={errors}
                                render={({field}) => {
                                    const isDisabled = !(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician');
                                    return (
                                        <FormControl fullWidth>
                                            <Stack direction="column" spacing={2}>
                                                <Typography variant="subtitle1" gutterBottom>Site IDs *</Typography>
                                                <InputLabel
                                                    id="siteID-label"
                                                    sx={{
                                                        color: "#46F0F9",
                                                        '&.Mui-focused': {
                                                            color: '#fff',
                                                        },
                                                    }}
                                                    disabled={isDisabled}
                                                    error={!isDisabled && !!errors.siteID}
                                                >
                                                </InputLabel>
                                                <Select
                                                    {...field}
                                                    id="siteID-select"
                                                    labelId="siteID-label"
                                                    multiple
                                                    value={field.value}
                                                    
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleSiteChange(e);
                                                    }}
                                                    input={<OutlinedInput label="Site ID"/>}
                                                    renderValue={(selected) => (
                                                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                                            {selected.map((value) => (
                                                                <Chip key={value} label={value} sx={{
                                                                    backgroundColor: '#00193C',
                                                                    color: 'white'
                                                                }}/>
                                                            ))}
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                    disabled={isDisabled}
                                                    sx={{
                                                        backgroundColor: '#134357',
                                                        color: 'white',
                                                        maxHeight: 450,
                                                        overflow: 'auto',
                                                        width: '350px',
                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: errors.siteID ? 'red' : '',
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            // set the icon to white only when disable is false
                                                            color: isDisabled ? '' : '#fff',
                                                            
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value="" disabled sx={{
                                                        color: "#4BF807",
                                                        cursor: "not-allowed"
                                                    }}>
                                                        Select Site ID
                                                    </MenuItem>
                                                    {getSiteOptions()}
                                                </Select>
                                                <FormHelperText
                                                    error={!!(jobRole === 'Field Supervisor' || jobRole === 'Generator Technician') && !!errors.siteID}>
                                                    {errors.siteID?.message}
                                                </FormHelperText>
                                            </Stack>
                                        </FormControl>
                                    );
                                }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <br/>
            <br/>
            {/*Submitting button */}
            <Stack direction='row' gap={2} sx={{marginBottom: '75px'}}>
                <Link href="/dashboard/admin/staff">
                    <Button variant="contained" color='success' title='Back'> Back </Button>
                </Link>
                <Button variant="contained" color='error' type='submit' title='Submit'> Submit </Button>
            </Stack>
        </Box>
    );
}


export default EditStaff;