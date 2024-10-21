import * as yup from 'yup';

export const newStaffSchema = yup.object().shape({
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
    highestDegree: yup.string().required('Highest Degree is required'),
    institution: yup.string().required('Institution is required'),
    faculty: yup.string().required('Faculty is required'),
    courseOfStudy: yup.string().required('Course of Study is required'),
    graduationDate: yup.date().required('Graduation Date is required'),
    employmentDate: yup.date().required('Employment Date is required'),
    classofDegree: yup.string().required('Class of Degree is required'),
    country: yup.string().required('Country is required'),
    stateOfOrigin: yup.string().required('State of Origin is required'),
    lga: yup.string().required('LGA is required'),
    nextOfKin: yup.string()
        .matches(/^[A-Za-z\s-]+$/, 'Next of Kin can only contain letters')
        .required('Next of Kin is required'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,30}$/, 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'),
    // confirmPassword: yup.string()
    //     .required('Confirm Password is required')
    //     .oneOf([yup.ref('password')], 'Passwords must match'),
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
        then: () => yup.string().required('AllSite State is required'),
        otherwise: () => yup.string().notRequired(),
    }),
    cluster: yup.string().when('role', {
        is: (role) => role === 'Field Supervisor' || role === 'Generator Technician',
        then: () => yup.string().required('Cluster is required'),
        otherwise: () => yup.string().notRequired(),
    }),
    siteID: yup.array().when('role', {
        is: (role) => role === 'Field Supervisor' || role === 'Generator Technician',
        then: () => yup.array().of(yup.string()).min(1, 'AllSite ID is required').required('AllSite ID is required'),
        otherwise: () => yup.array().of(yup.string()).notRequired(),
    }),
});

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
        then: () => yup.string().required('AllSite State is required'),
        otherwise: () => yup.string().notRequired(),
    }),
    cluster: yup.string().when('role', {
        is: (role) => role === 'Field Supervisor' || role === 'Generator Technician',
        then: () => yup.string().required('Cluster is required'),
        otherwise: () => yup.string().notRequired(),
    }),
    siteID: yup.array().when('role', {
        is: (role) => role === 'Field Supervisor' || role === 'Generator Technician',
        then: () => yup.array().of(yup.string()).min(1, 'AllSite ID is required').required('AllSite ID is required'),
        otherwise: () => yup.array().of(yup.string()).notRequired(),
    }),
});