'use client';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useState} from "react";
import Modal from "@mui/material/Modal";
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from "@mui/material/styles";

function NewStaff() {
    const theme = createTheme({
        components: {
            // Assuming you are using MUI v5; adjust based on your version
            MuiPaper: {  // Often, the calendar uses a Paper component for the dropdown
                styleOverrides: {
                    root: {
                        backgroundColor: "#274e61", // Change to any color you prefer
                        color: '#ffffff',
                    },
                },
            },
        },
    });
    const Home = () => {
        window.location.href = '/dashboard/admin/staff';
    }
    const [dateValue, setDateValue] = useState(null);
    console.log({dateValue});
    return (
        <>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{
                        padding: '20px',
                        width: 'calc(100% - 250px)',
                        position: 'absolute',
                        top: '70px',
                        left: '250px',
                    }}
                    >
                        <Typography>New User Account</Typography>
                        {/*registration form here*/}
                        {/*<Grid container spacing={2}>*/}
                        <br/>
                        <br/>
                        <Grid container spacing={4}>
                            {/* First Row (3 fields) */}
                            <Grid item xs={4}>
                                <TextField
                                    InputProps={{
                                        sx: {
                                            color: "white",
                                            bgcolor: "#274e61",
                                            borderRadius: "10px",
                                            width: '350px',
                                            
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9", // Set label text color
                                            "&.Mui-focused": { // when focused, set label color to white
                                                color: "white",
                                                // borderColor: '#46F0F9',
                                            },
                                        }
                                    }}
                                    sx={{
                                        color: "#46F0F9",
                                    }}
                                    id="outlined-basic"
                                    label="First Name *"
                                    variant="outlined"
                                    // autoComplete={"off"}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    InputProps={{
                                        sx: {
                                            color: "white",
                                            bgcolor: "#274e61",
                                            borderRadius: "10px",
                                            width: '350px',
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            }
                                        }
                                    }}
                                    id="outlined-basic"
                                    label="Middle Name"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    InputProps={{
                                        sx: {
                                            color: "white",
                                            bgcolor: "#274e61",
                                            borderRadius: "10px",
                                            width: '350px',
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            }
                                        }
                                    }}
                                    id="outlined-basic"
                                    label="Last Name *"
                                    variant="outlined"
                                />
                            </Grid>
                            {/* Second Row (3 fields) */}
                            <Grid item xs={4}>
                                <TextField
                                    InputProps={{
                                        sx: {
                                            color: "white",
                                            bgcolor: "#274e61",
                                            borderRadius: "10px",
                                            width: '350px',
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            }
                                        }
                                    }}
                                    id="outlined-basic"
                                    label="Email Address *"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    InputProps={{
                                        sx: {
                                            color: "white",
                                            bgcolor: "#274e61",
                                            borderRadius: "10px",
                                            width: '350px',
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
                                    id="outlined-basic"
                                    label="Phone Number *"
                                    variant="outlined"
                                />
                            </Grid>
                            
                            <Grid item xs={4}>
                                {/*Date picker for DOB input*/}
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="DOB *"
                                        showDaysOutsideCurrentMonth
                                        disableFuture
                                        slotProps={{
                                            openPickerButton: {
                                                sx: {
                                                    color: 'white',
                                                    bgcolor: '#274e61',
                                                    borderRadius: '10px',
                                                }
                                            },
                                            textField: {
                                                sx: {
                                                    color: 'white',
                                                    bgcolor: '#274e61',
                                                    borderRadius: '10px',
                                                    width: '350px',
                                                    "& .MuiInputLabel-root": {
                                                        color: '#46F0F9',
                                                    },
                                                    "& .MuiInputBase-input": { // Target input text
                                                        color: 'white', // Set focused text color to white
                                                    },
                                                    "&.Mui-focused": { // Target focused state
                                                        "& .MuiInputLabel-root": { // Target label within focused state
                                                            color: 'white', // Set label color to white on focus
                                                        },
                                                    },
                                                },
                                                
                                            }
                                        }}
                                        PopoverProps={{
                                            sx: {
                                                ".MuiPaper-root": {
                                                    bgcolor: 'salmon', // Apply salmon background to the calendar popover
                                                }
                                            }
                                        }}
                                    />
                                </DemoContainer>
                            </Grid>
                            {/* third Row (2 fields) */}
                            <Grid item xs={6}>
                                <TextField
                                    InputProps={{
                                        sx: {
                                            color: "white",
                                            bgcolor: "#274e61",
                                            borderRadius: "10px",
                                            width: '350px',
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            }
                                        }
                                    }}
                                    id="outlined-basic"
                                    label="Password *"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    InputProps={{
                                        sx: {
                                            color: "white",
                                            bgcolor: "#274e61",
                                            borderRadius: "10px",
                                            width: '350px',
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white"
                                            }
                                        }
                                    }}
                                    id="outlined-basic"
                                    label="Confirm Password *"
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <br/>
                        <br/>
                        {/*Submitting button */}
                        <Stack direction='row' gap={2}>
                            <Button
                                variant="contained"
                                color='success'
                                onClick={Home}
                            >Back</Button>
                            <Button
                                variant="contained"
                                color='error'
                                onClick={Home}
                            >Submit</Button>
                        </Stack>
                    </Box>
                </LocalizationProvider>
            </ThemeProvider>
        </>
    )
}

export default NewStaff;