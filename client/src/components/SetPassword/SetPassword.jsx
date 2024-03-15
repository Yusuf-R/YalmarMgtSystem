'use client';
import styleSetPassword from "./SetPassword.module.css";
import {MdOutlineMailLock} from "react-icons/md";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import {RiLockPasswordFill} from "react-icons/ri";
import Link from "next/link";
import { useRouter}  from "next/navigation";
import { useState} from "react"
import { useEffect } from "react";


function SetPassword() {
    const [email, setEmail] = useState('');
    const router = useRouter();
    // retrieve the email parameter
    const { query } = router;
    console.log(query);
    
    
    // useEffect(() => {
    //     if (router.query && router.query.email !== "") {
    //         setEmail(router.query.email);
    //     }
    // }, [router.query])
    
    return (
        <>
            <div className={styleSetPassword.container}>
                <div className={styleSetPassword.formParent}>
                    <div className={styleSetPassword.formParentMain}>
                        <form action="">
                            <h1>Set New Password</h1>
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