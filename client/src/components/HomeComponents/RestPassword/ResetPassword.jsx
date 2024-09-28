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


const schemaResetPassword = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
});

function ResetPassword() {
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
                <Box className={styleReset.wrapper}>
                    <Box className={styleReset.formParent}>
                        <Typography variant="h5" sx={{fontWeight: 'bold', fontFamily: 'Poppins', mt: 2}}>
                            Reset Password
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(ResetPassword)} noValidate sx={{mt: 10, mb: 10}}>
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
