import * as yup from "yup";

const schemaResetPassword = yup.object().shape({
    email: yup.string().email().required("Provide a valid email address.")
})

const validateEmail = {
    required: "Email is required",
    pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        message: "Invalid email address",
    }
};

export { schemaResetPassword, validateEmail }