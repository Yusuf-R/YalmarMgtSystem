'use client';
import styleSetPassword from "./SetPassword.module.css";
import {MdOutlineMailLock} from "react-icons/md";
import {MdOutlineGeneratingTokens} from "react-icons/md";
import {useState, useEffect} from "react"
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup";
import {
    schemaSetNewPassword,
    validateToken,
    validatePassword,
    validateConfirmPassword
} from "@/SchemaValidator/setnewpassword";
import Link from "next/link";
import usePasswordToggle from "../../customHooks/usePasswordToggle";
import {toast} from 'react-toastify';


function SetPassword() {
    const [email, setEmail] = useState("");
    const [tokenBorderColor, setTokenBorderColor] = useState("black");
    const [passwordBorderColor, setPasswordBorderColor] = useState("black");
    const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] = useState("black");
    const [tokenBorderWidth, setTokenBorderWidth] = useState("0px");
    const [passwordBorderWidth, setPasswordBorderWidth] = useState("0px");
    const [confirmPasswordBorderWidth, setConfirmPasswordBorderWidth] = useState("0px");
    
    // Use custom hook for password input
    const {
        icon: passwordIcon,
        inputType: passwordInputType,
        toggleVisibility: togglePasswordVisibility
    } = usePasswordToggle();
    // Use custom hook for confirm password input
    const {
        icon: confirmPasswordIcon,
        inputType: confirmPasswordInputType,
        toggleVisibility: toggleConfirmPasswordVisibility
    } = usePasswordToggle();
    const router = useRouter();
    const {register, handleSubmit, formState, watch} = useForm({
        mode: "onTouched",
        resolver: yupResolver(schemaSetNewPassword),
    })
    const {errors} = formState;
    const handleTokenBlur = (e) => {
        e.preventDefault();
        let {value} = e.target
        if (value) {
            if (value.length < validateToken.minLength.value) {
                setTokenBorderColor("green");
            } else {
                setTokenBorderColor("red");
                setTokenBorderWidth("4px");
            }
            if (value.length === validateToken.maxLength.value && value.match(validateToken.pattern.value)) {
                setTokenBorderColor("green");
            } else {
                setTokenBorderColor("red");
                setTokenBorderWidth("4px");
            }
        }
    }
    
    const handlePasswordBlur = (e) => {
        e.preventDefault();
        let {value} = e.target;
        if (value) {
            if (value.length >= validatePassword.minLength.value && value.match(validatePassword.pattern.value)) {
                setPasswordBorderColor("green");
            } else {
                setPasswordBorderColor("red");
                setPasswordBorderWidth("4px");
            }
        }
    }
    
    const handleConfirmPasswordBlur = (e) => {
        e.preventDefault();
        let {value} = e.target;
        if (value) {
            if (value === watch('password')) {
                setConfirmPasswordBorderColor("green");
            } else {
                setConfirmPasswordBorderColor("red");
                setConfirmPasswordBorderWidth("4px");
            }
        }
    }
    
    const onClickFxn = (data) => {
        data.email = email;
        toast.success("Password set successfully!")
        toast.success("Redirecting to login page 😎")
        router.push("/login");
    }
    
    useEffect(() => {
        const storageEmail = sessionStorage.getItem("email");
        if (storageEmail) {
            setEmail(storageEmail);
            // sessionStorage.removeItem("email");
        } else {
            router.push("/login");
        }
    }, [router]);
    
    return (
        <>
            <div className={styleSetPassword.container}>
                <div className={styleSetPassword.formParent}>
                    <div className={styleSetPassword.formParentMain}>
                        <form action="" onSubmit={handleSubmit(onClickFxn)} noValidate>
                            <h1>Set New Password</h1>
                            <div className={styleSetPassword.inputBox}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required={true}
                                    defaultValue={email}
                                    readOnly={true}
                                />
                                <MdOutlineMailLock className={styleSetPassword.icons}/>
                            </div>
                            <div className={styleSetPassword.inputBox}>
                                <input
                                    type="text"
                                    placeholder="Token"
                                    {...register("token")}
                                    style={{
                                        border: `${tokenBorderWidth} solid ${tokenBorderColor}`,
                                    }}
                                    onBlur={handleTokenBlur}
                                />
                                <MdOutlineGeneratingTokens className={styleSetPassword.icons}/>
                                {errors.token && <p className={styleSetPassword.inputError}>{errors.token?.message}</p>}
                            </div>
                            <div className={styleSetPassword.newPassword}>
                                
                                <input
                                    type={passwordInputType}
                                    placeholder="New Password"
                                    {...register("password")}
                                    style={{
                                        border: `${passwordBorderWidth} solid ${passwordBorderColor}`,
                                    }}
                                    onBlur={handlePasswordBlur}
                                />
                                <button type="button" onClick={togglePasswordVisibility}
                                        className={styleSetPassword.icons}>{passwordIcon}</button>
                                {errors.password &&
                                    <p className={styleSetPassword.inputError}>{errors.password?.message}</p>}
                            </div>
                            <div className={styleSetPassword.newPassword}>
                                <input
                                    type={confirmPasswordInputType}
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword")}
                                    style={{
                                        border: `${confirmPasswordBorderWidth} solid ${confirmPasswordBorderColor}`,
                                    }}
                                    onBlur={handleConfirmPasswordBlur}
                                />
                                <button type="button" onClick={toggleConfirmPasswordVisibility}
                                        className={styleSetPassword.icons}>{confirmPasswordIcon}</button>
                                {errors.confirmPassword &&
                                    <p className={styleSetPassword.inputError}>{errors.confirmPassword?.message}</p>}
                            </div>
                            <div className={styleSetPassword.btn}>
                                <button type={"submit"}>Submit</button>
                            </div>
                        </form>
                        <br/>
                        <div>
                            <label className={styleSetPassword.lbl}>
                                <h5>Didn&apos;t get the token?</h5>
                                <Link href="/resetpassword" className={styleSetPassword.nextLink}>
                                    click here
                                </Link>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {/*<DevTool control={control} placement="top-right" />*/}
        </>
    )
}

export default SetPassword;