'use client';
import Box from "@mui/material/Box";
import {mainSection} from "@/utils/data";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, {useEffect, useMemo, useState} from "react";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import useIncidentStore from "@/store/useIncidentStore";
import dayjs from "dayjs";
import {
    MaterialReactTable,
    MRT_ShowHideColumnsButton,
    MRT_ToggleDensePaddingButton,
    MRT_ToggleFiltersButton,
    MRT_ToggleFullScreenButton,
    MRT_ToggleGlobalFilterButton,
    useMaterialReactTable
} from "material-react-table";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import AdminUtilities from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import {createTheme, ThemeProvider} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from 'xlsx';

function AllStaffIncident({staffIncidentData}) {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/incident/staff');
    const router = useRouter();
    const queryClient = useQueryClient();
    // Media Queries for responsiveness
    const isXSmall = useMediaQuery('(max-width:599.99px)');
    const isSmall = useMediaQuery('(min-width:600px) and (max-width:899.99px)');
    const isMedium = useMediaQuery('(min-width:900px) and (max-width:1199.99px)');
    const isLarge = useMediaQuery('(min-width:1200px)');

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

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [selectedRow, setSelectedRow] = useState(null); // To track the row being acted upon
    // Hook to reset store
    const resetStore = useIncidentStore((state) => state.resetStore);
    const {setViewStaffIncidentReport} = useIncidentStore();
    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.2rem',
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
        if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/reports/incident/new');
        } else if (pathname.includes('staff')) {
            setActiveTab('/dashboard/admin/reports/incident/staff');
        } else if (pathname.includes('site')) {
            setActiveTab('/dashboard/admin/reports/incident/site');
        } else if (pathname.includes('service')) {
            setActiveTab('/dashboard/admin/reports/incident/service');
        } else if (pathname.includes('fuel')) {
            setActiveTab('/dashboard/admin/reports/incident/fuel');
        } else if (pathname.includes('others')) {
            setActiveTab('/dashboard/admin/reports/incident/others');
        } else {
            setActiveTab('/dashboard/admin/reports/incident');
        }
    }, [pathname]);

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
                    MuiTableCell: {
                        styleOverrides: {
                            root: {
                                color: '#FFF',
                                fontSize: '1px',
                            },
                        },
                    },
                }
            }),
        [],
    );
    // Mutation outside renderRowActions
    const mutation = useMutation({
        mutationKey: ["DeleteIncidentReport"],
        mutationFn: AdminUtilities.DeleteIncidentReport,
    });

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(event.target.value)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEmail('');
        setEmailError('');
    };

    const handleDelete = async (event, objID) => {
        event.preventDefault();
        if (emailError || !email) {
            toast.error('Please enter a valid email address');
            return;
        }
        const obj = {email, selectedIds: [objID]};
        mutation.mutate(obj, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["AllIncidentReport"]});
                toast.success('Selected Report Deleted Successfully');
                resetStore();
                handleClose();
                window.location.reload();
            },
            onError: (error) => {
                toast.error('Error deleting service record account');
                console.error("Delete failed", error);
                handleClose();
            }
        });
    };

    const handleViewRecord = (objData) => {
        setViewStaffIncidentReport(objData);
        router.push('/dashboard/admin/reports/incident/staff/view');
    };

    useEffect(() => {
        if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/reports/incident/new');
        } else if (pathname.includes('staff')) {
            setActiveTab('/dashboard/admin/reports/incident/staff');
        } else if (pathname.includes('site')) {
            setActiveTab('/dashboard/admin/reports/incident/site');
        } else if (pathname.includes('service')) {
            setActiveTab('/dashboard/admin/reports/incident/service');
        } else if (pathname.includes('fuel')) {
            setActiveTab('/dashboard/admin/reports/incident/fuel');
        } else if (pathname.includes('others')) {
            setActiveTab('/dashboard/admin/reports/incident/others');
        } else {
            setActiveTab('/dashboard/admin/reports/incident');
        }
    }, [pathname]);


    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // Function to handle the opening and closing of the drawer
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const columns = useMemo(() => [
        {
            accessorKey: 'staffInfo.fullName',
            header: 'FullName',
            size: 500, //medium column
            Cell: ({row}) => row.original.staffInfo?.fullName || 'N/A',
        },
        {
            accessorKey: 'staffInfo.email',
            header: 'Email',
            size: 100, //medium column
            Cell: ({row}) => row.original.staffInfo?.email || 'N/A',
        },
        {
            accessorKey: 'staffInfo.role',
            header: 'Role',
            Cell: ({row}) => row.original.staffInfo?.role || 'N/A',
        },
        {
            accessorKey: 'staffIncidentInfo.classAction',
            header: 'Class Action',
        },
        {
            accessorKey: 'severity',
            header: 'Severity',
        },
        {
            accessorKey: 'incidentDate',
            header: 'Incident Date',
            Cell: ({cell}) => {
                return dayjs(cell.getValue()).format('DD/MMM/YYYY');
            },
        },
    ], []);

    // Memoize tableData to prevent unnecessary re-renders
    const tableData = useMemo(() => staffIncidentData || [], [staffIncidentData]);

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
            const objData = staffIncidentData.find((obj) => obj._id === objID);
            return (
                <>
                    <Stack direction='row'>
                        <Button onClick={() => handleViewRecord(objData)}>
                            <Tooltip title="View" arrow>
                                <LocalLibraryIcon sx={{color: '#E997F9', cursor: 'pointer'}}/>
                            </Tooltip>
                        </Button>
                        <Button onClick={handleOpen}>
                            <Tooltip title="Delete" arrow>
                                <DeleteIcon sx={{color: '#f7564a', cursor: 'pointer'}}/>
                            </Tooltip>
                        </Button>
                    </Stack>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            component: 'form',
                            onSubmit: (event) => handleDelete(event, objID),
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
                                                fontFamily: 'Poppins',
                                            }}>
                                    You are about to permanently delete the selected Service Record.
                                    <br/><br/>
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
            );
        },
        renderTopToolbarCustomActions: ({table}) => {
            const
                mutation = useMutation({
                    mutationKey: ["DeleteIncidentReport"],
                    mutationFn: AdminUtilities.DeleteIncidentReport, // Adjust this to match your delete function
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

                mutation.mutate(obj, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ["AllIncidentReport"]});
                        toast.success('Selected Report Deleted Successfully');
                        handleClose();
                        resetStore();
                        window.location.reload();
                    },
                    onError: (error) => {
                        toast.error('Error Deleting selected AllStaff');
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
                        Delete +
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
        mrtTheme: {
            // baseBackgroundColor: '#304f61',
            baseBackgroundColor: '#000428',
            // baseBackgroundColor: '#00264d',
            // selectedRowBackgroundColor: '#051e3b',
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
                'AllStaff Details',
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
        defaultColumn: {
            minSize: 10, //allow columns to get smaller than default
            size: 20, //make columns wider by default

        },
    });

    const [selectedMonth, setSelectedMonth] = useState('all');
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const categories = ['Employment', 'Roles', 'Violence', 'Others'];

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

    const filterReports = (data) => {
        return data.filter(report => {
            const reportDate = new Date(report.incidentDate);
            const reportMonth = months[reportDate.getMonth()];
            const reportYear = reportDate.getFullYear().toString();
            const reportCategory = report.staffIncidentInfo?.classAction;

            return (selectedMonth === 'all' || reportMonth === selectedMonth) &&
                (selectedYear === 'all' || reportYear === selectedYear) &&
                (selectedCategory === 'all' || reportCategory === selectedCategory);
        });
    };

    const exportToExcel = () => {
        const filteredData = filterReports(staffIncidentData);

        const workbookData = filteredData.map(report => ({
            // Base Incident Fields
            'Incident Date': new Date(report.incidentDate).toLocaleDateString(),
            'Admin Name': report.adminFullName || 'N/A',
            'Admin Email': report.adminEmail || 'N/A',
            'Admin Role': report.adminRole || 'N/A',
            'Severity': report.severity || 'N/A',
            'Report Category': Array.isArray(report.reportCategory) ? report.reportCategory.join(', ') : report.reportCategory || 'N/A',
            'Report Description': report.reportDescription || 'N/A',

            // Staff Information
            'Staff Name': report.staffInfo?.fullName || 'N/A',
            'Staff Email': report.staffInfo?.email || 'N/A',
            'Staff Role': report.staffInfo?.role || 'N/A',

            // Staff Incident Information
            'Class Action': report.staffIncidentInfo?.classAction || 'N/A',
            'Category Details': (() => {
                const info = report.staffIncidentInfo?.category;
                if (!info) return 'N/A';
                if (info.employment) return `Employment - ${info.employment}`;
                if (info.role) return `Role - ${info.role}`;
                if (info.violence) return `Violence - ${info.violence}`;
                if (info.others) return `Others - ${info.others}`;
                return 'N/A';
            })(),
        }));

        const ws = XLSX.utils.json_to_sheet(workbookData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Staff Incidents');

        // Generate filename with filters
        const filters = [];
        if (selectedMonth !== 'all') filters.push(selectedMonth);
        if (selectedYear !== 'all') filters.push(selectedYear);
        if (selectedCategory !== 'all') filters.push(selectedCategory);

        const filename = `staff_incidents${filters.length ? '_' + filters.join('_') : ''}_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, filename);
    };

    return (
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
                {['Incident-Center', 'Staff', 'Site', 'Service', 'Fuel', 'Others'].map((label) => (
                    <Tab
                        key={label}
                        label={label}
                        component={Link}
                        href={`/dashboard/admin/reports/incident${label === 'Incident-Center' ? '' : `/${label.toLowerCase()}`}`}
                        value={`/dashboard/admin/reports/incident${label === 'Incident-Center' ? '' : `/${label.toLowerCase()}`}`}
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
                    component={Link}
                    href="/dashboard/admin/reports/incident/new"
                    value="/dashboard/admin/reports/incident/new"
                    sx={{
                        color: "#FFF",
                        fontWeight: 'bold',
                        fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                        ":hover": {backgroundColor: 'rgb(51, 153, 51)'},
                        backgroundColor: '#ff4d4d',
                        borderRadius: 10,
                        p: 0,
                    }}
                />
            </Tabs>

            {/* Export Controls */}
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
                                <MenuItem value="all" sx={{
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#1a5570'
                                    }
                                }}>All Months</MenuItem>
                                {months.map(month => (
                                    <MenuItem key={month} sx={{
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
                                    <MenuItem key={year} sx={{
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
                            <InputLabel sx={{color: '#fff'}}>Category</InputLabel>
                            <Select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
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
                                }} value="all">All Categories</MenuItem>
                                {categories.map(category => (
                                    <MenuItem sx={{
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#1a5570'
                                        }
                                    }} key={category} value={category}>{category}</MenuItem>
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
                            Export to Excel
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
                Staff Incident Data
            </Typography>
            <br/>
            {/*Table Section to present an abstracted form of the table*/}
            <Paper elevation={5} sx={{
                alignCenter: 'center',
                textAlign: 'center',
                padding: '2px',
                background: 'linear-gradient(to right, #004e92, #000428)',
                color: '#46F0F9',
                borderRadius: '2px',
                width: '100%',
                height: 'auto',
            }}>
                <ThemeProvider theme={tableTheme}>
                    <MaterialReactTable table={table}/>
                </ThemeProvider>
            </Paper>

        </Box>
    )
}

export default AllStaffIncident;