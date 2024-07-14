'use client';
import Button from "@mui/material/Button";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
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
import React, {useMemo, useState, Suspense} from "react";
import Typography from "@mui/material/Typography";
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
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import Modal from '@mui/material/Modal';
import InputAdornment from "@mui/material/InputAdornment";
import MapIcon from "@mui/icons-material/Map";
import Grid from "@mui/material/Grid";
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import CellTowerIcon from '@mui/icons-material/CellTower';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import FormControl from "@mui/material/FormControl";
import {Controller, useForm} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    mainSection,
    sitesData, siteStates, siteStatus, type,
} from "@/utils/data";
import {newSiteSchema} from "@/SchemaValidator/newSiteSchema";


function Site({allSite}) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('/dashboard/admin/staff/new');
    const [stateMain, setStateMain] = useState('');
    const [cluster, setClusterType] = useState('');
    const [status, setStatus] = useState('');
    const [siteType, setSiteType] = useState('');
    
    
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
        'location'
    ];
    // Function to capitalize the first letter of the key
    const capitalizeFirstLetter = (key) => {
        // if key not in our headerKeys array, it should skip that key
        if (!headerKeys.includes(key) || !key) {
            return '';
        }
        return key.charAt(0).toUpperCase() + key.slice(1);
    };
    const columnFields = allSite.length > 0 ? Object.keys(allSite[0]) : [];
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
        () => allSite.map((site) => {
            const row = {};
            columns.forEach((column) => {
                row[column.accessorKey] = site[column.accessorKey];
            });
            row._id = site._id; // Include _id in the row data
            return row;
        }),
        [columns, allSite]
    );
    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
        fontSize: '1.0em',
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
            const siteID = row.original._id;
            const siteData = allSite.find((site) => site._id === siteID);
            const [open, setOpen] = useState(false);
            const [dialogueDelete, setDialogueDelete] = useState(false);
            const [modalEditOpen, setModalEditOpen] = useState(false);
            const [modalViewOpen, setModalViewOpen] = useState(false);
            const [curSiteStatus, setCurrSiteStatus] = useState(siteData.status);
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
            const modalStyle = {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)', // Add box shadow4,
            };
            const {
                control, handleSubmit, formState: {errors}, setError, reset
            } = useForm({
                mode: "onTouched",
                resolver: yupResolver(newSiteSchema),
                reValidateMode: "onChange",
            });
            
            // set state
            const getState = () => {
                return siteStates.map((stateName) => (
                    <MenuItem key={stateName} value={stateName}
                              sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{stateName}</MenuItem>
                ));
            }
            const handleState = (event) => {
                // prevent default action of submitting the form
                event.preventDefault();
                setStateMain(event.target.value);
                // Clear the cluster selection when a new state is selected
            }
            
            // set cluster
            const getCluster = () => {
                return Object.keys(sitesData).map((clusterName) => (
                    <MenuItem key={clusterName} value={clusterName}
                              sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                        {clusterName}
                    </MenuItem>
                ));
            }
            const handleCluster = (event) => {
                event.preventDefault();
                setClusterType(event.target.value);
            }
            
            // set Type
            const getType = () => {
                return type.map((types) => (
                    <MenuItem key={types} value={types}
                              sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{types}</MenuItem>
                ));
            }
            const handleType = (event) => {
                event.preventDefault();
                setSiteType(event.target.value);
            }
            
            // set status
            const getStatus = () => {
                return siteStatus.map((status) => (
                    <MenuItem key={status} value={status}
                              sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>{status}</MenuItem>
                ));
            }
            const handleStatus = (event) => {
                event.preventDefault();
                setStatus(event.target.value);
                setCurrSiteStatus(event.target.value);
            }
            
            
            if (Object.keys(errors).length > 0) {
                console.log({errors});
            }
            
            const Clear = () => {
                // clear all the content of the fields of the box components
                reset();
            }
            
            const handleModalViewOpen = () => setModalViewOpen(true);
            const handleModalViewClose = () => setModalViewOpen(false);
            
            const handleModalEditOpen = () => setModalEditOpen(true)
            const handleModalEditClose = () => setModalEditOpen(false)
            
            const OpenDeleteDialogue = () => setDialogueDelete(true)
            const CloseDeleteDialogue = () => setDialogueDelete(false)
            
            
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
            // Update Mutation instance
            const mutationUpdate = useMutation({
                mutationKey: ["UpdateSite"],
                mutationFn: AdminUtils.UpdateSite,
            });
            
            // delete Mutation instance
            const mutationDelete = useMutation({
                mutationKey: ["UpdateSite"],
                mutationFn: AdminUtils.DeleteSite,
            });
            
            // handle delete
            const handleDelete = async (event) => {
                event.preventDefault();
                const obj = {email, selectedIds: [siteID]};
                mutationDelete.mutate(obj, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ["AllSite"]});
                        toast.success('Site deleted successfully');
                        CloseDeleteDialogue();
                    },
                    onError: (error) => {
                        toast.error('Error deleting site');
                        console.error("Delete failed", error);
                    }
                });
            };
            
            // handle save edited data
            const submitUpdate = async (data) => {
                await newSiteSchema.validate(data, {abortEarly: false});
                console.log("Validation passed!"); // Check if validation passes
                data._id = siteData._id;
                mutationUpdate.mutate(data, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ["AllSite"]});
                        toast.success('Site updated successfully');
                        handleModalEditClose();
                    },
                    onError: (error) => {
                        toast.error('Error updating staff account');
                        console.error("Update failed", error);
                    }
                });
            };
            // render color base on adminSelection
            const getAdminActionBackgroundColor = () => {
                switch (curSiteStatus) {
                    case 'Active':
                        return 'green';
                    case 'Inactive':
                        return 'red';
                    case 'Deactivated':
                        return 'rgb(204, 153, 0)';
                    default:
                        return '#274e61';
                }
            };
            //
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
                           noValidate
                    >
                        <Button onClick={handleModalViewOpen}>
                            <Tooltip title="View" arrow>
                                <LocalLibraryIcon sx={{color: '#E997F9', cursor: 'pointer'}}/>
                            </Tooltip>
                        </Button>
                        <Button onClick={handleModalEditOpen}>
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
                    {/*Delete Dialogue*/}
                    <Dialog open={dialogueDelete} onClose={CloseDeleteDialogue} PaperProps={{
                        component: 'form',
                        onSubmit: handleDelete,
                        sx: {
                            backgroundColor: '#0E1E1E'
                        },
                    }}>
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
                                <Button onClick={CloseDeleteDialogue} variant="contained"
                                        color="success">Cancel</Button>
                                <Button type="submit" variant="contained" color="error"> Delete </Button>
                            </Stack>
                        </DialogActions>
                    </Dialog>
                    {/*View Modal*/}
                    <Modal open={modalViewOpen} sx={modalStyle} onClose={handleModalViewClose} noValidate>
                        <Paper sx={paperProps}>
                            <Stack direction="column" gap={2}>
                                {/*    house the image and the image preview of the crop*/}
                                <Paper sx={paperProps}>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12}>
                                            <Paper elevation={5} sx={{
                                                alignCenter: 'center',
                                                textAlign: 'center',
                                                padding: '10px',
                                                border: '1px solid #4D4B4B',
                                                backgroundColor: '#274e61',
                                                color: '#46F0F9',
                                                borderRadius: '10px',
                                                width: '`100%',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 1.5)',
                                            }}>
                                                <Typography variant='h6' align="left">Site Info</Typography>
                                                <br/>
                                                {/*Column 1 : Personal Info Row*/}
                                                <Stack direction='row' spacing={10}>
                                                    {/* Column 1 : Email: DOB: Phone: Country */}
                                                    <Stack direction='column' spacing={2}>
                                                        {/*sitId*/}
                                                        <Stack direction='row' spacing={2}>
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
                                                        </Stack>
                                                        <br/>
                                                        {/*DOB*/}
                                                        <Stack direction='row' spacing={2}>
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
                                                        </Stack>
                                                        <br/>
                                                        {/*Phone*/}
                                                        <Stack direction='row' spacing={2}>
                                                            <TextField
                                                                id="input-with-icon-textfield"
                                                                defaultValue={siteData.status}
                                                                label="Site Status"
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
                                                                            {siteData.status === 'Active' ?
                                                                                <SignalWifiStatusbar4BarIcon
                                                                                    sx={{color: '#FFF'}}/> :
                                                                                siteData.status === 'Inactive' ?
                                                                                    <SignalWifiStatusbarConnectedNoInternet4Icon
                                                                                        sx={{color: '#FFF'}}/> :
                                                                                    <CloseIcon sx={{color: '#FFF'}}/>
                                                                            }
                                                                        
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
                                                        </Stack>
                                                        <br/>
                                                    </Stack>
                                                    {/*Column 2 : Country: StateOfOrigin: LGA: Gender */}
                                                    <Stack direction='column' spacing={2}>
                                                        {/*StateOfOrigin*/}
                                                        <Stack direction='row' spacing={2}>
                                                            <TextField
                                                                id="input-with-icon-textfield"
                                                                defaultValue={siteData.state}
                                                                label="State"
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
                                                                            <OnlinePredictionIcon sx={{color: '#FFF'}}/>
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
                                                        </Stack>
                                                        <br/>
                                                        {/*LGA*/}
                                                        <Stack direction='row' spacing={2}>
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
                                                        </Stack>
                                                        <br/>
                                                        <Stack direction='row' spacing={2}>
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
                                                        </Stack>
                                                        <br/>
                                                    </Stack>
                                                    {/*Column 3 : Phone: Religion: maritalStatus */}
                                                    <Stack direction='column' spacing={2}>
                                                        <Stack direction='row' spacing={2}>
                                                            <TextField
                                                                id="input-with-icon-textfield"
                                                                defaultValue={siteData.longitude || 0.00}
                                                                label="Longitude"
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
                                                                            <SwapVerticalCircleIcon
                                                                                sx={{color: '#FFF'}}/>
                                                                        </InputAdornment>
                                                                    ),
                                                                    readOnly: true,
                                                                    sx: {
                                                                        color: "#46F0F9",
                                                                        fontSize: '18px',
                                                                        width: '70%',
                                                                    },
                                                                }}
                                                                variant="filled"
                                                            />
                                                        </Stack>
                                                        <br/>
                                                        <Stack direction='row' spacing={2}>
                                                            <TextField
                                                                id="input-with-icon-textfield"
                                                                defaultValue={siteData.latitude || 0.00}
                                                                label="Site Latitude"
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
                                                                            <SwapVerticalCircleIcon
                                                                                sx={{color: '#FFF'}}/>
                                                                        </InputAdornment>
                                                                    ),
                                                                    readOnly: true,
                                                                    sx: {
                                                                        color: "#46F0F9",
                                                                        fontSize: '18px',
                                                                        width: '70%',
                                                                    },
                                                                }}
                                                                variant="filled"
                                                            />
                                                        </Stack>
                                                        <br/>
                                                    </Stack>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                {/*button for close*/}
                                <Stack direction="row" justifyContent="flex-end">
                                    <Button color="success" onClick={handleModalViewClose} variant="contained">
                                        Close
                                    </Button>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Modal>
                    {/*Edit Modal*/}
                    <Modal open={modalEditOpen} sx={modalStyle} onClose={handleModalEditClose} noValidate>
                        <Paper elevation={5} sx={{
                            alignCenter: 'center',
                            textAlign: 'center',
                            padding: '70px',
                            backgroundColor: '#274e61',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                        }}>
                            <Box
                                component='form'
                                onSubmit={handleSubmit(submitUpdate)}
                                noValidate
                            >
                                <Grid container spacing={4}>
                                    <Paper elevation={5} sx={{
                                        alignContent: 'start',
                                        padding: '30px',
                                        backgroundColor: 'inherit',
                                        color: '#46F0F9',
                                        borderRadius: '10px',
                                        width: '100%',
                                        height: 'auto',
                                    }}>
                                        <Grid container spacing={5}>
                                            <Grid item xs={12}>
                                                <Typography variant="h6" component="h6" sx={{color: '#FFF'}}
                                                            align="left">Site
                                                    Info</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="siteId"
                                                    control={control}
                                                    defaultValue={siteData.siteId}
                                                    render={({field}) => (
                                                        <FormControl fullWidth>
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
                                                                label="Site ID"
                                                                variant="outlined"
                                                                error={!!errors.siteId}
                                                                helperText={errors.siteId ? errors.siteId.message : ''}
                                                                required
                                                            />
                                                        </FormControl>
                                                    )}
                                                />
                                            
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="type"
                                                    control={control}
                                                    defaultValue={siteData.type}
                                                    render={({field}) => (
                                                        <FormControl fullWidth>
                                                            <TextField
                                                                {...field}
                                                                select
                                                                value={field.value}
                                                                onChange={(e) => {
                                                                    field.onChange(e);
                                                                    handleType(e);
                                                                }}
                                                                required
                                                                label="Site Type"
                                                                error={!!errors.type}
                                                                helperText={errors.type ? (
                                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.type.message}
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
                                                                {siteType !== '' && (
                                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                        Select Site Type
                                                                    </MenuItem>
                                                                )}
                                                                {getType()}
                                                            </TextField>
                                                        </FormControl>
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}></Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="state"
                                                    control={control}
                                                    defaultValue={siteData.state}
                                                    render={({field}) => (
                                                        <FormControl fullWidth>
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
                                                                {stateMain !== '' && (
                                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                        Select State
                                                                    </MenuItem>
                                                                )}
                                                                {getState()}
                                                            </TextField>
                                                        </FormControl>
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="cluster"
                                                    control={control}
                                                    defaultValue={siteData.cluster}
                                                    render={({field}) => (
                                                        <FormControl fullWidth>
                                                            <TextField
                                                                {...field}
                                                                select
                                                                value={field.value}
                                                                onChange={(e) => {
                                                                    field.onChange(e);
                                                                    handleCluster(e);
                                                                }}
                                                                label="Cluster"
                                                                required
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
                                                                {cluster !== '' && (
                                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                        Select Cluster
                                                                    </MenuItem>
                                                                )}
                                                                {getCluster()}
                                                            </TextField>
                                                        </FormControl>
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="status"
                                                    control={control}
                                                    defaultValue={siteData.status}
                                                    render={({field}) => (
                                                        <FormControl fullWidth>
                                                            <TextField
                                                                {...field}
                                                                select
                                                                value={field.value}
                                                                onChange={(e) => {
                                                                    field.onChange(e);
                                                                    handleStatus(e);
                                                                }}
                                                                required
                                                                label="Site Status"
                                                                error={!!errors.status}
                                                                helperText={errors.status ? (
                                                                    <span style={{color: "#fc8947"}}>
                                                                                {errors.type.message}
                                                                                </span>
                                                                ) : ''}
                                                                InputProps={{
                                                                    sx: {
                                                                        ...txProps,
                                                                        bgcolor: getAdminActionBackgroundColor() || 'salmon',
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
                                                                {status !== '' && (
                                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                        Select Site Type
                                                                    </MenuItem>
                                                                )}
                                                                {getStatus()}
                                                            </TextField>
                                                        </FormControl>
                                                    )}
                                                />
                                            </Grid>
                                            {/* Location Info*/}
                                            <Grid item xs={12}>
                                                <Typography variant="h6" component="h6" color="white" align="left">Site
                                                    Location</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="longitude"
                                                    control={control}
                                                    defaultValue={siteData.longitude || 0.00}
                                                    render={({field}) => (
                                                        <FormControl fullWidth>
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
                                                                label="Longitude"
                                                                variant="outlined"
                                                                error={!!errors.longitude}
                                                                helperText={errors.longitude ? errors.longitude.message : ''}
                                                                type="number"
                                                            />
                                                        </FormControl>
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="latitude"
                                                    control={control}
                                                    defaultValue={siteData.latitude || 0.00}
                                                    render={({field}) => (
                                                        <FormControl fullwidth>
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
                                                                label="Latitude"
                                                                error={!!errors.latitude}
                                                                helperText={errors.latitude ? errors.latitude.message : ''}
                                                                variant="outlined"
                                                                type="number"
                                                            />
                                                        </FormControl>
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Controller
                                                    name="location"
                                                    control={control}
                                                    defaultValue={siteData.location ? siteData.location : ''}
                                                    render={({field}) => (
                                                        <FormControl fullWidth>
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
                                                                label="Site Location"
                                                                variant="outlined"
                                                                error={!!errors.location}
                                                                helperText={errors.location ? errors.location.message : ''}
                                                                multiline
                                                            />
                                                        </FormControl>
                                                    )}
                                                />
                                            
                                            </Grid>
                                        </Grid>
                                        <br/><br/><br/>
                                        <Stack
                                            direction="row"
                                            justifyContent="flex-end"
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleModalEditClose}
                                            >
                                                Cancel
                                            </Button>
                                            
                                            <Button
                                                variant="contained"
                                                color="success"
                                                type='submit'
                                                title='Submit'
                                            >
                                                Update
                                            </Button>
                                        </Stack>
                                    </Paper>
                                
                                </Grid>
                            </Box>
                        </Paper>
                    </Modal>
                </>
            )
        },
        renderTopToolbarCustomActions: ({table}) => {
            const mutation = useMutation({
                mutationKey: ["DeleteSite"],
                mutationFn: AdminUtils.DeleteSite,
            });
            const queryClient = useQueryClient();
            const createNew = () => router.push('/dashboard/admin/site/new');
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
                        queryClient.invalidateQueries({queryKey: ["AllSite"]});
                        toast.success('Selected Sites Deleted Successfully');
                        // reload the page
                        handleClose();
                        router.refresh();
                        
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
                        Create New Site +
                    </Button>
                    <Button
                        color="error"
                        disabled={!table.getIsSomeRowsSelected()}
                        onClick={handleOpen}
                        variant="contained"
                    >
                        Delete Selected Site
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
                    <Typography variant='h5'>Site Management Center</Typography>
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
                    <Link href="/dashboard/admin/site">
                        <Button variant="contained" color='success' title='Back'> Back </Button>
                    </Link>
                </Stack>
            </Box>
        </>
    );
}



export default Site;