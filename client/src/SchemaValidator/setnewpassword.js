import * as yup from "yup";

// schema for set new password
const schemaSetNewPassword = yup.object().shape({
    email: yup.string().email().required("Provide a valid email address."),
    token: yup.string().required("Provide a valid token."),
    password: yup.string().required("Provide a valid password.").min(5, "Minimum of 5 chars"),
    confirmPassword: yup.string().required("Provide a valid password.").min(5, "Minimum of 5 chars"),
})

const validateEmail = {
    required: "Email is required",
    pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        message: "Invalid email address",
    }
};

const validateToken = {
    required: "Token is required",
    pattern: {
        value: /[a-zA-Z0-9.]{5}/,
        message: "Invalid token, Token must be 5 chars long",
    },
}

const validatePassword = {
    required: "Password is required",
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
        message: "Password must contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special character",
    },
}

const validateConfirmPassword = {
    required: "Confirm password is required",
    pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
        message: "Password must contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special character",
    },
}

export {
    schemaSetNewPassword,
    validateConfirmPassword,
    validateEmail,
    validatePassword,
    validateToken
}