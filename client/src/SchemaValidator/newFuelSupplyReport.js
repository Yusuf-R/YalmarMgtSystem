import * as yup from 'yup';

export const newFuelSupplyReportSchema = yup.object().shape({
    siteId: yup.string().required(),
    state: yup.string().required(),
    cluster: yup.string().required(),
    location: yup.string().required(),
    type: yup.string().required().valueOf().oneOf(['TERMINAL', 'HUB', 'MAJOR-HUB', 'MGW', 'TERMINAL-HUB', 'BSC', 'PLATINUM']),
    qtyInitial: yup.number().required(),
    qtySupplied: yup.number().required(),
    qtyNew: yup.number().required(),
    dateSupplied: yup.string().required(),
    duration: yup.number().required(),
    nextDueDate: yup.string().required(),
    cpd: yup.mixed().test('is-valid-cpd', 'CPD must be a positive number', function (value) {
        if (value === 'Others') {
            return !!this.parent.customCPD && this.parent.customCPD > 0;
        }
        return typeof value === 'number' && value > 0;
    }),
});
