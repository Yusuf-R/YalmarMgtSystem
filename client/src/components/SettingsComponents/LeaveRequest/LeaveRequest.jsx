import dayjs from "dayjs";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material/";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {useState, useEffect} from "react";
import {
    leaveReason,
    leaveType, mainSection,
} from "@/utils/data";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {leaveRequestSchema} from "@/SchemaValidator/leaveRequestSchema";
import {usePathname, useRouter} from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import SendIcon from '@mui/icons-material/Send';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import {newStaffSchema} from "@/SchemaValidator/newStaffSchema";
import {toast} from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";

function LeaveRequest({staffData}) {
    const pathname = usePathname();
    const router = useRouter();
    const [leave, setLeave] = useState('');
    const [reason, setReason] = useState('');
    const [currentBalance, setCurrentBalance] = useState(staffData.leaveCredit);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [duration, setDuration] = useState(0)
    const [newBalance, setNewBalance] = useState(0)
    const [errorBalance, setErrorBalance] = useState("");
    const [activeTab, setActiveTab] = useState('/dashboard/admin/settings/leave-request');
    const [isDraft, setIsDraft] = useState(false);
    const fullName = `${staffData.firstName} ${staffData.middleName ? staffData.middleName : " "} ${staffData.lastName}`;
    
    const {
        control, handleSubmit, formState: {errors}, setValue, clearErrors, setError, reset
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(leaveRequestSchema),
        reValidateMode: "onChange",
    });
    const paperProps = {
        alignCenter: 'center',
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        width: '100%',
        height: 'auto',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
    }
    // Leave Type
    const getLeaveType = () => {
        return leaveType.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ))
    }
    const handleLeaveChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setLeave(event.target.value);
    }
    // Leave Reason
    const getLeaveReason = () => {
        return leaveReason.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    };
    const handleLeaveReasonChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setReason(event.target.value);
    }
    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
        width: '220px',
    }
    const theme = createTheme({
        components: {
            // Assuming you are using MUI v5; adjust based on your version
            MuiPaper: {  // Often, the calendar uses a Paper component for the dropdown
                styleOverrides: {
                    root: {
                        backgroundColor: "#274e61", // Change to any color you prefer
                        color: '#ffffff',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        color: '#FFF',
                        '&:hover': {
                            backgroundColor: '#191844',
                        },
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: '#FFF',
                    },
                },
            },
            MuiStack: {
                styleOverrides: {
                    root: {
                        marginTop: '8px !important',
                        width: '200px',
                    },
                },
            },
        }
    });
    const Clear = () => {
        // clear all the content of the fields of the box components
        reset();
        setStartDate(null);
        setEndDate(null);
        setLeave('');
        setReason('');
    }
    // calculate the leave data properly
    const calculateLeave = () => {
        // calculate the duration of the leave
        if (!startDate || !endDate) {
            return;
        }
        const start = dayjs(startDate)
        const end = dayjs(endDate);
        // calculate the duration of the leave
        const leaveDuration = end.diff(start, 'day', true) + 1;
        if (leaveDuration < 0) {
            setDuration(0);
            return;
        }
        setDuration(leaveDuration);
        // calculate the new leave balance
        const balance = currentBalance - leaveDuration;
        if (balance < 0) {
            setErrorBalance("Insufficient Leave Balance");
            setNewBalance(0);
            return;
        }
        setErrorBalance("");
        setNewBalance(balance);
    }
    // useEffect for managing the leave Analytics
    useEffect(() => {
            calculateLeave();
        }, [startDate, endDate]
    )
    // useEffect to enable current rendering
    useEffect(() => {
        setValue('duration', duration);
        setValue('newBalance', newBalance);
    }, [duration, newBalance]);
    // useEffect or handling navigation between view and edits
    useEffect(() => {
        if (pathname.includes('leave-request')) {
            setActiveTab('/dashboard/admin/settings/leave-request');
        } else {
            setActiveTab('/dashboard/admin/settings');
        }
    }, [pathname]);
    //console.log the errors only if the object is not empty
    if (errors.length > 0) {
        console.log(errors);
    }
    
    const handleSaveAsDraftClick = () => {
        setIsDraft(true);
    };
    
    const handleSubmitClick = () => {
        setIsDraft(false);
    };
    
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ["LeaveRequest"],
        mutationFn: AdminUtils.LeaveRequestOps
    });
    const SubmitData = async (data) => {
        console.log(data);
        // return;
        try {
            await leaveRequestSchema.validate(data, {abortEarly: false});
            console.log("Validation passed!");
            // update the data with some modification
            data.staffId = staffData._id;
            data.saveAsDraft = isDraft;
            // call the mutation function
            mutation.mutate(data, {
                onSuccess: (response) => {
                    if (response) {
                        toast.success('Leave request created successfully');
                        //     refresh the query that fetched all the staff
                        queryClient.invalidateQueries({queryKey: ["AllLeaveRequest"]});
                        queryClient.invalidateQueries({queryKey: ["BioData"]});
                        queryClient.invalidateQueries({queryKey: ["AdminBioData"]});
                        //     clear the form fields
                        Clear();
                        router.push('/dashboard/admin/settings');
                    } else {
                        toast.error('Leave request unsuccessful');
                    }
                },
                onError: (error) => {
                    toast.error(error.message);
                }
            });
        } catch (e) {
            console.log({e});
            e.inner.forEach((error) => {
                setError(error.path, {
                    type: error.type,
                    message: error.message,
                });
            });
        }
    }
    
    return (
        <>
            <Box sx={mainSection}
            >
                {/*Heading*/}
                <Paper elevation={5} sx={paperProps}>
                    <Typography variant='h5'>Leave Request Form</Typography>
                </Paper>
                <br/>
                {/*Tabs*/}
                <Stack direction='row' spacing={2} sx={{
                    justifyContent: 'flex-start',
                }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        centered
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#46F0F9',
                            },
                        }}
                    >
                        <Tab
                            label="Settings"
                            component={Link}
                            href="/dashboard/admin/settings"
                            value="/dashboard/admin/settings"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Leave-Request"
                            component={Link}
                            href="/dashboard/admin/settings/leave-request"
                            value="/dashboard/admin/settings/leave-request"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                    </Tabs>
                </Stack>
                <br/>
                {/*Main Body*/}
                <Box component='form'
                     noValidate
                     onSubmit={handleSubmit(SubmitData)}>
                    <Grid container spacing={2}>
                        {/*LHS section*/}
                        <Grid item xs={4}>
                            <Stack direction='column' spacing={4}>
                                {/*Info Announcement and button controls*/}
                                <Paper elevation={5} sx={{...paperProps, width: '100%', color: '#FFF'}}>
                                    <Box>
                                        <Typography variant='body3'
                                                    sx={{
                                                        textAlign: 'center',
                                                        display: 'block',
                                                        fontSize: '1.5em',
                                                        color: '#fc8947'
                                                    }}>
                                            Important Information
                                        </Typography>
                                        <br/>
                                        <Typography variant='body3'
                                                    sx={{textAlign: 'left', display: 'block', fontSize: '1.2em'}}>
                                            The employee is required to give at least two weeks' notice before
                                            proceeding on leave. <br/> <br/>However, the employer may waive this notice
                                            requirement
                                            if
                                            they
                                            agree to the employee's immediate leave.
                                        </Typography>
                                    </Box>
                                </Paper>
                                <br/>
                                <Stack direction='row' spacing={2}>
                                    <Link href='/dashboard/admin/settings'>
                                        <Button variant="contained" color='secondary'>
                                            Back
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="contained"
                                        type='submit'
                                        title='saveAsDraft'
                                        onClick={handleSaveAsDraftClick}
                                    >
                                        Save As Draft
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color='success'
                                        endIcon={<SendIcon/>}
                                        type='submit'
                                        title='submit'
                                        onClick={handleSubmitClick}
                                    >
                                        Submit
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>
                        {/*RHS section*/}
                        <Grid item xs={8}>
                            {/*RHS section*/}
                            <Paper elevation={5} sx={{...paperProps, width: '100%', color: '#FFF'}}>
                                <Box>
                                    {/*Header*/}
                                    <Typography variant='body3'
                                                sx={{textAlign: 'left', display: 'block', fontSize: '1.5em'}}>
                                        Leave Balance: <span
                                        style={{
                                            color: '#07f22e',
                                            fontStyle: 'italic'
                                        }}>{staffData.leaveCredit}</span> days
                                    </Typography>
                                    <br/>
                                    {/*Basic Staff Info Section*/}
                                    <Paper elevation={5} sx={{...paperProps, width: '100%', color: '#FFF'}}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Paper elevation={5} sx={{
                                                    alignCenter: 'center',
                                                    textAlign: 'center',
                                                    padding: '10px',
                                                    border: '1px solid #0A4D50',
                                                    backgroundColor: '#274e61',
                                                    color: '#46F0F9',
                                                    borderRadius: '10px',
                                                    width: '`100%',
                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 1.5)',
                                                }}>
                                                    <Typography variant='h6' align="left">Basic Info</Typography>
                                                    <br/>
                                                    <Stack direction='row' spacing={10}>
                                                        {/* Column 1 : Name: MiddleName: LastName */}
                                                        <Stack direction='row' spacing={2}>
                                                            
                                                            <Controller
                                                                name="fullName"
                                                                control={control}
                                                                defaultValue={fullName}
                                                                render={({field}) => (
                                                                    <FormControl fullWidth>
                                                                        <TextField
                                                                            {...field}
                                                                            id="input-with-icon-textfield"
                                                                            
                                                                            label="fullName"
                                                                            defaultValue={fullName}
                                                                            InputLabelProps={{
                                                                                sx: {
                                                                                    color: "#46F0F9",
                                                                                    fontSize: '14px',
                                                                                    "&.Mui-focused": {
                                                                                        color: "white"
                                                                                    },
                                                                                }
                                                                            }}
                                                                            InputProps={{
                                                                                startAdornment: (
                                                                                    <InputAdornment position="start"
                                                                                    >
                                                                                        <AccountCircleIcon
                                                                                            sx={{color: '#FFF'}}/>
                                                                                    </InputAdornment>
                                                                                ),
                                                                                readOnly: true,
                                                                                sx: {
                                                                                    color: "#46F0F9",
                                                                                    fontSize: '20px',
                                                                                },
                                                                            }}
                                                                            variant="filled"
                                                                        />
                                                                    </FormControl>
                                                                )}
                                                            />
                                                        </Stack>
                                                        <Stack direction='row' spacing={2}>
                                                            <Controller
                                                                name="role"
                                                                control={control}
                                                                defaultValue={staffData.role}
                                                                render={({field}) => (
                                                                    <FormControl fullWidth>
                                                                        <TextField
                                                                            id="input-with-icon-textfield"
                                                                            label="Role"
                                                                            defaultValue={staffData.role}
                                                                            InputLabelProps={{
                                                                                sx: {
                                                                                    color: "#46F0F9",
                                                                                    fontSize: '14px',
                                                                                    "&.Mui-focused": {
                                                                                        color: "white"
                                                                                    },
                                                                                }
                                                                            }}
                                                                            InputProps={{
                                                                                startAdornment: (
                                                                                    <InputAdornment position="start">
                                                                                        <AppRegistrationIcon
                                                                                            sx={{color: '#FFF'}}/>
                                                                                    </InputAdornment>
                                                                                ),
                                                                                readOnly: true,
                                                                                sx: {
                                                                                    color: "#46F0F9",
                                                                                    fontSize: '20px',
                                                                                    width: '120%'
                                                                                },
                                                                            }}
                                                                            variant="filled"
                                                                        />
                                                                    </FormControl>
                                                                )}
                                                            />
                                                        </Stack>
                                                    </Stack>
                                                    <br/>
                                                    <Stack direction='row' spacing={10}>
                                                        {/* Column 2 :ID, Email */}
                                                        <Stack direction='row' spacing={2}>
                                                            <Controller
                                                                name="phone"
                                                                control={control}
                                                                defaultValue={staffData.phone}
                                                                render={({field}) => (
                                                                    <FormControl fullWidth>
                                                                        <TextField
                                                                            id="input-with-icon-textfield"
                                                                            defaultValue={staffData.phone}
                                                                            label="PhoneNo"
                                                                            InputLabelProps={{
                                                                                sx: {
                                                                                    color: "#46F0F9",
                                                                                    fontSize: '14px',
                                                                                    "&.Mui-focused": {
                                                                                        color: "white"
                                                                                    },
                                                                                    
                                                                                }
                                                                            }}
                                                                            InputProps={{
                                                                                startAdornment: (
                                                                                    <InputAdornment position="start"
                                                                                    >
                                                                                        <PhoneInTalkRoundedIcon
                                                                                            sx={{color: '#FFF'}}/>
                                                                                    </InputAdornment>
                                                                                ),
                                                                                readOnly: true,
                                                                                sx: {
                                                                                    color: "#46F0F9",
                                                                                    fontSize: '20px',
                                                                                },
                                                                            }}
                                                                            variant="filled"
                                                                        />
                                                                    </FormControl>
                                                                )}
                                                            />
                                                        </Stack>
                                                        <Stack direction='row' spacing={2}>
                                                            <Controller
                                                                name="email"
                                                                control={control}
                                                                defaultValue={staffData.email}
                                                                render={({field}) => (
                                                                    <FormControl fullWidth>
                                                                        <TextField
                                                                            id="input-with-icon-textfield"
                                                                            label="Email"
                                                                            defaultValue={staffData.email}
                                                                            InputLabelProps={{
                                                                                sx: {
                                                                                    color: "#46F0F9",
                                                                                    fontSize: '14px',
                                                                                    "&.Mui-focused": {
                                                                                        color: "white"
                                                                                    },
                                                                                }
                                                                            }}
                                                                            InputProps={{
                                                                                startAdornment: (
                                                                                    <InputAdornment position="start">
                                                                                        <MarkEmailReadIcon
                                                                                            sx={{color: '#FFF'}}/>
                                                                                    </InputAdornment>
                                                                                ),
                                                                                readOnly: true,
                                                                                sx: {
                                                                                    color: "#46F0F9",
                                                                                    fontSize: '20px',
                                                                                    width: '120%'
                                                                                },
                                                                            }}
                                                                            variant="filled"
                                                                        />
                                                                    </FormControl>
                                                                )}
                                                            />
                                                        </Stack>
                                                    </Stack>
                                                    <br/>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <br/>
                                    {/*Leave Info*/}
                                    <Paper elevation={5} sx={{...paperProps, width: '100%', color: '#FFF'}}>
                                        <Grid container spacing={2}>
                                            {/*Leave Reason*/}
                                            <Grid item xs={6}>
                                                <Paper elevation={5} sx={{
                                                    alignCenter: 'center',
                                                    textAlign: 'center',
                                                    padding: '10px',
                                                    border: '1px solid #0A4D50',
                                                    backgroundColor: '#274e61',
                                                    color: '#46F0F9',
                                                    borderRadius: '10px',
                                                    width: '`100%',
                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 1.5)',
                                                    
                                                }}>
                                                    <Typography variant='h6' align="left">Leave Info</Typography>
                                                    <br/>
                                                    <Stack direction='row' spacing={2}>
                                                        <Typography variant='subtitle1' align="left" sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            flexDirection: 'column',
                                                            color: '#FFF',
                                                            width: '100px',
                                                        }}>
                                                            Leave Type
                                                        </Typography>
                                                        {/* Leave Type */}
                                                        <Controller
                                                            name="leaveType"
                                                            control={control}
                                                            defaultValue=""
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        {...field}
                                                                        select
                                                                        value={field.value}
                                                                        onChange={(e) => {
                                                                            field.onChange(e);
                                                                            handleLeaveChange(e);
                                                                        }}
                                                                        required
                                                                        error={!!errors.leaveType}
                                                                        helperText={errors.leaveType ? (
                                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.leaveType.message}
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
                                                                        {leave !== '' && (
                                                                            <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                                Select Leave Type
                                                                            </MenuItem>
                                                                        )}
                                                                        {getLeaveType()}
                                                                    </TextField>
                                                                </FormControl>
                                                            )}
                                                        />
                                                    </Stack>
                                                    <br/>
                                                    <Stack direction='row' spacing={2}>
                                                        <Typography variant='subtitle1' align="left" sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            flexDirection: 'column',
                                                            color: '#FFF',
                                                            width: '100px',
                                                        }}>
                                                            Reason
                                                        </Typography>
                                                        {/* Leave Type */}
                                                        
                                                        <Controller
                                                            name="leaveReason"
                                                            control={control}
                                                            defaultValue=""
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        {...field}
                                                                        select
                                                                        value={field.value}
                                                                        onChange={(e) => {
                                                                            field.onChange(e);
                                                                            handleLeaveReasonChange(e);
                                                                        }}
                                                                        required
                                                                        error={!!errors.leaveReason}
                                                                        helperText={errors.leaveReason ? (
                                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.leaveReason.message}
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
                                                                        {reason !== '' && (
                                                                            <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                                Select Leave Reason
                                                                            </MenuItem>
                                                                        )}
                                                                        {getLeaveReason()}
                                                                    </TextField>
                                                                </FormControl>
                                                            )}
                                                        />
                                                    
                                                    </Stack>
                                                    <br/>
                                                    <Stack direction='row' spacing={2}>
                                                        <Typography variant='subtitle1' align="left" sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            flexDirection: 'column',
                                                            color: '#FFF',
                                                            width: '100px',
                                                        }}>
                                                            Start-Date
                                                        </Typography>
                                                        {/* Leave Type */}
                                                        <Controller
                                                            name="startDate"
                                                            control={control}
                                                            defaultValue={null}
                                                            error={errors.startDate?.message}
                                                            clearErrors={clearErrors}
                                                            render={({field}) => (
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    {/*Date picker for DOB input*/}
                                                                    <ThemeProvider theme={theme}>
                                                                        <DemoContainer components={['DatePicker']}>
                                                                            <DatePicker
                                                                                {...field}
                                                                                value={field.value}
                                                                                onChange={(newValue) => {
                                                                                    field.onChange(newValue);
                                                                                    setStartDate(newValue);
                                                                                }}
                                                                                disablePast
                                                                                views={['year', 'month', 'day']}
                                                                                error={!!errors.startDate}
                                                                                helperText={errors.startDate ? errors.startDate.message : ''}
                                                                                inputRef={field.ref}
                                                                                closeOnSelect={false}
                                                                                localeText={{toolbarTitle: 'Date of Birth'}}
                                                                                format={'DD/MMM/YYYY'}
                                                                                slotProps={{
                                                                                    openPickerButton: {
                                                                                        sx: {
                                                                                            color: 'white',
                                                                                        }
                                                                                    },
                                                                                    textField: {
                                                                                        sx: {
                                                                                            color: 'white',
                                                                                            bgcolor: '#274e61',
                                                                                            borderRadius: '10px',
                                                                                            width: '350px',
                                                                                            "& .MuiInputLabel-root": {
                                                                                                color: '#46F0F9',
                                                                                            },
                                                                                            "& .MuiInputBase-input": { // Target input text
                                                                                                color: 'white', // Set focused text color to white
                                                                                            },
                                                                                            "& .MuiFormHelperText-root": {
                                                                                                // color: '#FDBFC9',
                                                                                                color: 'red',
                                                                                            },
                                                                                            //     set the border color to red upon error
                                                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                                                // borderColor: '#F51313',
                                                                                                borderColor: errors.dob ? 'red' : '',
                                                                                            },
                                                                                            // ensure the bgColor does not change when autofill is triggered
                                                                                            "& input:-webkit-autofill": {
                                                                                                WebkitBoxShadow: '0 0 0 1000px #274e61 inset',
                                                                                                WebkitTextFillColor: 'white',
                                                                                            },
                                                                                        },
                                                                                        helperText: errors.startDate ? (
                                                                                            <span
                                                                                                style={{color: "#fc8947"}}>
                                                                                                 {errors.startDate.message}
                                                                                            </span>
                                                                                        ) : null,
                                                                                    },
                                                                                    actionBar: {
                                                                                        actions: ['cancel', 'clear', 'accept'],
                                                                                    },
                                                                                    toolbar: {
                                                                                        hidden: false,
                                                                                        sx: {
                                                                                            // set the title 'Select Date' to white text
                                                                                            '& .MuiTypography-root': {
                                                                                                color: '#FFF',
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    tabs: {
                                                                                        hidden: false
                                                                                    },
                                                                                    layout: {
                                                                                        sx: {
                                                                                            '& .MuiDayCalendar-weekDayLabel': {
                                                                                                color: '#F51313',
                                                                                                backgroundColor: '#0B0337',
                                                                                                borderRadius: '50px',
                                                                                                
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    day: {
                                                                                        sx: {
                                                                                            color: 'white',
                                                                                            fontSize: '0.8rem',
                                                                                            fontWeight: 'bold',
                                                                                            '&:hover': {
                                                                                                backgroundColor: '#07053B',
                                                                                            },
                                                                                        }
                                                                                    },
                                                                                }}
                                                                            />
                                                                        </DemoContainer>
                                                                    </ThemeProvider>
                                                                </LocalizationProvider>
                                                            )}
                                                        />
                                                    </Stack>
                                                    <Stack direction='row' spacing={2}>
                                                        <Typography variant='subtitle1' align="left" sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            flexDirection: 'column',
                                                            color: '#FFF',
                                                            width: '100px',
                                                        }}>
                                                            End-Date
                                                        </Typography>
                                                        {/* Leave Type */}
                                                        <Controller
                                                            name="endDate"
                                                            control={control}
                                                            defaultValue={null}
                                                            error={errors.endDate?.message}
                                                            clearErrors={clearErrors}
                                                            render={({field}) => (
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    {/*Date picker for DOB input*/}
                                                                    <ThemeProvider theme={theme}>
                                                                        <DemoContainer components={['DatePicker']}>
                                                                            <DatePicker
                                                                                {...field}
                                                                                value={field.value}
                                                                                onChange={(newValue) => {
                                                                                    field.onChange(newValue);
                                                                                    setEndDate(newValue);
                                                                                }}
                                                                                disablePast
                                                                                views={['year', 'month', 'day']}
                                                                                error={!!errors.endDate}
                                                                                helperText={errors.endDate ? errors.endDate.message : ''}
                                                                                inputRef={field.ref}
                                                                                closeOnSelect={false}
                                                                                localeText={{toolbarTitle: 'Date of Birth'}}
                                                                                format={'DD/MMM/YYYY'}
                                                                                slotProps={{
                                                                                    openPickerButton: {
                                                                                        sx: {
                                                                                            color: 'white',
                                                                                        }
                                                                                    },
                                                                                    textField: {
                                                                                        sx: {
                                                                                            color: 'white',
                                                                                            bgcolor: '#274e61',
                                                                                            borderRadius: '10px',
                                                                                            width: '350px',
                                                                                            "& .MuiInputLabel-root": {
                                                                                                color: '#46F0F9',
                                                                                            },
                                                                                            "& .MuiInputBase-input": { // Target input text
                                                                                                color: 'white', // Set focused text color to white
                                                                                            },
                                                                                            "& .MuiFormHelperText-root": {
                                                                                                // color: '#FDBFC9',
                                                                                                color: 'red',
                                                                                            },
                                                                                            //     set the border color to red upon error
                                                                                            "& .MuiOutlinedInput-notchedOutline": {
                                                                                                // borderColor: '#F51313',
                                                                                                borderColor: errors.dob ? 'red' : '',
                                                                                            },
                                                                                            // ensure the bgColor does not change when autofill is triggered
                                                                                            "& input:-webkit-autofill": {
                                                                                                WebkitBoxShadow: '0 0 0 1000px #274e61 inset',
                                                                                                WebkitTextFillColor: 'white',
                                                                                            },
                                                                                        },
                                                                                        helperText: errors.endDate ? (
                                                                                            <span
                                                                                                style={{color: "#fc8947"}}>
                                                                                                {errors.endDate.message}
                                                                                                </span>
                                                                                        ) : null,
                                                                                    },
                                                                                    actionBar: {
                                                                                        actions: ['cancel', 'clear', 'accept'],
                                                                                    },
                                                                                    toolbar: {
                                                                                        hidden: false,
                                                                                        sx: {
                                                                                            // set the title 'Select Date' to white text
                                                                                            '& .MuiTypography-root': {
                                                                                                color: '#FFF',
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    tabs: {
                                                                                        hidden: false
                                                                                    },
                                                                                    layout: {
                                                                                        sx: {
                                                                                            '& .MuiDayCalendar-weekDayLabel': {
                                                                                                color: '#F51313',
                                                                                                backgroundColor: '#0B0337',
                                                                                                borderRadius: '50px',
                                                                                                
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    day: {
                                                                                        sx: {
                                                                                            color: 'white',
                                                                                            fontSize: '0.8rem',
                                                                                            fontWeight: 'bold',
                                                                                            '&:hover': {
                                                                                                backgroundColor: '#07053B',
                                                                                            },
                                                                                        }
                                                                                    },
                                                                                }}
                                                                            />
                                                                        </DemoContainer>
                                                                    </ThemeProvider>
                                                                </LocalizationProvider>
                                                            )}
                                                        />
                                                    </Stack>
                                                </Paper>
                                            </Grid>
                                            {/* Leave balance Info*/}
                                            <Grid item xs={6}>
                                                <Paper elevation={5} sx={{
                                                    alignCenter: 'center',
                                                    textAlign: 'center',
                                                    padding: '10px',
                                                    border: '1px solid #0A4D50',
                                                    backgroundColor: '#274e61',
                                                    color: '#46F0F9',
                                                    borderRadius: '10px',
                                                    width: '`100%',
                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 1.5)',
                                                    
                                                }}>
                                                    <Typography variant='h6' align="left">Analytics</Typography>
                                                    <br/>
                                                    <Stack direction='row' spacing={2}>
                                                        <Typography variant='subtitle1' align="left" sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            flexDirection: 'column',
                                                            color: '#FFF',
                                                            width: '350px',
                                                        }}>
                                                            Available Balance (days)
                                                        </Typography>
                                                        {/* Leave Type */}
                                                        
                                                        <Controller
                                                            name="currentBalance"
                                                            control={control}
                                                            defaultValue={staffData.leaveCredit}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        {...field}
                                                                        InputProps={{
                                                                            sx: {...txProps, color: '#4BF807'},
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
                                                                        sx={{color: "#46F0F9"}}
                                                                        variant="outlined"
                                                                        type="number"
                                                                        error={!!errors.currentBalance}
                                                                        helperText={errors.currentBalance ? (
                                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.currentBalance.message}
                                                                            </span>
                                                                        ) : ''}
                                                                        required
                                                                    />
                                                                </FormControl>
                                                            )}
                                                        />
                                                    </Stack>
                                                    <br/>
                                                    <Stack direction='row' spacing={2}>
                                                        <Typography variant='subtitle1' align="left" sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            flexDirection: 'column',
                                                            color: '#FFF',
                                                            width: '350px',
                                                        }}>
                                                            Duration (days)
                                                        </Typography>
                                                        {/* Leave Type */}
                                                        <Controller
                                                            name="duration"
                                                            control={control}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        {...field}
                                                                        type="number"
                                                                        InputProps={{sx: txProps, readOnly: true}}
                                                                        InputLabelProps={{
                                                                            sx: {
                                                                                color: "#46F0F9",
                                                                                "&.Mui-focused": {
                                                                                    color: "white",
                                                                                },
                                                                            },
                                                                        }}
                                                                        sx={{color: "#46F0F9"}}
                                                                        variant="outlined"
                                                                        error={!!errors.duration}
                                                                        helperText={errors.duration && errors.duration.message ? (
                                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.duration.message}
                                                                            </span>
                                                                        ) : ''}
                                                                        required
                                                                        value={duration}
                                                                    />
                                                                </FormControl>
                                                            )}
                                                        />
                                                    </Stack>
                                                    <br/>
                                                    <Stack direction='row' spacing={2}>
                                                        <Typography variant='subtitle1' align="left" sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            flexDirection: 'column',
                                                            color: '#FFF',
                                                            width: '350px',
                                                        }}>
                                                            New Balance (days)
                                                        </Typography>
                                                        {/* Leave Type */}
                                                        <Controller
                                                            name="newBalance"
                                                            control={control}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        {...field}
                                                                        type="number"
                                                                        InputProps={{
                                                                            sx: {...txProps, color: '#4BF807'},
                                                                            readOnly: true
                                                                        }}
                                                                        InputLabelProps={{
                                                                            sx: {
                                                                                color: "#46F0F9",
                                                                                // "&.Mui-focused": {
                                                                                //     color: "white"
                                                                                // }
                                                                            }
                                                                        }}
                                                                        sx={{color: "#46F0F9"}}
                                                                        variant="outlined"
                                                                        error={!!errors.newBalance}
                                                                        helperText={errorBalance ? (
                                                                            <span style={{color: "#fc8947"}}>
                                                                                {errorBalance}
                                                                                </span>
                                                                        ) : errors.newBalance ? (
                                                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.newBalance.message}
                                                                                </span>
                                                                        ) : ''}
                                                                        required
                                                                        value={newBalance}
                                                                    />
                                                                </FormControl>
                                                            )}
                                                        />
                                                    </Stack>
                                                    <br/>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                    <br/>
                </Box>
            </Box>
        </>
    )
}

export default LeaveRequest;