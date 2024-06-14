import * as yup from 'yup';

export const newFuelSupplyReportSchema = yup.object().shape({
    siteId: yup.string().required(),
    state: yup.string().required(),
    cluster: yup.string().required(),
    location: yup.string().required(),
    // accepted values: 'TERMINAL', 'HUB', 'MAJOR-HUB', 'MGW', 'TERMINAL-HUB', 'BSC'
    type: yup.string().required().valueOf().oneOf(['TERMINAL', 'HUB', 'MAJOR-HUB', 'MGW', 'TERMINAL-HUB', 'BSC']),
    qtyInitial: yup.number().required(),
    qtySupplied: yup.number().required(),
    qtyNew: yup.number().required(),
    dateSupplied: yup.string().required(),
    duration: yup.number().required(),
    nextDueDate: yup.string().required(),
    cpd: yup.number().required(),
});
