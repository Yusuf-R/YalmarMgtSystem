import React from "react";
import { ToastContainer } from 'react-toastify';
function ToastProvider ({ children }) {
    return (
        <div>
            {children}
            <ToastContainer/>
        </div>
    )
}

export default ToastProvider