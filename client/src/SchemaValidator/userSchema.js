import * as yup from 'yup';

export const userSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    firstName: yup.string().required('First Name is required'),
    middleName: yup.string(),  // Optional field
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    phone: yup.string().required('Phone Number is required'),
    dob: yup.date().required('Date of Birth is required'),
    gender: yup.string().required('Gender is required'),
    maritalStatus: yup.string().required('Marital Status is required'),
    religion: yup.string().required('Religion is required'),
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    lga: yup.string().required('LGA is required'),
    nextOfKin: yup.string().required('Next of Kin is required'),
    nextOfKinPhone: yup.string().required('Next of Kin Phone Number is required'),
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