import styleForgot from "./ResetPassword.module.css"
import Link from "next/link"
import styleSetPassword from "@/components/SetPassword/SetPassword.module.css";
function ResetPassword() {
    return (
        <>
            <div className={styleForgot.container}>
                <div className={styleForgot.wrapper}>
                    <div className={styleForgot.formParent}>
                        <form action="">
                            <h5>Reset Password</h5>
                            <div className={styleForgot.inputBox}>
                                <input type="email" placeholder="Email" required={true}/>
                            </div>
                            <div className={styleForgot.btn}>
                                <Link href="/setpassword">
                                    <button>Submit</button>
                                </Link>
                            </div>
                        </form>
                </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword