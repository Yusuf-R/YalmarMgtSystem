'use client';
import dayjs from "dayjs";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material/";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {useState, useEffect} from "react";
import {
    leaveReason,
    leaveType,
} from "@/utils/data";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {leaveRequestSchema} from "@/SchemaValidator/LeaveRequest/LeaveRequestSchema";
import {usePathname, useRouter} from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import SendIcon from '@mui/icons-material/Send';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import {FormControlLabel} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

function NewLeaveRequest({staffData}) {
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

    // Media Queries for responsiveness
    const isXSmall = useMediaQuery("(max-width:599.99px)");

    // Media Queries for responsiveness
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');
    const isLargeScreen = useMediaQuery('(min-width:900px)');
    const isAbove425px = useMediaQuery('(min-width:425px)');


    useEffect(() => {
        const exactTabValues = [
            "/dashboard/admin/settings",
            "/dashboard/admin/settings/leave-request",
            "/dashboard/admin/settings/leave-request/new"
        ];

        const matchedTab = exactTabValues.find(tabPath => pathname === tabPath);
        setActiveTab(matchedTab || "/dashboard/admin/settings");
    }, [pathname]);

    const {
        control, handleSubmit, formState: {errors}, setValue, clearErrors, setError, reset
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(leaveRequestSchema),
        reValidateMode: "onChange",
        defaultValues: {
            email: staffData.email,
            fullName: staffData.fullName,
            role: staffData.role,
            phone: staffData.phone,
        }
    });

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
                        overflowX: 'hidden',
                        overflow: 'hidden', // Ensure no overflow
                        width: '100%', // Make sure it takes full width
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


    const saveAsDraft = (event) => {
        setIsDraft(event.target.checked);
    };

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ["LeaveRequest"],
        mutationFn: AdminUtils.LeaveRequestOps
    });
    const SubmitData = async (data) => {
        // return;
        try {
            await leaveRequestSchema.validate(data, {abortEarly: false});
            // update the data with some modification
            data.staffId = staffData._id;
            data.saveAsDraft = isDraft;
            if (data.saveAsDraft) {
                data.status = 'Draft';
            } else {
                data.status = 'Requested';
            }
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
            <Box
                component='form'
                noValidate
                onSubmit={handleSubmit(SubmitData)}
                sx={{
                    padding: {xs: "10px", sm: "15px", md: "20px"},
                    marginTop: "10px"
                }}
            >
                {/* Tabs for Settings Sections */}
                <Stack direction="row" spacing={2} sx={{justifyContent: "flex-start"}}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        variant={isXSmall ? "scrollable" : "standard"}
                        centered={!isXSmall}
                        sx={{
                            "& .MuiTabs-indicator": {
                                backgroundColor: "#46F0F9",
                            },
                        }}
                    >
                        {[
                            {label: "Settings", value: "/dashboard/admin/settings"},
                            {label: "Leave-Request", value: "/dashboard/admin/settings/leave-request"},
                            {label: "New +", value: "/dashboard/admin/settings/leave-request/new"},
                        ].map((tab, index) => (
                            <Tab
                                key={index}
                                label={tab.label}
                                value={tab.value}
                                component={Link}
                                href={tab.value}
                                sx={{
                                    color: "#FFF",
                                    fontWeight: "bold",
                                    fontSize: xSmall || small || medium || large ? "0.6rem" : "0.9rem",
                                    "&.Mui-selected": {color: "#46F0F9"},
                                }}
                            />
                        ))}
                    </Tabs>
                </Stack>
                <br/>
                <Card sx={{
                    background: 'linear-gradient(to right, #000046, #1cb5e0)',
                    padding: '16px',
                    borderRadius: '10px'
                }}>
                    <Typography variant="body1"
                                sx={{
                                    color: '#FFF',
                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>
                        Leave Request Form
                    </Typography>
                </Card>
                <br/>
                {/*ParentBox*/}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isLargeScreen ? 'row' : 'column',
                        justifyContent: 'space-between',
                        alignItems: isLargeScreen ? 'flex-start' : 'flex-start',  // Align to top for both screens
                        flexWrap: 'nowrap',  // Ensure LHS and RHS remain side by side
                        height: isLargeScreen ? '100vh' : 'auto',
                        padding: isLargeScreen ? '0' : '10px',
                    }}
                >
                    {/* LHS */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            p: '10px',
                            width: isLargeScreen ? '30%' : '100%',
                            maxWidth: isLargeScreen ? '30%' : '100%',
                            height: isLargeScreen ? '100vh' : 'auto',  // LHS should fill the viewport height on large screens
                            overflowY: 'auto',  // Add scroll if LHS content exceeds the height
                            background: 'linear-gradient(to right, #000428, #004e92)'
                        }}
                    >
                        {/* Content for the left side */}
                        <Stack
                            direction='column'
                            spacing={3}
                            sx={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 'auto',
                            }}
                        >
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
                                        sx={{textAlign: 'left', display: 'block', fontSize: '1.2em', color: '#FFF'}}>
                                The employee is required to give at least two weeks' notice before
                                proceeding on leave. <br/> <br/>However, the employer may waive this notice
                                requirement
                                if
                                they
                                agree to the employee's immediate leave.
                            </Typography>
                        </Stack>
                    </Box>
                    <br/>
                    {/*RHS*/}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            padding: '10px',
                            width: isLargeScreen ? '70%' : '100%',
                            maxWidth: '100%',
                            height: isLargeScreen ? '100vh' : 'auto',  // RHS should fill the viewport height on large screens
                            overflowY: 'auto',  // Allow RHS to scroll when content overflows
                            background: 'linear-gradient(to right, #000428, #004e92)'
                        }}
                    >
                        {/* Content for RHS */}
                        <Grid container spacing={4}>
                            {/* Section 1: Personal Information */}
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #000046, #1cb5e0)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold',
                                                            //     align center
                                                            textAlign: 'center'
                                                        }}>
                                                Leave Info
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    {/* Full Name */}
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Current Leave Credit (days)
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#07f22e',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                {staffData.leaveCredit}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    {/* Email */}
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{
                                                            color: '#46F0F9',
                                                            fontSize: '14px',
                                                            mb: 1
                                                        }}>
                                                Leave Type
                                            </Typography>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name="leaveType"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({field}) => (
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

                                                    )}
                                                />
                                            </FormControl>
                                        </Card>
                                    </Grid>
                                    {/* Phone */}
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px',
                                            overflow: 'hidden', // Ensure no overflow
                                            width: '100%', // Make sure it takes full width
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Reason
                                            </Typography>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name="leaveReason"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({field}) => (
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
                                                    )}
                                                />
                                            </FormControl>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px',
                                            overflow: 'hidden', // Ensure no overflow
                                            width: '100%', // Make sure it takes full width
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Start Date
                                            </Typography>
                                            <FormControl fullWidth>
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
                                                                        localeText={{toolbarTitle: 'Start Date'}}
                                                                        format={'DD-MMM-YYYY'}
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
                                            </FormControl>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                End Date
                                            </Typography>
                                            <FormControl fullWidth>
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
                                                                        format={'DD-MMM-YYYY'}
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
                                            </FormControl>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* */}
                        </Grid>
                        <br/>
                        {/* Next Kin Info */}
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #000046, #1cb5e0)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                            fontWeight: 'bold',
                                                            //     align center
                                                            textAlign: 'center'
                                                        }}>
                                                Leave Analytics
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    {/* Full Name */}
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                Available Balance (days)
                                            </Typography>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name="currentBalance"
                                                    control={control}
                                                    defaultValue={staffData.leaveCredit}
                                                    render={({field}) => (
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
                                                    )}
                                                />
                                            </FormControl>
                                        </Card>
                                    </Grid>
                                    {/* Relationship */}
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{
                                                            color: '#46F0F9',
                                                            fontSize: '14px',
                                                            mb: 1
                                                        }}>
                                                Leave Duration (days)
                                            </Typography>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name="duration"
                                                    control={control}
                                                    render={({field}) => (
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
                                                    )}
                                                />
                                            </FormControl>
                                        </Card>
                                    </Grid>
                                    {/* Next of kin Phone */}
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <Card sx={{
                                            background: 'linear-gradient(to right, #1d4350, #a43931)',
                                            padding: '16px',
                                            borderRadius: '10px'
                                        }}>
                                            <Typography variant="subtitle2"
                                                        sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                New Balance (days)
                                            </Typography>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name="newBalance"
                                                    control={control}
                                                    render={({field}) => (

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

                                                    )}
                                                />
                                            </FormControl>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br/>
                    </Box>
                </Box>
                <br/><br/>
                <Stack direction='row' spacing={2}>
                    <Button variant="contained" color='secondary'
                            onClick={() => router.push('/dashboard/admin/settings')}>
                        Back
                    </Button>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isDraft}
                                onChange={saveAsDraft}
                                color="success"
                                sx={{
                                    '& .MuiSvgIcon-root': {fontSize: 28},
                                    color: 'red',
                                }}
                            />
                        }
                        label="Save As Draft"
                        sx={{color: '#FFF'}}
                    />
                    <Button
                        variant="contained"
                        color='success'
                        endIcon={<SendIcon/>}
                        type='submit'
                        title='submit'
                    >
                        Submit
                    </Button>
                </Stack>
                <br/> <br/>
            </Box>
        </>
    )
}

export default NewLeaveRequest;