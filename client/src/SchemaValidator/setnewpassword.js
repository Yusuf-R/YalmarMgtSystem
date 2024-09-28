import * as yup from "yup";

// schema for set new password
export const schemaSetNewPassword = yup.object().shape({
    token: yup.string()
        .required("Token is required")
        .min(6, "Token must be 6 characters long")
        .max(6, "Token must be 6 characters long")
        .matches(
            /^[a-zA-Z0-9]{6}$/,
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
