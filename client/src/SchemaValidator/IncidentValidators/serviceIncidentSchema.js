import * as yup from 'yup';

// Reusable Schema for the Service Site Information
const serviceSiteInfoSchema = yup.object().shape({
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

// Validation Schema for Service Incident
export const serviceIncidentSchema = yup.object().shape({
    serviceSiteInfo: serviceSiteInfoSchema,
    serviceIncidentInfo: yup.object().shape({
        category: yup
            .string()
            .oneOf(['Maintenance', 'Repair', 'Overhauling', 'Replacement', 'Others'], 'Invalid service category')
            .required('Service category is required'),
        
        subCategory: yup.mixed().test(
            'match-category',
            'Invalid subcategory details provided',
            function (value) {
                const {category} = this.parent;
                
                switch (category) {
                    case 'Maintenance':
                        return yup.object({
                            maintenance: yup.object({
                                action: yup
                                    .string()
                                    .oneOf(['Routine', 'Scheduled', 'Unscheduled'], 'Invalid maintenance action')
                                    .required('Maintenance action is required'),
                            }),
                        }).isValidSync(value);
                    
                    case 'Repair':
                        return yup.object({
                            repair: yup.object({
                                action: yup
                                    .string()
                                    .oneOf(['Minor', 'Major'], 'Invalid repair action')
                                    .required('Repair action is required'),
                            }),
                        }).isValidSync(value);
                    
                    case 'Overhauling':
                        return yup.object({
                            overhauling: yup.object({
                                action: yup
                                    .string()
                                    .oneOf(['Partial', 'Complete'], 'Invalid overhauling action')
                                    .required('Overhauling action is required'),
                            }),
                        }).isValidSync(value);
                    
                    case 'Replacement':
                        return yup.object({
                            replacement: yup.object({
                                action: yup
                                    .string()
                                    .oneOf(['Minor', 'Major'], 'Invalid replacement action')
                                    .required('Replacement action is required'),
                            }),
                        }).isValidSync(value);
                    
                    case 'Others':
                        return yup.object({
                            others: yup
                                .string()
                                .required('Other service category details are required'),
                        }).isValidSync(value);
                    
                    default:
                        return true;
                }
            }
        ),
    }),
});
