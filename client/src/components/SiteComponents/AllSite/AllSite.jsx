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
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import React, {useMemo, useState, Suspense, useEffect} from "react";
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
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Drawer from "@mui/material/Drawer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminUtilities from "@/utils/AdminUtilities";
import useSiteStore from "@/store/useSiteStore";


function AllSite({allSite}) {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('/dashboard/admin/site/all');
    const [stateMain, setStateMain] = useState('');
    const [cluster, setClusterType] = useState('');
    const [status, setStatus] = useState('');
    const [siteType, setSiteType] = useState('');

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

    const {setEncryptedSiteData} = useSiteStore.getState();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // Function to handle the opening and closing of the drawer
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    useEffect(() => {
        if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/site/new');
        } else if (pathname.includes('all')) {
            setActiveTab('/dashboard/admin/site/all');
        } else {
            setActiveTab('/dashboard/admin/site');
        }
    }, [pathname]);

    const tableTheme = useMemo(
        () =>
            createTheme({
                components: {
                    MuiTableBody: {
                        styleOverrides: {
                            root: {
                                '& .MuiTableRow-root': {
                                    padding: 0,
                                },
                                '& .MuiTableCell-root': {
                                    padding: 0,
                                    fontSize: xSmall || small || medium ? '14px' : '16px',
                                },
                                '& .MuiTableBody-root': {
                                    padding: 0,
                                },
                            }
                        }
                    },
                    MuiSwitch: {
                        styleOverrides: {
                            thumb: {
                                color: '#ff8c00',
                            },
                        },
                    },
                    MuiFormControlLabel: {
                        styleOverrides: {
                            label: {
                                fontSize: '0.8rem',
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
                                fontSize: '12px'
                            },
                        },
                    },
                    MuiTableSortLabel: {
                        styleOverrides: {
                            icon: {
                                fontSize: '1.2rem',
                                backgroundColor: 'aqua',
                                color: '#FFF'
                            },
                        },
                    },
                    MuiSvgIcon: {
                        styleOverrides: {
                            root: {
                                color: 'aqua',
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
                                fontFamily: 'Poppins',
                                fontSize: '14px',
                            },
                        },
                    },
                },
            }),
        [xSmall, small, medium],
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
            const [open, setOpen] = useState(false);
            const [email, setEmail] = useState('');
            const [emailError, setEmailError] = useState('');
            const queryClient = useQueryClient();
            const router = useRouter();
            const mutation = useMutation({
                mutationKey: ["DeleteSite"],
                mutationFn: AdminUtilities.DeleteSite, // Adjust this to match your delete function
            });

            const handleOpen = () => setOpen(true);
            const handleClose = () => {
                setOpen(false);
                setEmail('');
                setEmailError('');
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


            // handle delete
            const handleDelete = async (event) => {
                event.preventDefault();
                const obj = {email, selectedIds: [siteID]};
                mutation.mutate(obj, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ["AllSite"]});
                        toast.success('Site deleted successfully');
                        setOpen(false);
                    },
                    onError: (error) => {
                        toast.error('Error deleting site');
                        console.error("Delete failed", error);
                        setOpen(false);
                    }
                });
            };

            // function to view site profile
            const viewSite = async () => {
                const encryptedSiteID = await AdminUtilities.encryptObjID(siteID);
                const siteData = allSite.find((site) => site._id === siteID);
                // encrypt the data and store it in the session storage
                const encryptedStaffData = await AdminUtilities.encryptData(siteData);
                // Set the encrypted data in Zustand store
                setEncryptedSiteData(encryptedStaffData, encryptedSiteID);
                router.push(`/dashboard/admin/site/view`);
            };
            // function to edit site profile
            const editSite = async () => {
                const encryptedSiteID = await AdminUtilities.encryptObjID(siteID);
                const siteData = allSite.find((site) => site._id === siteID);
                // encrypt the data and store it in the session storage
                const encryptedStaffData = await AdminUtilities.encryptData(siteData);
                // Set the encrypted data in Zustand store
                setEncryptedSiteData(encryptedStaffData, encryptedSiteID);
                router.push(`/dashboard/admin/site/edit`);
            };
            return (
                <>
                    <Stack direction='row' gap={0} justifyContent={'space-evenly'} alignItems={'center'} spacing={0}>
                        <Button onClick={viewSite}>
                            <Tooltip title="View" arrow>
                                <AccountCircleIcon size='small' fontSize="small"
                                                   sx={{color: '#E997F9', cursor: 'pointer'}}/>
                            </Tooltip>
                        </Button>
                        <Button onClick={editSite}>
                            <Tooltip title="Edit" arrow>
                                <EditIcon fontSize="small" sx={{color: '#4af7a7', cursor: 'pointer'}}/>
                            </Tooltip>
                        </Button>
                        <Button onClick={handleOpen}>
                            <Tooltip title="Delete" arrow>
                                <DeleteIcon fontSize="small" sx={{color: '#f7564a', cursor: 'pointer'}}/>
                            </Tooltip>
                        </Button>
                    </Stack>
                    {/*Delete Dialogue*/}
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            component: 'form',
                            onSubmit: handleDelete,
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
                                    You are about to permanently delete the selected Staff Accounts. <br/> Please enter
                                    your email address to confirm.
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
                                    type="submit"
                                    variant="contained"
                                    color="error"
                                    sx={{
                                        width: xSmall || small ? '100px' : medium || large ? '120px' : '150px',
                                        fontSize: xSmall || small ? '0.7em' : medium || large ? '0.85em' : '1em',
                                    }}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        </DialogActions>
                    </Dialog>
                </>
            )
        },
        renderTopToolbarCustomActions: ({table}) => {
            const mutation = useMutation({
                mutationKey: ["DeleteStaff"],
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
                        toast.success('Selected Site Deleted Successfully');
                        handleClose();
                    },
                    onError: (error) => {
                        toast.error('Error Deleting Site Accounts');
                        console.error("Delete failed", error);
                        handleClose();
                    }
                });
            };
            return (
                <Box sx={{display: 'flex', gap: '0.5rem', p: '1px'}}>
                    <Button
                        color="error"
                        disabled={!table.getIsSomeRowsSelected()}
                        onClick={handleOpen}
                        variant="contained"
                        size="small"
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
                                    You are about to permanently delete the selected Site, Please enter
                                    your
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
                        No Sites Found.
                    </Typography>
                    <Typography variant='body1' sx={{fontSize: '1.0rem'}}>
                        There are no Sites Records to display.
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
                padding: xSmall || small ? '5px' : medium || large ? '10px' : '20px',
                marginTop: '10px',

            }}>
                {/* Navigation Tabs */}
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
                        }}>
                        <Tab
                            label="Sitef"
                            value="/dashboard/admin/sitef" // Set the value prop for this Tab
                            component={Link}
                            href="/dashboard/admin/site"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="All"
                            value="/dashboard/admin/site/all" // Set the value prop for this Tab
                            component={Link}
                            href="/dashboard/admin/site/all"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="New +"
                            value="/dashboard/admin/site/new" // Set the value prop for this Tab
                            component={Link}
                            href="/dashboard/admin/site/new"
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
                <br/>
                <Stack direction='column' spacing={2}>
                    <Card sx={{
                        padding: '2px',
                        borderRadius: '10px',
                        backgroundColor: '#304f61',
                        color: 'white',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.32)',
                    }}>
                        <br/>
                        <ThemeProvider theme={tableTheme}>
                            <MaterialReactTable table={table}/>
                        </ThemeProvider>
                    </Card>
                    {/*</Card>*/}
                    <Stack direction='row'>
                        <Link href="/dashboard/admin/site">
                            <Button size={xSmall || small || medium || large ? "small" : 'medium'} variant="contained"
                                    color='success' title='Back'> Back </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
}


export default AllSite;