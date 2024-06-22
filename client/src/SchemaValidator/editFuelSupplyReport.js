import * as yup from 'yup';

export const editFuelSupplyReportSchema = yup.object().shape({
    qtyInitial: yup.number().required('Initial Quantity is required').typeError('Initial Quantity must be a number'),
    qtySupplied: yup.number().required('Supplied Quantity is required').typeError('Supplied Quantity must be a number'),
    qtyNew: yup.number().required('New Available Quantity is required').typeError('New Available Quantity must be a number'),
    dateSupplied: yup.string().required('Date Supplied is required').typeError('Date Supplied must be a valid date'),
    duration: yup.number().required('Duration is required').typeError('Duration must be a number'),
    nextDueDate: yup.string().required('Next Due Date is required').typeError('Next Due Date must be a valid date'),
    cpd: yup.mixed().test('is-valid-cpd', 'CPD must be a positive number or "Others"', function (value) {
        if (value === 'Others') {
            return true;
        }
        return typeof value === 'number' && value > 0;
    }).required('CPD is required'),
});
