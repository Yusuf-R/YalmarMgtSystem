'use client'
import styleForgot from "./ResetPassword.module.css"
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import  { useState} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {schemaResetPassword, validateEmail} from "@/SchemaValidator/resetpassword";
import { toast } from 'react-toastify';
import {BsRocketTakeoff, BsRocketTakeoffFill} from "react-icons/bs";

function ResetPassword(href, options) {
    const [borderColor, setBorderColor] = useState("black")
    const [typingTimeout, setTypingTimeout] = useState(null); // State for typing timeout
    const { register, handleSubmit, formState } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schemaResetPassword),
    });
    const { errors } = formState;
    const router = useRouter();
    
    const onClickFxn = (data) => {
        const { email } = data;
        sessionStorage.setItem("email", email);
        toast.info ("Reset token sent to your email", {
            style: {
                width: '20vw',
                border : '2px solid cyan',
            },
            icon: <BsRocketTakeoff className={styleForgot.icons}/>
        })
        router.push(`/setpassword`);
    }
    const handleInputBlur = (e) => {
        const { value } = e.target;
        clearTimeout(typingTimeout);
        setTypingTimeout(setTimeout(() => {
            if (value) {
                 if (value.match(validateEmail.pattern.value)) {
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
                                    {...register("email", validateEmail)}
                                    onBlur={handleInputBlur}
                                    style={{ borderColor: borderColor, borderWidth: "4px", borderStyle: "solid"}}
                                    />
                                {errors.email && <p className={styleForgot.emailError}>{errors.email?.message}</p>}
                            </div>
                            <div className={styleForgot.btn}>
                                <button type={"submit"}>Submit</button>
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