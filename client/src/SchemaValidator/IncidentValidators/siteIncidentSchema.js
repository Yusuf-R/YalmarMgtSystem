import * as yup from 'yup';

// Reusable Schema for the Site Information
const siteInfoSchema = yup.object().shape({
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

// Validation Schema for Site Incident
export const siteIncidentSchema = yup.object().shape({
    siteInfo: siteInfoSchema,
    siteIncidentInfo: yup.object().shape({
        category: yup
            .string()
            .oneOf(['Shelter', 'Security', 'Others'], 'Invalid site category')
            .required('Site category is required'),
        
        subCategory: yup.mixed().test(
            'match-category',
            'Invalid subcategory details provided',
            function (value) {
                const {category} = this.parent;
                switch (category) {
                    case 'Shelter':
                        return yup.object({
                            shelter: yup.string()
                                .oneOf(['Fire', 'Flooding', 'Structural-Damage', 'Others'], 'Invalid shelter action')
                                .required('Shelter action is required'),
                        }).isValidSync(value);
                    case 'Security':
                        return yup.object({
                            security: yup.string()
                                .oneOf(['Theft', 'Vandalism', 'Intrusion', 'Others'], 'Invalid security action')
                                .required('Security action is required'),
                        }).isValidSync(value);
                    case 'Others':
                        return yup.object({
                            others: yup.string()
                                .required('Other site category details are required'),
                        }).isValidSync(value);
                    default:
                        return true;
                }
            }
        ),
    }),
});
