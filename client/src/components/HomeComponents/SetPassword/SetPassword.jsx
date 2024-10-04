'use client';
import {MdOutlineMailLock} from "react-icons/md";
import {MdOutlineGeneratingTokens} from "react-icons/md";
import React, {useState, useEffect} from "react"
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
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {keyframes} from "@mui/system";

// Define the rotation animation
const rotateAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

function SetPassword({decryptedEmail}) {
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
                    marginTop: xSmall ? 3 : small ? 8 : medium ? 15 : xWide ? 25 : ultraWide ? 35 : 15,
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
                            rowGap: "5px",
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
                        <Typography variant={xSmall || small || medium ? 'subtitle2' : "h6"}
                                    sx={{fontWeight: "bold", fontFamily: "Poppins", mt: 5, mb: 1}}>
                            Set New Password
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(SetPassword)} noValidate
                             sx={{m: 0.5}}>
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
                                        sx={{marginBottom: 3}}
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
                                            marginBottom: 3,
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
                                        sx={{marginBottom: 3}}
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
                                        sx={{marginBottom: 3}}
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
                                    height: xSmall || small ? 40 : medium ? 45 : 50,
                                    backgroundColor: '#3263b3',
                                    '&:hover': {backgroundColor: '#891f9c'},
                                    fontSize: xSmall ? '14px' : small ? '16px' : medium ? '18px' : '20px',
                                    color: 'white',
                                }}
                                disabled={isSubmit}
                            >
                                {isSubmit ? "Submitting in..." : "Submit"}
                            </Button>
                            <br/>
                            <Stack direction="row" spacing={2.5}
                                   justifyContent={"space-between"}
                                   sx={{mt: 2, mb: 3}}>
                                {/*Back to login*/}
                                <Button
                                    variant="text"
                                    sx={{
                                        fontSize: xSmall ? '10px' : small ? '12px' : medium ? '14px' : '16px',
                                        ":hover": {color: "gold"},
                                        color: "white",

                                    }} onClick={() => window.location = ('/login')}>
                                    Login
                                </Button>
                                <Button
                                    size='small'
                                    variant="text"
                                    sx={{
                                        fontSize: xSmall ? '10px' : small ? '12px' : medium ? '14px' : '16px',
                                        ":hover": {color: "green"},
                                        color: "white",
                                    }} onClick={() => window.location = ('/resetpassword')}>

                                    No token?
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