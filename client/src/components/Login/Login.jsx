import styleLogin from './Login.module.css';
import Link from "next/link";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineMailLock } from "react-icons/md";
import styleSetPassword from "@/components/SetPassword/SetPassword.module.css";

function Login() {
    return (
        <>
            <div className={styleLogin.loginContainer}>
                <div className={styleLogin.wrapper}>
                    <div className={styleLogin.formParent}>
                        <form action="">
                            <h1>Login</h1>
                            <div className={styleLogin.inputBox}>
                                <input type="email" placeholder="Email" required={true}/>
                                <MdOutlineMailLock className={styleLogin.icons}/>
                            </div>
                            <div className={styleLogin.inputBox}>
                                <input type="password" placeholder="Password" required={true}/>
                                <RiLockPasswordFill className={styleLogin.icons}/>
                            </div>
                            <div className={styleLogin.forgotPassword}>
                                <label className={styleLogin.checkBox}>
                                    <input type="checkbox"/>
                                    <h1>Remember me</h1>
                                </label>
                                <Link href="/resetpassword">
                                    <p> Forgot Password? </p>
                                </Link>
                            </div>
                            <div className={styleLogin.submitButton}>
                                <button type="submit">LOGIN</button>
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