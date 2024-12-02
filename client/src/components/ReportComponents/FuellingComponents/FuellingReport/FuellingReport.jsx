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
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import React, {useEffect, useMemo, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {createTheme, ThemeProvider} from '@mui/material';
import {
    MaterialReactTable,
    MRT_ShowHideColumnsButton,
    MRT_ToggleDensePaddingButton,
    MRT_ToggleFiltersButton,
    MRT_ToggleGlobalFilterButton,
    useMaterialReactTable,
} from "material-react-table";
import Tooltip from "@mui/material/Tooltip";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import AdminUtilities from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import useFuelReportStore from "@/store/useFuelReportStore";
import {saveAs} from 'file-saver';
import * as XLSX from 'xlsx';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

function FuellingReport({allFuelReport}) {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/fuel/all');

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

    // Inside your component:
    const setEncryptedFuelData = useFuelReportStore(state => state.setEncryptedFuelData);

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

    const isSmallScreen = xSmall || small || medium || large;

    const [selectedMonth, setSelectedMonth] = useState('all');
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedCluster, setSelectedCluster] = useState('all');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const clusters = ['BIRNIN-GWARI', 'KADUNA-CENTRAL', 'ZARIA', 'KACHIA'];

// Generate years array with future years
    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const startYear = 2023; // Base year
        const futureYears = 0; // Number of future years to include

        // Calculate total years to include
        const totalYears = (currentYear - startYear) + futureYears + 1;

        return Array.from({length: totalYears}, (_, i) => {
            return currentYear + futureYears - i;
        }).sort((a, b) => b - a); // Sort in descending order
    }, []);

    const filterReports = (reports) => {
        return reports.filter(report => {
            const [day, monthStr, yearStr] = report.dateSupplied.split('/');
            const reportMonth = months[new Date(`${monthStr} 1, 2000`).getMonth()];
            const reportYear = yearStr;

            const monthMatch = selectedMonth === 'all' || reportMonth === selectedMonth;
            const yearMatch = selectedYear === 'all' || reportYear === selectedYear;
            const clusterMatch = selectedCluster === 'all' || report.cluster === selectedCluster;

            return monthMatch && yearMatch && clusterMatch;
        });
    };

    useEffect(() => {
        if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/reports/fuel/new');
        } else if (pathname.includes('all')) {
            setActiveTab('/dashboard/admin/reports/fuel/all');
        } else {
            setActiveTab('/dashboard/admin/reports');
        }
    }, [pathname]);

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
                                fontFamily: 'Poppins',
                                fontSize: '14px',
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
            size: 250,
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
        fontSize: '16px',
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
        enableColumnActions: true,
        enableRowNumbers: true,
        rowNumberDisplayMode: "original",
        enableRowExpand: true,
        enableMultiRowSelection: true,
        enableGlobalFilter: true,
        enableGrouping: true,
        enableColumnDragging: true,
        enableEditing: true,
        enableClickToCopy: true,
        enableColumnReordering: true,
        positionActionsColumn: 'first',
        renderRowActions: ({row}) => {
            const objID = row.original._id;
            const [dialogDelete, setDialogDelete] = useState(false);
            const [email, setEmail] = useState('');
            const [emailError, setEmailError] = useState('');
            const queryClient = useQueryClient();
            const router = useRouter();

            // Open and close delete dialogue
            const OpenDeleteDialogue = () => {
                setDialogDelete(true)
            }

            // Close delete dialogue
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


            // function to view fuel report
            const viewFuelReport = async () => {
                const encryptedFuelID = await AdminUtilities.encryptObjID(objID);
                const fuelData = allFuelReport.find((site) => site._id === objID);
                // encrypt the data and store it in the session storage
                const encryptedFuelData = await AdminUtilities.encryptData(fuelData);
                // Set the encrypted data in Zustand store
                setEncryptedFuelData(encryptedFuelData, encryptedFuelID);
                router.push(`/dashboard/admin/reports/fuel/view`);
            };

            // function to edit fuel report
            const editFuelReport = async () => {
                const encryptedFuelID = await AdminUtilities.encryptObjID(objID);
                const fuelData = allFuelReport.find((site) => site._id === objID);
                // encrypt the data and store it in the session storage
                const encryptedFuelData = await AdminUtilities.encryptData(fuelData);
                // Set the encrypted data in Zustand store
                setEncryptedFuelData(encryptedFuelData, encryptedFuelID);
                router.push(`/dashboard/admin/reports/fuel/edit`);
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
                        <Button onClick={viewFuelReport}>
                            <Tooltip title="View" arrow>
                                <LocalLibraryIcon sx={{color: '#E997F9', cursor: 'pointer'}}/>
                            </Tooltip>
                        </Button>
                        <Button onClick={editFuelReport}>
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
                        toast.error('Error Deleting selected AllSite');
                        console.error("Delete failed", error);
                        handleClose();
                    }
                });
            };
            // provide Xcel format for download

            return (
                <Box sx={{display: 'flex', gap: '1rem', p: '4px'}}>
                    <Button
                        color="error"
                        disabled={!table.getIsSomeRowsSelected()}
                        onClick={handleOpen}
                        variant="contained"
                    >
                        Delete
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
                                    You are about to permanently delete the selected fuel report, Please enter your
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
                <>
                    {/* For larger screens, show the action buttons inline */}
                    {large || xLarge || xxLarge || wide || xWide || ultraWide ? (
                        <Stack direction="row" sx={{justifyContent: 'space-evenly', alignItems: 'center'}}>
                            <MRT_ToggleGlobalFilterButton table={table} style={{color: 'white'}} size='small'/>
                            <MRT_ShowHideColumnsButton table={table} style={{color: 'white'}} size='small'/>
                            <MRT_ToggleFiltersButton table={table} style={{color: 'white'}} size='small'/>
                            <MRT_ToggleDensePaddingButton table={table} style={{color: 'white'}} size='small'/>
                        </Stack>
                    ) : (
                        <>
                            {/* For smaller screens, show a settings icon that opens a drawer */}
                            <IconButton onClick={toggleDrawer(true)}>
                                <Tooltip title="Actions" arrow>
                                    <SettingsIcon sx={{color: 'white'}}/>
                                </Tooltip>
                            </IconButton>
                            {/* Drawer for smaller screens */}
                            <Drawer
                                anchor="right"
                                open={isDrawerOpen}
                                onClose={toggleDrawer(false)}
                            >
                                <Stack sx={{
                                    borderRadius: '10px',
                                    background: "#000000",
                                    height: '100vh',
                                }}>
                                    <IconButton onClick={toggleDrawer(false)} sx={{alignSelf: 'flex-end'}}>
                                        <CloseIcon/>
                                    </IconButton>
                                    <MRT_ToggleGlobalFilterButton table={table} style={{color: 'black'}} size='medium'/>
                                    <MRT_ShowHideColumnsButton table={table} style={{color: 'black'}} size='medium'/>
                                    <MRT_ToggleFiltersButton table={table} style={{color: 'black'}} size='medium'/>
                                    <MRT_ToggleDensePaddingButton table={table} style={{color: 'black'}} size='medium'/>
                                </Stack>
                            </Drawer>
                        </>
                    )}
                </>
            )
        },
        mrtTheme: {
            baseBackgroundColor: '#000428',
        },
        muiTableHeadCellProps: {
            sx: {
                color: '#21c6fc',
                fontSize:
                    '1.32em',
                fontWeight:
                    'bold',
                fontFamily:
                    'sans-serif',
            }
            ,
            align: 'center',
        },
        muiTableBodyCellProps: {
            sx: {
                color: 'white',
                fontSize:
                    '1.2em',
                '&:hover':
                    {
                        color: '#fcc2fb',
                    }
                ,
                padding: '2px 4px',
                alignItems:
                    'center',
            }
            ,
            align: 'center',

        },
        muiTableBodyRowProps: {
            sx: {
                height: '2px',
            }
            ,
        },
        muiSearchTextFieldProps: {
            InputLabelProps: {
                shrink: true
            }
            ,
            label: 'Search',
            placeholder:
                'AllSite Details',
            variant:
                'outlined',

        },
        muiFilterTextFieldProps: {
            color: 'error',
            borderColor:
                'error',
        },
        muiPaginationProps: {
            shape: 'rounded',
            color:
                'warning',
            variant:
                'text',
            size:
                'small',
            rowsPerPageOptions:
                [5, 10, 25, 50, 100, 150, 200, 250, 300, 500, 1000],
            // set the table to display the first 100 data by default
            rowsPerPage:
                100,
        },
        paginationDisplayMode: 'pages',
        positionPagination: "bottom",
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize:
                    100
            }
            ,
            density: 'compact',
        },
    });

    const exportToExcel = () => {
        const filteredData = filterReports(allFuelReport);

        const workbookData = filteredData.map(report => ({
            // Site Information
            'Site ID': report.site_id || 'N/A',
            'Site Code': report.siteId || 'N/A',
            'State': report.state || 'N/A',
            'Cluster': report.cluster || 'N/A',
            'Location': report.location || 'N/A',
            'Site Type': report.type || 'N/A',

            // Fuel Quantities
            'Initial Quantity': report.qtyInitial || 'N/A',
            'Supplied Quantity': report.qtySupplied || 'N/A',
            'New Quantity': report.qtyNew || 'N/A',

            // Dates and Duration
            'Date Supplied': report.dateSupplied || 'N/A',
            'Next Due Date': report.nextDueDate || 'N/A',
            'Duration (Days)': report.duration || 'N/A',
            'Consumption Per Day': report.cpd || 'N/A',

            // Metadata
            'Created At': report.createdAt ? new Date(report.createdAt).toLocaleString() : 'N/A',
            'Updated At': report.updatedAt ? new Date(report.updatedAt).toLocaleString() : 'N/A'
        }));

        const ws = XLSX.utils.json_to_sheet(workbookData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Fuelling Reports');

        // Generate filename based on filters
        const monthStr = selectedMonth === 'all' ? 'All-Months' : selectedMonth;
        const yearStr = selectedYear === 'all' ? 'All-Years' : selectedYear;
        const clusterStr = selectedCluster === 'all' ? 'All-Clusters' : selectedCluster;
        const filename = `Fuelling-Report-${monthStr}-${yearStr}-${clusterStr}.xlsx`;

        const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"});
        const blob = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        saveAs(blob, filename);
    };
    return (
        <>
            <Box sx={{padding: {xs: '10px', sm: '15px', md: '20px'}, marginTop: '10px'}}>
                <Tabs
                    value={activeTab}
                    onChange={(e, newValue) => setActiveTab(newValue)}
                    variant={isXSmall ? "scrollable" : "standard"}
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTabs-indicator': {backgroundColor: '#46F0F9'},
                        marginBottom: 3
                    }}
                >
                    <Tab
                        label="Report-Central"
                        component={Link}
                        href="/dashboard/admin/reports"
                        value="/dashboard/admin/reports"
                        sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            "&.Mui-selected": {
                                color: "#46F0F9",
                            },
                        }}
                    />
                    <Tab
                        label="All"
                        component={Link}
                        href="/dashboard/admin/reports/fuel/all"
                        value="/dashboard/admin/reports/fuel/all"
                        sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            "&.Mui-selected": {
                                color: "#46F0F9",
                            },
                        }}
                    />
                    <Tab
                        label="New +"
                        component={Link}
                        href="/dashboard/admin/reports/fuel/new"
                        value="/dashboard/admin/reports/fuel/new"
                        sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            "&.Mui-selected": {
                                color: "#46F0F9",
                            },
                        }}
                    />
                </Tabs>
                <Paper sx={{p: 2, mb: 2, backgroundColor: '#304f61'}}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel sx={{color: '#fff'}}>Month</InputLabel>
                                <Select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 300,
                                                backgroundColor: '#134357',
                                            }
                                        },
                                    }}
                                    sx={{
                                        backgroundColor: '#134357',
                                        color: 'white',
                                        overflow: 'auto',
                                    }}
                                    variant='filled'
                                >
                                    <MenuItem sx={{
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#1a5570'
                                        }
                                    }} value="all">All Months</MenuItem>
                                    {months.map(month => (
                                        <MenuItem sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1a5570'
                                            }
                                        }} key={month} sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1a5570'
                                            }
                                        }} value={month}>{month}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel sx={{color: '#fff'}}>Year</InputLabel>
                                <Select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 300,
                                                backgroundColor: '#134357',
                                            }
                                        },
                                    }}
                                    sx={{
                                        backgroundColor: '#134357',
                                        color: 'white',
                                        overflow: 'auto',
                                    }}
                                    variant='filled'
                                >
                                    <MenuItem sx={{
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#1a5570'
                                        }
                                    }} value="all">All Years</MenuItem>
                                    {years.map(year => (
                                        <MenuItem sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1a5570'
                                            }
                                        }} key={year} sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1a5570'
                                            }
                                        }} value={year.toString()}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel sx={{color: '#fff'}}>Cluster</InputLabel>
                                <Select
                                    value={selectedCluster}
                                    onChange={(e) => setSelectedCluster(e.target.value)}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 300,
                                                backgroundColor: '#134357',
                                            }
                                        },
                                    }}
                                    sx={{
                                        backgroundColor: '#134357',
                                        color: 'white',
                                        overflow: 'auto',
                                    }}
                                    variant='filled'>
                                    <MenuItem sx={{
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#1a5570'
                                        }
                                    }} value="all">All Clusters</MenuItem>
                                    {clusters.map(cluster => (
                                        <MenuItem sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1a5570'
                                            }
                                        }} key={cluster} sx={{
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1a5570'
                                            }
                                        }} value={cluster}>{cluster}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button
                                onClick={exportToExcel}
                                startIcon={<FileDownloadIcon/>}
                                variant="contained"
                                fullWidth
                            >
                                Excel
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
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
                    Fuel Report
                </Typography>
                <br/>
                {/*Table Section to present an abstracted form of the table*/}
                <ThemeProvider theme={tableTheme}>
                    <MaterialReactTable table={table}/>
                </ThemeProvider>
            </Box>
        </>
    );
}

export default FuellingReport;
