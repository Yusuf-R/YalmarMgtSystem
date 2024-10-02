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
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {keyframes} from "@mui/system";
import {FcRedo} from "react-icons/fc";
import Stack from "@mui/material/Stack";


function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');
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

    const getToastConfig = () => {
        let fontSize = '14px';
        let width = '300px';
        let position = 'top-right';

        if (xSmall || small) {
            fontSize = '12px';
            width = '90%';
        } else if (medium) {
            fontSize = '14px';
            width = '80%';
        } else if (large) {
            fontSize = '16px';
            width = '400px';
        } else if (xLarge || xxLarge) {
            fontSize = '18px';
            width = '450px';
        } else {
            fontSize = '20px';
            width = '500px';
        }
        return {
            position,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                fontSize,
                width,
                maxWidth: '100%',
            },
        };
    };


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
        const toastConfig = getToastConfig();
        mutation.mutate({encryptedData}, {
            onSuccess: () => {
                toast.success("Login successful 🚀", toastConfig);
                toast.success("Redirecting to dashboard", {
                    ...toastConfig,
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
                toast.error("Unauthorized credentials", toastConfig);
            },
        });
    };

    const txProps = {
        color: "red",
        bgcolor: "#274e61",
        borderRadius: "10px",
        width: "100%",
        fontSize: "16px",
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
                    padding: xSmall ? 1 : small ? 2 : medium ? 3 : large ? 4 : xxLarge ? 4 : 6,
                    marginTop: xSmall ? 10 : small ? 15 : medium ? 15 : large ? 20 : xLarge ? 25 : xxLarge ? 25 : wide ? 30 : 35,
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '500px',
                        maxWidth: '95%',
                        border: '1px solid red',
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
                            justifyContent: "center",
                            maxHeight: "100vh",
                            // border: '2px solid gold',
                        }}
                    >
                        <Typography variant={xSmall || small || medium ? 'subtitle2' : "h6"}
                                    sx={{fontWeight: "bold", fontFamily: "Poppins", mt: 2}}>
                            Yalmar Management System
                        </Typography>
                        {/* Your form logic goes here */}
                        <Box component="form" onSubmit={handleSubmit(OnLogin)} noValidate
                             sx={{m: 0.5}}>
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
                                                        sx={{color: 'gold'}}>
                                                        <MdOutlineMailLock size={xSmall || small || medium ? 12 : 24}/>
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{
                                            sx: {
                                                color: "#46F0F9",
                                                fontSize: xSmall ? '10px' : small ? '10px' : medium ? "10px" : large ? "14px" : "16px",
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
                                                        {showPassword ? (
                                                            <VisibilityOff
                                                                sx={{
                                                                    width: xSmall || small || medium ? 15 : 24,  // Directly set width and height
                                                                    height: xSmall || small || medium ? 15 : 24,
                                                                }}
                                                            />
                                                        ) : (
                                                            <Visibility
                                                                sx={{
                                                                    width: xSmall || small || medium ? 15 : 24,  // Directly set width and height
                                                                    height: xSmall || small || medium ? 15 : 24,
                                                                }}
                                                            />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{
                                            sx: {
                                                color: "#46F0F9",
                                                fontSize: xSmall ? '10px' : small ? '10px' : medium ? "10px" : large ? "14px" : "16px",
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
                            {/* Remember Me Checkbox */}
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 2}}>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={handleCheckBox}
                                        sx={{
                                            color: "gold",
                                            padding: 0,
                                            marginRight: '4px',
                                            '& .MuiSvgIcon-root': {
                                                fontSize: xSmall || small || medium ? '16px' : '24px',
                                            },
                                        }}
                                    />
                                    <Typography variant="body2" sx={{
                                        color: "white",
                                        fontSize: xSmall ? '10px' : small ? '12px' : medium ? "14px" : "16px",
                                    }}>
                                        Remember me
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "white",
                                        cursor: "pointer",
                                        fontSize: xSmall ? '10px' : small ? '12px' : medium ? "14px" : "16px",
                                        textDecoration: "underline",
                                        "&:hover": {color: "green"},
                                    }}
                                    onClick={() => router.push('/resetpassword')}
                                >
                                    Forgot Password?
                                </Typography>
                            </Stack>
                            {/* Submit Button */}
                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                sx={{
                                    height: xSmall || small ? 40 : medium ? 45 : 50,
                                    backgroundColor: '#3263b3',
                                    '&:hover': {backgroundColor: '#891f9c'},
                                    fontSize: xSmall ? '14px' : small ? '16px' : medium ? '18px' : '20px',
                                    color: 'white',
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
