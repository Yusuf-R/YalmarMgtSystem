'use client'
import React, {useEffect, useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import useFuelReportStore from "@/store/useFuelReportStore";
import {usePathname, useRouter} from "next/navigation";
import AdminUtilities from "@/utils/AdminUtilities";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Controller, useForm, useWatch} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {newFuelSupplyReportSchema} from "@/SchemaValidator/newFuelSupplyReport";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import {editFuelSupplyReportSchema} from "@/SchemaValidator/editFuelSupplyReport";
import {toast} from "react-toastify";
import Card from "@mui/material/Card";
import {DayPicker} from "react-day-picker";
import "react-day-picker/dist/style.css";
import {Popover} from "@mui/material";

const txProps = {
    color: "white",
    bgcolor: "#274e61",
    borderRadius: "10px",
    fontSize: '16px',
    fontStyle: 'bold',
    fontFamily: 'Poppins',
    '&:hover': {
        bgcolor: '#051935',
    },
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
// Custom styled date picker component
const CustomDatePicker = ({control, name, label, defaultValue}) => {
    // Only state needed is for the popover anchor
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'date-popover' : undefined;

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({field: {onChange, value}}) => (
                <FormControl fullWidth>
                    <TextField
                        aria-describedby={id}
                        onClick={handleClick}
                        value={value ? dayjs((value)).format('DD-MMM-YYYY') : 'Select date'}
                        label={label}
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
                        }}
                    />
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        PaperProps={{
                            sx: {
                                backgroundColor: '#134357',
                                color: 'white',
                            }
                        }}
                    >
                        <DayPicker
                            mode="single"
                            selected={value ? new Date(value) : null}
                            onSelect={(date) => {
                                onChange(date);
                                handleClose();
                            }}
                            modifiers={{
                                today: new Date(),
                            }}
                            style={{
                                '--rdp-background-color': '#cc00cc',
                            }}
                            styles={{
                                caption: {
                                    color: '#FFF',
                                },
                                day: {
                                    color: '#FFF',
                                },
                            }}
                            modifiersStyles={{
                                today: {
                                    color: '#FFF',
                                    backgroundColor: 'red',
                                },
                                selected: {
                                    backgroundColor: 'rgb(0, 153, 0)',
                                },
                            }}
                        />
                    </Popover>
                </FormControl>
            )}
        />
    );
};

