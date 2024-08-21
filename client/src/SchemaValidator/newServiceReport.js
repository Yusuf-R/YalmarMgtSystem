import * as yup from 'yup';

const validateGenHr = (value) => {
    if (value === '') {
        return true; // Allow empty value
    }
    return typeof value === 'number' || ["FAULTY-TELLYS", 'NOT-APPLICABLE'].includes(value);
};

const otherOpt = ['OK', 'NOT-OK', 'NOT-APPLICABLE']
const batOpt = ['YES', 'NO', 'NOT-APPLICABLE']

export const newServiceReportSchema = yup.object().shape({
    // Staff info
    fullName: yup.string().required('Staff full-name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    role: yup.string().required('Role is required'),
    
    // admin info
    adminFullName: yup.string().required('Staff full-name is required'),
    adminEmail: yup.string().email('Invalid email').required('Email is required'),
    adminRole: yup.string().required('Role is required'),
    
    // Site info
    siteId: yup.string().required('Site ID is required'),
    state: yup.string().required('State is required').default('KADUNA'),
    cluster: yup.string().oneOf(['BIRNIN-GWARI', 'KADUNA-CENTRAL', 'ZARIA'], 'Invalid cluster').required('Cluster is required'),
    location: yup.string(),
    siteType: yup.string().oneOf(['TERMINAL', 'HUB', 'MAJOR-HUB', 'MGW', 'TERMINAL-HUB', 'BSC'], 'Invalid site type').required('Site type is required').default('HUB'),
    shelterType: yup.string().oneOf(['Containerized', 'Open'], 'Invalid shelter type').required('Shelter type is required'),
    pmInstance: yup.string().oneOf(['PM1', 'PM2'], 'Invalid PM instance').required('PM instance is required'),
    
    // Service info
    servicingDate: yup.date().required('Service date is required'),
    nextServiceDate: yup.string().required('Next service date is required'),
    
    // siteGenModes
    siteGenModes: yup.string().oneOf(['GEN-1', 'GEN-1 and GEN-2'], 'Invalid site gen modes').required('Site gen modes is required'),
    
    // generator PM
    generatorPM: yup.object().shape({
        defaultOperation: yup.string().oneOf(['Gen1', 'Gen2'], 'Invalid default operation').required('Default operation is required'),
        gen1Type: yup.string().oneOf(['CAT',
            'MANTRAC',
            'LISTA-PETER',
            'FG-WILSON',
            'JUBALI-BROS',
            'MIKANO',
            'YOUNES',
            'PERKINGS',
            'SDMO',
            'OTHERS',
            'NOT-APPLICABLE',], 'Invalid gen1 type').required('Gen1 type is required'),
        gen1Display: yup.string().oneOf(['OK', 'NOT-OK', 'NOT-APPLICABLE'], 'Invalid gen1 display status').required('Gen1 display status is required'),
        gen1Hr: yup
            .string()
            .oneOf(['Enter Value', 'FAULTY-TELLYS', 'NOT-APPLICABLE'], 'Invalid selection for Gen1 hour')
            .required('Gen1 hour selection is required'),
        customGen1Hr: yup.number().when('gen1Hr', {
            is: 'Enter Value',
            then: () => yup.number().positive().required('Custom Gen1 hour is required'),
            otherwise: () => yup.number().strip(),
        }),
        gen1OperatingVoltage: yup.number().positive('Must be a positive number').required('Gen1 operating voltage is required'),
        gen1OperatingFrequency: yup.number().positive('Must be a positive number').required('Gen1 operating frequency is required'),
        gen1WorkingStatus: yup.string().oneOf(['OK', 'NOT-OK', 'WEAK-GEN', 'NOT-APPLICABLE'], 'Invalid gen1 working status').required('Gen1 working status is required'),
        gen2Type: yup.string().oneOf(['CAT',
            'MANTRAC',
            'LISTA-PETER',
            'FG-WILSON',
            'JUBALI-BROS',
            'MIKANO',
            'YOUNES',
            'PERKINGS',
            'SDMO',
            'OTHERS',
            'NOT-APPLICABLE',], 'Invalid gen2 type').required('Gen2 type is required'),
        gen2Display: yup.string().oneOf(['OK', 'NOT OK', 'NOT-APPLICABLE'], 'Invalid gen2 display status').required('Gen2 display status is required'),
        gen2Hr: yup
            .string()
            .oneOf(['Enter Value', 'FAULTY-TELLYS', 'NOT-APPLICABLE'], 'Invalid gen1 hour selection')
            .required('Gen2 hour selection is required'),
        customGen2Hr: yup.number().when('gen2Hr', {
            is: 'Enter Value',
            then: () => yup.number().positive().required('Custom Gen2 hour is required'),
            otherwise: () => yup.number().strip(),
        }),
        gen2OperatingVoltage: yup.number().when('gen2Type', {
            is: 'NOT-APPLICABLE',
            then: () => yup.number().oneOf([0], 'Must be zero when NOT-APPLICABLE'),
            otherwise: () => yup.number().positive('Must be a positive number').required('Gen2 operating voltage is required'),
        }),
        gen2OperatingFrequency: yup.number().when('gen2Type', {
            is: 'NOT-APPLICABLE',
            then: () => yup.number().oneOf([0], 'Must be zero when NOT-APPLICABLE'),
            otherwise: () => yup.number().positive('Must be a positive number').required('Gen2 operating frequency is required'),
        }),
        gen2WorkingStatus: yup.string().oneOf(['OK', 'NOT OK', 'WEAK GEN', 'NOT-APPLICABLE'], 'Invalid gen2 working status').required('Gen2 working status is required'),
    }),
    
    airconPM: yup.object().shape({
        acInstalled: yup.string().oneOf(['YES', 'NO', 'NOT-APPLICABLE'], 'Invalid AC installed status').required('AC installed status is required'),
        noOfACInstalled: yup
            .number()
            .when('acInstalled', {
                is: 'YES',
                then: () => {
                    yup
                        .number()
                        .positive('Must be a positive number')
                        .required('Number of AC installed is required')
                },
                otherwise: () => yup.number().default(0),
            }),
        ac1Status: yup.string().when('acInstalled', {
            is: 'YES',
            then: () => yup.string().oneOf(['OK', 'NOT-OK', 'NOT-APPLICABLE'], 'Invalid AC1 status').required('AC1 status is required'),
            otherwise: () => yup.string().nullable(),
        }),
        // Validate ac2Status when acInstalled is YES and noOfACInstalled is 2
        ac2Status: yup.string().when(['acInstalled', 'noOfACInstalled'], {
            is: (acInstalled, noOfACInstalled) => acInstalled === 'YES' && noOfACInstalled === 2,
            then: () =>
                yup
                    .string()
                    .oneOf(['OK', 'NOT-OK', 'NOT-APPLICABLE'], 'Invalid AC2 status')
                    .required('AC2 status is required'),
            otherwise: () => yup.string().nullable(),
        }),
    }),
    
    shelterPM: yup.object().shape({
        siteCleaningStatus: yup.string().oneOf(['OK', 'NOT-OK', 'NOT-APPLICABLE'], 'Invalid site cleaning status').required('Site cleaning status is required'),
        shelterCleaningStatus: yup.string().oneOf(['OK', 'NOT-OK', 'NOT-APPLICABLE'], 'Invalid shelter cleaning status').required('Shelter cleaning status is required'),
    }),
    
    lightningPM: yup.object().shape({
        securityLightAvailability: yup.string().oneOf(['YES', 'NO', 'NOT-APPLICABLE'], 'Invalid security light status').required('Security light availability is required'),
        securityLightStatus: yup.string().when('securityLightAvailability', {
            is: 'YES',
            then: () => yup.string().oneOf(['WORKING', 'NOT-WORKING', 'NOT-APPLICABLE'], 'Invalid security light status').required('Security light status is required'),
            otherwise: () => yup.string().nullable(),
        }),
        floodLightAvailability: yup.string().oneOf(['YES', 'NO', 'NOT-APPLICABLE'], 'Invalid flood light availability').required('Flood light availability is required'),
        // floodLightStatus should only be required when floodLightAvailability is YES
        floodLightStatus: yup.string().when('floodLightAvailability', {
                is: 'YES',
                then: () => yup.string().oneOf(['WORKING', 'NOT-WORKING', 'NOT-APPLICABLE'], 'Invalid flood light status').required('Flood light status is required'),
                otherwise: () => yup.string().nullable(),
            },
        ),
        
        awl: yup.string().oneOf(['WORKING', 'NOT-WORKING', 'NOT-APPLICABLE'], 'Invalid AWL status').required('AWL status is required'),
    }),
    
    dcSystem: yup.object().shape({
        
        rectifierStatus: yup.string().oneOf(otherOpt, 'Invalid rectifier status').required('Rectifier status is required'),
        backUpBatteries: yup.string().oneOf(batOpt, 'Invalid back up battery selection').required('Back up batteries is required'),
        batteryCount: yup.number().when('backUpBatteries', {
                is: 'YES',
                // its value must be a positive number of this value [4, 8, 12, 16, 24, 32, 48, 'NOT-APPLICABLE']
                then: () => yup.number().required('Number of batteries is required').positive('Must be a positive number').oneOf([0, 4, 8, 12, 16, 24, 32, 48], 'Invalid number of batteries'),
                otherwise: () => yup.number().nullable(),
            },
        ),
        batteryStatus: yup.string().when('backUpBatteries', {
                is: 'YES',
                then: () => yup.string().oneOf(otherOpt, 'Invalid battery status').required('Battery status is required'),
                otherwise: () => yup.string().nullable(),
            },
        ),
    }),
    
    otherPM: yup.object().shape({
        feederCableStatus: yup.string().oneOf(otherOpt, 'Invalid feeder cable status').required('Feeder cable status is required'),
        changeOverSwitchStatus: yup.string().oneOf(otherOpt, 'Invalid change over switch status').required('Change over switch status is required'),
        earthingCableStatus: yup.string().oneOf(otherOpt, 'Invalid earthing cable status').required('Earthing cable status is required'),
        earthingStatus: yup.string().oneOf(otherOpt, 'Invalid earthing status').required('Earthing status is required'),
        fireExtinguisherStatus: yup.string().oneOf(otherOpt, 'Invalid fire extinguisher status').required('Fire extinguisher status is required'),
    }),
    
    securityPM: yup.object().shape({
        securityStatus: yup.string().oneOf(['AVAILABLE', 'NOT-AVAILABLE', 'NOT-APPLICABLE'], 'Invalid security status').required('Security status is required'),
        siteAccess: yup.string().oneOf(['LOCKED', 'ACCESS-GRANTED', 'UN-AVAILABLE', 'NOT-APPLICABLE'], 'Invalid site access status').required('Site access status is required'),
    }),
    
    summary: yup.string().required('Summary is required'),
    images: yup.array().of(yup.string()).required('Images are required'),
});
