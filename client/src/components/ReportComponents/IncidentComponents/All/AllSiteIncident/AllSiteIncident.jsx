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
import {createTheme, ThemeProvider} from "@mui/material";
import dayjs from "dayjs";
import useServiceReportStore from "@/store/useServiceReportStore";
import {
    MaterialReactTable,
    MRT_ShowHideColumnsButton,
    MRT_ToggleDensePaddingButton,
    MRT_ToggleFiltersButton,
    MRT_ToggleFullScreenButton,
    MRT_ToggleGlobalFilterButton,
    useMaterialReactTable
} from "material-react-table";
import AdminUtilities from "@/utils/AdminUtilities";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
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
import {useMutation, useQueryClient} from "@tanstack/react-query";
import useIncidentStore from "@/store/useIncidentStore";


function AllSiteIncident({siteIncidentData}) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/incident/site');
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [selectedRow, setSelectedRow] = useState(null); // To track the row being acted upon

    const {setViewSiteIncidentReport} = useIncidentStore();
    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
        // width: '250px',
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

    // useEffect or handling navigation between new and staff
    useEffect(() => {
        if (pathname.includes('site')) {
            setActiveTab('/dashboard/admin/reports/incident/site');
        } else if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/reports/incident/new');
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
                            },
                        },
                    },
                    MuiTableCell: {
                        styleOverrides: {
                            root: {
                                color: '#fff',
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

    const handleOpen = (row) => {
        setSelectedRow(row); // Store the row being acted upon
        setOpen(true);
    };
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
        if (emailError || !email) {
            toast.error('Please enter a valid email address');
            return;
        }
        const selectedIds = table.getSelectedRowModel().flatRows.map((row) => row.original._id);
        const obj = {email, selectedIds};
        // for each of the selected ids, we need to get the full object and then construct our key to clear the cache after deletion
        selectedIds.map((id) => {
            const obj = siteIncidentData.find((obj) => obj._id === id);
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
    const handleViewRecord = (objData) => {
        setViewSiteIncidentReport(objData);
        router.push('/dashboard/admin/reports/incident/site/view');
    }

    const columns = useMemo(() => [
        {
            accessorKey: 'siteInfo.siteId',
            header: 'Site ID',
            Cell: ({row}) => row.original.siteInfo?.siteId || 'N/A',
        },
        {
            accessorKey: 'siteInfo.cluster',
            header: 'Cluster',
            Cell: ({row}) => row.original.siteInfo?.cluster || 'N/A',
        },
        {
            accessorKey: 'siteInfo.type',
            header: 'Type',
            Cell: ({row}) => row.original.siteInfo?.type || 'N/A',
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
    const tableData = useMemo(() => siteIncidentData || [], [siteIncidentData]);

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
            const objData = siteIncidentData.find((obj) => obj._id === objID);
            return (
                <>
                    <Stack direction='row'>
                        <Button onClick={() => handleViewRecord(objData)}>
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
            return (
                <>
                    <Box sx={{display: 'flex', gap: '1rem', p: '4px'}}>
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
                </>
            );
        },
        renderToolbarInternalActions: ({table}) => {
            return (
                <>
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
                </>
            );
        },
        mrtTheme:
            {
                baseBackgroundColor: '#304f61',
            }
        ,
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
                'Site Details',
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
        positionPagination:
            "both",
        initialState:
            {
                pagination: {
                    pageIndex: 0,
                    pageSize:
                        100
                }
                ,
                density: 'compact',
            },
    });

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
                    <Typography variant='h5' sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                        All Site Incident Report Form
                    </Typography>
                </Paper>
                <br/>
                {/*Navigation Tabs */}
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
                        }}
                    >
                        <Tab
                            label="Home"
                            component={Link}
                            href="/dashboard/admin/reports/incident"
                            value="/dashboard/admin/reports/incident"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Site"
                            component={Link}
                            href="/dashboard/admin/reports/incident/site"
                            value="/dashboard/admin/reports/incident/site"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="New"
                            component={Link}
                            href="/dashboard/admin/reports/incident/new"
                            value="/dashboard/admin/reports/incident/new"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                    </Tabs>
                </Stack>
                <br/>
                {/*Table Section to present an abstracted form of the table*/}
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
            </Box>
        </>
    )
}

export default AllSiteIncident;