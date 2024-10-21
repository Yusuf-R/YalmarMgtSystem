'use client';
import Button from "@mui/material/Button";
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
import React, {useMemo, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {createTheme, ThemeProvider} from '@mui/material';
import {
    MaterialReactTable,
    MRT_ShowHideColumnsButton,
    MRT_ToggleDensePaddingButton,
    MRT_ToggleFiltersButton,
    MRT_ToggleFullScreenButton,
    MRT_ToggleGlobalFilterButton,
    useMaterialReactTable,
} from "material-react-table";
import Tooltip from "@mui/material/Tooltip";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import AdminUtilities from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import dayjs from "dayjs";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import useServiceReportStore from "@/store/useServiceReportStore";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";

function ReportRendering({allServicingReport}) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchRecord = () => router.push('/dashboard/admin/reports/servicing/search');
    const createNew = () => router.push('/dashboard/admin/reports/servicing/new');

    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');
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
        'location',
        'siteType',
        'shelterType',
        'pmInstance',
        'servicingDate',
        'nextServiceDate'
    ];
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // Function to handle the opening and closing of the drawer
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };
    // Function to capitalize the first letter of the key
    const capitalizeFirstLetter = (key) => {
        // if key not in our headerKeys array, it should skip that key
        if (!headerKeys.includes(key) || !key) {
            return '';
        }
        return key.charAt(0).toUpperCase() + key.slice(1);
    };
    const columnFields = allServicingReport.length > 0 ? Object.keys(allServicingReport[0]) : [];
    const columns = useMemo(() => columnFields.map((field) => ({
            accessorKey: field,
            header: capitalizeFirstLetter(field),
            sortable: true,
            size: 150,
            Cell: ({cell}) => {
                const value = cell.getValue();
                if (field === 'servicingDate' || field === 'nextServiceDate') {
                    return dayjs(value).format('DD/MMM/YYYY');
                }
                return value;
            },
        }))
            .filter((column) => column.header !== ''),
        []
    );
    const tableData = useMemo(
        () => allServicingReport.map((site) => {
            const row = {};
            columns.forEach((column) => {
                row[column.accessorKey] = site[column.accessorKey];
            });
            row._id = site._id; // Include _id in the row data
            return row;
        }),
        [columns, allServicingReport]
    );
    const setSelectedReport = useServiceReportStore((state) => state.setSelectedReport);
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
            const objData = allServicingReport.find((obj) => obj._id === objID);
            const [open, setOpen] = useState(false);
            const [email, setEmail] = useState('');
            const [emailError, setEmailError] = useState('');

            const mutation = useMutation({
                mutationKey: ["DeleteServicingReport"],
                mutationFn: AdminUtilities.DeleteServicingReport, // Adjust this to match your delete function
            });
            // encrypt the staffID and store it in the session storage using window.crypto.subtle
            // also ensure that the session storage is empty before setting the id in to the session storage
            const handleOpen = () => setOpen(true);
            const handleClose = () => {
                setOpen(false);
                setEmail('');
                setEmailError('');
            };
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
                    const obj = {email, selectedIds: [objID]};
                    // we also need to construct our cache key to see if this entry already exist
                    const month = dayjs(objData.servicingDate).format('MMMM');
                    const year = dayjs(objData.servicingDate).format('YYYY');

                    const data = {
                        siteType: objData.siteType,
                        location: objData.location,
                        pmInstance: objData.pmInstance,
                        siteId: objData.siteId,
                        cluster: objData.cluster,
                        state: objData.state,
                        year: year,
                        month: month,
                    };
                    const cacheKey = ["GetServicingReport", data];
                    const cachedData = queryClient.getQueryData(cacheKey);
                    mutation.mutate(obj, {
                        onSuccess: () => {
                            if (cachedData) {
                                queryClient.removeQueries({queryKey: cacheKey});
                            }
                            queryClient.invalidateQueries({queryKey: ["AllServicingReports"]});
                            toast.success('Service Record  deleted successfully');
                            setOpen(false);
                        },
                        onError: (error) => {
                            toast.error('Error deleting service record account');
                            console.error("Delete failed", error);
                            setOpen(false);
                        }
                    });
                }
            ;
            const handleViewRecord = () => {
                setSelectedReport(objData);
                router.push(`/dashboard/admin/reports/servicing/view`);
            }
            return (
                <>
                    <Stack direction='row'>
                        <Button onClick={handleViewRecord}>
                            <Tooltip title="View" arrow>
                                <LocalLibraryIcon sx={{color: '#E997F9', cursor: 'pointer'}}/>
                            </Tooltip>
                        </Button>
                        <Button>
                            <Tooltip title="Delete" arrow onClick={handleOpen}>
                                <DeleteIcon sx={{color: '#f7564a', cursor: 'pointer'}}/>
                            </Tooltip>
                        </Button>
                    </Stack>
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
                                                fontSize: '1.1em',
                                                fontStyle: 'Poppins',
                                                fontFamily: 'Poppins',

                                            }}>
                                    You are about to permanently delete the selected Service
                                    Record. <br/><br/>
                                    Enter your Email address to further confirm your actions.
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
                </>
            )
        },
        renderTopToolbarCustomActions: ({table}) => {
            const
                mutation = useMutation({
                    mutationKey: ["DeleteServicingReport"],
                    mutationFn: AdminUtils.DeleteServicingReport,
                });
            const [open, setOpen] = useState(false);
            const [email, setEmail] = useState('');
            const [emailError, setEmailError] = useState('');
            const
                handleClose = () => {
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
                // for each of the selected ids, we need to get the full object and then construct our key to clear the cache after deletion
                selectedIds.map((id) => {
                    const obj = allServicingReport.find((obj) => obj._id === id);
                    const month = dayjs(obj.servicingDate).format('MMMM');
                    const year = dayjs(obj.servicingDate).format('YYYY');
                    const data = {
                        siteType: obj.siteType,
                        location: obj.location,
                        pmInstance: obj.pmInstance,
                        siteId: obj.siteId,
                        cluster: obj.cluster,
                        state: obj.state,
                        year: year,
                        month: month,
                    };
                    const cacheKey = ["GetServicingReport", data];
                    const cachedData = queryClient.getQueryData(cacheKey);
                    if (cachedData) {
                        queryClient.removeQueries({queryKey: cacheKey});
                    }
                })

                mutation.mutate(obj, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ["AllServicingReport"]});
                        toast.success('Selected Sites Deleted Successfully');
                        handleClose();
                        router.refresh();
                    },
                    onError: (error) => {
                        toast.error('Error Deleting selected AllSite');
                        console.error("Delete failed", error);
                        handleClose();
                    }
                });
            };
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
                                            fontSize: '1.1em',
                                            fontStyle: 'Poppins',
                                            fontFamily: 'Poppins',
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
                                                fontStyle: 'Poppins',
                                                fontFamily: 'Poppins',

                                            }}>
                                    You are about to permanently delete one or more service record. <br/><br/>
                                    Enter your email address to further confirm your actions.
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
        renderEmptyRowsFallback: () => {
            return (
                <Stack direction='column' spacing={2} sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: 'white',
                    padding: '10px',
                }}>
                    <Typography variant='h6' sx={{fontWeight: 'bold', fontSize: '1.2rem'}}>
                        No PM Found.
                    </Typography>
                    <Typography variant='body1' sx={{fontSize: '1.0rem'}}>
                        There are no PM Records to display.
                    </Typography>
                </Stack>
            );
        },
        mrtTheme: {
            baseBackgroundColor: '#304f61',
            selectedRowBackgroundColor: '#051e3b',
        },
        muiTableHeadCellProps: {
            sx: {
                color: '#21c6fc',
                fontSize: xSmall || small || medium ? '14px' : '16px',
            },
            align: 'center',
        },
        muiTableBodyCellProps: {
            sx: {
                color: '#FFF',
                '&:hover': {
                    color: '#fcc2fb',
                },
                alignItems: 'center',
            },
            align: 'center',

        },
        muiTableBodyRowProps: {
            sx: {
                height: '2px',
                border: '2px solid red',
            },
        },
        muiSearchTextFieldProps: {
            InputLabelProps: {shrink: true},
            label: 'Search',
            placeholder: 'Search...',
            variant: 'outlined',
            color: 'success',
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
        },
        muiTableContainerProps: {
            sx: {
                borderRadius: '10px',
                padding: 0,
                margin: 0,
                overflow: 'auto',
                overflowX: 'auto',
                overflowY: 'auto',
                width: '100%',
                height: 'auto',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 1.5)',

            },
        },
        paginationDisplayMode: 'pages',
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 100
            },
            density: 'compact',

        }
    });
    return (
        <>
            <Box sx={{
                p: 0.1
            }}>
                <Stack direction='row' spacing={5}>
                    <Button size={xSmall || small || medium || large ? "small" : 'medium'}
                            color="secondary"
                            onClick={searchRecord}
                            variant="contained"
                            sx={{borderRadius: '20px'}}
                    >
                        Search:<SearchRoundedIcon/>
                    </Button>
                    <Button size={xSmall || small || medium || large ? "small" : 'medium'}
                            color="secondary"
                            onClick={createNew}
                            variant="contained"
                            sx={{borderRadius: '20px'}}
                    >
                        New +
                    </Button>
                </Stack>
                <br/>
                <ThemeProvider theme={tableTheme}>
                    <MaterialReactTable table={table}/>
                </ThemeProvider>
            </Box>
        </>
    )
}

export default ReportRendering;