'use client';
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Stack from "@mui/material/Stack";
import {useRouter} from "next/navigation";
import {useMemo} from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import {data} from "@/utils/authLogin";
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

function Staff() {
    const router = useRouter();
    const globalTheme = useTheme();
    const tableTheme = useMemo(
        () =>
            createTheme({
                components: {
                    MuiSwitch: {
                        styleOverrides: {
                            thumb: {
                                color: '#ff8c00', //change the color of the switch thumb in the columns show/hide menu to pink
                            },
                        },
                    },
                    MuiFormControlLabel: {
                        styleOverrides: {
                            label: {
                                fontSize: '1.1rem', //override to make label font size larger
                                color: 'white',
                                fontWeight: 'bold',
                                '&:hover': {
                                    color: '#fcc2fb',
                                }
                            },
                        }
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
                    // targeting the sort icon at the column level
                    MuiTableSortLabel: {
                        styleOverrides: {
                            icon: {
                                fontSize: '1.2rem',
                                backgroundColor: 'aqua',
                            },
                            
                        },
                    },
                    // All the svg icon default color
                    MuiSvgIcon: {
                        styleOverrides: {
                            root: {
                                color: 'aqua',
                            },
                        },
                    },
                    // The input label style color
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
                                fontSize: '1.3rem',
                            },
                        }
                    },
                },
            }),
        [],
    );
    
    const columns = useMemo(
        () => [
            
            {
                accessorKey: 'id',
                header: 'ID',
                enableEditing: false,
            },
            {
                accessorKey: 'firstName',
                header: 'First Name',
            },
            {
                header: 'Last Name',
                accessorKey: 'lastName',
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Role',
                accessorKey: 'role',
            },
        ], [],
    )
    const table = useMaterialReactTable({
        columns,
        data,
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
            // render necessary function
            const sayHi = () => alert(`Hi, ${row.getValue('firstName')}`);
            return (
                <Stack direction='row'>
                    <Button onClick={sayHi}>
                        <ImportContactsIcon sx={{
                            color: '#8f8dfc',
                            cursor: 'pointer',
                            fontSize: '2.5em',
                        }}/>
                    </Button>
                    <Button>
                        <EditIcon sx={{
                            color: '#4af7a7',
                            cursor: 'pointer',
                            fontSize: '2.5em',
                        }}/>
                    </Button>
                    <Button>
                        <DeleteIcon sx={{
                            color: '#f7564a',
                            cursor: 'pointer',
                            fontSize: '2.5em',
                        }}/>
                    </Button>
                </Stack>
            )
        },
        renderTopToolbarCustomActions: ({table}) => {
            // add your custom actions function here
            const hiFati = () => alert('hi fati');
            return (
                <Box sx={{display: 'flex', gap: '1rem', p: '4px'}}>
                    <Button
                        color="secondary"
                        onClick={hiFati}
                        variant="contained"
                    >
                        Create New Staff Account +
                    </Button>
                    <Button
                        color="error"
                        disabled={!table.getIsSomeRowsSelected()}
                        onClick={() => {
                            alert('Delete Selected Accounts');
                        }}
                        variant="contained"
                    >
                        Delete Selected Accounts
                    </Button>
                </Box>
            )
        },
        renderToolbarInternalActions: ({table}) => {
            // add some custom function here
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
            )
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
        },
        muiTableBodyCellProps: {
            sx: {
                color: 'white',
                fontSize: '1.2em',
                '&:hover': {
                    color: '#fcc2fb',
                },
                padding: '2px 4px',
            },
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
                    }}
                    >
                        <Typography variant="h5" component="p">
                            Staff List
                        </Typography>
                        <Stack direction='row' gap={4} sx={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                        >
                        </Stack>
                    </Stack>
                    <br/><br/>
                    <ThemeProvider theme={tableTheme}>
                        <MaterialReactTable table={table}/>
                    </ThemeProvider>
                </Card>
                
                <Stack direction='row' spacing={5}>
                    <Button onClick={() => router.push('/dashboard/admin')} variant="contained"
                            color='success'>
                        Back
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}

export default Staff