'use client';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import {Controller, useForm} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import MenuItem from "@mui/material/MenuItem";
import React, {useEffect, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {mainSection, statusAction} from "@/utils/data";
import Link from "next/link";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import {leaveRequestConfirmActionSchema} from "@/SchemaValidator/leaveReqConfirmActionSchema";
import {useRouter, usePathname} from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Image from "next/image";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";

function LeaveRequestConfirmation({reqID, reqData}) {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("/dashboard/admin/helpdesk");
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

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // Function to handle the opening and closing of the drawer
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    // Media query for responsive design
    const isXSmall = useMediaQuery('(max-width:599.99px)');

    const isSmallScreen = xSmall || small || medium || large;
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
    };
    const [adminAction, setAdminAction] = useState("");
    const {
        control, handleSubmit, formState: {errors}, setValue, clearErrors, setError,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(leaveRequestConfirmActionSchema),
        reValidateMode: "onChange",
    });
    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
        fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.0rem' : '1.1rem',
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
    }

    useEffect(() => {
        const exactTabValues = [
            "/dashboard/admin/helpdesk",
            "/dashboard/admin/helpdesk/biodata-center",
            "/dashboard/admin/helpdesk/leave-request-center",
            "/dashboard/admin/helpdesk/leave-request-center/action"
        ];

        const matchedTab = exactTabValues.find(tabPath => pathname === tabPath);
        setActiveTab(matchedTab || "/dashboard/admin/helpdesk");
    }, [pathname]);
    // Admin Action
    const getAdminActionType = () => {
        return statusAction.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{type}</MenuItem>
        ));
    };
    const handleAdminActionChange = (event) => {
        // prevent default action of submitting the form
        event.preventDefault();
        setAdminAction(event.target.value);
    }

    // render color base on adminSelection
    const getAdminActionBackgroundColor = () => {
        switch (adminAction) {
            case 'Pending':
                return 'rgb(204, 153, 0)';
            case 'Requested':
                return '#2429bd';
            case 'Accepted':
                return 'green';
            case 'Rejected':
                return 'red';
            default:
                return '#274e61';
        }
    };

    const getReqBackgroundColor = () => {
        switch (reqData.status) {
            case 'Pending':
                return 'rgb(204, 153, 0)';
            case 'Requested':
                return '#2429bd';
            case 'Accepted':
                return 'green';
            case 'Rejected':
                return 'red';
            default:
                return '#274e61';
        }
    };

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ["LeaveReqConfirmation"],
        mutationFn: AdminUtils.ConfirmStaffLeaveRequest,
    });
    const SubmitData = async (data) => {
        console.log(reqData);
        // return;
        try {
            await leaveRequestConfirmActionSchema.validate(data, {abortEarly: false});
            console.log("Validation passed!");
            // update the data with some modification
            data.adminAction = adminAction;
            // append everything about the reqData to data except createdAt and updateAt
            Object.entries(reqData).forEach(([key, value]) => {
                if (key !== 'createdAt' && key !== 'updatedAt') {
                    data[key] = value;
                }
            });
            // call the mutation function
            console.log(data);
            mutation.mutate(data, {
                onSuccess: (response) => {
                    if (response) {
                        toast.success('Leave request updated successfully');
                        //     refresh the query that fetched all the staff
                        queryClient.invalidateQueries({queryKey: ["AllLeaveRequest"]});
                        queryClient.invalidateQueries({queryKey: ["BioData"]});
                        queryClient.invalidateQueries({queryKey: ["AdminBioData"]});
                        queryClient.invalidateQueries({queryKey: ["AllStaff"]});
                        //     clear the form fields
                        router.push('/dashboard/admin/helpdesk/leave-request-center');
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
            <Box
                sx={{
                    padding: xSmall || small ? '5px' : medium || large ? '10px' : '5px',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%',
                    flexWrap: 'nowrap',
                }}>
                <Stack direction="row" spacing={2} sx={{justifyContent: "flex-start"}}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        variant={isXSmall ? "scrollable" : "standard"}
                        centered={!isXSmall}
                        sx={{
                            "& .MuiTabs-indicator": {backgroundColor: "#46F0F9"},
                        }}
                    >
                        {[
                            {label: "Helpdesk", value: "/dashboard/admin/helpdesk"},
                            {label: "BioData", value: "/dashboard/admin/helpdesk/biodata-center"},
                            {label: "Leave-Request", value: "/dashboard/admin/helpdesk/leave-request-center"},
                            {label: "Action", value: "/dashboard/admin/helpdesk/leave-request-center/action"}
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
                {/*Parent Cover*/}

                <Box
                    component='form'
                    noValidate
                    onSubmit={handleSubmit(SubmitData)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: isLargeScreen ? '0' : '10px',
                        height: isLargeScreen ? '100vh' : 'auto',
                        overflowY: 'auto',
                        background: 'linear-gradient(to right, #000428, #004e92)',
                        p: 1,
                        // background: '#000428',
                    }}
                >
                    <Typography variant="h6"
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    borderRadius: 2,
                                    padding: '10px 15px',
                                    background: 'linear-gradient(to right, #004e92, #000428)',
                                    color: '#FFF',
                                    width: 'auto',
                                    textAlign: 'center',
                                    fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                        Leave Request Confirmation
                    </Typography>
                    <br/>
                    <Grid container spacing={3}>
                        {/* Left-Hand Side (LHS) for Actions */}
                        <Grid item xs={12} md={5}>
                            <Box
                                sx={{
                                    // background: 'linear-gradient(to right, #000046, #1cb5e0)',
                                    background: '#000428',
                                    padding: '16px',
                                    borderRadius: '10px',
                                    height: '100%',
                                    overflow: 'hidden',
                                }}
                            >
                                <Stack
                                    direction="column"
                                    spacing={3}
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{width: '100%'}}
                                >
                                    {/* Leave Request Header */}
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
                                            Leave Request
                                        </Typography>
                                    </Card>

                                    {/* Centered Avatar */}
                                    <Avatar
                                        src="/leave-req.svg"
                                        alt="leave-request"
                                        sx={{
                                            width: isSmallScreen ? '150px' : '250px',
                                            height: isSmallScreen ? '150px' : '250px',
                                            // borderRadius: '50%',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                        }}
                                    />

                                    {/* Leave Status and Action */}
                                    <Stack direction="column" spacing={2} sx={{width: '100%'}}>
                                        {/* Leave Status */}
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Typography variant="body1"
                                                        sx={{
                                                            color: '#FFF',
                                                            fontWeight: 'bold',
                                                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                                        }}>
                                                Request Status
                                            </Typography>
                                            <Box
                                                sx={{
                                                    padding: '6px 12px',
                                                    borderRadius: '10px',
                                                    color: '#FFF',
                                                    fontWeight: 'bold',
                                                    minWidth: '60px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <FormControl fullWidth>
                                                    <Controller
                                                        name="status"
                                                        control={control}
                                                        defaultValue={reqData.status}
                                                        render={({field}) => (
                                                            <TextField
                                                                id="input-with-icon-textfield"
                                                                defaultValue={reqData.status}
                                                                InputProps={{
                                                                    sx: {
                                                                        ...txProps,
                                                                        backgroundColor: getReqBackgroundColor(),
                                                                        p: '2px',
                                                                        '&:hover': {
                                                                            bgcolor: undefined,
                                                                        },
                                                                    },
                                                                    readOnly: true,

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
                                                                }}
                                                            />

                                                        )}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Stack>
                                        {/* Admin Action Dropdown */}
                                        <Stack direction="row" justifyContent="space-between" alignItems="center"
                                               gap={1}>
                                            <Typography variant="body1" sx={{color: '#FFF', fontWeight: 'bold'}}>
                                                Action
                                            </Typography>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name="adminAction"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({field}) => (
                                                        <TextField
                                                            {...field}
                                                            select
                                                            value={field.value}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleAdminActionChange(e);
                                                            }}
                                                            required
                                                            error={!!errors.adminAction}
                                                            helperText={errors.adminAction ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.adminAction.message}
                                                                                </span>
                                                            ) : ''}
                                                            InputProps={{
                                                                sx: {
                                                                    ...txProps,
                                                                    bgcolor: getAdminActionBackgroundColor() || 'salmon',
                                                                    fontSize: '20px',
                                                                    fontWeight: 'bold',
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
                                                            {adminAction !== '' && (
                                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                    Select Action
                                                                </MenuItem>
                                                            )}
                                                            {getAdminActionType()}
                                                        </TextField>
                                                    )}
                                                />
                                            </FormControl>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Grid>
                        {/* Right-Hand Side (RHS) for Details */}
                        <Grid item xs={12} md={7}>
                            <Box
                                sx={{
                                    // background: 'linear-gradient(to right, #000046, #1cb5e0)',
                                    background: '#000428',
                                    padding: '16px',
                                    borderRadius: '10px',
                                    height: '100%',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Placeholder content for leave details */}
                                <Grid container spacing={4}>
                                    {/* Section 1: Site Information */}
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
                                                        Bio Summary
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                            {/* Bio Date */}
                                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                        Full Name
                                                    </Typography>
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                        {reqData.fullName}
                                                    </Typography>
                                                </Card>
                                            </Grid>

                                            {/* Role */}
                                            <Grid item xs={12} sm={12} md={12} lg={6}>
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
                                                        Role
                                                    </Typography>
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                        {reqData.role}
                                                    </Typography>
                                                </Card>
                                            </Grid>

                                            {/* Email */}
                                            <Grid item xs={12} sm={6} md={6}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                        Email
                                                    </Typography>
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                        {reqData.email}
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                        Phone
                                                    </Typography>
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                    fontWeight: 'bold',
                                                                }}>
                                                        {reqData.phone}
                                                    </Typography>
                                                </Card>
                                            </Grid>
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
                                                                    textAlign: 'center'
                                                                }}>
                                                        Leave Request Information
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                        Start Date
                                                    </Typography>
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                        {reqData.startDate}
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                        End Date
                                                    </Typography>
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                        {reqData.endDate}
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                        leaveType
                                                    </Typography>
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                        {reqData.leaveType}
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                        Reason
                                                    </Typography>
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                        {reqData.leaveReason}
                                                    </Typography>
                                                </Card>
                                            </Grid>
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
                                                                    textAlign: 'center'
                                                                }}>
                                                        Leave Analytics
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                        Current Leave Balance (days)
                                                    </Typography>
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                        {reqData.currentBalance}
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                        Leave Duration
                                                    </Typography>
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                        {reqData.duration}
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <Card sx={{
                                                    background: 'linear-gradient(to right, #1d4350, #a43931)',
                                                    padding: '16px',
                                                    borderRadius: '10px'
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: '#46F0F9', fontSize: '14px', mb: 1}}>
                                                        New Balance
                                                    </Typography>
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontSize: xSmall ? '0.8rem' : small ? '1.0rem' : '1.2rem',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                        {reqData.newBalance}
                                                    </Typography>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <br/>
                        {/* Submit */}
                        <Grid item xs={12} md={12}>
                            {/* Submit Section */}
                            <Stack direction="row" spacing={4}>
                                <Link href="/dashboard/admin/helpdesk/leave-request-center">
                                    <Button variant="contained" color="secondary" title='Back'>
                                        Back
                                    </Button>
                                </Link>
                                <Button variant="contained" color="success" type='submit' title='Submit'
                                        endIcon={<SendIcon/>}>
                                    Submit
                                </Button>
                            </Stack>
                            <br/>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </>
    )
}

export default LeaveRequestConfirmation;