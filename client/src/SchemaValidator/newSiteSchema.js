import * as yup from 'yup';

export const newSiteSchema = yup.object().shape({
    siteId: yup.string().required('Site ID is required'),
    state: yup.string().required('State is required'),
    cluster: yup.string().required('Cluster is required'),
    location: yup.string().optional().nullable(),
    type: yup.string().required('Type is required'),
    status: yup.string().required('Status is required'),
    longitude: yup.number().optional().nullable(),
    latitude: yup.number().optional().nullable(),
    img: yup.string().optional().nullable(),
});