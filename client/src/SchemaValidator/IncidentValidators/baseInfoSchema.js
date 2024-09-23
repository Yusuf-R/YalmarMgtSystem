import * as yup from "yup";

export const baseInfoSchema = yup.object().shape({
    adminFullName: yup.string().required("Admin full name is required"),
    adminEmail: yup.string().email("Invalid email format").required("Admin email is required"),
    adminRole: yup.string().required("Admin role is required"),
});

