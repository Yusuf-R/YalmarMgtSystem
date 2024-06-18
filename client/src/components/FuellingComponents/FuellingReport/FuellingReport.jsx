'use client';
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {useRouter} from "next/navigation";
import Link from "next/link";
import React, {useEffect, useMemo, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {createTheme, LinearProgress, ThemeProvider, useTheme} from '@mui/material';
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
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import Modal from '@mui/material/Modal';
import InputAdornment from "@mui/material/InputAdornment";
import MapIcon from "@mui/icons-material/Map";
import Grid from "@mui/material/Grid";
import CellTowerIcon from '@mui/icons-material/CellTower';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Controller, useForm, useWatch} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    mainSection,
    sitesData, siteStates, siteStatus, type,
} from "@/utils/data";
import dayjs from "dayjs";
import DateComponent from "@/components/DateComponent/DateComponent";
import Divider from "@mui/material/Divider";
import {editFuelSupplyReportSchema} from "@/SchemaValidator/editFuelSupplyReport";


function FuellingReport({allFuelReport}) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('/dashboard/admin/fuel/new');
    
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const tableTheme = useMemo(
        () =>
            createTheme({
                components: {
                    MuiSwitch: {
                        styleOverrides: {
                            thumb: {
                                // color: '#ff8c00',
                                color: '#40ff00',
                            },
                            
                        },
                    },
                    MuiFormControlLabel: {
                        styleOverrides: {
                            label: {
                                fontSize: '1.1rem',
                                color: 'white',
                                fontWeight: 'bold',
                                '&:hover': {
                                    color: '#fcc2fb',
                                },
                            },
                        },
                    },
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                color: '#fff',
                                fontWeight: 'bold',
                            },
                        },
                    },
                    MuiPaginationItem: {
                        styleOverrides: {
                            root: {
                                color: '#fff',
                                fontWeight: 'bold',
                                border: '1px solid aqua',
                                backgroundColor: '#03332b',
                            },
                        },
                    },
                    MuiTableSortLabel: {
                        styleOverrides: {
                            icon: {
                                fontSize: '1.2rem',
                                // backgroundColor: 'aqua !important',
                                backgroundColor: '#FFF !important',
                                color: '#FFF !important'
                            },
                        },
                    },
                    MuiSvgIcon: {
                        styleOverrides: {
                            root: {
                                // color: 'aqua',
                                color: '#FFF',
                            },
                        },
                    },
                    MuiInputLabel: {
                        styleOverrides: {
                            root: {
                                color: '#fff',
                            },
                        },
                    },
                    MuiInputBase: {
                        styleOverrides: {
                            root: {
                                color: '#fff',
                                fontWeight: 'bold',
                            },
                            
                        },
                    },
                    // Add style overrides for MuiTable, MuiTableRow, and MuiTableCell
                    MuiTable: {
                        styleOverrides: {
                            root: {
                                color: '#fff', // Change table text color
                                padding: '2px',
                            },
                        },
                    },
                    // MuiTableRow: {
                    //     styleOverrides: {
                    //         root: {
                    //             '&:nth-of-type(odd)': {
                    //                 backgroundColor: '#2e2e2e', // Change row background color for odd rows
                    //             },
                    //             '&:nth-of-type(even)': {
                    //                 backgroundColor: '#1e1e1e', // Change row background color for even rows
                    //             },
                    //             '&:hover': {
                    //                 backgroundColor: '#333', // Change row background color on hover
                    //             },
                    //         },
                    //     },
                    // },
                    MuiTableCell: {
                        styleOverrides: {
                            root: {
                                color: '#fff',
                            },
                            // head: {
                            //     backgroundColor: '#444', // Change header cell background color
                            //     color: '#fff', // Change header cell text color
                            //     fontWeight: 'bold', // Make header cell text bold
                            // },
                        },
                    },
                }
            }),
        [],
    );
    const headerKeys = [
        'siteId',
        'cluster',
        'type',
        'status',
        'location',
        'qtyInitial',
        'qtySupplied',
        'qtyNew',
        'dateSupplied',
        'nextDueDate',
        'duration',
        'cpd',
    ];
    // Function to capitalize the first letter of the key
    const capitalizeFirstLetter = (key) => {
        // if key not in our headerKeys array, it should skip that key
        if (!headerKeys.includes(key) || !key) {
            return '';
        }
        return key.charAt(0).toUpperCase() + key.slice(1);
    };
    const columnFields = allFuelReport.length > 0 ? Object.keys(allFuelReport[0]) : [];
    const columns = useMemo(() => columnFields.map((field) => ({
            accessorKey: field,
            header: capitalizeFirstLetter(field),
            sortable: true,
            size: 150,
            // set the 'status' header to be color red
            headerStyle: field === 'Status' ? {color: 'red'} : {},
            Cell: ({cell}) => {
                if (field === 'status') {
                    let bgColor = '';
                    let textColor = '#fff'; // Default text color is white
                    switch (cell.getValue()) {
                        case 'Active':
                            bgColor = 'green';
                            break;
                        case 'Inactive':
                            bgColor = '#ff9933';
                            break;
                        case 'Deactivated':
                            bgColor = '#660029';
                            break;
                        default:
                            bgColor = 'transparent';
                    }
                    return (
                        <span style={{backgroundColor: bgColor, color: textColor, padding: '5px', borderRadius: '10px'}}>
                            {cell.getValue()}
                        </span>
                    );
                }
                return cell.getValue();
            },
        }))
            .filter((column) => column.header !== ''),
        []
    );
    const tableData = useMemo(
        () => allFuelReport.map((site) => {
            const row = {};
            columns.forEach((column) => {
                row[column.accessorKey] = site[column.accessorKey];
            });
            row._id = site._id; // Include _id in the row data
            return row;
        }),
        [columns, allFuelReport]
    );
    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
        fontSize: '1.2em',
    };
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
        overflow: 'scroll',
    };
    
    const paperInnerStyle = {
        // textAlign: 'center',
        padding: '5px',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
        margin: 0, // Ensure no margin
    };
    
    const gridStyle = {
        padding: '5px', // Optional: Add padding inside the Grid to avoid overlapping borders
    };
    
    const gridItemStyle = {
        padding: '5px', // Optional: Add padding inside the Grid item to avoid overlapping borders
    };
    
    const table = useMaterialReactTable({
        columns,
        data: tableData,
        enableSorting: true,
        enablePagination: true,
        enableColumnFiltering: true,
        enableColumnHiding: true,
        enableRowSelection: true,
        enableColumnActions: false,
        enableRowNumbers: true,
        rowNumberDisplayMode: "original",
        enableRowExpand: true,
        enableMultiRowSelection: true,
        enableGlobalFilter: true,
        enableGrouping: true,
        enableColumnDragging: false,
        enableEditing: true,
        enableClickToCopy: true,
        enableColumnReordering: true,
        positionActionsColumn: 'first',
        renderRowActions: ({row}) => {
            const objID = row.original._id;
            const siteData = allFuelReport.find((site) => site._id === objID);
            const [open, setOpen] = useState(false);
            const [dialogDelete, setDialogDelete] = useState(false);
            const [modalViewOpen, setModalViewOpen] = useState(false);
            const [dialogEditOpen, setDialogEditOpen] = useState(false);
            const [dateSupplied, setDateSupplied] = useState(siteData.dateSupplied);
            const [email, setEmail] = useState('');
            const [emailError, setEmailError] = useState('');
            const queryClient = useQueryClient();
            const router = useRouter();
            const paperProps = {
                alignCenter: 'center',
                textAlign: 'center',
                padding: '25px',
                backgroundColor: '#274e61',
                color: '#46F0F9',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
            }
            const {
                control, handleSubmit, formState: {errors}, setError, reset, setValue
            } = useForm({
                mode: "onTouched",
                resolver: yupResolver(editFuelSupplyReportSchema),
                reValidateMode: "onChange",
                defaultValues: {
                    qtyInitial: siteData.qtyInitial,
                    qtySupplied: siteData.qtySupplied,
                    qtyNew: siteData.qtyNew,
                    duration: siteData.duration,
                },
            });
            
            
            // Fuel supply info Section
            const qtyInitial = useWatch({control, name: 'qtyInitial', defaultValue: siteData.qtyInitial});
            const qtySupplied = useWatch({control, name: 'qtySupplied', defaultValue: siteData.qtySupplied});
            const cpd = useWatch({control, name: 'cpd', defaultValue: siteData.cpd});
            const customCPD = useWatch({control, name: 'customCPD'});
            
            const newAvailableQty = (Number(qtyInitial) + Number(qtySupplied)) || 0;
            const consumptionPerDay = cpd === 'Others' ? Number(customCPD) : Number(cpd) || 0;
            const duration = consumptionPerDay ? Math.ceil(newAvailableQty / consumptionPerDay) : 0;
            const nextDueDate = dateSupplied ? dayjs(dateSupplied).add(duration, 'day').format('DD/MMM/YYYY') : '';
            
            useEffect(() => {
                setValue('qtyNew', newAvailableQty);
                setValue('duration', duration);
                setValue('nextDueDate', nextDueDate);
            }, [newAvailableQty, consumptionPerDay, dateSupplied, setValue]);
            
            
            if (Object.keys(errors).length > 0) {
                console.log({errors});
            }
            
            const Clear = () => {
                // clear all the content of the fields of the box components
                reset();
            }
            
            const handleModalViewOpen = () => setModalViewOpen(true);
            const handleModalViewClose = () => setModalViewOpen(false);
            
            
            const openDialogEdit = () => {
                setDialogEditOpen(true);
            };
            
            const closeDialogEdit = () => {
                Clear();
                setDialogEditOpen(false);
            };
            
            
            const OpenDeleteDialogue = () => {
                setDialogDelete(true)
            }
            const CloseDeleteDialogue = () => {
                setDialogDelete(false)
            }
            
            
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
            // Update fuelReport instance
            const mutationUpdate = useMutation({
                mutationKey: ["UpdateFuelSupplyReport"],
                mutationFn: AdminUtils.UpdateFuelSupplyReport,
            });
            
            // delete fuelReport instance
            const mutationDelete = useMutation({
                mutationKey: ["DeleteFuelSupplyReport"],
                mutationFn: AdminUtils.DeleteFuelSupplyReport,
            });
            
            // handle delete
            const handleDelete = async (event) => {
                event.preventDefault();
                const obj = {email, selectedIds: [objID]};
                mutationDelete.mutate(obj, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ["AllFuelReport"]});
                        toast.success('Fuel Report deleted successfully');
                        CloseDeleteDialogue();
                        window.location.reload();
                    },
                    onError: (error) => {
                        toast.error('Error deleting site');
                        console.error("Delete failed", error);
                    }
                });
            };
            
            // handle save edited data
            const submitUpdate = async (data) => {
                try {
                    // check if customCpd was entered, and if so we set cpd value to customCpd
                    if (cpd === 'Others' && customCPD) {
                        data.cpd = Number(customCPD);
                    }
                    await editFuelSupplyReportSchema.validate(data, {abortEarly: false});
                    console.log("Validation passed!"); // Check if validation passes
                    data.site_id = siteData.site_id;
                    data._id = siteData._id;
                    // convert dateSupplied to DD/MMM/YYYY
                    data.dateSupplied = dayjs(dateSupplied).format('DD/MMM/YYYY');
                    // remove customCPD from data
                    delete data.customCPD;
                    mutationUpdate.mutate(data, {
                        onSuccess: (response) => {
                            if (response) {
                                toast.success('Fuel Supply Record Updated successfully');
                                //     refresh the query that fetched all the staff
                                queryClient.invalidateQueries({queryKey: ["AllFuelReport"]});
                                //     clear the form fields
                                Clear();
                                setDialogEditOpen(false);
                                // perform hard reload
                                window.location.reload();
                            } else {
                                toast.error('Failed to create new staff account');
                            }
                        },
                        onError: (error) => {
                            toast.error(error.message);
                            console.log(error);
                        }
                    });
                } catch (e) {
                    console.log(e);
                    e.inner.forEach((error) => {
                        // Set form errors
                        setError(error.path, {
                            type: error.type,
                            message: error.message,
                        });
                    });
                }
            };
            
            //Analytics on the FuelData
            const ViewAnalytics = async () => {
                // encrypt siteData in the local session storage
                const encryptedSiteData = await AdminUtils.encryptData(siteData)
                if (sessionStorage.getItem('siteData')) {
                    sessionStorage.removeItem('siteData');
                }
                sessionStorage.setItem('siteData', encryptedSiteData);
                router.push('/dashboard/admin/reports/fuel/analytics');
                handleModalViewClose();
            }
            
            // Data Xcal
            const calculateFuelAnalytics = (dateSupplied, nextDueDate, initialQty, suppliedQty, cpd) => {
                initialQty = Number(initialQty);
                suppliedQty = Number(suppliedQty);
                cpd = Number(cpd);
                
                const today = dayjs();
                const dateSuppliedDayjs = dayjs(dateSupplied, "DD/MMM/YYYY");
                const nextDueDateDayjs = dayjs(nextDueDate, "DD/MMM/YYYY");
                
                const totalQty = initialQty + suppliedQty;
                
                // if supply was done in future(not today), return no analytics
                if (today.isBefore(dateSuppliedDayjs)) {
                    return ({dataError: 'Unavailable Analytics: Consumption has not started'})
                }
                // Check for non-negative initial and supplied quantities
                if (initialQty < 0 || suppliedQty < 0) {
                    return ({dataError: 'Error: Initial and supplied quantities must be non-negative.'})
                }
                
                // Calculate days passed only if the dateSupplied is in the past or today
                const daysPassed = today.isAfter(dateSuppliedDayjs) ? today.diff(dateSuppliedDayjs, 'day') : 0;
                const consumptionSoFar = daysPassed * cpd;
                
                // Ensure that the consumption so far does not exceed the total quantity available
                const currentFuelAvailable = Math.max(0, totalQty - consumptionSoFar);
                const remainingFuelDuration = Math.floor(currentFuelAvailable / cpd);
                
                let bufferStockStatus = "";
                let bufferStockColor = "";
                
                if (remainingFuelDuration <= 1) {
                    bufferStockStatus = "SITE DOWN";
                    bufferStockColor = "red";
                } else if (remainingFuelDuration <= 5) {
                    bufferStockStatus = "REFUEL ALERT";
                    bufferStockColor = "#ff66cc";
                } else {
                    bufferStockStatus = "ACTIVE OPERATION";
                    bufferStockColor = "green";
                }
                
                const fuelToDatePercentage = (currentFuelAvailable / totalQty) * 100;
                let fuelToDateColor = "";
                let fuelToDateText = "";
                
                if (fuelToDatePercentage <= 20) {
                    fuelToDateColor = "#ff3300";
                    fuelToDateText = "<= 20% left";
                } else if (fuelToDatePercentage <= 40) {
                    fuelToDateColor = "#ff66cc";
                    fuelToDateText = "<= 40% left";
                } else if (fuelToDatePercentage <= 75) {
                    fuelToDateColor = "#00ccff";
                    fuelToDateText = "<= 75% left";
                } else {
                    fuelToDateColor = "#33cc33";
                    fuelToDateText = "75-100% left";
                }
                
                return {
                    currentFuelAvailable,
                    consumptionSoFar,
                    remainingFuelDuration,
                    bufferStockStatus,
                    bufferStockColor,
                    fuelToDatePercentage,
                    fuelToDateColor,
                    fuelToDateText,
                };
            };
            const FuelAnalytics = ({
                                       dateSupplied,
                                       nextDueDate,
                                       initialQty,
                                       suppliedQty,
                                       cpd,
                                       paperInnerStyle,
                                       gridStyle,
                                       gridItemStyle
                                   }) => {
                const analytics = calculateFuelAnalytics(dateSupplied, nextDueDate, initialQty, suppliedQty, cpd);
                
                if (analytics.dataError) {
                    return (
                        <>
                            <Paper elevation={5} sx={paperInnerStyle}>
                                <Grid container spacing={2} sx={gridStyle}>
                                    <Grid item xs={12} sx={gridItemStyle}>
                                        <Typography display='block' variant='h6'
                                                    sx={{
                                                        fontFamily: 'Poppins',
                                                        fontWeight: 'bold',
                                                        color: '#FFF',
                                                    }}>Analytics</Typography>
                                    </Grid>
                                    <Grid item xs={12} sx={gridItemStyle}>
                                        <Typography sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            flexDirection: 'column',
                                            fontSize: '18px',
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            // color: '#FFF',
                                        }}>{analytics.dataError}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </>
                    )
                }
                return (
                    <Paper elevation={5} sx={paperInnerStyle}>
                        <Grid container spacing={3} sx={gridStyle}>
                            <Grid item xs={12} sx={gridItemStyle}>
                                <Typography display='block' variant='h6' sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                }}>Analytics</Typography>
                            </Grid>
                            <Grid item xs={6} sx={gridItemStyle}>
                                <Stack direction='row' spacing={2}>
                                    <Typography align="left" sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        flexDirection: 'column',
                                        fontSize: '18px',
                                        width: '280px',
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                        // color: '#FFF',
                                    }}>
                                        Current Fuel Available:
                                    </Typography>
                                    <TextField
                                        id="input-with-icon-textfield"
                                        defaultValue={analytics.currentFuelAvailable + ' litres'}
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
                                                // color: "#46F0F9",
                                                fontFamily: 'Poppins',
                                                fontWeight: 'bold',
                                                color: '#FFF',
                                                fontSize: '18px',
                                                width: '150px',
                                            },
                                        }}
                                        variant="filled"
                                        size='small'
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={6} sx={gridItemStyle}>
                                <Stack direction='row' spacing={2}>
                                    <Typography align="left" sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        flexDirection: 'column',
                                        fontSize: '18px',
                                        width: '220px',
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                    }}>
                                        Consumption So Far:
                                    </Typography>
                                    <TextField
                                        id="input-with-icon-textfield"
                                        defaultValue={analytics.consumptionSoFar + ' litres'}
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
                                                // color: "#46F0F9",
                                                fontSize: '18px',
                                                width: '150px',
                                                fontFamily: 'Poppins',
                                                fontWeight: 'bold',
                                                color: '#FFF',
                                            },
                                        }}
                                        variant="filled"
                                        size='small'
                                    />
                                </Stack>
                            </Grid>
                            {/*Second Row*/}
                            <Grid item xs={6} sx={gridItemStyle}>
                                <Stack direction='row' spacing={2}>
                                    <Typography align="left" sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        flexDirection: 'column',
                                        fontSize: '18px',
                                        width: '500px',
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                    }}>
                                        Remaining Fuel Duration:
                                    </Typography>
                                    <TextField
                                        id="input-with-icon-textfield"
                                        defaultValue={analytics.remainingFuelDuration + ' day(s)'}
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
                                                // color: "#46F0F9",
                                                fontSize: '18px',
                                                width: '80%',
                                                fontFamily: 'Poppins',
                                                fontWeight: 'bold',
                                                color: '#FFF',
                                            },
                                        }}
                                        variant="filled"
                                        size='small'
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={6} sx={gridItemStyle}>
                                <Stack direction='row' spacing={2}>
                                    <Typography align="left" sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        flexDirection: 'column',
                                        fontSize: '18px',
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                        // color: '#FFF',
                                        width: '300px',
                                    }}>
                                        Buffer Stock Status:
                                    </Typography>
                                    <TextField
                                        id="input-with-icon-textfield"
                                        defaultValue={analytics.bufferStockStatus}
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
                                                fontSize: '18px',
                                                backgroundColor: analytics.bufferStockColor,
                                                fontFamily: 'Poppins',
                                                // fontWeight: 'bold',
                                            },
                                        }}
                                        variant="filled"
                                        size='small'
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sx={gridItemStyle}>
                                <br/>
                            </Grid>
                            <Grid item xs={12} sx={gridItemStyle}>
                                <Typography sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    flexDirection: 'column',
                                    fontSize: '18px',
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                }}>
                                    Fuel to Date (FTD):
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={2} sx={{width: '100%'}}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={analytics.fuelToDatePercentage}
                                        sx={{
                                            flexGrow: 1,
                                            height: 10,
                                            backgroundColor: '#e0e0e0',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: analytics.fuelToDateColor
                                            }
                                        }}
                                    />
                                    <Typography sx={{marginLeft: 2, color: analytics.fuelToDateColor}}>
                                        {analytics.fuelToDatePercentage.toFixed(2)}% left
                                    </Typography>
                                </Stack>
                            </Grid>
                        
                        </Grid>
                    </Paper>
                );
            };
            
            const handleCPDChange = (e) => {
                const {value} = e.target;
                setValue('cpd', value);
                if (value !== 'Others') {
                    setValue('customCPD', '');
                }
            };
            
            return (
                <>
                    <Stack direction='row'
                           sx={{
                               padding: '0',
                               margin: '0',
                               justifyContent: 'center',
                               alignItems: 'center',
                               spacing: 0,
                           }}
                    >
                        <Button onClick={handleModalViewOpen}>
                            <Tooltip title="View" arrow>
                                <LocalLibraryIcon sx={{color: '#E997F9', cursor: 'pointer'}}/>
                            </Tooltip>
                        </Button>
                        <Button onClick={openDialogEdit}>
                            <Tooltip title="Edit" arrow>
                                <EditIcon sx={{color: '#4af7a7', cursor: 'pointer'}}/>
                            </Tooltip>
                        </Button>
                        <Button onClick={OpenDeleteDialogue}>
                            <Tooltip title="Delete" arrow>
                                <DeleteIcon sx={{color: '#f7564a', cursor: 'pointer'}}/>
                            </Tooltip>
                        </Button>
                    </Stack>
                    {/*Delete Confirmation Dialog*/}
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            component: 'form',
                            onSubmit: handleDelete,
                            sx: {
                                backgroundColor: '#0E1E1E'
                            },
                        }}
                    >
                        <DialogTitle>
                            <Typography variant="button" display="block" gutterBottom
                                        sx={{color: 'red', fontWeight: 'bold', fontSize: '1.0em'}}>
                                Confirm Deletion
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Typography variant="body1" gutterBottom
                                            sx={{
                                                color: 'red',
                                                fontWeight: 'bold',
                                                fontSize: '1.1em'
                                            }}>
                                    You are about to permanently delete the selected Site. Please enter
                                    your
                                    Email address to further confirm your actions.
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
                                    }
                                }}
                                InputProps={{
                                    sx: txProps
                                }}
                            />
                        </DialogContent>
                        <DialogActions sx={{justifyContent: 'space-between'}}>
                            <Stack direction="row" gap={4} justifyContent='space-between'
                                   sx={{width: '100%', ml: '15px', mr: '15px', mb: '15px'}}>
                                <Button onClick={handleClose} variant="contained" color="success">Cancel</Button>
                                <Button type="submit" variant="contained" color="error"> Delete </Button>
                            </Stack>
                        </DialogActions>
                    </Dialog>
                    {/*Modal for Site data view*/}
                    <Modal open={modalViewOpen} onClose={handleModalViewClose} noValidate overflow>
                        <Paper elevation={5} sx={modalStyle}>
                            <Stack direction="column" gap={2}>
                                {/*Site-Information*/}
                                <Paper elevation={5} sx={paperInnerStyle}>
                                    <Grid container spacing={2} sx={gridStyle}>
                                        <Grid item xs={12} sx={gridItemStyle}>
                                            <Typography display='block' variant='h6' sx={{
                                                fontFamily: 'Poppins',
                                                fontWeight: 'bold',
                                                color: '#FFF',
                                            }}>Site-Details</Typography>
                                        </Grid>
                                        <Grid item xs={3} sx={gridItemStyle}>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                defaultValue={siteData.siteId}
                                                label="Site ID"
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
                                                            <CellTowerIcon sx={{color: '#FFF'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    readOnly: true,
                                                    sx: {
                                                        color: "#46F0F9",
                                                        fontSize: '18px',
                                                    },
                                                }}
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sx={gridItemStyle}>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                defaultValue={siteData.cluster}
                                                label="Cluster"
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
                                                            <MapIcon sx={{color: '#FFF'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    readOnly: true,
                                                    sx: {
                                                        color: "#46F0F9",
                                                        fontSize: '18px',
                                                        
                                                    },
                                                }}
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sx={gridItemStyle}>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                defaultValue={siteData.type}
                                                label="Site Type"
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
                                                            <KebabDiningIcon sx={{color: '#FFF'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    readOnly: true,
                                                    sx: {
                                                        color: "#46F0F9",
                                                        fontSize: '18px',
                                                    },
                                                }}
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={8} sx={gridItemStyle}>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                defaultValue={siteData.location || 'N/A'}
                                                label="Site Location"
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
                                                            <LocationOnIcon sx={{color: '#FFF'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    readOnly: true,
                                                    sx: {
                                                        color: "#46F0F9",
                                                        fontSize: '18px',
                                                        width: '200%',
                                                    },
                                                }}
                                                variant="filled"
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <br/>
                                {/*Fuel Supply Info*/}
                                <Paper elevation={5} sx={paperInnerStyle}>
                                    <Grid container spacing={2} sx={gridStyle}>
                                        {/*supply info*/}
                                        <Grid item xs={12} sx={gridItemStyle}>
                                            <Typography display='block' variant='h6'
                                                        sx={{
                                                            fontFamily: 'Poppins',
                                                            fontWeight: 'bold',
                                                            color: '#FFF',
                                                        }}>
                                                Fuel Supply Info
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} sx={gridItemStyle}>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                defaultValue={siteData.dateSupplied}
                                                label="Supplied Date"
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
                                                            <CellTowerIcon sx={{color: '#FFF'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    readOnly: true,
                                                    sx: {
                                                        color: "#46F0F9",
                                                        fontSize: '18px',
                                                    },
                                                }}
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sx={gridItemStyle}>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                defaultValue={siteData.qtyInitial}
                                                label="Initial Quantity"
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
                                                            <MapIcon sx={{color: '#FFF'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    readOnly: true,
                                                    sx: {
                                                        color: "#46F0F9",
                                                        fontSize: '18px',
                                                    },
                                                }}
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sx={gridItemStyle}>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                defaultValue={siteData.qtySupplied}
                                                label="Supplied Quantity Type"
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
                                                            <KebabDiningIcon sx={{color: '#FFF'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    readOnly: true,
                                                    sx: {
                                                        color: "#46F0F9",
                                                        fontSize: '18px',
                                                    },
                                                }}
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sx={gridItemStyle}>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                defaultValue={siteData.qtyNew}
                                                label="New Available Quantity"
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
                                                            <LocationOnIcon sx={{color: '#FFF'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    readOnly: true,
                                                    sx: {
                                                        color: "#46F0F9",
                                                        fontSize: '18px',
                                                    },
                                                }}
                                                variant="filled"
                                            />
                                        </Grid>
                                        {/*duration info*/}
                                        <Grid item xs={3} sx={gridItemStyle}>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                defaultValue={siteData.cpd}
                                                label="Site CPD"
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
                                                            <CellTowerIcon sx={{color: '#FFF'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    readOnly: true,
                                                    sx: {
                                                        color: "#46F0F9",
                                                        fontSize: '18px',
                                                    },
                                                }}
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sx={gridItemStyle}>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                defaultValue={siteData.duration}
                                                label="Expected Fuel Duration"
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
                                                            <MapIcon sx={{color: '#FFF'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    readOnly: true,
                                                    sx: {
                                                        color: "#46F0F9",
                                                        fontSize: '18px',
                                                    },
                                                }}
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sx={gridItemStyle}>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                defaultValue={siteData.nextDueDate}
                                                label="Expected DueDate"
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
                                                            <KebabDiningIcon sx={{color: '#FFF'}}/>
                                                        </InputAdornment>
                                                    ),
                                                    readOnly: true,
                                                    sx: {
                                                        color: "#46F0F9",
                                                        fontSize: '18px',
                                                    },
                                                }}
                                                variant="filled"
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <br/>
                                <FuelAnalytics
                                    cpd={siteData.cpd}
                                    nextDueDate={siteData.nextDueDate}
                                    dateSupplied={siteData.dateSupplied}
                                    initialQty={siteData.qtyInitial}
                                    suppliedQty={siteData.qtySupplied}
                                    paperInnerStyle={paperInnerStyle}
                                    gridStyle={gridStyle}
                                    gridItemStyle={gridItemStyle}
                                />
                                {/*Button Section*/}
                                <Stack direction="row" justifyContent="space-between" gap={10}>
                                    <Button onClick={ViewAnalytics} variant="contained" color='secondary'>
                                        View Analytics
                                    </Button>
                                    <Button color="success" onClick={handleModalViewClose} variant="contained">
                                        Close
                                    </Button>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Modal>
                    {/*Dialog for Editing Site Data*/}
                    <Dialog open={dialogEditOpen} onClose={closeDialogEdit} fullWidth maxWidth='lg'>
                        <Paper sx={{
                            alignCenter: 'center',
                            textAlign: 'center',
                            padding: '20px',
                            border: '2px solid #0A4D50',
                            backgroundColor: '#274e61',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 1.5)',
                        }}>
                            <Paper elevation={5} sx={{
                                alignCenter: 'center',
                                textAlign: 'center',
                                padding: '5px',
                                backgroundColor: '#274e61',
                                color: '#46F0F9',
                                borderRadius: '10px',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
                            }}>
                                <Typography variant='h6' sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>Edit Fuel
                                    Report
                                    Form</Typography>
                            </Paper>
                            <br/>
                            <Box
                                component="form"
                                onSubmit={handleSubmit(submitUpdate)}
                                noValidate
                            >
                                {/* Main Body */}
                                {/*Site Info*/}
                                <Typography variant='h6'
                                            sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                                    SiteID: {siteData.siteId}
                                </Typography>
                                <br/>
                                <Stack direction='row' justifyContent="center"
                                       alignItems="center"
                                       spacing={2}>
                                    <Typography variant='h6'
                                                sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                                        Cluster: {siteData.cluster}
                                    </Typography>
                                    <Divider orientation="vertical" flexItem sx={{border: '2px solid #FFF'}}/>
                                    <Typography variant='h6'
                                                sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                                        Type: {siteData.type}
                                    </Typography>
                                    <Divider orientation="vertical" flexItem sx={{border: '2px solid #FFF'}}/>
                                    <Typography variant='h6'
                                                sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                                        Location: {siteData.location}
                                    </Typography>
                                </Stack>
                                <br/><br/>
                                {/*Fuel Supply Info*/}
                                <Grid container spacing={4}>
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
                                        {/* First Row (1 fields) prefix */}
                                        <Grid container spacing={4}>
                                            <Grid item xs={12}>
                                                <Typography variant='h6' textAlign='left'
                                                            sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                                                    Fuel Supply Info
                                                </Typography>
                                            </Grid>
                                            {/*Supply Date*/}
                                            <Grid item xs={12}>
                                                <DateComponent
                                                    name="dateSupplied"
                                                    control={control}
                                                    errors={errors}
                                                    labelText="Supply Date"
                                                    setDate={setDateSupplied}
                                                    defaultValue={siteData.dateSupplied} // Pass default value
                                                />
                                            </Grid>
                                            {/*Initial Quantity*/}
                                            <Grid item xs={3}>
                                                <Controller
                                                    name="qtyInitial"
                                                    control={control}
                                                    defaultValue={siteData.qtyInitial}
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
                                                            sx={{
                                                                color: "#46F0F9",
                                                                
                                                            }}
                                                            label="Initial Quantity"
                                                            type="number"
                                                            error={!!errors.qtyInitial}
                                                            helperText={errors.qtyInitial ? errors.qtyInitial.message : ''}
                                                            fullWidth
                                                            onChange={(e) => {
                                                                const value = parseFloat(e.target.value) || 0;
                                                                field.onChange(value);
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            {/*Supplied Quantity*/}
                                            <Grid item xs={3}>
                                                <Controller
                                                    name="qtySupplied"
                                                    control={control}
                                                    defaultValue={siteData.qtySupplied}
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
                                            </Grid>
                                            {/*New Available Quantity*/}
                                            <Grid item xs={3}>
                                                <Controller
                                                    name="qtyNew"
                                                    control={control}
                                                    defaultValue={siteData.qtyNew}
                                                    render={({field}) => (
                                                        <TextField
                                                            {...field}
                                                            label="New Available Quantity"
                                                            type="number"
                                                            InputProps={{
                                                                sx: {...txProps, color: 'lime'},
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
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            {/*CPD*/}
                                            {/*Current Site CPD*/}
                                            <Grid item xs={3}>
                                                <TextField
                                                    label="Current Site CPD"
                                                    value={siteData.cpd}
                                                    InputProps={{
                                                        readOnly: true,
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
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider orientation="horizontal" flexItem
                                                         sx={{borderColor: '#FFF',}}>
                                                    <Typography variant='h6' textAlign='center'
                                                                sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                                                        Set New CPD
                                                    </Typography>
                                                </Divider>
                                            
                                            </Grid>
                                            <Grid item xs={3} sx={{display: 'flex', flexDirection: 'column'}}>
                                                {/* CPD selection */}
                                                <Controller
                                                    name="cpd"
                                                    control={control}
                                                    render={({field}) => (
                                                        <TextField
                                                            {...field}
                                                            label="CPD"
                                                            select
                                                            value={field.value}
                                                            onChange={handleCPDChange}
                                                            error={!!errors.cpd}
                                                            helperText={errors.cpd ? errors.cpd.message : ''}
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
                                                                alignSelf: 'left',
                                                            }}>
                                                            <MenuItem value={50}>50</MenuItem>
                                                            <MenuItem value={60}>60</MenuItem>
                                                            <MenuItem value={100}>100</MenuItem>
                                                            <MenuItem value={120}>120</MenuItem>
                                                            <MenuItem value="Others">Others</MenuItem>
                                                        </TextField>
                                                    )}
                                                />
                                            </Grid>
                                            {/*Custom CPD*/}
                                            {cpd === 'Others' && (
                                                <Grid item xs={3}>
                                                    {/* Custom CPD input */}
                                                    <Controller
                                                        name="customCPD"
                                                        control={control}
                                                        render={({field}) => (
                                                            <TextField
                                                                {...field}
                                                                label="Enter CPD"
                                                                type="number"
                                                                error={!!errors.customCPD}
                                                                helperText={errors.customCPD ? errors.customCPD.message : ''}
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
                                                                fullWidth
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            )}
                                            {/*supply Duration*/}
                                            {cpd && (
                                                <>
                                                    <Grid item xs={3}>
                                                        <Controller
                                                            name="duration"
                                                            control={control}
                                                            defaultValue={siteData.duration}
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
                                                                    fullWidth
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                    {/*nextDueDate*/}
                                                    <Grid item xs={3}>
                                                        <Controller
                                                            name="nextDueDate"
                                                            control={control}
                                                            defaultValue=""
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
                                                                    fullWidth
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                </>
                                            )}
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <br/><br/>
                                {/*Submitting button */}
                                <DialogActions>
                                    <Button onClick={closeDialogEdit} color='error' variant='contained'>Cancel</Button>
                                    <Button type='submit' color='success' variant='contained'>Submit</Button>
                                </DialogActions>
                            </Box>
                        </Paper>
                    </Dialog>
                    {/*Delete Dialog*/}
                    <Dialog open={dialogDelete} onClose={CloseDeleteDialogue}
                            PaperProps={{
                                component: 'form',
                                onSubmit: handleDelete,
                                sx: {
                                    backgroundColor: '#0E1E1E'
                                },
                            }}
                    >
                        <DialogTitle>
                            <Typography variant="button" display="block" gutterBottom
                                        sx={{
                                            color: 'red',
                                            fontWeight: 'bold',
                                            fontSize: '1.0em',
                                            fontFamily: 'Poppins',
                                        }}>
                                Confirm Deletion
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Typography variant="body1" gutterBottom
                                            sx={{
                                                color: 'red',
                                                fontWeight: 'bold',
                                                fontSize: '1.1em',
                                                fontFamily: 'Poppins',
                                            }}>
                                    You are about to permanently delete the selected Fuel Supply Report. Please enter
                                    your
                                    Email address to further confirm your actions.
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
                                    }
                                }}
                                InputProps={{
                                    sx: txProps
                                }}
                            />
                        </DialogContent>
                        <DialogActions sx={{justifyContent: 'space-between'}}>
                            <Stack direction="row" gap={4} justifyContent='space-between'
                                   sx={{width: '100%', ml: '15px', mr: '15px', mb: '15px'}}>
                                <Button onClick={CloseDeleteDialogue} variant="contained"
                                        color="success">Cancel</Button>
                                <Button type="submit" variant="contained" color="error"> Delete </Button>
                            </Stack>
                        </DialogActions>
                    </Dialog>
                
                </>
            )
        },
        renderTopToolbarCustomActions: ({table}) => {
            const mutation = useMutation({
                mutationKey: ["DeleteFuelSupplyReport"],
                mutationFn: AdminUtils.DeleteFuelSupplyReport,
            });
            const queryClient = useQueryClient();
            const createNew = () => router.push('/dashboard/admin/reports/fuel/new');
            const [open, setOpen] = useState(false);
            const [email, setEmail] = useState('');
            const [emailError, setEmailError] = useState('');
            
            const handleClose = () => {
                setOpen(false);
                setEmail('');
                setEmailError('');
            };
            const handleOpen = () => setOpen(true);
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
            const handleDelete = async (event) => {
                event.preventDefault();
                if (emailError || !email) {
                    toast.error('Please enter a valid email address');
                    return;
                }
                const selectedIds = table.getSelectedRowModel().flatRows.map((row) => row.original._id);
                const obj = {email, selectedIds};
                mutation.mutate(obj, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ["AllFuelReport"]});
                        toast.success('Selected Sites Deleted Successfully');
                        // reload the page
                        handleClose();
                        // perform hard reload
                        window.location.reload();
                    },
                    onError: (error) => {
                        toast.error('Error Deleting selected Site');
                        console.error("Delete failed", error);
                        handleClose();
                    }
                });
            };
            return (
                <Box sx={{display: 'flex', gap: '1rem', p: '4px'}}>
                    <Button
                        color="secondary"
                        onClick={createNew}
                        variant="contained"
                    >
                        Create New Fuel Report +
                    </Button>
                    <Button
                        color="error"
                        disabled={!table.getIsSomeRowsSelected()}
                        onClick={handleOpen}
                        variant="contained"
                    >
                        Delete Selected Report
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            component: 'form',
                            onSubmit: handleDelete,
                            sx: {backgroundColor: '#0E1E1E'},
                        }}
                    >
                        <DialogTitle>
                            <Typography variant="button" display="block" gutterBottom
                                        sx={{
                                            color: 'red',
                                            fontWeight: 'bold',
                                            fontSize: '1.0em',
                                        }}>
                                Confirm Deletion.
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Typography variant="body1" gutterBottom
                                            sx={{
                                                color: 'red',
                                                fontWeight: 'bold',
                                                fontSize: '1.1em',
                                            }}>
                                    You are about to permanently delete the selected Site, Please enter your
                                    email address to further confirm your actions.
                                </Typography>
                            </DialogContentText>
                            <br/>
                            <Stack direction="column" spacing={2}>
                                <Typography variant="subtitle1" gutterBottom sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.1em',
                                }}>
                                    Email *</Typography>
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
                            </Stack>
                        </DialogContent>
                        <DialogActions sx={{justifyContent: 'space-between'}}>
                            <Stack direction="row" gap={4} justifyContent='space-between'
                                   sx={{width: '100%', ml: '15px', mr: '15px', mb: '15px'}}>
                                <Button onClick={handleClose} variant="contained" color="success">
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" color="error"> Delete </Button>
                            </Stack>
                        </DialogActions>
                    </Dialog>
                </Box>
            );
        },
        renderToolbarInternalActions: ({table}) => {
            return (
                <Stack direction='row' sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <MRT_ToggleGlobalFilterButton table={table} style={{color: 'white'}} size='large'/>
                    <MRT_ShowHideColumnsButton table={table} style={{color: 'white'}} size='large'/>
                    <MRT_ToggleFiltersButton table={table} style={{color: 'white'}} size='large'/>
                    <MRT_ToggleDensePaddingButton table={table} style={{color: 'white'}} size='large'/>
                    <MRT_ToggleFullScreenButton table={table} style={{color: 'white'}} size='large'/>
                </Stack>
            );
        },
        mrtTheme: {
            baseBackgroundColor: '#304f61',
            // baseBackgroundColor: '#00264d',
            // selectedRowBackgroundColor: '#051e3b',
        },
        muiTableHeadCellProps: {
            sx: {
                color: '#21c6fc',
                fontSize: '1.32em',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
            },
            align: 'center',
        },
        muiTableBodyCellProps: {
            sx: {
                color: 'white',
                fontSize: '1.2em',
                '&:hover': {
                    color: '#fcc2fb',
                },
                padding: '2px 4px',
                alignItems: 'center',
            },
            align: 'center',
            
        },
        muiTableBodyRowProps: {
            sx: {
                height: '2px',
            },
        },
        muiSearchTextFieldProps: {
            InputLabelProps: {shrink: true},
            label: 'Search',
            placeholder: 'Site Details',
            variant: 'outlined',
            
        },
        muiFilterTextFieldProps: {
            color: 'error',
            borderColor: 'error',
        },
        muiPaginationProps: {
            shape: 'rounded',
            color: 'warning',
            variant: 'text',
            size: 'small',
            rowsPerPageOptions: [5, 10, 25, 50, 100, 150, 200, 250, 300, 500, 1000],
            // set the table to display the first 100 data by default
            rowsPerPage: 100,
        },
        paginationDisplayMode: 'pages',
        positionPagination: "both",
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 100
            },
            density: 'compact',
        }
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
    return (
        <>
            <Box sx={mainSection}>
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
                    <Typography variant='h5'>All Territorial Fuelling Report</Typography>
                </Paper>
                <br/><br/>
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
                    <ThemeProvider theme={tableTheme}>
                        <MaterialReactTable table={table}/>
                    </ThemeProvider>
                </Paper>
                <br/><br/>
                {/*</Card>*/}
                <Stack direction='row' spacing={5}>
                    <Link href="/dashboard/admin/reports/fuel">
                        <Button variant="contained" color='success' title='Back'> Back </Button>
                    </Link>
                </Stack>
            </Box>
        </>
    );
}



export default FuellingReport;