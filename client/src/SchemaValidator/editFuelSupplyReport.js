import * as yup from 'yup';

export const editFuelSupplyReportSchema = yup.object().shape({
    qtyInitial: yup.number().required('what is wrong here'),
    qtySupplied: yup.number().required(),
    qtyNew: yup.number().required(),
    dateSupplied: yup.string().required(),
    duration: yup.number().required(),
    nextDueDate: yup.string().required(),
    // cpd: yup.mixed().when('cpd', {
    //     is: (value) => value === 'Others',
    //     then: yup.number().required('Custom CPD is required').positive('CPD must be a positive number'),
    //     otherwise: yup.number().required('CPD is required').positive('CPD must be a positive number'),
    // }),
    cpd: yup.mixed().required('CPD is required').oneOf([50, 60, 100, 120, 'Others']),
    customCPD: yup.number().when('cpd', {
        is: 'Others',
        then: yup.number().required('Custom CPD is required').positive('CPD must be a positive number'),
        otherwise: yup.number(),
    }),
});
