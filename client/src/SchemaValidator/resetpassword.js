import * as yup from "yup";

const mySchema = yup.object().shape({
    email: yup.string().email().required()
})

const resetEmailValidator = {
    required: "Email is required",
    pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        message: "Invalid email address",
    }
};

export { mySchema, resetEmailValidator }