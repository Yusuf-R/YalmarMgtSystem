'use client';
import React, { useState } from 'react';
import { BsFillEyeFill } from "react-icons/bs";
import { HiEyeOff } from "react-icons/hi";

const usePasswordToggle = () => {
    const [visible, setVisibility] = useState(false);
    const icon = visible ? <BsFillEyeFill /> : <HiEyeOff />;
    const inputType = visible ? "text" : "password";
    const toggleVisibility = () => setVisibility(!visible);
    return {
        icon,
        inputType,
        toggleVisibility
    }
}
export default usePasswordToggle;
