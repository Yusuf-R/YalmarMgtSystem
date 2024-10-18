import * as yup from 'yup';

// Reusable Schema for AllStaff Information
const staffInfoSchema = yup.object().shape({
    staff_id: yup.string().required('AllStaff ID is required.'),
    fullName: yup.string().required('Full Name is required.'),
    email: yup.string().email('Invalid email format').required('Email is required.'),
    role: yup.string().required('Role is required.'),
});

// Validation Schema for AllStaff Incident
export const staffIncidentSchema = yup.object().shape({
    staffInfo: staffInfoSchema,
    staffIncidentInfo: yup.object().shape({
        classAction: yup
            .string()
            .oneOf(['Employment', 'Roles', 'Violence', 'Others'], 'Invalid class action')
            .required('AllStaff Incident class action is required.'),
        // Dynamically validate subcategory based on the selected classAction
        category: yup.lazy((value, {parent}) => {
            const {classAction} = parent;
            switch (classAction) {
                case 'Employment':
                    return yup.object().shape({
                        employment: yup
                            .string()
                            .oneOf(['Employed', 'Promoted', 'Demoted', 'Sacked', 'Resigned', 'Retired', 'Absconded', 'Others'], 'Invalid employment action')
                            .required('Employment action is required.'),
                    });
                case 'Roles':
                    return yup.object().shape({
                        role: yup
                            .string()
                            .oneOf(['Theft', 'Diversion', 'Conspiracy', 'Insubordination', 'Others'], 'Invalid role action')
                            .required('Role action is required.'),
                    });
                case 'Violence':
                    return yup.object().shape({
                        violence: yup
                            .string()
                            .oneOf(['Physical', 'Verbal', 'Sexual', 'Others'], 'Invalid violence action')
                            .required('Violence action is required.'),
                    });
                case 'Others':
                    return yup.object().shape({
                        others: yup.string().required('Other incident details are required.'),
                    });
                default:
                    return yup.mixed().notRequired();
            }
        }),
    }),
});
