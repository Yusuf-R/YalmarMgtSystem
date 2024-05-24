"use client";
import {useState} from "react";
import styleRegister from "./Register.module.css";
import Link from "next/link";
import {useForm} from "react-hook-form";
import Alert from "../../utils/AlertMessage"
import {
    Container,
    Box,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Divider,
    Chip,
    CardMedia,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material/";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {statesAndLGAs} from "@/utils/data";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
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
                    bgcolor: "#d9d9d9",
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
                        marginTop: "-70px",
                        bgcolor: "#d9d9d9"
                    }}
                >
                    <Typography variant="h4" sx={{fontWeight: "bold", color: "blue"}}>
                        Register
                    </Typography>
                    <Typography component="h1" sx={{fontWeight: "bold", color: "blue"}}>
                        Welcome!👏, get started{" "}
                    </Typography>
                    <Box component="form">
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <TextField
                                    InputProps={{sx: {color: "white"}}}
                                    margin="normal"
                                    fullWidth
                                    label="First Name"
                                    //   variant="outlined"
                                    autoComplete="First Name"
                                    autoFocus
                                    helperText="will put something there"
                                />
                                <TextField
                                    InputProps={{sx: {color: "white"}}}
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
                                    InputProps={{sx: {color: "white"}}}
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
                                        sx: {color: "white"},
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    arial-label="toggle pasword visibility"
                                                    onClick={handleClickShowPassword}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="medium"
                            sx={{
                                mt: 1,
                                mb: 3,
                                borderRadius: "30px",
                                padding: ".6rem 6rem",
                                width: "50%",
                                // textAlign: "left",
                            }}
                        >
                            Register
                        </Button>
                        <Typography
                            component="h5"
                            sx={{fontSize: ".8rem", marginBottom: "20px"}}
                        >
                            <Divider sx={{marginY: 2}}>
                                <Chip label="OR" size="medium"/>
                            </Divider>
                            <Alert
                                button={
                                    <Button
                                        variant="outlined"
                                        tabIndex={-1}
                                        sx={{borderRadius: "24px", marginY: 2}}
                                        startIcon={
                                            <CardMedia component="img"
                                                       image="/google.png"
                                                       alt="Image"
                                                       sx={{width: 24, height: 24}}
                                            />
                                        }
                                    >
                                        Sign Up with Google
                                    </Button>
                                }
                                message=" Sign Up with Google Coming Soon"
                            />
                        
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default Register;
