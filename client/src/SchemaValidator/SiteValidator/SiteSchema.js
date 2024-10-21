import * as yup from 'yup';

export const newSiteSchema = yup.object().shape({
    siteId: yup.string().required('AllSite ID is required'),
    state: yup.string().required('State is required'),
    cluster: yup.string().required('Cluster is required'),
    location: yup.string().optional().nullable(),
    type: yup.string().required('Type is required'),
    status: yup.string().required('Status is required'),
    longitude: yup.number().optional().nullable(),
    latitude: yup.number().optional().nullable(),
    img: yup.string().optional().nullable(),
});

// editsSite Schema
export const editSiteSchema = yup.object().shape({
    siteId: yup.string(), // Optional as it might not be changed during an edit
    state: yup.string().optional(), // State can be edited, but is optional
    cluster: yup.string().optional(), // Cluster can be edited, but is optional
    location: yup.string().optional().nullable(), // Location is optional
    type: yup.string().optional(), // Type is optional for editing
    status: yup.string().optional(), // Status is optional for editing
    longitude: yup.number().optional().nullable(), // Longitude is optional
    latitude: yup.number().optional().nullable(), // Latitude is optional
    img: yup.string().optional().nullable(), // Image is optional
});


