'use client';
import Button from "@mui/material/Button";
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

function Staff({allStaff}) {
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
                                color: '#ff8c00',
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
                                backgroundColor: 'aqua',
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
                            },
                            
                        },
                    },
                },
            }),
        [],
    );
    const headerKeys = ['_id', 'firstName', 'lastName', 'email', 'phone', 'role', 'employment'];
    // Function to capitalize the first letter of the key
    const capitalizeFirstLetter = (key) => {
        // if key not in our headerKeys array, it should skip that key
        if (!headerKeys.includes(key) || !key) {
            return '';
        }
        if (key === '_id') {
            return 'ID';
        }
        return key.charAt(0).toUpperCase() + key.slice(1);
    };
    const columnFields = allStaff.length > 0 ? Object.keys(allStaff[0]) : [];
    const columns = useMemo(() => columnFields.map((field) => ({
            accessorKey: field,
            header: capitalizeFirstLetter(field),
            sortable: true,
            size: 200,
        }))
            .filter((column) => column.header !== ''),
        []
    );
    const tableData = useMemo(
        () => allStaff.map((staff) => {
            const row = {};
            columns.forEach((column) => {
                row[column.accessorKey] = staff[column.accessorKey];
            });
            return row;
        }),
        [columns, allStaff]
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
        enableRowSelection: true,
        enableColumnActions: false,
        enableRowExpand: true,
        enableMultiRowSelection: true,
        enableGlobalFilter: true,
        enableGrouping: true,
        enableColumnDragging: false,
        enableEditing: true,
        enableColumnReordering: true,
        positionActionsColumn: 'last',
        renderRowActions: ({row}) => {
            const staffID = row.getValue('_id');
            const [open, setOpen] = useState(false);
            const [email, setEmail] = useState('');
            const [emailError, setEmailError] = useState('');
            const queryClient = useQueryClient();
            const router = useRouter();
            const mutation = useMutation({
                mutationKey: ["deleteStaff"],
                mutationFn: AdminUtilities.DeleteStaff, // Adjust this to match your delete function
            });
            // encrypt the staffID and store it in the session storage using window.crypto.subtle
            // also ensure that the session storage is empty before setting the id in to the session storage
            const viewStaff = async () => {
                const encryptedUserID = await AdminUtilities.encryptUserID(staffID);
                const userData = allStaff.find((staff) => staff._id === staffID);
                // encrypt the data and store it in the session storage
                const encryptedData = await AdminUtilities.encryptData(userData);
                if (sessionStorage.getItem('staffData')) {
                    sessionStorage.removeItem('staffData');
                }
                if (sessionStorage.getItem('staffID')) {
                    sessionStorage.removeItem('staffID');
                }
                sessionStorage.setItem('staffData', encryptedData);
                sessionStorage.setItem('staffID', encryptedUserID);
                router.push(`/dashboard/admin/staff/view`);
            };
            const editStaff = async () => {
                const encryptedUserID = await AdminUtilities.encryptUserID(staffID);
                const userData = allStaff.find((staff) => staff._id === staffID);
                // encrypt the data and store it in the session storage
                const encryptedData = await AdminUtilities.encryptData(userData);
                if (sessionStorage.getItem('staffData')) {
                    sessionStorage.removeItem('staffData');
                }
                if (sessionStorage.getItem('staffID')) {
                    sessionStorage.removeItem('staffID');
                }
                sessionStorage.setItem('staffData', encryptedData);
                sessionStorage.setItem('staffID', encryptedUserID);
                router.push(`/dashboard/admin/staff/edit`);
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
            const handleClose = () => {
                setOpen(false);
                setEmail('');
                setEmailError('');
            };
            const handleOpen = () => setOpen(true);
            const handleDelete = async (event) => {
                event.preventDefault();
                const obj = {email, selectedIds: [staffID]};
                mutation.mutate(obj, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ["AllStaff"]});
                        toast.success('Staff account deleted successfully');
                        setOpen(false);
                    },
                    onError: (error) => {
                        toast.error('Error deleting staff account');
                        console.error("Delete failed", error);
                        setOpen(false);
                    }
                });
            };
            return (
                <>
                    <Stack direction='row'>
                        <Button onClick={viewStaff}>
                            <Tooltip title="View" arrow>
                                <AccountCircleIcon sx={{color: '#E997F9', cursor: 'pointer'}}/>
                            </Tooltip>
                        </Button>
                        <Button onClick={editStaff}>
                            <Tooltip title="Edit" arrow>
                                <EditIcon sx={{color: '#4af7a7', cursor: 'pointer'}}/>
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
                            onSubmit: handleDelete,
                            sx: {backgroundColor: '#0E1E1E'},
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
                                    You are about to permanently delete the selected Staff Accounts, Please enter your
                                    email address to further confirm your actions.
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
            const mutation = useMutation({
                mutationKey: ["deleteStaff"],
                mutationFn: AdminUtils.DeleteStaff,
            });
            const queryClient = useQueryClient();
            const createNew = () => router.push('/dashboard/admin/staff/new');
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
                const selectedIds = table.getSelectedRowModel().flatRows.map((row) => row.getValue('_id'));
                const obj = {email, selectedIds};
                mutation.mutate(obj, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: ["AllStaff"]});
                        toast.success('Selected Staff Accounts Deleted Successfully');
                        handleClose();
                    },
                    onError: (error) => {
                        toast.error('Error Deleting Staff Accounts');
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
                        Create New Staff Account +
                    </Button>
                    <Button
                        color="error"
                        disabled={!table.getIsSomeRowsSelected()}
                        onClick={handleOpen}
                        variant="contained"
                    >
                        Delete Selected Accounts
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
                                    You are about to permanently delete the selected Staff Accounts, Please enter your
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
            selectedRowBackgroundColor: '#051e3b',
        },
        muiTableHeadCellProps: {
            sx: {
                color: '#21c6fc',
                fontSize: '1.3em',
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
        },
        paginationDisplayMode: 'pages',
    });
    return (
        <>
            <Stack direction='column' spacing={2}>
                <Card sx={{
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: '#304f61',
                    color: 'white',
                    height: '100%',
                    width: '100%',
                    boxShadow: '0px 2px 8px rgba(0,0,0,0.32)'
                }}>
                    <Stack direction='row' sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                    }}>
                        <Typography variant="h5" component="p">
                            Staff List
                        </Typography>
                        <Stack direction='row' gap={4} sx={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        </Stack>
                    </Stack>
                    <br/><br/>
                    <ThemeProvider theme={tableTheme}>
                        <MaterialReactTable table={table}/>
                    </ThemeProvider>
                </Card>
                <Stack direction='row' spacing={5}>
                    <Link href="/dashboard/admin">
                        <Button variant="contained" color='success' title='Back'> Back </Button>
                    </Link>
                </Stack>
            </Stack>
        </>
    );
}

export default Staff;
