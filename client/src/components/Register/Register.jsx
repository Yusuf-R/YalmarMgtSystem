"use client";
import { useState } from "react";
import styleRegister from "./Register.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
    Container,
    Box,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    IconButton,
} from "@mui/material/";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    //   const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    //   }
    return (
        <div className={styleRegister.registerContainer}>
            <Container
                maxWidth="md"
                sx={{
                    minHeight: "100vh",
                    //   bgcolor: '#cfe8fc',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        zIndex: 2,
                        width: "100%",
                        maxWidth: "50%",
                        padding: "5px",
                        textAlign: "center",
                        marginTop: "-450px",
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
                        Register
                    </Typography>
                    <Typography component="h1">Welcome!👏, get started</Typography>
                    <Box component="form">
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <TextField
                                    InputProps={{ sx: { color: "white" } }}
                                    margin="normal"
                                    fullWidth
                                    label="First Name"
                                    //   variant="outlined"
                                    autoComplete="First Name"
                                    autoFocus
                                    helperText="will put something there"
                                />
                                <TextField
                                    InputProps={{ sx: { color: "white" } }}
                                    margin="normal"
                                    fullWidth
                                    label="Email Address"
                                    //   variant="outlined"
                                    autoComplete="First Name"
                                    autoFocus
                                    helperText="will put something there"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    InputProps={{ sx: { color: "white" } }}
                                    margin="normal"
                                    fullWidth
                                    label="Last Name"
                                    variant="outlined"
                                    autoComplete="Last Name"
                                    autoFocus
                                    helperText="will put something there"
                                />
                                <TextField
                                    // InputProps={{sx: {color: "white"} }}
                                    margin="normal"
                                    fullWidth
                                    type={showPassword ? "text" : "password"}
                                    label="Password"
                                    variant="outlined"
                                    autoComplete="First Name"
                                    autoFocus
                                    helperText="will put something there"
                                    InputProps={{
                                        sx: { color: "white" },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    arial-label="toggle pasword visibility"
                                                    onClick={handleClickShowPassword}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default Register;
