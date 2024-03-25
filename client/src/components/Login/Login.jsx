'use client';
import styleLogin from './Login.module.css';
import Link from "next/link";
import { MdOutlineMailLock } from "react-icons/md";
import styleSetPassword from "@/components/SetPassword/SetPassword.module.css";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "@/SchemaValidator/login"
import { useState, useEffect } from "react";
import usePasswordToggle from "../../customHooks/usePasswordToggle";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery, useMutation } from '@tanstack/react-query';
import UserLogin from '../../utils/authLogin'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import { FcRedo } from "react-icons/fc"

Cookies.defaults = {
    sameSite: 'None',
    secure: true,
    httpOnly: true,
};
function Login() {
    const router = useRouter();
    useEffect(() => {
        // clear all cookies before loading the login page
        Cookies.remove('email');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('userData');
        Cookies.remove('rememberMe');
    }, [])
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schemaLogin),
    })
    const [ rememberMe, setRememberMe ] = useState(false);
    const [ isSubmit , setIsSubmit ] = useState(false);
    // using useMutation to send the data to the server
    const mutation = useMutation({
        mutationKey: ['login'],
        mutationFn: UserLogin,
    })
    const OnLogin = (loginData) => {
        // Disable the button to prevent multiple clicks
        setIsSubmit(true);
        // Call the mutate function to trigger the login request
        mutation.mutate(loginData, {
            onSuccess: (response) => {
                // Handle successful login
                if (response) {
                    toast.success('Login successful', {
                        icon: "🚀",
                    });
                    toast.success('Redirecting to dashboard', {
                        icon: <FcRedo />,
                    });
                    // store the return credentials to the cookies
                    const { email, userData, accessToken, refreshToken } = response;
                    Cookies.set('email', email);
                    Cookies.set('userData', JSON.stringify(userData));
                    Cookies.set('accessToken', accessToken);
                    Cookies.set('refreshToken', refreshToken);
                    Cookies.set('rememberMe', rememberMe ? 'true' : 'false'); // Store remember me flag
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 3000);
                } else {
                    toast.error('Unauthorized credentials');
                    setTimeout(() => {
                        router.push('/login');
                    }, 3000);
                    setIsSubmit(false);
                }
            },
            onError: (error) => {
                // Handle login error
                toast.error(error.message);
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
                setIsSubmit(false);
            },
            
        });
    }
    
    const { icon: passwordIcon, inputType: passwordInputType, toggleVisibility: togglePasswordVisibility } = usePasswordToggle();
    const handleCheckBox = (e) => {
        setRememberMe(e.target.checked);
    }
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
                            {errors.email && <p className={styleLogin.inputError}>{errors.email?.message}</p>}
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
                            {errors.password && <p className={styleLogin.inputError}>{errors.password?.message}</p>}
                            <div className={styleLogin.forgotPassword}>
                                <label className={styleLogin.checkBox}>
                                <input type="checkbox"
                                       onClick={handleCheckBox}
                                />
                                    <h1>Remember me</h1>
                                </label>
                                <Link href="/resetpassword">
                                    <p> Forgot Password? </p>
                                </Link>
                            </div>
                            <div className={styleLogin.submitButton} >
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
    )
}

export default Login;