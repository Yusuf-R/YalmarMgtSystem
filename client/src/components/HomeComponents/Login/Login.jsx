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
import AdminUtils from "@/utils/AdminUtilities";
import {schemaLogin} from "@/SchemaValidator/login";
import LazyComponent from "@/components/LazyComponent/LazyComponent";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {keyframes} from "@mui/system";
import {FcRedo} from "react-icons/fc";

function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isTab = useMediaQuery("(min-width:900px) and (max-width:999px)");
    const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLargestScreen = useMediaQuery(theme.breakpoints.up("lg"));
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

    // Define the rotation animation
    const rotateAnimation = keyframes`
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    `;


    const mutation = useMutation({
        mutationKey: ["Login"],
        mutationFn: AdminUtils.StaffLogin,
    });
    const OnLogin = async (loginData) => {
        console.log(loginData);
        setIsSubmit(true);
        // encrypt the login data
        const encryptedData = await AdminUtils.encryptLoginData(loginData);
        console.log(encryptedData);
        mutation.mutate({encryptedData}, {
            onSuccess: () => {
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
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "white",
                    textAlign: "center",
                    padding: isSmallScreen ? "16px" : isMediumScreen ? "16px" : isMobile ? "16px" : isTab ? "12px" : isTablet ? "15px" : "12px",
                    marginTop: isSmallScreen ? "180px" : isMediumScreen ? "180px" : isMobile ? "180px" : isTab ? "350px" : isTablet ? "200px" : isLargestScreen ? "250px" : "300px",
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '500px',
                        maxWidth: '90%',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        padding: '2px', // Increased padding to make room for thicker animation
                        '&::before, &::after': {
                            content: '""',
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            height: '200%',
                            width: '200%',
                            background: 'conic-gradient(transparent, transparent, transparent, #00ccff)',
                            animation: `${rotateAnimation} 2s linear infinite`,
                        },
                        '&::after': {
                            background: 'conic-gradient(transparent, transparent, transparent, #ff00ea)',
                            animationDelay: '-1s',
                        },
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "25px",
                            borderRadius: "15px",
                            padding: "5px",
                            width: "100%",
                            background: "black",
                            zIndex: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            maxHeight: "100vh",
                            // border: '2px solid gold',
                        }}
                    >
                        <Typography variant={isMobile ? 'h6' : isTab ? "h6" : "h5"}
                                    sx={{fontWeight: "bold", fontFamily: "Poppins", mt: 2}}>
                            Yalmar Management System
                        </Typography>
                        {/* Your form logic goes here */}
                        <Box component="form" onSubmit={handleSubmit(OnLogin)} noValidate sx={{m: 0.5}}>
                            {/* Email Field */}
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

                            {/* Password Field */}
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
                                        sx={{marginBottom: isMobile ? 3 : 7}}
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

                            {/* Remember Me Checkbox */}
                            <Grid container alignItems="center" sx={{mb: 5}}>
                                <Grid item xs={1}>
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={handleCheckBox}
                                        inputProps={{'aria-label': 'controlled'}}
                                        sx={{color: "gold"}}
                                    />
                                </Grid>
                                <Grid item xs={isSmallScreen ? 4.3 : isMobile ? 3 : 3}>
                                    <Typography variant="subtitle1" sx={{color: "white"}}>
                                        Remember me
                                    </Typography>
                                </Grid>

                                <Grid item xs={isSmallScreen ? 6.7 : isMobile ? 8 : 8}>
                                    <Typography variant="subtitle1" sx={{
                                        color: "white",
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                        ml: isSmallScreen ? 5 : 20,
                                        "&:hover": {color: "green"},
                                    }} onClick={() => router.push('/resetpassword')}>
                                        Forgot Password?
                                    </Typography>
                                </Grid>
                            </Grid>

                            {/* Submit Button */}
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
        </>
    );
}

export default Login;
