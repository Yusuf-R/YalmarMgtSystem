"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {MdOutlineMailLock} from "react-icons/md";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import React, {useState} from "react";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import AdminUtils from "@/utils/AdminUtilities";
import styleReset from "./ResetPassword.module.css";
import LazyComponent from "@/components/LazyComponent/LazyComponent";
import * as yup from "yup";
import {keyframes} from "@mui/system";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


const schemaResetPassword = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
});

// Define the rotation animation
const rotateAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

function ResetPassword() {
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
        resolver: yupResolver(schemaResetPassword),
        reValidateMode: "onChange",
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const mutation = useMutation({
        mutationFn: AdminUtils.StaffResetPassword,
        mutationKey: ["StaffResetPassword"],
    });

    const ResetPassword = async (data) => {
        const {email} = data;
        // encrypt the email and store it in session storage
        const encryptedEmail = await AdminUtils.encryptData(email);
        setIsSubmit(true);
        mutation.mutate(data, {
            onSuccess: () => {
                toast.success('Reset Token sent to your email');
                sessionStorage.setItem("email", encryptedEmail);
                setIsSubmit(false);
                router.push('/setpassword')
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
                            padding: isSmallScreen ? "15px" : "5px",
                            width: "100%",
                            background: "black",
                            zIndex: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            maxHeight: "100vh",
                            // border: '2px solid gold',
                        }}
                    >
                        <Typography variant="h5" sx={{fontWeight: 'bold', fontFamily: 'Poppins', mt: 2}}>
                            Reset Password
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(ResetPassword)} noValidate
                             sx={{mt: 10, mb: 10}}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        InputProps={{
                                            sx: txProps,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" sx={{color: 'gold'}}>
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
                                        }}
                                        sx={{marginBottom: 3}}
                                        label="Email Address"
                                        variant="outlined"
                                        autoComplete="off"
                                        error={!!errors.email}
                                        helperText={errors.email ? errors.email.message : ""}
                                        fullWidth
                                        required
                                    />
                                )}
                            />
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    height: 50,
                                    backgroundColor: "#3263b3",
                                    ":hover": {backgroundColor: "#891f9c", color: "green"},
                                    fontSize: "1.2rem",
                                    color: "white",
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                    {isSubmit && <LazyComponent Command='Submitting...'/>}
                </Box>
            </Box>
        </>
    );
}

export default ResetPassword;
