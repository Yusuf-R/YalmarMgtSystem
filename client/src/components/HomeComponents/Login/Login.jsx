"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {MdOutlineMailLock} from "react-icons/md";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import React, {useState} from "react";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {FcRedo} from "react-icons/fc";
import AdminUtils from "@/utils/AdminUtilities";
import styleLogin from "./Login.module.css";
import {schemaLogin} from "@/SchemaValidator/login";
import LazyComponent from "@/components/LazyComponent/LazyComponent";

function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schemaLogin),
        reValidateMode: "onChange",
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleCheckBox = (e) => {
        setRememberMe(e.target.checked);
    };
    const mutation = useMutation({
        mutationKey: ["Login"],
        mutationFn: AdminUtils.StaffLogin,
    });
    const OnLogin = (loginData) => {
        setIsSubmit(true);
        mutation.mutate(loginData, {
            onSuccess: (response) => {
                if (response) {
                    toast.success("Login successful 🚀");
                    toast.success("Redirecting to dashboard", {
                        icon: <FcRedo/>,
                    });
                    Cookies.set("rememberMe", rememberMe ? "true" : "false", {
                        secure: true,
                        sameSite: "strict",
                    });
                    setTimeout(() => {
                        router.push("/dashboard");
                    }, 2000);
                    setIsSubmit(false);
                } else {
                    toast.error("Unauthorized credentials");
                    setTimeout(() => {
                        router.push("/login");
                    }, 3000);
                    setIsSubmit(false);
                }
            },
            onError: (error) => {
                setIsSubmit(false);
                console.error(error);
                toast.error("Unauthorized credentials");
            },
        });
    };

    const txProps = {
        color: "red",
        bgcolor: "#274e61",
        borderRadius: "10px",
        width: "100%",
        fontSize: "18px",
        fontStyle: "bold",
        "&:hover": {
            bgcolor: "#051935",
        },
        fontFamily: "Poppins",
        "& .MuiInputBase-input": {
            color: "white",
        },
        "& .MuiFormHelperText-root": {
            color: "red",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "green",
        },
        "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #274e61 inset",
            WebkitTextFillColor: "white",
        },
    };

    return (
        <>
            <Box
                sx={{
                    fontFamily: "Poppins",
                    bgcolor: "#274e61",
                    color: "white",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: "url(/bg-6.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    overflow: 'hidden',

                }}
            >
                <Box className={styleLogin.wrapper}>
                    <Box className={styleLogin.formParent}>
                        <Typography variant="h5" sx={{fontWeight: 'bold', fontFamily: 'Poppins', mt: 2}}>
                            Yalmar Management System
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(OnLogin)} noValidate sx={{m: 4}}>
                            {/* Email Field with Icon */}
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <TextField
                                        fullWidth
                                        {...field}
                                        InputProps={{
                                            sx: txProps,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        sx={{color: 'gold'}}
                                                    >
                                                        <MdOutlineMailLock size={24}/>
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{
                                            sx: {
                                                color: "#46F0F9",
                                                "&.Mui-focused": {
                                                    color: "white",
                                                },
                                            },
                                            shrink: true,
                                        }}
                                        sx={{marginBottom: 5}}
                                        label="Email"
                                        variant="outlined"
                                        autoComplete="off"
                                        error={!!errors.email}
                                        helperText={errors.email ? errors.email.message : ""}
                                        required
                                    />
                                )}
                            />

                            {/* Password Field with Visibility Toggle */}
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        InputProps={{
                                            sx: txProps,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                        color="error"
                                                    >
                                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{
                                            sx: {
                                                color: "#46F0F9",
                                                "&.Mui-focused": {
                                                    color: "white",
                                                },
                                            },
                                            shrink: true,
                                        }}
                                        sx={{marginBottom: 5}}
                                        label="Password"
                                        variant="outlined"
                                        autoComplete="off"
                                        error={!!errors.password}
                                        helperText={errors.password ? errors.password.message : ""}
                                        required
                                        type={showPassword ? "text" : "password"}

                                    />
                                )}
                            />
                            <br/>
                            {/* Remember Me Checkbox */}
                            <Grid container alignItems="center">
                                <Grid item xs={1}>
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={handleCheckBox}
                                        inputProps={{'aria-label': 'controlled'}}
                                        sx={{color: "gold"}}
                                    />
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="subtitle1" sx={{color: "white"}}>
                                        Remember me
                                    </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="subtitle1" sx={{
                                        color: "white",
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                        "&:hover": {color: "green"},
                                    }} onClick={() => router.push('/resetpassword')}>
                                        Forgot Password?
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br/> <br/>

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{
                                    height: 50,
                                    backgroundColor: "#3263b3",
                                    ":hover": {backgroundColor: "#891f9c", color: "green"},
                                    fontSize: "1.2rem",
                                    color: "white",
                                }}
                                disabled={isSubmit}
                            >
                                {isSubmit ? "Logging in..." : "Login"}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {isSubmit && <LazyComponent Command='Logging in ...'/>}
        </>
    );
}

export default Login;
