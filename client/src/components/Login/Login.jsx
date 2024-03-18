'use client';
import styleLogin from './Login.module.css';
import Link from "next/link";
import { MdOutlineMailLock } from "react-icons/md";
import styleSetPassword from "@/components/SetPassword/SetPassword.module.css";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "@/SchemaValidator/login"
import { useState } from "react";
import usePasswordToggle from "../../customHooks/usePasswordToggle";
import { toast } from 'react-toastify';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schemaLogin),
    })
    const [ checkBox, setCheckBox ] = useState(false)
    
    const onLogin = (data) => {
        // display toast with a success
        toast.success(' Login successful!')
        data.isChecked = checkBox;
        console.log(data)
    }
    const { icon: passwordIcon, inputType: passwordInputType, toggleVisibility: togglePasswordVisibility } = usePasswordToggle();
    const handleCheckBox = (e) => {
        setCheckBox(e.target.checked);
    }
    return (
        <>
            <div className={styleLogin.loginContainer}>
                <div className={styleLogin.wrapper}>
                    <div className={styleLogin.formParent}>
                        <form action="" onSubmit={handleSubmit(onLogin)} noValidate={true}>
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
                            <div className={styleLogin.submitButton}>
                                <button>LOGIN</button>
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