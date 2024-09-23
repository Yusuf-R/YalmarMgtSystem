import * as yup from 'yup';

export const categorySelectorSchema = yup.object().shape({
    severity: yup.string().required('Severity is required'),
    reportCategory: yup
        .array()
        .of(
            yup
                .string()
                .oneOf(['Staff', 'Fuel', 'Service', 'Site', 'Others'], 'Invalid category')
        )
        .min(1, 'Select at least one category')
        .required('Category is required'),
    incidentDate: yup.date().required('Incident date is required'),
});