function EditFuelReport({allSite, fuelData, fuelID}) {
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/fuel/edit');
    const pathname = usePathname();
    const router = useRouter();
    const queryClient = useQueryClient();
    const isXSmall = useMediaQuery('(max-width:599.99px)');

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

    // Inside your component:
    const setEncryptedFuelData = useFuelReportStore(state => state.setEncryptedFuelData);
    // useEffect or handling navigation between new and staff
    useEffect(() => {
        if (pathname.includes('view')) {
            setActiveTab('/dashboard/admin/reports/fuel/view');
        } else if (pathname.includes('edit')) {
            setActiveTab('/dashboard/admin/reports/fuel/edit');
        } else if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/reports/fuel/new');
        } else if (pathname.includes('all')) {
            setActiveTab('/dashboard/admin/reports/fuel/all');
        } else {
            setActiveTab('/dashboard/admin/reports/fuel');
        }
    }, [pathname]);

    // function to view staff profile
    const viewFuelReport = async () => {
        const encryptedFuelID = await AdminUtilities.encryptObjID(fuelID);
        // encrypt the data and store it in the session storage
        const encryptedFuelData = await AdminUtilities.encryptData(fuelData);
        // Set the encrypted data in Zustand store
        setEncryptedFuelData(encryptedFuelData, encryptedFuelID);
        router.push(`/dashboard/admin/reports/fuel/view`);
    };
    const mutation = useMutation({
        mutationKey: ["UpdateFuelSupplyReport"],
        mutationFn: AdminUtils.UpdateFuelSupplyReport,
    });
    const {
        control, handleSubmit, formState: {errors}, setError, reset, setValue, clearErrors, watch
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(newFuelSupplyReportSchema),
        reValidateMode: "onChange",
        defaultValues: {
            state: fuelData.state || '',
            cluster: fuelData.cluster || '',
            siteId: fuelData.siteId || '',
            siteType: fuelData.siteType,
            location: fuelData.location,
            type: fuelData.type,
            qtyInitial: fuelData.qtyInitial || 0,
            qtySupplied: fuelData.qtySupplied || 0,
            qtyNew: fuelData.qtyNew,
            duration: fuelData.duration,
            customCPD: fuelData.customCPD,
            cpd: fuelData.cpd || 0,
            dateSupplied: fuelData.dateSupplied ? new Date(fuelData.dateSupplied) : null,
            nextDueDate: fuelData.nextDueDate ? new Date(fuelData.nextDueDate) : null,
        }
    });
    const Clear = () => {
        reset();
    };
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
    // Watch the state field value to dynamically update clusters and siteIDs
    const selectedState = watch('state');  // React Hook Form equivalent to `stateMain`
    const selectedCluster = watch('cluster');
    const selectedSiteId = watch('siteId');

    // List of states, clusters, and siteIDs dynamically filtered based on the selected state/cluster
    const states = Array.from(new Set(allSite.map(site => site.state)));
    const clusters = Array.from(new Set(allSite.filter(site => site.state === selectedState).map(site => site.cluster)));
    const siteIds = allSite.filter(site => site.cluster === selectedCluster).map(site => site.siteId);

    // Handle state change
    const handleState = (event) => {
        event.preventDefault();
        const newState = event.target.value;
        setValue('state', newState);  // Set the new state value using setValue
        setValue('cluster', '');  // Clear cluster when state changes
        setValue('siteId', '');  // Clear siteId when state changes
    };

    const handleCluster = (event) => {
        event.preventDefault();
        const newCluster = event.target.value;
        setValue('cluster', newCluster);
        setValue('siteId', '');  // Clear siteId when cluster changes
    };

    const handleSiteId = (event) => {
        event.preventDefault();
        const selectedSiteId = event.target.value;
        setValue('siteId', selectedSiteId);
        // this will extract the totality of the object it self
        const selectedSiteObj = allSite.find(site => site.siteId === selectedSiteId);
        if (selectedSiteObj) {
            const newLocation = selectedSiteObj.location || 'N/A';
            const newSiteType = selectedSiteObj.type || 'N/A';
            setValue('location', newLocation);
            setValue('type', newSiteType);
            // Clear errors for location and type
            clearErrors('location');
            clearErrors('type');
        } else {
            setValue('location', '');
            setValue('type', '');
        }
    };

    const qtyInitial = useWatch({control, name: 'qtyInitial'});
    const qtySupplied = useWatch({control, name: 'qtySupplied'});
    const selectedCPD = useWatch({control, name: 'cpd'});
    const customCPD = useWatch({control, name: 'customCPD'});
    const dateSupplied = useWatch({control, name: 'dateSupplied'}); // W


    const newAvailableQty = (Number(qtyInitial) + Number(qtySupplied)) || 0;
    const consumptionPerDay = selectedCPD === 'Others' ? Number(customCPD) : Number(selectedCPD) || 0;
    const duration = consumptionPerDay ? Math.ceil(newAvailableQty / consumptionPerDay) : 0;
    const nextDueDate = dateSupplied ? dayjs(dateSupplied).add(duration, 'day').format('DD-MMM-YYYY') : '';

    useEffect(() => {
        setValue('qtyNew', newAvailableQty);
        setValue('duration', duration);
        setValue('nextDueDate', nextDueDate);
    }, [newAvailableQty, consumptionPerDay, dateSupplied]);

    const goPrev = () => {
        window.history.back();
    }

    const submitUpdate = async (data) => {
        try {
            // check if customCpd was entered, and if so we set cpd value to customCpd
            if (selectedCPD === 'Others' && customCPD) {
                data.cpd = Number(customCPD);
            }
            await editFuelSupplyReportSchema.validate(data, {abortEarly: false});
            data.site_id = fuelData.site_id;
            data._id = fuelID;
            // convert dateSupplied to DD/MMM/YYYY
            data.dateSupplied = dayjs(dateSupplied).format('DD/MMM/YYYY');
            // remove customCPD from data
            delete data.customCPD;
            if (data.siteType === undefined) {
                delete data.siteType;
            }
            mutation.mutate(data, {
                onSuccess: (response) => {
                    if (response) {
                        toast.success('Fuel Supply Record Updated successfully');
                        queryClient.invalidateQueries({queryKey: ["AllFuelReport"]});
                        router.push('/dashboard/admin/reports/fuel/all')
                    } else {
                        toast.error('Failed to Update Record');
                    }
                },
                onError: (error) => {
                    toast.error(error.message);
                }
            });
        } catch (e) {
            e.inner.forEach((error) => {
                // Set form errors
                setError(error.path, {
                    type: error.type,
                    message: error.message,
                });
            });
        }
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
                }}
            >
                {/*Navigation Tabs */}
                <Stack direction='row' spacing={2} sx={{justifyContent: 'flex-start'}}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        variant={isXSmall ? "scrollable" : "standard"} // Use scrollable for smaller screens
                        centered={!isXSmall} // Only center the tabs when it's not a small screen
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#46F0F9',
                            },
                        }}
                    >
                        <Tab
                            label="Reports"
                            component={Link}
                            href="/dashboard/admin/reports"
                            value="/dashboard/admin/reports"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                                "&.Mui-selected": {color: "#46F0F9"},
                            }}
                        />

                        {['ALL', 'VIEW', 'EDIT'].map((label) => (
                            <Tab
                                key={label}
                                label={label}
                                component={Link}
                                onClick={label === 'VIEW' ? viewFuelReport : null}
                                href={`/dashboard/admin/reports/fuel/${label.toLowerCase()}`}
                                value={`/dashboard/admin/reports/fuel/${label.toLowerCase()}`}
                                sx={{
                                    color: "#FFF",
                                    fontWeight: 'bold',
                                    fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                                    "&.Mui-selected": {color: "#46F0F9"},
                                }}
                            />
                        ))}

                        <Tab
                            label="New +"
                            value="/dashboard/admin/reports/fuel/new"
                            component={Link}
                            href="/dashboard/admin/reports/fuel/new"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                    </Tabs>
                </Stack>
            </Box>
            <br/>
            <Box
                component="form"
                onSubmit={handleSubmit(submitUpdate)}
                noValidate
            >
                {/*Site Info*/}
                <Grid container spacing={4}>
                    <Grid item xs={12}>
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
                                Site Information
                            </Typography>
                        </Card>
                    </Grid>
                    {/*AllSite State*/}
                    <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                        <FormControl fullWidth>
                            <Controller
                                name="state"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        select
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleState(e);
                                        }}
                                        required
                                        label="State"
                                        error={!!errors.state}
                                        helperText={errors.state ? (
                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.state.message}
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
                                        <MenuItem value="" sx={{color: "#4BF807"}}>
                                            Select State
                                        </MenuItem>
                                        {states.map((stateData) => (
                                            <MenuItem key={stateData} value={stateData}>
                                                {stateData}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    {/*All Cluster*/}
                    <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                        <FormControl fullWidth>
                            <Controller
                                name="cluster"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        select
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleCluster(e);
                                        }}
                                        required
                                        label="Cluster"
                                        error={!!errors.cluster}
                                        helperText={errors.cluster ? (
                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.cluster.message}
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
                                        <MenuItem value="" sx={{color: "#4BF807"}}>
                                            Select Cluster
                                        </MenuItem>
                                        {clusters.map((cluster) => (
                                            <MenuItem key={cluster} value={cluster}>
                                                {cluster}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    {/* Site ID*/}
                    <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                        <FormControl fullWidth>
                            <Controller
                                name="siteId"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        select
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleSiteId(e);
                                        }}
                                        required
                                        label="Site ID"
                                        error={!!errors.siteId}
                                        helperText={errors.siteId ? (
                                            <span style={{color: "#fc8947"}}>
                                                                                {errors.siteId.message}
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
                                        <MenuItem value="" sx={{color: "#4BF807"}}>
                                            Select Site ID
                                        </MenuItem>
                                        {siteIds.map((siteId) => (
                                            <MenuItem key={siteId} value={siteId}>
                                                {siteId}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    {selectedSiteId && (
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="type"
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
                                                        color: "white"
                                                    }
                                                }
                                            }}
                                            sx={{
                                                color: "#46F0F9",
                                            }}
                                            label="AllSite Type"
                                            variant="outlined"
                                            error={!!errors.type}
                                            helperText={errors.type ? errors.type.message : ''}
                                            type="text"
                                            readOnly
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    )}
                    {/*Location if available*/}
                    {selectedSiteId && (
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="location"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            InputProps={{
                                                sx:
                                                txProps,
                                            }}
                                            InputLabelProps={{
                                                sx: {
                                                    color: "#46F0F9",
                                                    "&.Mui-focused": {
                                                        color: "white"
                                                    }
                                                }
                                            }}
                                            sx={{
                                                color: "#46F0F9",
                                            }}
                                            label="Location"
                                            variant="outlined"
                                            error={!!errors.location}
                                            helperText={errors.location ? errors.location.message : ''}
                                            type="text"
                                            readOnly
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    )}
                </Grid>
                <br/>
                {/*Fuel Info*/}
                <Grid container spacing={4}>
                    <Grid item xs={12}>
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
                                Fuel Information
                            </Typography>
                        </Card>
                    </Grid>
                    {/*date supplied */}
                    <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                        <CustomDatePicker
                            control={control}
                            name="dateSupplied"
                            label="Supply Date"
                            defaultValue={fuelData.dateSupplied}
                        />
                    </Grid>
                    {/* Initial qty */}
                    <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                        <FormControl fullWidth>
                            <Controller
                                name="qtyInitial"
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
                                                    color: "white"
                                                }
                                            }
                                        }}
                                        sx={{
                                            color: "#46F0F9",
                                        }}
                                        label="Initial Quantity"
                                        variant="outlined"
                                        error={!!errors.qtyInitial}
                                        helperText={errors.qtyInitial ? errors.qtyInitial.message : ''}
                                        type="number"
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    {/* Supplied Quantity */}
                    <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                        <FormControl fullWidth>
                            <Controller
                                name="qtySupplied"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        label="Supplied Quantity"
                                        type="number"
                                        error={!!errors.qtySupplied}
                                        helperText={errors.qtySupplied ? errors.qtySupplied.message : ''}
                                        fullWidth
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
                                        onChange={(e) => {
                                            const value = parseFloat(e.target.value) || 0;
                                            field.onChange(value);
                                        }}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    {/* New qty*/}
                    <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                        <FormControl fullWidth>
                            <Controller
                                name="qtyNew"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        label="New Available Quantity"
                                        type="number"
                                        InputProps={{
                                            sx: {...txProps, color: 'green'},
                                            readOnly: true,
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
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    {/* CPD */}
                    <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                        <FormControl fullWidth>
                            <Controller
                                name="cpd"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        label="CPD"
                                        select
                                        type='number'
                                        onChange={(e) => field.onChange(e)}
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
                                        <MenuItem value={50}>50</MenuItem>
                                        <MenuItem value={60}>60</MenuItem>
                                        <MenuItem value={100}>100</MenuItem>
                                        <MenuItem value={120}>120</MenuItem>
                                        <MenuItem value="Others">Others</MenuItem>
                                    </TextField>
                                )}
                            />
                        </FormControl>
                    </Grid>
                    {/* Custom CPD */}
                    {selectedCPD === 'Others' && (
                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                            <FormControl fullWidth>
                                <Controller
                                    name="customCPD"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            label="Custom CPD"
                                            type="number"
                                            error={!!errors.customCPD}
                                            helperText={errors.customCPD ? errors.customCPD.message : ''}
                                            fullWidth
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
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    )}
                    {/* duration */}
                    {selectedCPD && (
                        <>
                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="duration"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Duration"
                                                type="number"
                                                InputProps={{
                                                    sx: txProps,
                                                    readOnly: true,
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
                                                value={duration}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            {/*nextDueDate*/}
                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name="nextDueDate"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Next Due Date"
                                                type="text"
                                                InputProps={{
                                                    sx: txProps,
                                                    readOnly: true,
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
                                                value={nextDueDate}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </>
                    )}
                </Grid>
                <br/>
                {/*Submitting button */}
                <Stack direction='row' gap={2} sx={{marginBottom: '75px'}}>
                    <Button variant="contained" title='Back' onClick={goPrev} size='small'
                            sx={{
                                color: '#FFF',
                                backgroundColor: 'red',
                                '&:hover': {
                                    backgroundColor: '#46F0F9',
                                },
                            }}
                    >
                        Back
                    </Button>

                    <Button variant="contained" onClick={Clear} type='reset'
                            title='Clear' size='small'
                            sx={{
                                color: '#FFF',
                                backgroundColor: 'grey',
                                '&:hover': {
                                    backgroundColor: '#46F0F9',
                                },
                            }}
                    >
                        Clear
                    </Button>
                    <Button variant="contained" type='submit' title='Submit' size='small'
                            sx={{
                                color: '#FFF',
                                backgroundColor: 'linear-gradient(to right, #000046, #1cb5e0)',
                                '&:hover': {
                                    backgroundColor: '#891f9c',
                                },
                            }}
                    >
                        Submit
                    </Button>
                </Stack>
            </Box>
        </>
    )

}

export default EditFuelReport;