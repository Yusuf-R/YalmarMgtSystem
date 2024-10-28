'use client';
import Button from "@mui/material/Button";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import React, {useEffect, useMemo, useState} from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {createTheme, ThemeProvider, useTheme} from '@mui/material';
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_ToggleDensePaddingButton,
    MRT_ToggleFullScreenButton,
    MRT_ToggleGlobalFilterButton,
    MRT_ToggleFiltersButton,
    MRT_ShowHideColumnsButton,
} from "material-react-table";
import Tooltip from "@mui/material/Tooltip";
import AdminUtilities from "@/utils/AdminUtilities";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import {useQuery} from "@tanstack/react-query";
import {mainSection, statusAction} from "@/utils/data";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {leaveRequestConfirmActionSchema} from "@/SchemaValidator/leaveReqConfirmActionSchema";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import SendIcon from "@mui/icons-material/Send";
import useStaffLeaveRequestStore from "@/store/useStaffLeaveRequestStore";

function ViewLeaveRequest({leaveReqData, id}) {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("/dashboard/settings/leave-request/view");
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
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


    // Function to handle the opening and closing of the drawer
    const setEncryptedStaffLeaveRequestData = useStaffLeaveRequestStore(state => state.setEncryptedStaffLeaveRequestData);
    // Media query for responsive design
    const isXSmall = useMediaQuery('(max-width:599.99px)');

    const isSmallScreen = xSmall || small || medium || large;

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
            "/dashboard/admin/settings",
            "/dashboard/admin/settings/leave-request",
            "/dashboard/admin/settings/leave-request/view",
            "/dashboard/admin/settings/leave-request/edit",
            "/dashboard/admin/settings/leave-request/new"
        ];

        const matchedTab = exactTabValues.find(tabPath => pathname === tabPath);
        setActiveTab(matchedTab || "/dashboard/admin/settings");
    }, [pathname]);

    const getReqBackgroundColor = () => {
        switch (leaveReqData.status) {
            case 'Pending':
                return 'rgb(204, 153, 0)';
            case 'Requested':
                return '#2429bd';
            case 'Accepted':
                return 'green';
            case 'Rejected':
                return 'red';
            default:
                return 'grey';
        }
    };

    const editLeaveRequest = async (e) => {
        e.preventDefault(); // Prevent default navigation
        if (leaveReqData.status === 'Draft') {
            const encryptedReqId = await AdminUtilities.encryptObjID(id);
            const encryptedReqData = await AdminUtilities.encryptData(leaveReqData);
            setEncryptedStaffLeaveRequestData(encryptedReqData, encryptedReqId);
            toast.success('Loading Edit Page');
            router.push('/dashboard/admin/settings/leave-request/edit');
        } else {
            toast.error('Violation: Only Draft status is editable');
            setActiveTab("/dashboard/admin/settings/leave-request/view");
        }
    }

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ["DeleteLeaveDraft"],
        mutationFn: AdminUtilities.DeleteLeaveDraft, // Adjust this to match your delete function
    });

    // Handle delete request
    const handleDelete = async (event) => {
        event.preventDefault();
        // Ensure email is valid before proceeding
        if (emailError || !email) {
            toast.error("Please enter a valid email address");
            return;
        }

        const obj = {email, _id: id};
        mutation.mutate(obj, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["AllLeaveRequest"]});
                queryClient.invalidateQueries({queryKey: ["BioData"]});
                queryClient.invalidateQueries({queryKey: ["AdminBioData"]});
                queryClient.invalidateQueries({queryKey: ["GetLeaveRequest"]});
                toast.success('Request deleted successfully');
                setOpen(false);
                router.push('/dashboard/admin/settings/leave-request');
            },
            onError: (error) => {
                toast.error('Error deleting request');
                console.error("Delete failed", error);
                setOpen(false);
            }
        });
    };

    // handle email change
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(event.target.value)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    // Trigger delete operation only if the request is a Draft
    const deleteLeaveRequest = (e) => {
        e.preventDefault(); // Prevent default behavior
        if (leaveReqData.status === 'Draft') {
            setOpen(true); // Open confirmation dialog
        } else {
            toast.error('Violation: Only Draft requests can be deleted');
            setActiveTab("/dashboard/admin/settings/leave-request/view");
        }
    };

    // Close dialog handler
    const handleClose = () => {
        setOpen(false);
        setEmail(''); // Reset email input
        setEmailError(''); // Clear any errors
    };

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
                            {label: "Settings", value: "/dashboard/admin/settings"},
                            {label: "Leave-Request", value: "/dashboard/admin/settings/leave-request"},
                            {label: "View", value: "/dashboard/admin/settings/leave-request/view"},
                            {label: "Edit", value: "/dashboard/admin/settings/leave-request/edit"},
                            {label: "New +", value: "/dashboard/admin/settings/leave-request/new"}
                        ].map((tab, index) => (
                            <Tab
                                key={index}
                                label={tab.label}
                                value={tab.value}
                                component={Link}
                                onClick={(e) => tab.label === 'Edit' && editLeaveRequest(e)}
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
                        Leave Request Status
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
                                                Status
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
                                                        defaultValue={leaveReqData.status}
                                                        render={({field}) => (
                                                            <TextField
                                                                id="input-with-icon-textfield"
                                                                defaultValue={leaveReqData.status}
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
                                    </Stack>
                                    {leaveReqData.status === 'Draft' && (
                                        <>
                                            <Stack direction="column" spacing={2} sx={{width: '100%'}}>
                                                {/* Leave Status */}
                                                <Stack direction="row" justifyContent="space-between"
                                                       alignItems="center">
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontWeight: 'bold',
                                                                    fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                                                }}>
                                                        Edit Draft
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
                                                        <Button
                                                            onClick={editLeaveRequest}
                                                            color='primary'
                                                            size='small'
                                                            variant='contained'
                                                        >
                                                            Edit
                                                        </Button>
                                                    </Box>
                                                </Stack>
                                                <Stack direction="row" justifyContent="space-between"
                                                       alignItems="center">
                                                    <Typography variant="body1"
                                                                sx={{
                                                                    color: '#FFF',
                                                                    fontWeight: 'bold',
                                                                    fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                                                }}>
                                                        Delete Draft
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
                                                        <Button
                                                            onClick={deleteLeaveRequest}
                                                            color='error'
                                                            size='small'
                                                            variant='contained'
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                        </>
                                    )}
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
                                                        {leaveReqData.fullName}
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
                                                        {leaveReqData.role}
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
                                                        {leaveReqData.email}
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
                                                        {leaveReqData.phone}
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
                                                        {leaveReqData.startDate}
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
                                                        {leaveReqData.endDate}
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
                                                        {leaveReqData.leaveType}
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
                                                        {leaveReqData.leaveReason}
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
                                                        {leaveReqData.currentBalance}
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
                                                        {leaveReqData.duration}
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
                                                        {leaveReqData.newBalance}
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
                            </Stack>
                            <br/>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        backgroundColor: '#0E1E1E',
                        width: xSmall || small ? '90%' : medium ? '80%' : '50%', // Adjust width based on screen size
                        borderRadius: '10px', // Rounded edges for better UI
                        padding: xSmall || small ? '10px' : '20px', // Adjust padding for small screens
                    },
                }}
            >
                <DialogTitle sx={{textAlign: 'left'}}>
                    <Typography
                        variant="button"
                        sx={{
                            color: 'red',
                            fontWeight: 'bold',
                            fontSize: xSmall || small ? '0.7em' : medium || large ? '0.8em' : '1.1em', // Responsive font size
                        }}
                    >
                        Confirm Deletion
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'red',
                                fontWeight: 'bold',
                                fontSize: xSmall || small ? '0.9em' : medium || large ? '1em' : '1.1em', // Responsive text size
                                marginBottom: xSmall || small ? '8px' : '16px', // Adjust margin for small screens
                            }}
                        >
                            You are about to permanently delete the draft request. <br/> Please enter your email address
                            to confirm.
                        </Typography>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        error={!!emailError}
                        helperText={emailError}
                        InputLabelProps={{
                            sx: {
                                color: "#46F0F9",
                                "&.Mui-focused": {
                                    color: "white",
                                },
                            },
                        }}
                        InputProps={{
                            sx: {
                                color: 'white',
                                borderColor: 'rgba(255, 255, 255, 0.8)',
                                fontSize: xSmall || small ? '0.8em' : '1em', // Adjust font size
                            },
                        }}
                        sx={txProps}
                    />
                </DialogContent>
                <DialogActions sx={{justifyContent: 'space-between', padding: '0 24px 24px'}}>
                    <Stack
                        direction="row"
                        gap={2}
                        sx={{
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            color="success"
                            sx={{
                                width: xSmall || small ? '100px' : medium || large ? '120px' : '150px', // Button size adjustments
                                fontSize: xSmall || small ? '0.7em' : medium || large ? '0.85em' : '1em',
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete} // Move handleDelete here
                            variant="contained"
                            color="error"
                            aria-hidden={false}
                            sx={{
                                width: xSmall || small ? '100px' : medium || large ? '120px' : '150px',
                                fontSize: xSmall || small ? '0.7em' : medium || large ? '0.85em' : '1em',
                            }}
                            disabled={!email || !!emailError} // Disable if the email is invalid or empty
                        >
                            Delete
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default ViewLeaveRequest;