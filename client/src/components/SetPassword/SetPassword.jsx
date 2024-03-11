import styleSetPassword from "./SetPassword.module.css";
import {MdOutlineMailLock} from "react-icons/md";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import {RiLockPasswordFill} from "react-icons/ri";
import Link from "next/link";
function SetPassword() {
    return (
        <>
            <div className={styleSetPassword.container}>
                <div className={styleSetPassword.formParent}>
                    <div className={styleSetPassword.formParentMain}>
                        <form action="">
                            <h5>Set New Password</h5>
                            <div className={styleSetPassword.inputBox}>
                                <input type="email" placeholder="Email" required={true}/>
                                <MdOutlineMailLock className={styleSetPassword.icons}/>
                            </div>
                            <div className={styleSetPassword.inputBox}>
                                <input type="text" placeholder="Token" required={true}/>
                                <MdOutlineGeneratingTokens className={styleSetPassword.icons}/>
                            </div>
                            <div className={styleSetPassword.newPassword}>
                                <input type="password" placeholder="New Password" required={true}/>
                                <RiLockPasswordFill className={styleSetPassword.icons}/>
                            </div>
                            <div className={styleSetPassword.newPassword}>
                                <input type="password" placeholder="Confirm Password" required={true}/>
                                <RiLockPasswordFill className={styleSetPassword.icons}/>
                            </div>
                            <div className={styleSetPassword.btn}>
                                <Link href="/login">
                                    <button>Submit</button>
                                </Link>
                            </div>
                        </form>
                        <br/>
                        <div>
                            <label className={styleSetPassword.lbl}>
                                <h5>Didn't get the token?</h5>
                                <Link href="/resetpassword" className={styleSetPassword.nextLink}>
                                    click here
                                </Link>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SetPassword;