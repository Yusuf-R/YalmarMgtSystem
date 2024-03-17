import * as yup from "yup";

// schema for set new password
const schemaSetNewPassword = yup.object().shape({
    token: yup.string()
        .required("Token is required")
        .min(5, "Token must be 5 characters long")
        .max(5, "Token must be 5 characters long")
        .matches(
            /^[a-zA-Z0-9]{5}$/,
            "Token can only contain letters and numbers"
        ),
    password: yup.string()
        .required("Password is required")
        .min(5, "Password must be at least 5 characters long")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
            `Password must contain at least: 1 uppercase, 1 lowercase, 1 number and 1 special character`
        ),
    confirmPassword: yup.string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords must match")
})

const validateToken = {
    required: {
        value: true,
        message: 'Token is required.'
    },
    minLength: {
        value : 5,
        message: 'Token must be 5 characters long.'
    },
    maxLength: {
        value : 5,
        message: 'Token must be 5 characters long.'
    },
    pattern: {
        value:  /^[a-zA-Z0-9]{5}$/,
        message: 'Token must contain only letters and numbers'
    }
}

const validatePassword = {
    required: {
        value: true,
        message: 'Password is required.'
    },
    minLength: {
        value : 5,
        message: 'Password must be 5 characters long.'
    },
    pattern: {
        value:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
        message: 'Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character'
    }
}

const validateConfirmPassword = {
    required: {
        value: true,
        message: 'Confirm Password is required.'
    },
    minLength: {
        value : 5,
        message: 'Password must be 5 characters long.'
    },
    
    pattern: {
        value:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
        message: 'Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
    },
}



export {
    schemaSetNewPassword,
    validateToken,
    validatePassword,
    validateConfirmPassword
}