import * as yup from "yup";

export const descriptionSchema = yup.object().shape({
    reportDescription: yup.string().required('Description is required'),
})