import * as yup from 'yup';

export const leaveRequestConfirmActionSchema = yup.object().shape({
    status: yup.string().required('Status is required'),
    adminAction: yup.string().required('Admin Action is required'),
});