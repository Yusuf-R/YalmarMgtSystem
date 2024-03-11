import styleRegister from './Register.module.css';
import Link from "next/link";

function Register() {
    return (
        <>
            <div className={styleRegister.registerContainer}>
                <div>
                    <h3>
                        Register to YALMAR Management System
                    </h3>
                </div>
                <div>
                    <p>
                        Already registered?{' '}
                        <Link href="/login">
                            Click here to login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register;