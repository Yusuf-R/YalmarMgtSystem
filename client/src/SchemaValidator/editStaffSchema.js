import * as yup from 'yup';

export const editStaffSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    firstName: yup.string()
        .matches(/^[A-Za-z\s-]+$/, 'First Name can only contain letters')
        .required('First Name is required'),
    middleName: yup.string()
        .nullable()
        .test('is-valid', 'Middle Name can only contain letters', value => !value || /^[A-Za-z\s-]+$/.test(value)),
    lastName: yup.string()
        .matches(/^[A-Za-z\s-]+$/, 'Last Name can only contain letters')
        .required('Last Name is required'),
    email: yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    phone: yup.string()
        .min(11, 'Phone number must be at least 11 characters')
        .max(11, 'Phone number must not exceed 11 characters')
        .required('Phone Number is required'),
    dob: yup.date().required('Date of Birth is required'),
    status: yup.string().required('Status is require'),
    gender: yup.string().required('Gender is required'),
    maritalStatus: yup.string().required('Marital Status is required'),
    religion: yup.string().required('Religion is required'),
    country: yup.string().required('Country is required'),
    stateOfOrigin: yup.string().required('State of Origin is required'),
    lga: yup.string().required('LGA is required'),
    nextOfKin: yup.string()
        .matches(/^[A-Za-z\s-]+$/, 'Next of Kin can only contain letters')
        .required('Next of Kin is required'),
    nextOfKinPhone: yup.string()
        .min(11, 'Phone number must be at least 11 characters')
        .max(11, 'Phone number must not exceed 11 characters')
        .required('Next of Kin Phone Number is required'),
    nextOfKinRelationship: yup.string().required('Next of Kin Relationship is required'),
    address: yup.string().required('Address is required'),
    stateOfResidence: yup.string().required('State of Residence is required'),
    employmentType: yup.string().required('Employment Type is required'),
    role: yup.string().required('Role is required'),
    siteState: yup.string().when('role', {
        is: (role) => role === 'Field Supervisor' || role === 'Generator Technician',
        then: () => yup.string().required('Site State is required'),
        otherwise: () => yup.string().notRequired(),
    }),
    cluster: yup.string().when('role', {
        is: (role) => role === 'Field Supervisor' || role === 'Generator Technician',
        then: () => yup.string().required('Cluster is required'),
        otherwise: () => yup.string().notRequired(),
    }),
    siteID: yup.array().when('role', {
        is: (role) => role === 'Field Supervisor' || role === 'Generator Technician',
        then: () => yup.array().of(yup.string()).min(1, 'Site ID is required').required('Site ID is required'),
        otherwise: () => yup.array().of(yup.string()).notRequired(),
    }),
});