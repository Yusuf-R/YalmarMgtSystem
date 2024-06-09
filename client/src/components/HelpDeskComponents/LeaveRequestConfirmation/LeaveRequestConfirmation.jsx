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
import {useState} from "react";
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

function LeaveRequestConfirmation({reqID, reqData}) {
    const router = useRouter();
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
        // bgcolor: "#274e61",
        // bgcolor: {adminAction ? getBackgroundColor() : 'none'},
        borderRadius: "10px",
        width: '220px',
    }
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
        // return;
        try {
            await leaveRequestConfirmActionSchema.validate(data, {abortEarly: false});
            console.log("Validation passed!");
            // update the data with some modification
            data.staffId = reqData.staffId;
            data._id = reqData._id;
            data.adminAction = adminAction;
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
            <Box sx={mainSection}>
                <Paper elevation={5} sx={paperProps}>
                    <Typography variant='h5'>Leave Request Confirmation</Typography>
                </Paper>
                <br/><br/>
                <Box component='form' noValidate onSubmit={handleSubmit(SubmitData)}>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            {/*RHS section Confirmation Section*/}
                            <Box>
                                {/*Basic Staff Info Section*/}
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
                                            <Typography variant='h6' align="left">Leave Action</Typography>
                                            <br/>
                                            <Paper elevation={5} sx={{...paperProps, width: '100%', color: '#FFF'}}>
                                                <Stack direction='row' spacing={10}>
                                                    {/* Column 2 CurrentLeave, Duration, NewBalance */}
                                                    <Stack direction='row' spacing={12}>
                                                        <Typography variant='body4' align="left" sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            flexDirection: 'column',
                                                            color: '#FFF',
                                                            width: '50%',
                                                            fontSize: '25px',
                                                            fontWeight: 'bold',
                                                        }}>
                                                            Status:
                                                        </Typography>
                                                        <Controller
                                                            name="status"
                                                            control={control}
                                                            defaultValue={reqData.status}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        id="input-with-icon-textfield"
                                                                        defaultValue={reqData.status}
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
                                                                            readOnly: true,
                                                                            sx: {
                                                                                color: "#FFF",
                                                                                fontSize: '20px',
                                                                                backgroundColor: getReqBackgroundColor(),
                                                                                p: '10px',
                                                                            },
                                                                        }}
                                                                        variant="standard"
                                                                        sx={{
                                                                            width: '50%',
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                            )}
                                                        />
                                                    </Stack>
                                                </Stack>
                                                <br></br>
                                                <Stack direction='row' spacing={2}>
                                                    <Typography variant='body4' align="left" sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column',
                                                        color: '#FFF',
                                                        width: '50%',
                                                        fontSize: '25px',
                                                        fontWeight: 'bold',
                                                    }}>
                                                        Admin Action:
                                                    </Typography>
                                                    <Controller
                                                        name="adminAction"
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
                                                                    {adminAction !== '' && (
                                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                            Select Action
                                                                        </MenuItem>
                                                                    )}
                                                                    {getAdminActionType()}
                                                                </TextField>
                                                            </FormControl>
                                                        )}
                                                    />
                                                </Stack>
                                                {/*Button Action for submission*/}
                                            </Paper>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                            <br/><br/>
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
                        
                        </Grid>
                        <Grid item xs={7}>
                            {/*RHS section Request Information Section*/}
                            <Box>
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
                                                width: '100%',
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
                                                            defaultValue={reqData.fullName}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        {...field}
                                                                        id="input-with-icon-textfield"
                                                                        
                                                                        label="fullName"
                                                                        defaultValue={reqData.fullName}
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
                                                            defaultValue={reqData.role}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        id="input-with-icon-textfield"
                                                                        label="Role"
                                                                        defaultValue={reqData.role}
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
                                                            defaultValue={reqData.phone}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        id="input-with-icon-textfield"
                                                                        defaultValue={reqData.phone}
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
                                                            defaultValue={reqData.email}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        id="input-with-icon-textfield"
                                                                        label="Email"
                                                                        defaultValue={reqData.email}
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
                                                <Typography variant='h6' align="left">Leave Info</Typography>
                                                <br/>
                                                <Stack direction='row' spacing={10}>
                                                    {/* Column 1 : Name: MiddleName: LastName */}
                                                    <Stack direction='row' spacing={2}>
                                                        <Controller
                                                            name="startDate"
                                                            control={control}
                                                            defaultValue={reqData.startDate}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        {...field}
                                                                        id="input-with-icon-textfield"
                                                                        
                                                                        label="Start-Date"
                                                                        defaultValue={reqData.startDate}
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
                                                                                    <CalendarMonthIcon
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
                                                            name="endDate"
                                                            control={control}
                                                            defaultValue={reqData.endDate}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        id="input-with-icon-textfield"
                                                                        label="End-Date"
                                                                        defaultValue={reqData.endDate}
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
                                                                                    <CalendarMonthIcon
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
                                                            name="leaveType"
                                                            control={control}
                                                            defaultValue={reqData.leaveType}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        id="input-with-icon-textfield"
                                                                        defaultValue={reqData.leaveType}
                                                                        label="Leave-Type"
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
                                                            name="leaveReason"
                                                            control={control}
                                                            defaultValue={reqData.leaveReason}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        id="input-with-icon-textfield"
                                                                        label="Leave-Reason"
                                                                        defaultValue={reqData.leaveReason}
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
                                                <br/><br/>
                                                <Typography variant='h6' align="left">Leave Analytics</Typography>
                                                <br/>
                                                <Stack direction='row' spacing={2}>
                                                    {/* Column 2 :ID, Email */}
                                                    <Stack direction='row' spacing={2}>
                                                        <Controller
                                                            name="currentBalance"
                                                            control={control}
                                                            defaultValue={reqData.currentBalance}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        id="input-with-icon-textfield"
                                                                        defaultValue={reqData.currentBalance}
                                                                        type="number"
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
                                                                                    <Typography variant='h6'
                                                                                                align="left"
                                                                                                sx={{
                                                                                                    color: "#46F0F9",
                                                                                                    // fontSize: '20px',
                                                                                                }}>
                                                                                        Current Leave Balance (days):
                                                                                    </Typography>
                                                                                </InputAdornment>
                                                                            ),
                                                                            readOnly: true,
                                                                            sx: {
                                                                                // color: "#46F0F9",
                                                                                fontSize: '20px',
                                                                                color: ' #00ff00',
                                                                                width: '70%',
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
                                                <Stack direction='row' spacing={2}>
                                                    {/* Column 2 CurrentLeave, Duration, NewBalance */}
                                                    <Stack direction='row' spacing={2}>
                                                        <Controller
                                                            name="duration"
                                                            control={control}
                                                            defaultValue={reqData.duration}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        id="input-with-icon-textfield"
                                                                        defaultValue={reqData.duration}
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
                                                                                    <Typography variant='h6'
                                                                                                align="left"
                                                                                                sx={{
                                                                                                    color: "#46F0F9",
                                                                                                    // fontSize: '20px',
                                                                                                }}>
                                                                                        Leave Duration (days):
                                                                                    </Typography>
                                                                                </InputAdornment>
                                                                            ),
                                                                            readOnly: true,
                                                                            sx: {
                                                                                color: "#00ffff",
                                                                                fontSize: '20px',
                                                                                width: '70%',
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
                                                <Stack direction='row' spacing={2}>
                                                    {/* Column 2 :ID, Email */}
                                                    <Stack direction='row' spacing={2}>
                                                        <Controller
                                                            name="newBalance"
                                                            control={control}
                                                            defaultValue={reqData.newBalance}
                                                            render={({field}) => (
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        id="input-with-icon-textfield"
                                                                        defaultValue={reqData.newBalance}
                                                                        type="number"
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
                                                                                    <Typography variant='h6'
                                                                                                align="left"
                                                                                                sx={{
                                                                                                    color: "#46F0F9",
                                                                                                    // fontSize: '20px',
                                                                                                }}>
                                                                                        New Balance (days):
                                                                                    </Typography>
                                                                                </InputAdornment>
                                                                            ),
                                                                            readOnly: true,
                                                                            sx: {
                                                                                // color: "#46F0F9",
                                                                                fontSize: '20px',
                                                                                width: '70%',
                                                                                color: '#ff9900',
                                                                            },
                                                                        }}
                                                                        variant="filled"
                                                                    />
                                                                </FormControl>
                                                            )}
                                                        />
                                                    </Stack>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <br/>
                            </Box>
                        </Grid>
                    </Grid>
                    <br/>
                </Box>
            </Box>
        </>
    )
}

export default LeaveRequestConfirmation;