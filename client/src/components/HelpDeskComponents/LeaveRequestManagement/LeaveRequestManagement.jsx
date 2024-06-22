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
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useMemo, useState} from "react";
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
import {mainSection} from "@/utils/data";

function LeaveRequestManagement({leaveReqData}) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
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
                                width: '100%',
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
        'email',
        'leaveType',
        'leaveReason',
        'startDate',
        'endDate',
        'status',
    ];
    // Function to capitalize the first letter of the key
    const capitalizeFirstLetter = (key) => {
        // if key not in our headerKeys array, it should skip that key
        if (!headerKeys.includes(key) || !key) {
            return '';
        }
        return key.charAt(0).toUpperCase() + key.slice(1);
    };
    const columnFields = leaveReqData.length > 0 ? Object.keys(leaveReqData[0]) : [];
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
                        case 'Pending':
                            bgColor = 'rgb(204, 153, 0)';
                            break;
                        case 'Requested':
                            bgColor = '#2429bd';
                            textColor = '#FFF'; // Set text color to black for better contrast
                            break;
                        case 'Accepted':
                            bgColor = 'green';
                            break;
                        case 'Rejected':
                            bgColor = 'red';
                            break;
                        default:
                            bgColor = 'transparent';
                    }
                    return (
                        <span style={{backgroundColor: bgColor, color: textColor, padding: '5px', borderRadius: '5px'}}>
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
        () => leaveReqData.map((staff) => {
            const row = {};
            columns.forEach((column) => {
                row[column.accessorKey] = staff[column.accessorKey];
            });
            row._id = staff._id; // Include _id in the row data
            return row;
        }),
        [columns, leaveReqData]
    );
    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
        fontSize: '1.35em',
        // width: '270px',
    };
    const table = useMaterialReactTable({
        columns,
        data: tableData,
        enableSorting: true,
        enablePagination: true,
        enableColumnFiltering: true,
        enableColumnHiding: true,
        enableRowSelection: false,
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
            const reqID = row.original._id;
            const [open, setOpen] = useState(false);
            const [email, setEmail] = useState('');
            const [emailError, setEmailError] = useState('');
            const queryClient = useQueryClient();
            const router = useRouter();
            
            // encrypt the staffID and store it in the session storage using window.crypto.subtle
            // also ensure that the session storage is empty before setting the id in to the session storage
            
            const handleOpen = () => setOpen(true);
            const handleClose = () => {
                setOpen(false);
                setEmail('');
                setEmailError('');
            };
            
            // function to view staff profile
            const reqAction = async () => {
                const encryptedReqID = await AdminUtilities.encryptUserID(reqID);
                const reqData = leaveReqData.find((reqObj) => reqObj._id === reqID);
                // encrypt the data and store it in the session storage
                const encryptedData = await AdminUtilities.encryptData(reqData);
                if (sessionStorage.getItem('reqData')) {
                    sessionStorage.removeItem('reqData');
                }
                if (sessionStorage.getItem('reqID')) {
                    sessionStorage.removeItem('reqID');
                }
                sessionStorage.setItem('reqData', encryptedData);
                sessionStorage.setItem('reqID', encryptedReqID);
                router.push(`/dashboard/admin/helpdesk/leave-request-center/action`);
            };
            return (
                <>
                    <Stack direction='row'>
                        <Button onClick={reqAction}>
                            <Tooltip title="Action" arrow>
                                <MiscellaneousServicesIcon sx={{color: '#E997F9', cursor: 'pointer'}}/>
                            </Tooltip>
                        </Button>
                    </Stack>
                </>
            )
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
            placeholder: 'Staff Details',
            variant: 'outlined',
            color: 'warning',
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
                    <Typography variant='h5'>Leave Request Management</Typography>
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
                    <Link href="/dashboard/admin/helpdesk">
                        <Button variant="contained" color='success' title='Back'> Back </Button>
                    </Link>
                </Stack>
            </Box>
        </>
    );
}

export default LeaveRequestManagement;