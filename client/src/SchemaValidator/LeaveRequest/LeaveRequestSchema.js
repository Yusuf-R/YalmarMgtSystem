import * as yup from 'yup';

export const leaveRequestSchema = yup.object().shape({
    fullName: yup.string()
        .matches(/^[A-Za-z\s-]+$/, 'First Name can only contain letters')
        .required('First Name is required'),
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    phone: yup.string().required('Phone Number is required'),
    startDate: yup.date().required('Start Date is required'),
    role: yup.string().required('Role is required'),
    endDate: yup.date().required('End Date is required'),
    leaveType: yup.string().required('Leave Type is required'),
    leaveReason: yup.string().required('Leave Type is required'),
    currentBalance: yup.number().required('Current Balance is required'),
    newBalance: yup.number().required('New Balance is required'),
    duration: yup.number().required('Duration is required'),
});


export const leaveRequestConfirmActionSchema = yup.object().shape({
    status: yup.string().required('Status is required'),
    adminAction: yup.string().required('Admin Action is required'),
});