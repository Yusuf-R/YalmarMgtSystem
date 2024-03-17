import * as yup from "yup"

const schemaLogin = yup.object().shape({
    email: yup.string().email("Invalid email").required("Provide a valid email address."),
    password: yup.string().required("Password is required")
})

export { schemaLogin }