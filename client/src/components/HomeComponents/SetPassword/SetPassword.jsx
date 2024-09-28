'use client';
import styleSetPassword from "./SetPassword.module.css";
import {MdOutlineMailLock} from "react-icons/md";
import {MdOutlineGeneratingTokens} from "react-icons/md";
import {useState, useEffect} from "react"
import {useRouter} from "next/navigation";
import {Controller, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup";
import {schemaSetNewPassword} from "@/SchemaValidator/setnewpassword";
import {toast} from 'react-toastify';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {schemaLogin} from "@/SchemaValidator/login";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import LazyComponent from "@/components/LazyComponent/LazyComponent";
import {useMutation} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";

function SetPassword({decryptedEmail}) {
    const [isSubmit, setIsSubmit] = useState(false);
    const [email, setEmail] = useState(decryptedEmail || '');
    const [showPasswordP1, setShowPasswordP1] = useState(false);
    const [showPasswordP2, setShowPasswordP2] = useState(false);

    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schemaSetNewPassword),
        reValidateMode: "onChange",
    });

    const mutation = useMutation({
        mutationFn: AdminUtils.StaffSetNewPassword,
        mutationKey: ["StaffSetNewPassword"],
    });

    const SetPassword = async (data) => {
        setIsSubmit(true);
        data.email = email;
        // encrypt my data
        const encryptedData = await AdminUtils.encryptLoginData(data);
        mutation.mutate({encryptedData}, {
            onSuccess: () => {
                setIsSubmit(false);
                toast.success('Password reset successful, please login');
                router.push('/login')
            },
            onError: (error) => {
                setIsSubmit(false);
                console.error(error);
                toast.error(error.message);
            },
        });
    };

    const handleClickPassword1 = () => setShowPasswordP1((show) => !show);
    const handleClickPassword2 = () => setShowPasswordP2((show) => !show);


    useEffect(() => {
        if (!email) {
            router.push("/login");
        }
    }, [router]);
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
                    backgroundImage: "url(/bg-3.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    overflow: 'hidden',
                }}
            >
                <Box className={styleSetPassword.wrapper}>
                    <Box className={styleSetPassword.formParent}>
                        <Typography variant="h5" sx={{
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center",
                            fontFamily: "Poppins",
                            mt: 2
                        }}>
                            Set New Password
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(SetPassword)} noValidate sx={{m: 4}}>
                            {/* Email*/}
                            <Controller
                                name="email"
                                control={control}
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
                                        required
                                        value={email}
                                        readOnly={true}
                                    />
                                )}
                            />
                            {/* Token */}
                            <Controller
                                name="token"
                                control={control}
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
                                                        <MdOutlineGeneratingTokens size={24}/>
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
                                        sx={{
                                            marginBottom: 5,
                                        }}
                                        label="Token"
                                        variant="outlined"
                                        autoComplete="off"
                                        required
                                        error={!!errors.token}
                                        helperText={errors.token ? errors.token.message : ""}
                                    />
                                )}
                            />
                            {/* Password */}
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
                                                        onClick={handleClickPassword1}
                                                        edge="end"
                                                        color="error"
                                                    >
                                                        {showPasswordP1 ? <VisibilityOff/> : <Visibility/>}
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
                                        type={showPasswordP1 ? "text" : "password"}

                                    />
                                )}
                            />

                            {/* Confirm set password*/}
                            <Controller
                                name="confirmPassword"
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
                                                        onClick={handleClickPassword2}
                                                        edge="end"
                                                        color="error"
                                                    >
                                                        {showPasswordP2 ? <VisibilityOff/> : <Visibility/>}
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
                                        error={!!errors.confirmPassword}
                                        helperText={errors.paconfirmPasswordssword ? errors.confirmPassword.message : ""}
                                        required
                                        type={showPasswordP2 ? "text" : "password"}

                                    />
                                )}
                            />
                            {/*    Submit*/}
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    mb: 4,
                                    height: 50,
                                    backgroundColor: "#3263b3",
                                    ":hover": {color: "gold"},
                                    fontSize: "1.2rem",
                                    color: "white",
                                }}
                            >
                                Reset Password
                            </Button>
                            <br/>
                            <Stack direction="row" spacing={4} justifyContent="space-between" sx={{mt: 2}}>
                                {/*    Back to login*/}
                                <Button
                                    type="submit"
                                    variant="text"
                                    sx={{
                                        mt: 3,
                                        height: 50,
                                        ":hover": {color: "gold"},
                                        color: "white",
                                    }} onClick={() => window.location = ('/login')}>
                                    Login
                                </Button>
                                <Button
                                    type="submit"
                                    size='small'
                                    variant="text"
                                    sx={{
                                        mt: 3,
                                        height: 50,
                                        ":hover": {color: "green"},
                                        color: "white",
                                    }} onClick={() => window.location = ('/resetpassword')}>

                                    <span> Didn&apos;t get the token?</span>
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
                {isSubmit && <LazyComponent Command='Submitting...'/>}
            </Box>
        </>
    )
}

export default SetPassword;