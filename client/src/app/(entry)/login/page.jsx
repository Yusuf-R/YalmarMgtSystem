import Login from "../../../components/Login/Login";
import styleSignIn from "./SiginIn.module.css";
import { ToastContainer } from 'react-toastify';

function SignIn() {
    return (
        <>
            <div className={styleSignIn.singnIn}>
                <Login/>
            </div>
        </>
    )
}

export default SignIn;