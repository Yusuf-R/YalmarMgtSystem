"use client";
import styleLogin from "./Login.module.css";
import Link from "next/link";
import {MdOutlineMailLock} from "react-icons/md";
import styleSetPassword from "@/components/SetPassword/SetPassword.module.css";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schemaLogin} from "@/SchemaValidator/login";
import {useState} from "react";
import usePasswordToggle from "../../customHooks/usePasswordToggle";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {FcRedo} from "react-icons/fc";
import AdminUtils from "@/utils/AdminUtilities";


function Login() {
    const router = useRouter();
    // using react-hook-form to validate the form
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schemaLogin),
        reValidateMode: "onChange",
    });
    // using usePasswordToggle to toggle the visibility of the password
    const [rememberMe, setRememberMe] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    
    // using useMutation to send the data to the server, pass in email and password to the function
    const mutation = useMutation({
        mutationKey: ["login"],
        mutationFn: AdminUtils.StaffLogin,
    });
    
    
    const OnLogin = (loginData) => {
        // Disable the button to prevent multiple clicks
        setIsSubmit(true);
        console.log(loginData);
        // Call the mutate function to trigger the login request
        mutation.mutate(loginData, {
            onSuccess: (response) => {
                // Handle successful login
                if (response) {
                    toast.success("Login successful", {
                        icon: "🚀",
                    });
                    toast.success("Redirecting to dashboard", {
                        icon: <FcRedo/>,
                    });
                    Cookies.set("rememberMe", rememberMe ? "true" : "false", {
                        secure: true,
                        sameSite: "strict",
                    });
                    setTimeout(() => {
                        router.push("/dashboard");
                    }, 3000);
                } else {
                    toast.error("Unauthorized credentials");
                    setTimeout(() => {
                        router.push("/login");
                    }, 3000);
                    setIsSubmit(false);
                }
            },
            onError: (error) => {
                // Handle login error
                setIsSubmit(false);
                console.log('hehe');
                toast.error(error.message);
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
                
            },
        });
    };
    
    const {
        icon: passwordIcon,
        inputType: passwordInputType,
        toggleVisibility: togglePasswordVisibility,
    } = usePasswordToggle();
    const handleCheckBox = (e) => {
        setRememberMe(e.target.checked);
    };
    return (
        <>
            <div className={styleLogin.loginContainer}>
                <div className={styleLogin.wrapper}>
                    <div className={styleLogin.formParent}>
                        <form action="" onSubmit={handleSubmit(OnLogin)} noValidate={true}>
                            <h1>Login</h1>
                            <div className={styleLogin.inputBox}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    {...register("email")}
                                    style={{borderColor: errors.email ? "red" : "green"}}
                                />
                                <MdOutlineMailLock className={styleLogin.icons}/>
                            </div>
                            {errors.email && (
                                <p className={styleLogin.inputError}>{errors.email?.message}</p>
                            )}
                            <div className={styleLogin.inputBox}>
                                <input
                                    type={passwordInputType}
                                    placeholder="Password"
                                    {...register("password")}
                                    style={{borderColor: errors.password ? "red" : "green"}}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className={styleLogin.icons}
                                >
                                    {passwordIcon}
                                </button>
                            </div>
                            {errors.password && (
                                <p className={styleLogin.inputError}>
                                    {errors.password?.message}
                                </p>
                            )}
                            <div className={styleLogin.forgotPassword}>
                                <label className={styleLogin.checkBox}>
                                    <input type="checkbox" onClick={handleCheckBox}/>
                                    <h1>Remember me</h1>
                                </label>
                                <Link href="/resetpassword">
                                    <p> Forgot Password? </p>
                                </Link>
                            </div>
                            <div className={styleLogin.submitButton}>
                                <button disabled={isSubmit}>
                                    {isSubmit ? "Logging in..." : "Login"}
                                </button>
                            </div>
                        </form>
                        <br/>
                        <div>
                            <label className={styleSetPassword.lbl}>
                                <h5>Not Registered?</h5>
                                <Link href="/register" className={styleSetPassword.nextLink}>
                                    SignUp Here!
                                </Link>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
