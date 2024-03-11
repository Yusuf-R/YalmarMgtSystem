import Login from "../../components/Login/Login";
import styleSignIn from "./SiginIn.module.css";

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