import * as yup from 'yup';

// Reusable Schema for the Fuel Site Information
const fuelSiteInfoSchema = yup.object().shape({
    site_id: yup.string().required('Site ID is required'),
    siteId: yup.string().required('Site ID is required'),
    state: yup.string().required('State is required').default('KADUNA'),
    cluster: yup
        .string()
        .required('Cluster is required')
        .oneOf(['BIRNIN-GWARI', 'KADUNA-CENTRAL', 'ZARIA'], 'Invalid cluster'),
    location: yup.string(),
    type: yup
        .string()
        .required('Type is required')
        .oneOf(['TERMINAL', 'HUB', 'MAJOR-HUB', 'MGW', 'TERMINAL-HUB', 'BSC'], 'Invalid site type'),
});

// Validation Schema for Fuel Incident
export const fuelIncidentSchema = yup.object().shape({
    fuelSiteInfo: fuelSiteInfoSchema,
    fuelIncidentInfo: yup.object().shape({
        category: yup
            .string()
            .oneOf(['Theft', 'Quality', 'Consumption', 'Intervention', 'Others'], 'Invalid fuel category')
            .required('Fuel category is required'),
        // Dynamically validate subcategory based on the selected category
        subCategory: yup.lazy((value, {parent}) => {
            const {category} = parent;
            
            switch (category) {
                case 'Theft':
                    return yup.object().shape({
                        theft: yup.object({
                            oldQty: yup.number().min(0, 'Old Quantity cannot be negative').required('Old Quantity is required'),
                            newQty: yup.number().min(0, 'New Quantity cannot be negative').required('New Quantity is required'),
                            qtyStolen: yup.number().min(0, 'Quantity stolen cannot be negative').required('Quantity stolen is required'),
                        }),
                    });
                case 'Quality':
                    return yup.object().shape({
                        quality: yup.object({
                            action: yup.string()
                                .oneOf(['Bad', 'Adulterated'], 'Invalid quality type')
                                .required('Quality type is required'),
                        }),
                    });
                case 'Intervention':
                    return yup.object().shape({
                        intervention: yup.object({
                            action: yup.string()
                                .oneOf(['Top-up', 'Emergency', 'Routine'], 'Invalid action type')
                                .required('Intervention action is required'),
                            oldQty: yup.number().min(0, 'Old Quantity cannot be negative').required('Old Quantity is required'),
                            newQty: yup.number().min(0, 'New Quantity cannot be negative').required('New Quantity is required'),
                            qtyAdded: yup.number().min(0, 'Quantity added cannot be negative').required('Quantity added is required'),
                        }),
                    });
                case 'Others':
                    return yup.object().shape({
                        others: yup.string().required('Other fuel category details are required'),
                    });
                default:
                    return yup.mixed().notRequired();
            }
        }),
    }),
});
