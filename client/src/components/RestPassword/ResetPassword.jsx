'use client'
import styleForgot from "./ResetPassword.module.css"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import  { useState} from "react";
import { resetEmailValidator } from "@/SchemaValidator/resetpassword";

function ResetPassword() {
    const [borderColor, setBorderColor] = useState("black")
    const [typingTimeout, setTypingTimeout] = useState(null); // State for typing timeout
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            email: "",
        }
    });
    const { errors } = formState;
    const router = useRouter();
    
    const onClickFxn = (data) => {
        console.log(data);
        router.push("/setpassword");
    }
    const handleInputBlur = (e) => {
        const { value } = e.target;
        clearTimeout(typingTimeout);
        setTypingTimeout(setTimeout(() => {
            if (value) {
                setBorderColor("black");
                 if (value.match(resetEmailValidator.pattern.value)) {
                    setBorderColor("green");
                }
                else {
                    setBorderColor("red");
                }
            }
        }, 500));
    }
    
    return (
        <>
            <div className={styleForgot.container}>
                <div className={styleForgot.wrapper}>
                    <div className={styleForgot.formParent}>
                        <form action="" onSubmit={handleSubmit(onClickFxn)} noValidate>
                            <h5>Reset Password</h5>
                            <div className={styleForgot.inputBox}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    {...register("email", resetEmailValidator)}
                                    onBlur={handleInputBlur}
                                    style={{ borderColor: borderColor, borderWidth: "4px", borderStyle: "solid"}}
                                    />
                                {errors.email && <p className={styleForgot.emailError}>{errors.email.message}</p>}
                            </div>
                            
                            <div className={styleForgot.btn}>
                                <button type={"submit"} onSubmit={onClickFxn}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*<DevTool control={control} placement="top-right" />*/}
        </>
    )
}

export default ResetPassword