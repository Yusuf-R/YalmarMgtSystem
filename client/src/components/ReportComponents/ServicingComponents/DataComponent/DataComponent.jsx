'use client';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import {Controller, useForm, useWatch} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import AdminUtils from "@/utils/AdminUtilities";
import {toast} from "react-toastify";
import {mainSection} from "@/utils/data"
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {useState, useEffect} from "react";
import DateComponent from "@/components/DateComponent/DateComponent";
import dayjs from "dayjs";
import {newServiceReportSchema} from "@/SchemaValidator/newServiceReport";

const siteShelterType = ['Containerized', 'Open'];
const pmInstance = ['PM1', 'PM2'];
const opt1 = ['OK', "NOT-OK", 'NOT-APPLICABLE'];
const opt2 = ['YES', 'NO', 'NOT-APPLICABLE'];
const genOpt = [
    'CAT',
    'MANTRAC',
    'LISTA-PETER',
    'FG-WILSON',
    'JUBALI-BROS',
    'MIKANO',
    'YOUNES',
    'PERKINGS',
    'SDMO',
    'OTHERS',
    'NOT-APPLICABLE'
];
const genWorkStatus = ['OK', 'NOT-OK', 'WEAK-GEN', 'NOT-APPLICABLE'];
const securityOpt = ['LOCKED', "ACCESS-GRANTED", 'UN-AVAILABLE', 'NOT-APPLICABLE'];
const securityOpt1 = ['AVAILABLE', "NOT-AVAILABLE", 'NOT-APPLICABLE'];
const lightOpt = ['WORKING', "NOT-WORKING", 'NOT-APPLICABLE'];
const defaultOpt = ['Gen1', 'Gen2'];
const genWorkingHr = ['Enter Value', 'FAULTY-TELLYS', 'NOT-APPLICABLE',];
const siteGenModes = ['GEN-1', 'GEN-1 and GEN-2',];
const noOfAc = [1, 2];
const batCount = [4, 8, 12, 16, 32, 48];

function DataComponent({allStaff, allSite, formData, handleInputChange, handleNextStep}) {
    const router = useRouter();
    // staff info
    const [staffFullName, setStaffFullName] = useState('');
    const [staffEmail, setStaffEmail] = useState('');
    const [staffRole, setStaffRole] = useState('');

    // site info
    const [stateMain, setStateMain] = useState('');
    const [cluster, setClusterType] = useState('');
    const [siteID, setSiteID] = useState('');
    const [siteType, setSiteType] = useState('');
    const [location, setLocation] = useState('');

    // servicing info
    const [shelterStructure, setShelterStructure] = useState('');
    const [pmType, setPmType] = useState('');
    const [servicingDate, setServicingDate] = useState(null);

    // gen section
    const [genModes, setGenModes] = useState('');
    const [defaultOperation, setDefaultOperation] = useState('');

    // gen 1
    const [gen1Type, setGen1Type] = useState('');
    const [gen1Hr, setGen1Hr] = useState('');
    const [gen1Display, setGen1Display] = useState('');
    const [gen1WorkingStatus, setGen1WorkingStatus] = useState('');

    //gen 2
    const [gen2Type, setGen2Type] = useState('');
    const [gen2Hr, setGen2Hr] = useState('');
    const [gen2Display, setGen2Display] = useState('');
    const [gen2WorkingStatus, setGen2WorkingStatus] = useState('');

    // AC PM
    const [acInstalled, setAcInstalled] = useState('');
    const [noOfAcInstalled, setNoOfAcInstalled] = useState('');
    const [ac1Status, setAc1Status] = useState('');
    const [ac2Status, setAc2Status] = useState('');

    // shelter PM
    const [siteCleaningStatus, setSiteCleaningStatus] = useState('');
    const [shelterCleaningStatus, setShelterCleaningStatus] = useState('');

    // Light
    const [awlWorkingStatus, setAwlWorkingStatus] = useState('');
    const [securityLightAvailability, setSecurityLightAvailability] = useState('');
    const [securityLightStatus, setSecurityLightStatus] = useState('');
    const [floodLightAvailability, setFloodLightAvailability] = useState('');
    const [floodLightStatus, setFloodLightStatus] = useState('');

    // DC system PM
    const [backUpBatteries, setBackUpBatteries] = useState('');
    const [count, setCount] = useState('');
    const [status, setStatus] = useState('');
    const [rectifierStatus, setRectifierStatus] = useState('');

    // other PM
    const [feederCableStatus, setFeederCableStatus] = useState('');
    const [changeOverSwitchStatus, setChangeOverSwitchStatus] = useState('');
    const [earthingStatus, setEarthingStatus] = useState('');
    const [earthingCableStatus, setEarthingCableStatus] = useState('');
    const [fireExtinguisherStatus, setFireExtinguisherStatus] = useState('');

    // Security PM
    const [securityStatus, setSecurityStatus] = useState('');
    const [siteAccess, setSiteAccess] = useState('');

    // admin only
    const [adminFullName, setAdminFullName] = useState('');
    const [adminEmail, setAdminEmail] = useState('');
    const [adminRole, setAdminRole] = useState('');

    const {
        control, handleSubmit, formState: {errors}, setError, reset, setValue, clearErrors,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(newServiceReportSchema),
        reValidateMode: "onChange",
        // set defaultValues to '' to the entirety of the form
        defaultValues: formData,
    });
    // Synchronize useForm values with formData
    useEffect(() => {
        reset(formData);
    }, [formData, reset]);

    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
        width: '250px',
        fontSize: '16px',
        fontStyle: 'bold',
        '&:hover': {
            bgcolor: '#051935',
        },
        fontFamily: 'Poppins',
        "& .MuiInputBase-input": {
            color: 'white',
        },
        "& .MuiFormHelperText-root": {
            color: 'red',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: 'green',
        },
        "& input:-webkit-autofill": {
            WebkitBoxShadow: '0 0 0 1000px #274e61 inset',
            WebkitTextFillColor: 'white',
        },
    }
    // AllStaff info Section
    const fullNames = Array.from(new Set(allStaff.map(staff => staff.fullName)));
    // load only the fullNames whose roles are 'Admin' or SuperAdmin
    const adminFullNames = allStaff.filter(staff => staff.role === 'Admin' || staff.role === 'SuperAdmin').map(staff => staff.fullName);
    // extract the staff._id from allStaff base on the selected fullName
    const staff_id = allStaff.filter(staff => staff.fullName === staffFullName).map(staff => staff._id)[0];
    const admin_id = allStaff.filter(staff => staff.fullName === adminFullName).map(staff => staff._id)[0];

    // staff fullName
    const getFullName = () => {
        return fullNames.map((fullName) => (
            <MenuItem key={fullName} value={fullName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {fullName}
            </MenuItem>
        ));
    };
    const handleFullName = (event) => {
        event.preventDefault();
        const selectedFullName = event.target.value;
        const selectedStaff = allStaff.find(staff => staff.fullName === selectedFullName);

        if (selectedStaff) {
            const selectedEmail = selectedStaff.email;
            const selectedRole = selectedStaff.role;

            handleInputChange('fullName', selectedFullName);
            handleInputChange('email', selectedEmail);
            handleInputChange('role', selectedRole);

            setValue('email', selectedEmail);
            setValue('role', selectedRole);
            clearErrors('email');
            clearErrors('role');
        }
    };

    // admin FullName
    const getAdminFullName = () => {
        return adminFullNames.map((fullName) => (
            <MenuItem key={fullName} value={fullName}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {fullName}
            </MenuItem>
        ));
    };
    const handleAdminFullName = (event) => {
        event.preventDefault();
        const selectedAdminFullName = event.target.value;
        const selectedAdmin = allStaff.find(staff => staff.fullName === selectedAdminFullName);

        if (selectedAdmin) {
            const selectedAdminEmail = selectedAdmin.email;
            const selectedAdminRole = selectedAdmin.role;

            handleInputChange('adminFullName', selectedAdminFullName);
            handleInputChange('adminEmail', selectedAdminEmail);
            handleInputChange('adminRole', selectedAdminRole);

            setValue('adminEmail', selectedAdminEmail);
            setValue('adminRole', selectedAdminRole);
            clearErrors('adminEmail');
            clearErrors('adminRole');
        }
    };

    // Site Info Section
    const states = Array.from(new Set(allSite.map(site => site.state)));
    const clusters = Array.from(new Set(allSite.filter(site => site.state === stateMain).map(site => site.cluster)));
    const siteIds = allSite.filter(site => site.cluster === cluster).map(site => site.siteId);
    // extract the site._id from allSite base on the selected siteIds
    const site_id = allSite.filter(site => site.siteId === siteID).map(site => site._id)[0];

    // site State
    const getState = () => {
        return states.map((stateData) => (
            <MenuItem key={stateData} value={stateData}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {stateData}
            </MenuItem>
        ));
    };
    const handleState = (event) => {
        event.preventDefault();
        setStateMain(event.target.value);
        setClusterType('');
        setSiteID('');
        setSiteType('N/A');
        setLocation('N/A');
    };

    // site cluster
    const getCluster = () => {
        if (!stateMain) {
            return [];
        }
        return clusters.map((clusterData) => (
            <MenuItem key={clusterData} value={clusterData}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {clusterData}
            </MenuItem>
        ));
    };
    const handleCluster = (event) => {
        event.preventDefault();
        setClusterType(event.target.value);
        setSiteID('');
        setSiteType('N/A');
        setLocation('N/A');
    };

    // site ID
    const getSiteId = () => {
        if (!stateMain || !cluster) {
            return [];
        }
        return siteIds.map((siteIdData) => (
            <MenuItem key={siteIdData} value={siteIdData}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {siteIdData}
            </MenuItem>
        ));
    };
    const handleSiteId = (event) => {
        event.preventDefault();
        setSiteID(event.target.value);
        const selectedSiteId = event.target.value;
        setSiteID(selectedSiteId);
        const selectedSite = allSite.find(site => site.siteId === selectedSiteId);
        if (selectedSite) {
            const newLocation = selectedSite.location || 'N/A';
            const newSiteType = selectedSite.type || 'N/A';
            setLocation(newLocation);
            setSiteType(newSiteType);
            setValue('location', newLocation);
            setValue('siteType', newSiteType);
            // Clear errors for location and type
            clearErrors('location');
            clearErrors('siteType');
        } else {
            setSiteType('N/A');
            setLocation('N/A');
        }
    };

    // servicing section
    const getShelterType = () => {
        return siteShelterType.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleShelterType = (event) => {
        event.preventDefault();
        setShelterStructure(event.target.value);
    }

    // pm section
    const getPmType = () => {
        return pmInstance.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handlePmType = (event) => {
        event.preventDefault();
        setPmType(event.target.value);
    }

    // genPm Section
    // site gen modes
    const getSiteGenModes = () => {
        return siteGenModes.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleSiteGenModes = (event) => {
        event.preventDefault();
        setGenModes(event.target.value);
    }
    // default Opt
    const getGenDefaultOperation = () => {
        return defaultOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleDefaultOperation = (event) => {
        event.preventDefault();
        setDefaultOperation(event.target.value);
    }

    // gen1 type
    const getGen1Type = () => {
        return genOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen1Type = (event) => {
        event.preventDefault();
        setGen1Type(event.target.value);
    }
    // gen1 display
    const getGen1Display = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen1Display = (event) => {
        event.preventDefault();
        setGen1Display(event.target.value);
    }
    // gen1 working hours
    // const gen1Hr = useWatch({control, name: 'generatorPM.gen1Hr'});

    const getGen1Hr = () => {
        return genWorkingHr.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen1Hr = (event) => {
        event.preventDefault();
        const selectedValue = event.target.value;
        setGen1Hr(selectedValue);

        if (selectedValue !== 'Enter Value') {
            clearErrors('generatorPM.gen1Hr');
            setValue('generatorPM.customGen1Hr', null);
        }
    }

    // gen1 working status
    const getGen1WorkingStatus = () => {
        return genWorkStatus.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen1WorkingStatus = (event) => {
        event.preventDefault();
        setGen1WorkingStatus(event.target.value);
    }

    // gen2 type
    const getGen2Type = () => {
        return genOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen2Type = (event) => {
        event.preventDefault();
        setGen2Type(event.target.value);
    }
    // gen2 display
    const getGen2Display = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen2Display = (event) => {
        event.preventDefault();
        setGen2Display(event.target.value);
    }

    // gen2 working hour
    const getGen2Hr = () => {
        return genWorkingHr.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen2Hr = (event) => {
        event.preventDefault();
        const selectedValue = event.target.value;

        setGen2Hr(selectedValue);
        if (selectedValue !== 'Enter Value') {
            setValue('generatorPM.customGen2Hr', null);
        }
    }
    // gen2 working status
    const getGen2WorkingStatus = () => {
        return genWorkStatus.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleGen2WorkingStatus = (event) => {
        event.preventDefault();
        setGen2WorkingStatus(event.target.value);
    }

    useEffect(() => {
        const calculatedNextDueDate = servicingDate ? dayjs(servicingDate).add(14, 'day').format('DD/MMM/YYYY') : '';
        setValue('nextServiceDate', calculatedNextDueDate);
        // clear any nextServiceDate error
        clearErrors('nextServiceDate');
    }, [servicingDate, setValue, clearErrors]);

    // Ac PM
    // ac installed
    const getAcInstalled = () => {
        return opt2.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleAcInstalled = (event) => {
        event.preventDefault();
        setAcInstalled(event.target.value);
    }
    // no of AC
    const getNoOfAc = () => {
        return noOfAc.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleNoOfAc = (event) => {
        event.preventDefault();
        setNoOfAcInstalled(event.target.value);
    }

    // Ac1 status
    const getAc1Status = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleAc1Status = (event) => {
        event.preventDefault();
        setAc1Status(event.target.value);
    }

    // Ac2 status
    const getAc2Status = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleAc2Status = (event) => {
        event.preventDefault();
        setAc2Status(event.target.value);
    }

    // shelter PM
    // cleaning status
    // Site
    const getSiteCleaningStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleSiteCleaningStatus = (event) => {
        event.preventDefault();
        setSiteCleaningStatus(event.target.value);
    }
    // Shelter
    const getShelterCleaningStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleShelterCleaningStatus = (event) => {
        event.preventDefault();
        setShelterCleaningStatus(event.target.value);
    }

    // Light PM
    // security light availability
    const getSecurityLightAvailability = () => {
        return opt2.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleSecurityLightAvailability = (event) => {
        event.preventDefault();
        setSecurityLightAvailability(event.target.value);
    }
    // security light status
    const getSecurityLightStatus = () => {
        return lightOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleSecurityLightStatus = (event) => {
        event.preventDefault();
        setSecurityLightStatus(event.target.value);
    }
    // floodlight availability
    const getFloodLightAvailability = () => {
        return opt2.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleFloodLightAvailability = (event) => {
        event.preventDefault();
        setFloodLightAvailability(event.target.value);
    }
    // floodlight status
    const getFloodLightStatus = () => {
        return lightOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleFloodLightStatus = (event) => {
        event.preventDefault();
        setFloodLightStatus(event.target.value);
    }

    // light PM
    //awl working status
    const getAwlWorkingStatus = () => {
        return lightOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleAwlWorkingStatus = (event) => {
        event.preventDefault();
        setAwlWorkingStatus(event.target.value);
    }

    // DC system PM
    // back up batteries
    const getBackUpBatteries = () => {
        return opt2.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleBackUpBatteries = (event) => {
        event.preventDefault();
        setBackUpBatteries(event.target.value);
    }
    // counter
    const getBatteryCount = () => {
        return batCount.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleBatteryCount = (event) => {
        event.preventDefault();
        setCount(event.target.value);
    }
    // status
    const getBatteryStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleBatteryStatus = (event) => {
        event.preventDefault();
        setStatus(event.target.value);
    }

    // rectifier
    const getRectifierStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleRectifierStatus = (event) => {
        event.preventDefault();
        setRectifierStatus(event.target.value);
    }

    // other PM
    // feeder cable stats
    const getFeederCableStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleFeederCable = (event) => {
        event.preventDefault();
        setFeederCableStatus(event.target.value);
    }

    // change over switch status
    const getChangeOverSwitchStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleChangeOverSwitchStatus = (event) => {
        event.preventDefault();
        setChangeOverSwitchStatus(event.target.value);
    }

    // earthingCableStatus
    const getEarthingCableStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleEarthingCableStatus = (event) => {
        event.preventDefault();
        setEarthingCableStatus(event.target.value);
    }

    // earthingStatus
    const getEarthingStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleEarthingStatus = (event) => {
        event.preventDefault();
        setEarthingStatus(event.target.value);
    }

    // fireExtinguisherStatus
    const getFireExtinguisherStatus = () => {
        return opt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleFireExtinguisherStatus = (event) => {
        event.preventDefault();
        setFireExtinguisherStatus(event.target.value);
    }

    // security PM
    // security status
    const getSecurityStatus = () => {
        return securityOpt1.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleSecurityStatus = (event) => {
        event.preventDefault();
        setSecurityStatus(event.target.value);
    }
    // site Access
    const getSiteAccess = () => {
        return securityOpt.map((type) => (
            <MenuItem key={type} value={type}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {type}
            </MenuItem>
        ));
    }
    const handleSiteAccess = (event) => {
        event.preventDefault();
        setSiteAccess(event.target.value);
    }


    // use an Effect section for manging conditional data
    //genModes
    useEffect(() => {
        if (genModes === 'GEN-1') {
            setValue('generatorPM.gen2Type', 'NOT-APPLICABLE');
            setValue('generatorPM.gen2Display', 'NOT-APPLICABLE');
            setValue('generatorPM.gen2Hr', 'NOT-APPLICABLE');
            setValue('generatorPM.customGen2Hr', Number(0));
            setValue('generatorPM.gen2OperatingVoltage', Number(0));
            setValue('generatorPM.gen2OperatingFrequency', Number(0));
            setValue('generatorPM.gen2WorkingStatus', 'NOT-APPLICABLE');
        }
    }, [genModes, setValue]);

    // acInstalled
    useEffect(() => {
        if (acInstalled === 'NO' || acInstalled === 'NOT-APPLICABLE') {
            setValue('airconPM.ac1Status', 'NOT-APPLICABLE');
            setValue('airconPM.ac2Status', 'NOT-APPLICABLE');
            setValue('airconPM.noOfACInstalled', 0);
        }
    }, [acInstalled, setValue]);
    useEffect(() => {
        if (acInstalled === 'YES' && noOfAcInstalled === 1) {
            setValue('airconPM.ac2Status', 'NOT-APPLICABLE');
        }
    }, [acInstalled, noOfAcInstalled, setValue]);

    // lightning PM
    useEffect(() => {
        if (securityLightAvailability === 'NO' || securityLightAvailability === 'NOT-APPLICABLE') {
            setValue('lightningPM.securityLightStatus', 'NOT-APPLICABLE');
        }
    }, [securityLightAvailability, setValue]);
    useEffect(() => {
        if (floodLightAvailability === 'NO' || floodLightAvailability === 'NOT-APPLICABLE') {
            setValue('lightningPM.floodLightStatus', 'NOT-APPLICABLE');
        }
    }, [floodLightAvailability, setValue]);


    // dc system
    useEffect(() => {
        if (backUpBatteries === 'NO' || backUpBatteries === 'NOT-APPLICABLE') {
            setValue('dcSystem.count', 0);
            setValue('dcSystem.status', 'NOT-APPLICABLE');
        }
    }, [backUpBatteries, setValue]);

    // if errors contain any error then display the error
    if (Object.keys(errors).length > 0) {
        console.log({errors});
    }


    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['NewServicingReport'],
        mutationFn: AdminUtils.NewServicingReport,
    });

    const onSubmit = (data) => {
        Object.entries(data).forEach(([key, value]) => {
            handleInputChange(key, value);
        });
        handleNextStep();
    };

    return (
        <>
            <Box sx={mainSection}>
                <Paper elevation={5} sx={{
                    alignCenter: 'center',
                    textAlign: 'center',
                    padding: '10px',
                    backgroundColor: '#274e61',
                    color: '#46F0F9',
                    borderRadius: '10px',
                    width: '100%',
                    height: 'auto',
                }}>
                    <Typography variant='h5'>New Servicing Report</Typography>
                </Paper>
                <br/><br/>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    {/* Main Body */}
                    {/*AllStaff Info*/}
                    <br/><br/>
                    <Grid container spacing={4}>
                        <Paper elevation={5} sx={{
                            alignContent: 'start',
                            padding: '30px',
                            backgroundColor: 'inherit',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            margin: '25px'
                        }}>
                            {/* First Row (1 fields) prefix */}
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle 4">Reporting Staff Info</Typography>
                                </Grid>
                                {/*FullName*/}
                                <Grid item xs={4}>
                                    <Controller
                                        name="fullName"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    defaultValue='' // <-- Set default value to an empty string
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleFullName(e);
                                                    }}
                                                    required
                                                    label="FullName"
                                                    error={!!errors.fullName}
                                                    helperText={errors.fullName ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.fullName.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: {
                                                            ...txProps,
                                                            width: '100%',
                                                        }
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',
                                                                    width: '20%'
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {staffFullName !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select Staff FullName
                                                        </MenuItem>
                                                    )}
                                                    {getFullName()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*email*/}
                                {formData.fullName && (
                                    <Grid item xs={4}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    InputProps={{
                                                        sx: {
                                                            ...txProps,
                                                            width: '150%',
                                                            ml: 10,
                                                        }
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                            ml: 10,
                                                        }
                                                    }}
                                                    sx={{
                                                        color: "#46F0F9",
                                                    }}
                                                    label="Email"
                                                    variant="outlined"
                                                    error={!!errors.email}
                                                    helperText={errors.email ? errors.email.message : ''}
                                                    type="text"
                                                    value={formData.email}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                                {/*role*/}
                                {formData.fullName && (
                                    <Grid item xs={3}>
                                        <Controller
                                            name="role"
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    InputProps={{
                                                        sx: {...txProps, ml: 20,}
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                            ml: 20,
                                                        }
                                                    }}
                                                    sx={{
                                                        color: "#46F0F9",
                                                    }}
                                                    label="Role"
                                                    variant="outlined"
                                                    error={!!errors.role}
                                                    helperText={errors.role ? errors.role.message : ''}
                                                    type="text"
                                                    value={formData.role}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                    <br/><br/>
                    {/*Site Info*/}
                    <Grid container spacing={4}>
                        <Paper elevation={5} sx={{
                            alignContent: 'start',
                            padding: '30px',
                            backgroundColor: 'inherit',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            margin: '25px'
                        }}>
                            {/* First Row (1 fields) prefix */}
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle 4">Site Info</Typography>
                                </Grid>
                                {/*Site State*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="state"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleState(e);
                                                    }}
                                                    required
                                                    label="State"
                                                    error={!!errors.state}
                                                    helperText={errors.state ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.state.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {stateMain !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select State
                                                        </MenuItem>
                                                    )}
                                                    {getState()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*Site cluster*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="cluster"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleCluster(e);
                                                    }}
                                                    label="Cluster"
                                                    required
                                                    error={!!errors.cluster}
                                                    helperText={errors.cluster ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.cluster.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {cluster !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select Cluster
                                                        </MenuItem>
                                                    )}
                                                    {getCluster()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*Site ID*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="siteId"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleSiteId(e);
                                                    }}
                                                    label="Site ID"
                                                    required
                                                    error={!!errors.siteId}
                                                    helperText={errors.siteId ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.siteId.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {siteID !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select SiteID
                                                        </MenuItem>
                                                    )}
                                                    {getSiteId()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*Site Type if available*/}
                                {siteID && (
                                    <Grid item xs={3}>
                                        <Controller
                                            name="siteType"
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            }
                                                        }
                                                    }}
                                                    sx={{
                                                        color: "#46F0F9",
                                                    }}
                                                    label="Site Type"
                                                    variant="outlined"
                                                    error={!!errors.siteType}
                                                    helperText={errors.siteType ? errors.siteType.message : ''}
                                                    type="text"
                                                    value={siteType}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                                {/*Location if available*/}
                                {siteID && (
                                    <Grid item xs={8}>
                                        <Controller
                                            name="location"
                                            control={control}
                                            defaultValue=""
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    InputProps={{
                                                        sx: {
                                                            ...txProps,
                                                            width: '500px',
                                                        }
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            }
                                                        }
                                                    }}
                                                    sx={{
                                                        color: "#46F0F9",
                                                    }}
                                                    label="Location"
                                                    variant="outlined"
                                                    error={!!errors.location}
                                                    helperText={errors.location ? errors.location.message : ''}
                                                    type="text"
                                                    value={location}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                    <br/><br/>
                    {/*Servicing Info*/}
                    <Grid container spacing={4}>
                        <Paper elevation={5} sx={{
                            alignContent: 'start',
                            padding: '30px',
                            backgroundColor: 'inherit',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            margin: '25px'
                        }}>
                            {/* First Row (1 fields) prefix */}
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle 4">Service Info</Typography>
                                </Grid>
                                {/*Site State*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="shelterType"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleShelterType(e);
                                                    }}
                                                    required
                                                    label="Shelter Type"
                                                    error={!!errors.shelterType}
                                                    helperText={errors.shelterType ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.shelterType.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {shelterStructure !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select Shelter Type
                                                        </MenuItem>
                                                    )}
                                                    {getShelterType()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*Pm Instance*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="pmInstance"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handlePmType(e);
                                                    }}
                                                    label="PM Instance"
                                                    required
                                                    error={!!errors.pmInstance}
                                                    helperText={errors.pmInstance ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.pmInstance.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {pmType !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select PM Instance
                                                        </MenuItem>
                                                    )}
                                                    {getPmType()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*Service Date*/}
                                <Grid item xs={3}>
                                    <DateComponent
                                        name="servicingDate"
                                        control={control}
                                        errors={errors}
                                        labelText="Servicing Date"
                                        setDate={setServicingDate}
                                        defaultValue={dayjs()}
                                    />
                                </Grid>
                                {/*nextDueDate*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="nextServiceDate"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Next Service Date"
                                                value={field.value}
                                                error={!!errors.nextServiceDate}
                                                helperText={errors.nextServiceDate ? (
                                                    <span style={{color: "#fc8947"}}>
                                                        {errors.nextServiceDate.message}
                                                    </span>
                                                ) : ''}
                                                InputProps={{
                                                    sx: txProps,
                                                    readOnly: true,
                                                }}
                                                InputLabelProps={{
                                                    shrink: true, // Add this line to ensure the label shrinks
                                                    sx: {
                                                        color: "#46F0F9",
                                                        "&.Mui-focused": {
                                                            color: "white",
                                                        },
                                                    }
                                                }}
                                                sx={{
                                                    color: "#46F0F9",
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <br/><br/>
                    {/*Generator PM*/}
                    <Grid container spacing={4}>
                        <Paper elevation={5} sx={{
                            alignContent: 'start',
                            padding: '30px',
                            backgroundColor: 'inherit',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            margin: '25px'
                        }}>
                            {/* Heading */}
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle 4">Generator PM</Typography>
                                </Grid>
                                {/*Site Gen Modes*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="siteGenModes"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleSiteGenModes(e);
                                                    }}
                                                    required
                                                    label="Site Generator Modes"
                                                    error={!!errors.siteGenModes}
                                                    helperText={errors.siteGenModes?.message ? (
                                                        <span style={{color: "#fc8947"}}>
                                                            {errors.siteGenModes.message}
                                                        </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    {genModes !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select Site Gen Modes
                                                        </MenuItem>
                                                    )}
                                                    {getSiteGenModes()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*Default Operation*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="generatorPM.defaultOperation"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleDefaultOperation(e);
                                                    }}
                                                    required
                                                    label="Site Default Generator"
                                                    error={!!(errors.generatorPM?.defaultOperation)}
                                                    helperText={errors.generatorPM?.defaultOperation ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM ? errors.generatorPM.defaultOperation.message : undefined}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {defaultOperation !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select Default Operation
                                                        </MenuItem>
                                                    )}
                                                    {getGenDefaultOperation()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*Gen1 make*/}
                                {/*Gen 1 Info*/}
                                <Grid item xs={12}>
                                    <Typography variant="subtitle 4">Gen1 Info</Typography>
                                </Grid>
                                {/*Gen 1 model*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="generatorPM.gen1Type"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleGen1Type(e);
                                                    }}
                                                    label="Gen1 Type"
                                                    required
                                                    error={!!errors.generatorPM?.gen1Type}
                                                    helperText={errors.generatorPM?.gen1Type ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM.gen1Type.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {gen1Type !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select Gen1 Type
                                                        </MenuItem>
                                                    )}
                                                    {getGen1Type()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="generatorPM.gen1Display"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleGen1Display(e);
                                                    }}
                                                    label="Gen1 Display"
                                                    required
                                                    error={!!errors.generatorPM?.gen1Display}
                                                    helperText={errors.generatorPM?.gen1Display ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM.gen1Display.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {gen1Display !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select Gen-1 Display
                                                        </MenuItem>
                                                    )}
                                                    {getGen1Display()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="generatorPM.gen1WorkingStatus"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleGen1WorkingStatus(e);
                                                    }}
                                                    label="Working Status"
                                                    required
                                                    error={!!errors.generatorPM?.gen1WorkingStatus}
                                                    helperText={errors.generatorPM?.gen1WorkingStatus ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM?.gen1WorkingStatus.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {gen1WorkingStatus !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807", disable: true}}>
                                                            Gen1 Working Status
                                                        </MenuItem>
                                                    )}
                                                    {getGen1WorkingStatus()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="generatorPM.gen1OperatingVoltage"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    label="Operating Voltage Reading"
                                                    type="number"
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                    required
                                                    error={!!errors.generatorPM?.gen1OperatingVoltage}
                                                    helperText={errors.generatorPM?.gen1OperatingVoltage ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM?.gen1OperatingVoltage.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white",
                                                            },
                                                        }
                                                    }}
                                                    sx={{
                                                        color: "#46F0F9",
                                                    }}
                                                    fullWidth
                                                />
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="generatorPM.gen1OperatingFrequency"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    label="Operating Frequency Reading"
                                                    type="number"
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                    required
                                                    error={!!errors.generatorPM?.gen1OperatingFrequency}
                                                    helperText={errors.generatorPM?.gen1OperatingFrequency ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM?.gen1OperatingFrequency.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white",
                                                            },
                                                        }
                                                    }}
                                                    sx={{
                                                        color: "#46F0F9",
                                                    }}
                                                    fullWidth
                                                />
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Controller
                                        name="generatorPM.gen1Hr"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleGen1Hr(e);
                                                    }}
                                                    label="Gen1 Working Hrs"
                                                    required
                                                    error={!!errors.generatorPM?.gen1Hr}
                                                    helperText={errors.generatorPM?.gen1Hr ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM?.gen1Hr.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {gen1Hr !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807", disable: true}}>
                                                            Gen1 Working Hrs
                                                        </MenuItem>
                                                    )}
                                                    {getGen1Hr()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {gen1Hr === 'Enter Value' && (
                                    <Grid item xs={3}>
                                        {/* Custom CPD input */}
                                        <Controller
                                            name="generatorPM.customGen1Hr"
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    label="Enter Working Hrs"
                                                    type="number"
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white",
                                                            },
                                                        }
                                                    }}
                                                    sx={{
                                                        color: "#46F0F9",
                                                    }}
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                                {genModes === 'GEN-1 and GEN-2' && (
                                    <>
                                        {/*Gen 2 Info*/}
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle 4">Gen2 Info</Typography>
                                        </Grid>
                                        {/*Gen 1 model*/}
                                        <Grid item xs={3}>
                                            <Controller
                                                name="generatorPM.gen2Type"
                                                control={control}
                                                render={({field}) => (
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            {...field}
                                                            select
                                                            value={field.value || ''}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleGen2Type(e);
                                                            }}
                                                            label="Gen1 Type"
                                                            required
                                                            error={!!errors.pmInstance}
                                                            helperText={errors.pmInstance ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.cluster.message}
                                                                                </span>
                                                            ) : ''}
                                                            InputProps={{
                                                                sx: txProps
                                                            }}
                                                            InputLabelProps={{
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    "&.Mui-focused": {
                                                                        color: "white"
                                                                    },
                                                                }
                                                            }}
                                                            SelectProps={{
                                                                MenuProps: {
                                                                    PaperProps: {
                                                                        sx: {
                                                                            backgroundColor: '#134357',
                                                                            color: 'white',
                                                                            maxHeight: 450,
                                                                            overflow: 'auto',

                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                            sx={{
                                                                '& .MuiSelect-icon': {
                                                                    color: '#fff',
                                                                },
                                                                '& .MuiSelect-icon:hover': {
                                                                    color: '#fff',
                                                                },
                                                                textAlign: 'left',
                                                            }}>
                                                            {gen2Type !== '' && (
                                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                    Select PM Instance
                                                                </MenuItem>
                                                            )}
                                                            {getGen2Type()}
                                                        </TextField>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Controller
                                                name="generatorPM.gen2Display"
                                                control={control}
                                                render={({field}) => (
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            {...field}
                                                            select
                                                            value={field.value || ''}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleGen2Display(e);
                                                            }}
                                                            label="Gen2 Display"
                                                            required
                                                            error={!!errors.generatorPM?.gen2Display}
                                                            helperText={errors.generatorPM?.gen2Display ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM.gen2Display.message}
                                                                                </span>
                                                            ) : ''}
                                                            InputProps={{
                                                                sx: txProps
                                                            }}
                                                            InputLabelProps={{
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    "&.Mui-focused": {
                                                                        color: "white"
                                                                    },
                                                                }
                                                            }}
                                                            SelectProps={{
                                                                MenuProps: {
                                                                    PaperProps: {
                                                                        sx: {
                                                                            backgroundColor: '#134357',
                                                                            color: 'white',
                                                                            maxHeight: 450,
                                                                            overflow: 'auto',

                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                            sx={{
                                                                '& .MuiSelect-icon': {
                                                                    color: '#fff',
                                                                },
                                                                '& .MuiSelect-icon:hover': {
                                                                    color: '#fff',
                                                                },
                                                                textAlign: 'left',
                                                            }}>
                                                            {gen2Display !== '' && (
                                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                    Select Gen-2 Display
                                                                </MenuItem>
                                                            )}
                                                            {getGen2Display()}
                                                        </TextField>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Controller
                                                name="generatorPM.gen2WorkingStatus"
                                                control={control}
                                                render={({field}) => (
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            {...field}
                                                            select
                                                            value={field.value || ''}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleGen2WorkingStatus(e);
                                                            }}
                                                            label="Gen2 Type"
                                                            required
                                                            error={!!errors.generatorPM?.gen2WorkingStatus}
                                                            helperText={errors.generatorPM?.gen2WorkingStatus ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM?.gen2WorkingStatus.message}
                                                                                </span>
                                                            ) : ''}
                                                            InputProps={{
                                                                sx: txProps
                                                            }}
                                                            InputLabelProps={{
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    "&.Mui-focused": {
                                                                        color: "white"
                                                                    },
                                                                }
                                                            }}
                                                            SelectProps={{
                                                                MenuProps: {
                                                                    PaperProps: {
                                                                        sx: {
                                                                            backgroundColor: '#134357',
                                                                            color: 'white',
                                                                            maxHeight: 450,
                                                                            overflow: 'auto',

                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                            sx={{
                                                                '& .MuiSelect-icon': {
                                                                    color: '#fff',
                                                                },
                                                                '& .MuiSelect-icon:hover': {
                                                                    color: '#fff',
                                                                },
                                                                textAlign: 'left',
                                                            }}>
                                                            {gen1WorkingStatus !== '' && (
                                                                <MenuItem value=''
                                                                          sx={{color: "#4BF807", disable: true}}>
                                                                    Gen2 Working Status
                                                                </MenuItem>
                                                            )}
                                                            {getGen2WorkingStatus()}
                                                        </TextField>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Controller
                                                name="generatorPM.gen2OperatingVoltage"
                                                control={control}
                                                render={({field}) => (
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            {...field}
                                                            label="Operating Voltage Reading"
                                                            type="number"
                                                            required
                                                            error={!!errors.generatorPM?.gen2OperatingVoltage}
                                                            helperText={errors.generatorPM?.gen2OperatingVoltage ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM.gen2OperatingVoltage.message}
                                                                                </span>
                                                            ) : ''}
                                                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                            InputProps={{
                                                                sx: txProps
                                                            }}
                                                            InputLabelProps={{
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    "&.Mui-focused": {
                                                                        color: "white",
                                                                    },
                                                                }
                                                            }}
                                                            sx={{
                                                                color: "#46F0F9",
                                                            }}
                                                            fullWidth
                                                        />
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Controller
                                                name="generatorPM.gen2OperatingFrequency"
                                                control={control}
                                                render={({field}) => (
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            {...field}
                                                            label="Operating Frequency Reading"
                                                            type="number"
                                                            required
                                                            error={!!errors.generatorPM?.gen2OperatingFrequency}
                                                            helperText={errors.generatorPM?.gen2OperatingFrequency ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM.gen2OperatingFrequency.message}
                                                                                </span>
                                                            ) : ''}
                                                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                            InputProps={{
                                                                sx: txProps
                                                            }}
                                                            InputLabelProps={{
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    "&.Mui-focused": {
                                                                        color: "white",
                                                                    },
                                                                }
                                                            }}
                                                            sx={{
                                                                color: "#46F0F9",
                                                            }}
                                                            fullWidth
                                                        />
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Controller
                                                name="generatorPM.gen2Hr"
                                                control={control}
                                                render={({field}) => (
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            {...field}
                                                            select
                                                            value={field.value || ''}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleGen2Hr(e);
                                                            }}
                                                            label="Gen1 Working Hrs"
                                                            required
                                                            error={!!errors.generatorPM?.gen2Hr}
                                                            helperText={errors.generatorPM?.gen2Hr ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.generatorPM?.gen2Hr.message}
                                                                                </span>
                                                            ) : ''}
                                                            InputProps={{
                                                                sx: txProps
                                                            }}
                                                            InputLabelProps={{
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    "&.Mui-focused": {
                                                                        color: "white"
                                                                    },
                                                                }
                                                            }}
                                                            SelectProps={{
                                                                MenuProps: {
                                                                    PaperProps: {
                                                                        sx: {
                                                                            backgroundColor: '#134357',
                                                                            color: 'white',
                                                                            maxHeight: 450,
                                                                            overflow: 'auto',

                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                            sx={{
                                                                '& .MuiSelect-icon': {
                                                                    color: '#fff',
                                                                },
                                                                '& .MuiSelect-icon:hover': {
                                                                    color: '#fff',
                                                                },
                                                                textAlign: 'left',
                                                            }}>
                                                            {gen2WorkingStatus !== '' && (
                                                                <MenuItem value=''
                                                                          sx={{color: "#4BF807", disable: true}}>
                                                                    Gen2 Working Hrs
                                                                </MenuItem>
                                                            )}
                                                            {getGen2Hr()}
                                                        </TextField>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        {gen2Hr === 'Enter Value' && (
                                            <Grid item xs={3}>
                                                {/* Custom CPD input */}
                                                <Controller
                                                    name="generatorPM.customGen2Hr"
                                                    control={control}
                                                    render={({field}) => (
                                                        <TextField
                                                            {...field}
                                                            label="Enter Working Hrs"
                                                            type="number"
                                                            InputProps={{
                                                                sx: txProps
                                                            }}
                                                            InputLabelProps={{
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    "&.Mui-focused": {
                                                                        color: "white",
                                                                    },
                                                                }
                                                            }}
                                                            sx={{
                                                                color: "#46F0F9",
                                                            }}
                                                            fullWidth
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        )}
                                    </>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                    <br/><br/>
                    {/* Ac PM*/}
                    <Grid container spacing={4}>
                        <Paper elevation={5} sx={{
                            alignContent: 'start',
                            padding: '30px',
                            backgroundColor: 'inherit',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            margin: '25px'
                        }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle 4">AirCondition PM</Typography>
                                </Grid>
                                {/*Site State*/}
                                <Grid item xs={3}>
                                    <Controller
                                        name="airconPM.acInstalled"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleAcInstalled(e);
                                                    }}
                                                    required
                                                    label="AC Installed"
                                                    error={!!errors.airconPM?.acInstalled}
                                                    helperText={errors.airconPM?.acInstalled ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.airconPM?.acInstalled?.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {acInstalled !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select Shelter Type
                                                        </MenuItem>
                                                    )}
                                                    {getAcInstalled()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {acInstalled === 'YES' && (
                                    <>
                                        <Grid item xs={3}>
                                            <Controller
                                                name="airconPM.noOfACInstalled"
                                                control={control}
                                                render={({field}) => (
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            {...field}
                                                            select
                                                            value={field.value || ''}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleNoOfAc(e);
                                                            }}
                                                            required
                                                            label="No Of AC"
                                                            error={!!errors.airconPM?.noOfACInstalled}
                                                            helperText={errors.airconPM?.noOfACInstalled ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.airconPM?.noOfACInstalled?.message}
                                                                                </span>
                                                            ) : ''}
                                                            InputProps={{
                                                                sx: txProps
                                                            }}
                                                            InputLabelProps={{
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    "&.Mui-focused": {
                                                                        color: "white"
                                                                    },
                                                                }
                                                            }}
                                                            SelectProps={{
                                                                MenuProps: {
                                                                    PaperProps: {
                                                                        sx: {
                                                                            backgroundColor: '#134357',
                                                                            color: 'white',
                                                                            maxHeight: 450,
                                                                            overflow: 'auto',
                                                                            fontSize: '40px',
                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                            sx={{
                                                                '& .MuiSelect-icon': {
                                                                    color: '#fff',
                                                                },
                                                                '& .MuiSelect-icon:hover': {
                                                                    color: '#fff',
                                                                },
                                                                textAlign: 'left',
                                                            }}>
                                                            {noOfAcInstalled !== '' && (
                                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                    Select Shelter Type
                                                                </MenuItem>
                                                            )}
                                                            {getNoOfAc()}
                                                        </TextField>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Controller
                                                name="airconPM.ac1Status"
                                                control={control}
                                                render={({field}) => (
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            {...field}
                                                            select
                                                            value={field.value || ''}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleAc1Status(e);
                                                            }}
                                                            required
                                                            label="AC1 Status"
                                                            error={!!errors.airconPM?.ac1Status}
                                                            helperText={errors.airconPM?.ac1Status ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.airconPM?.ac1Status?.message}
                                                                                </span>
                                                            ) : ''}
                                                            InputProps={{
                                                                sx: txProps
                                                            }}
                                                            InputLabelProps={{
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    "&.Mui-focused": {
                                                                        color: "white"
                                                                    },
                                                                }
                                                            }}
                                                            SelectProps={{
                                                                MenuProps: {
                                                                    PaperProps: {
                                                                        sx: {
                                                                            backgroundColor: '#134357',
                                                                            color: 'white',
                                                                            maxHeight: 450,
                                                                            overflow: 'auto',
                                                                            fontSize: '40px',
                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                            sx={{
                                                                '& .MuiSelect-icon': {
                                                                    color: '#fff',
                                                                },
                                                                '& .MuiSelect-icon:hover': {
                                                                    color: '#fff',
                                                                },
                                                                textAlign: 'left',
                                                            }}>
                                                            {ac1Status !== '' && (
                                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                    Select AC-1 Status
                                                                </MenuItem>
                                                            )}
                                                            {getAc1Status()}
                                                        </TextField>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        {noOfAcInstalled === 2 && (
                                            <>
                                                <Grid item xs={3}>
                                                    <Controller
                                                        name="airconPM.ac2Status"
                                                        control={control}
                                                        render={({field}) => (
                                                            <FormControl fullWidth>
                                                                <TextField
                                                                    {...field}
                                                                    select
                                                                    value={field.value || ''}
                                                                    onChange={(e) => {
                                                                        field.onChange(e);
                                                                        handleAc2Status(e);
                                                                    }}
                                                                    required
                                                                    label="AC2 Status"
                                                                    error={!!errors.airconPM?.ac2Status}
                                                                    helperText={errors.airconPM?.ac2Status ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.airconPM?.ac2Status?.message}
                                                                                </span>
                                                                    ) : ''}
                                                                    InputProps={{
                                                                        sx: txProps
                                                                    }}
                                                                    InputLabelProps={{
                                                                        sx: {
                                                                            color: "#46F0F9",
                                                                            "&.Mui-focused": {
                                                                                color: "white"
                                                                            },
                                                                        }
                                                                    }}
                                                                    SelectProps={{
                                                                        MenuProps: {
                                                                            PaperProps: {
                                                                                sx: {
                                                                                    backgroundColor: '#134357',
                                                                                    color: 'white',
                                                                                    maxHeight: 450,
                                                                                    overflow: 'auto',
                                                                                    fontSize: '40px',
                                                                                },
                                                                            },
                                                                        },
                                                                    }}
                                                                    sx={{
                                                                        '& .MuiSelect-icon': {
                                                                            color: '#fff',
                                                                        },
                                                                        '& .MuiSelect-icon:hover': {
                                                                            color: '#fff',
                                                                        },
                                                                        textAlign: 'left',
                                                                    }}>
                                                                    {ac2Status !== '' && (
                                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                            Select AC-2 Status
                                                                        </MenuItem>
                                                                    )}
                                                                    {getAc2Status()}
                                                                </TextField>
                                                            </FormControl>
                                                        )}
                                                    />
                                                </Grid>
                                            </>
                                        )}
                                    </>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                    <br/><br/>
                    {/*Shelter PM*/}
                    <Grid container spacing={4}>
                        <Paper elevation={5} sx={{
                            alignContent: 'start',
                            padding: '30px',
                            backgroundColor: 'inherit',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            margin: '25px'
                        }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle 4">Shelter and Site PM</Typography>
                                </Grid>
                                {/*Site cleaning*/}
                                <Grid item xs={4}>
                                    <Controller
                                        name="shelterPM.siteCleaningStatus"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleSiteCleaningStatus(e);
                                                    }}
                                                    required
                                                    label="Site Cleaning Status"
                                                    error={!!errors.shelterPM?.siteCleaningStatus}
                                                    helperText={errors.shelterPM?.siteCleaningStatus ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.shelterPM?.siteCleaningStatus.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {siteCleaningStatus !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Cleaning Status
                                                        </MenuItem>
                                                    )}
                                                    {getSiteCleaningStatus()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*Shelter cleaning*/}
                                <Grid item xs={4}>
                                    <Controller
                                        name="shelterPM.shelterCleaningStatus"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleShelterCleaningStatus(e);
                                                    }}
                                                    required
                                                    label="Shelter Cleaning Status"
                                                    error={!!errors.shelterPM?.shelterCleaningStatus}
                                                    helperText={errors.shelterPM?.shelterCleaningStatus ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.shelterPM?.shelterCleaningStatus.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {shelterCleaningStatus !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Shelter Cleaning Status
                                                        </MenuItem>
                                                    )}
                                                    {getShelterCleaningStatus()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <br/><br/>
                    {/*Lightning PM*/}
                    <Grid container spacing={4}>
                        <Paper elevation={5} sx={{
                            alignContent: 'start',
                            padding: '30px',
                            backgroundColor: 'inherit',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            margin: '25px'
                        }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle 4">Lightning PM</Typography>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Controller
                                        name="lightningPM.securityLightAvailability"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleSecurityLightAvailability(e);
                                                    }}
                                                    required
                                                    label="Secuity Light Availability"
                                                    error={!!errors.lightningPM?.securityLightAvailability}
                                                    helperText={errors.lightningPM?.securityLightAvailability ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.lightningPM?.securityLightAvailability.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {securityLightAvailability !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Security Light Availability
                                                        </MenuItem>
                                                    )}
                                                    {getSecurityLightAvailability()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {securityLightAvailability === 'YES' && (
                                    <>
                                        <Grid item xs={2.4}>
                                            <Controller
                                                name="lightningPM.securityLightStatus"
                                                control={control}
                                                render={({field}) => (
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            {...field}
                                                            select
                                                            value={field.value || ''}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleSecurityLightStatus(e);
                                                            }}
                                                            required
                                                            label="Security Light Status"
                                                            error={!!errors.lightningPM?.securityLightStatus}
                                                            helperText={errors.lightningPM?.securityLightStatus ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.lightningPM?.securityLightStatus.message}
                                                                                </span>
                                                            ) : ''}
                                                            InputProps={{
                                                                sx: txProps
                                                            }}
                                                            InputLabelProps={{
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    "&.Mui-focused": {
                                                                        color: "white"
                                                                    },
                                                                }
                                                            }}
                                                            SelectProps={{
                                                                MenuProps: {
                                                                    PaperProps: {
                                                                        sx: {
                                                                            backgroundColor: '#134357',
                                                                            color: 'white',
                                                                            maxHeight: 450,
                                                                            overflow: 'auto',
                                                                            fontSize: '40px',
                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                            sx={{
                                                                '& .MuiSelect-icon': {
                                                                    color: '#fff',
                                                                },
                                                                '& .MuiSelect-icon:hover': {
                                                                    color: '#fff',
                                                                },
                                                                textAlign: 'left',
                                                            }}>
                                                            {securityLightStatus !== '' && (
                                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                    Security Light Status
                                                                </MenuItem>
                                                            )}
                                                            {getSecurityLightStatus()}
                                                        </TextField>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                    </>
                                )}

                                <Grid item xs={2.4}>
                                    <Controller
                                        name="lightningPM.floodLightAvailability"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleFloodLightAvailability(e);
                                                    }}
                                                    required
                                                    label="FloodLight Availablility"
                                                    error={!!errors.lightningPM?.floodLightAvailability}
                                                    helperText={errors.lightningPM?.floodLightAvailability ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.lightningPM?.floodLightAvailability.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {floodLightAvailability !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Flood Light Status
                                                        </MenuItem>
                                                    )}
                                                    {getFloodLightAvailability()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {floodLightAvailability === 'YES' && (
                                    <>
                                        <Grid item xs={2.4}>
                                            <Controller
                                                name="lightningPM.floodLightStatus"
                                                control={control}
                                                render={({field}) => (
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            {...field}
                                                            select
                                                            value={field.value || ''}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleFloodLightStatus(e);
                                                            }}
                                                            required
                                                            label="FlodLight Status"
                                                            error={!!errors.lightningPM?.floodLightStatus}
                                                            helperText={errors.lightningPM?.floodLightStatus ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.lightningPM?.floodLightStatus.message}
                                                                                </span>
                                                            ) : ''}
                                                            InputProps={{
                                                                sx: txProps
                                                            }}
                                                            InputLabelProps={{
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    "&.Mui-focused": {
                                                                        color: "white"
                                                                    },
                                                                }
                                                            }}
                                                            SelectProps={{
                                                                MenuProps: {
                                                                    PaperProps: {
                                                                        sx: {
                                                                            backgroundColor: '#134357',
                                                                            color: 'white',
                                                                            maxHeight: 450,
                                                                            overflow: 'auto',
                                                                            fontSize: '40px',
                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                            sx={{
                                                                '& .MuiSelect-icon': {
                                                                    color: '#fff',
                                                                },
                                                                '& .MuiSelect-icon:hover': {
                                                                    color: '#fff',
                                                                },
                                                                textAlign: 'left',
                                                            }}>
                                                            {floodLightStatus !== '' && (
                                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                    FloodLight Status
                                                                </MenuItem>
                                                            )}
                                                            {getFloodLightStatus()}
                                                        </TextField>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                    </>
                                )}
                                <Grid item xs={2.4}>
                                    <Controller
                                        name="lightningPM.awl"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleAwlWorkingStatus(e);
                                                    }}
                                                    required
                                                    label="Aviation Warning Ligth"
                                                    error={!!errors.lightningPM?.awl}
                                                    helperText={errors.lightningPM?.awl ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.lightningPM?.awl.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {awlWorkingStatus !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select AWL Status
                                                        </MenuItem>
                                                    )}
                                                    {getAwlWorkingStatus()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <br/><br/>
                    {/*Dc System OM*/}
                    <Grid container spacing={4}>
                        <Paper elevation={5} sx={{
                            alignContent: 'start',
                            padding: '30px',
                            backgroundColor: 'inherit',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            margin: '25px'
                        }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle 4">DC System PM</Typography>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Controller
                                        name="dcSystem.backUpBatteries"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleBackUpBatteries(e);
                                                    }}
                                                    required
                                                    label="Batteries Availability"
                                                    error={!!errors.dcSystem?.backUpBatteries}
                                                    helperText={errors.dcSystem?.backUpBatteries ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.dcSystem?.backUpBatteries.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {backUpBatteries !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Batteries Availability
                                                        </MenuItem>
                                                    )}
                                                    {getBackUpBatteries()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {backUpBatteries === 'YES' && (
                                    <>
                                        <Grid item xs={2.4}>
                                            <Controller
                                                name="dcSystem.count"
                                                control={control}
                                                render={({field}) => (
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            {...field}
                                                            select
                                                            value={field.value || ''}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleBatteryCount(e);
                                                            }}
                                                            required
                                                            label="Battery Count"
                                                            error={!!errors.dcSystem?.count}
                                                            helperText={errors.dcSystem?.count ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.dcSystem?.count.message}
                                                                                </span>
                                                            ) : ''}
                                                            InputProps={{
                                                                sx: txProps
                                                            }}
                                                            InputLabelProps={{
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    "&.Mui-focused": {
                                                                        color: "white"
                                                                    },
                                                                }
                                                            }}
                                                            SelectProps={{
                                                                MenuProps: {
                                                                    PaperProps: {
                                                                        sx: {
                                                                            backgroundColor: '#134357',
                                                                            color: 'white',
                                                                            maxHeight: 450,
                                                                            overflow: 'auto',
                                                                            fontSize: '40px',

                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                            sx={{
                                                                '& .MuiSelect-icon': {
                                                                    color: '#fff',
                                                                },
                                                                '& .MuiSelect-icon:hover': {
                                                                    color: '#fff',
                                                                },
                                                                textAlign: 'left',
                                                            }}>
                                                            {count !== '' && (
                                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                    Battery Count
                                                                </MenuItem>
                                                            )}
                                                            {getBatteryCount()}
                                                        </TextField>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                    </>
                                )}
                                {backUpBatteries === 'YES' && (
                                    <>
                                        <Grid item xs={2.4}>
                                            <Controller
                                                name="dcSystem.status"
                                                control={control}
                                                render={({field}) => (
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            {...field}
                                                            select
                                                            value={field.value || ''}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleBatteryStatus(e);
                                                            }}
                                                            required
                                                            label="Battery Status"
                                                            error={!!errors.dcSystem?.status}
                                                            helperText={errors.dcSystem?.status ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.dcSystem?.status.message}
                                                                                </span>
                                                            ) : ''}
                                                            InputProps={{
                                                                sx: txProps
                                                            }}
                                                            InputLabelProps={{
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    "&.Mui-focused": {
                                                                        color: "white"
                                                                    },
                                                                }
                                                            }}
                                                            SelectProps={{
                                                                MenuProps: {
                                                                    PaperProps: {
                                                                        sx: {
                                                                            backgroundColor: '#134357',
                                                                            color: 'white',
                                                                            maxHeight: 450,
                                                                            overflow: 'auto',
                                                                            fontSize: '40px',

                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                            sx={{
                                                                '& .MuiSelect-icon': {
                                                                    color: '#fff',
                                                                },
                                                                '& .MuiSelect-icon:hover': {
                                                                    color: '#fff',
                                                                },
                                                                textAlign: 'left',
                                                            }}>
                                                            {status !== '' && (
                                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                    Battery Status
                                                                </MenuItem>
                                                            )}
                                                            {getBatteryStatus()}
                                                        </TextField>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                    </>
                                )}
                                <Grid item xs={2.4}>
                                    <Controller
                                        name="dcSystem.rectifierStatus"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleRectifierStatus(e);
                                                    }}
                                                    required
                                                    label="Rectifier Status"
                                                    error={!!errors.dcSystem?.rectifierStatus}
                                                    helperText={errors.dcSystem?.rectifierStatus ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.dcSystem?.rectifierStatus.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {rectifierStatus !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Rectifier Status
                                                        </MenuItem>
                                                    )}
                                                    {getRectifierStatus()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <br/><br/>
                    {/*Other PM*/}
                    <Grid container spacing={4}>
                        <Paper elevation={5} sx={{
                            alignContent: 'start',
                            padding: '30px',
                            backgroundColor: 'inherit',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            margin: '25px'
                        }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle 4">Others PM</Typography>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Controller
                                        name="otherPM.feederCableStatus"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleFeederCable(e);
                                                    }}
                                                    required
                                                    label="Feeder Cable Status"
                                                    error={!!errors.otherPM?.feederCableStatus}
                                                    helperText={errors.otherPM?.feederCableStatus ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.otherPM?.feederCableStatus.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {feederCableStatus !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Feeder Cable Status
                                                        </MenuItem>
                                                    )}
                                                    {getFeederCableStatus()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Controller
                                        name="otherPM.changeOverSwitchStatus"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleChangeOverSwitchStatus(e);
                                                    }}
                                                    required
                                                    label="ChangeOver Switch Status"
                                                    error={!!errors.otherPM?.changeOverSwitchStatus}
                                                    helperText={errors.otherPM?.changeOverSwitchStatus ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.otherPM?.changeOverSwitchStatus.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {changeOverSwitchStatus !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            ChangeOver Switch Status
                                                        </MenuItem>
                                                    )}
                                                    {getChangeOverSwitchStatus()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Controller
                                        name="otherPM.earthingStatus"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleEarthingStatus(e);
                                                    }}
                                                    required
                                                    label="Earthing Status"
                                                    error={!!errors.otherPM?.earthingStatus}
                                                    helperText={errors.otherPM?.earthingStatus ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.otherPM?.earthingStatus.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {earthingStatus !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Earth Status
                                                        </MenuItem>
                                                    )}
                                                    {getEarthingStatus()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Controller
                                        name="otherPM.earthingCableStatus"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleEarthingCableStatus(e);
                                                    }}
                                                    required
                                                    label="Earthing Cable Status"
                                                    error={!!errors.otherPM?.earthingCableStatus}
                                                    helperText={errors.otherPM?.earthingCableStatus ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.otherPM?.earthingCableStatus.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {earthingCableStatus !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Earth Cable Status
                                                        </MenuItem>
                                                    )}
                                                    {getEarthingCableStatus()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Controller
                                        name="otherPM.fireExtinguisherStatus"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleFireExtinguisherStatus(e);
                                                    }}
                                                    required
                                                    label="FireExtinguisher Status"
                                                    error={!!errors.otherPM?.fireExtinguisherStatus}
                                                    helperText={errors.otherPM?.fireExtinguisherStatus ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.otherPM?.fireExtinguisherStatus.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {fireExtinguisherStatus !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            FireExtinguisher Status
                                                        </MenuItem>
                                                    )}
                                                    {getFireExtinguisherStatus()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <br/><br/>
                    {/*Security PM*/}
                    <Grid container spacing={4}>
                        <Paper elevation={5} sx={{
                            alignContent: 'start',
                            padding: '30px',
                            backgroundColor: 'inherit',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            margin: '25px'
                        }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle 4">Security PM</Typography>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Controller
                                        name="securityPM.securityStatus"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleSecurityStatus(e);
                                                    }}
                                                    required
                                                    label="Security Status"
                                                    error={!!errors.securityPM?.securityStatus}
                                                    helperText={errors.securityPM?.securityStatus ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.securityPM?.securityStatus.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {securityStatus !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Security Light Availability
                                                        </MenuItem>
                                                    )}
                                                    {getSecurityStatus()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Controller
                                        name="securityPM.siteAccess"
                                        control={control}
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleSiteAccess(e);
                                                    }}
                                                    required
                                                    label="Site Access"
                                                    error={!!errors.securityPM?.siteAccess}
                                                    helperText={errors.securityPM?.siteAccess ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.securityPM?.siteAccess.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: txProps
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',

                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {siteAccess !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Security Light Status
                                                        </MenuItem>
                                                    )}
                                                    {getSiteAccess()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <br/><br/>
                    {/*Admin only info*/}
                    <Grid container spacing={4}>
                        <Paper elevation={5} sx={{
                            alignContent: 'start',
                            padding: '30px',
                            backgroundColor: 'inherit',
                            color: '#46F0F9',
                            borderRadius: '10px',
                            width: '100%',
                            height: 'auto',
                            margin: '25px'
                        }}>
                            {/* First Row (1 fields) prefix */}
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle 4">Admin Approval Info</Typography>
                                </Grid>
                                {/*FullName*/}
                                <Grid item xs={4}>
                                    <Controller
                                        name="adminFullName"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <TextField
                                                    {...field}
                                                    select
                                                    defaultValue='' // <-- Set default value to an empty string
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleAdminFullName(e);
                                                    }}
                                                    required
                                                    label="Admin FullName"
                                                    error={!!errors.adminFullName}
                                                    helperText={errors.adminFullName ? (
                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.adminFullName.message}
                                                                                </span>
                                                    ) : ''}
                                                    InputProps={{
                                                        sx: {
                                                            ...txProps,
                                                            width: '100%',
                                                        }
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            PaperProps: {
                                                                sx: {
                                                                    backgroundColor: '#134357',
                                                                    color: 'white',
                                                                    maxHeight: 450,
                                                                    overflow: 'auto',
                                                                    fontSize: '40px',
                                                                    width: '20%'
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        '& .MuiSelect-icon': {
                                                            color: '#fff',
                                                        },
                                                        '& .MuiSelect-icon:hover': {
                                                            color: '#fff',
                                                        },
                                                        textAlign: 'left',
                                                    }}>
                                                    {adminFullName !== '' && (
                                                        <MenuItem value='' sx={{color: "#4BF807"}}>
                                                            Select Staff FullName
                                                        </MenuItem>
                                                    )}
                                                    {getAdminFullName()}
                                                </TextField>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                {/*email*/}
                                {adminFullName && (
                                    <Grid item xs={4}>
                                        <Controller
                                            name="AdminEmail"
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    InputProps={{
                                                        sx: {
                                                            ...txProps,
                                                            width: '150%',
                                                            ml: 10,
                                                        }
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                            ml: 10,
                                                        }
                                                    }}
                                                    sx={{
                                                        color: "#46F0F9",
                                                    }}
                                                    label="Admin Email"
                                                    variant="outlined"
                                                    error={!!errors.AdminEmail}
                                                    helperText={errors.AdminEmail ? errors.AdminEmail.message : ''}
                                                    type="text"
                                                    value={adminEmail}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                                {/*role*/}
                                {adminFullName && (
                                    <Grid item xs={3}>
                                        <Controller
                                            name="adminRole"
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    InputProps={{
                                                        sx: {...txProps, ml: 20,}
                                                    }}
                                                    InputLabelProps={{
                                                        sx: {
                                                            color: "#46F0F9",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                            ml: 20,
                                                        }
                                                    }}
                                                    sx={{
                                                        color: "#46F0F9",
                                                    }}
                                                    label="Admin Role"
                                                    variant="outlined"
                                                    error={!!errors.adminRole}
                                                    helperText={errors.adminRole ? errors.adminRole.message : ''}
                                                    type="text"
                                                    value={adminRole}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                                {/*Summary info of the Servicing Report*/}
                                <Grid item xs={12}>
                                    <Controller
                                        name="summary"
                                        control={control}
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                InputProps={{
                                                    sx: {...txProps, width: '100%'}
                                                }}
                                                InputLabelProps={{
                                                    sx: {
                                                        color: "#46F0F9",
                                                        "&.Mui-focused": {
                                                            color: "white",
                                                        },
                                                    }
                                                }}
                                                label="Summary"
                                                multiline
                                                minRows={5}
                                                maxRows={25}
                                                variant="outlined"
                                                placeholder="Provide Summary details of the servicing report"
                                                fullWidth
                                                required
                                                error={!!errors.summary}
                                                helperText={errors.summary ? errors.summary.message : ''}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <br/><br/>
                    {/*Submitting button */}
                    <Stack direction='row' gap={2} sx={{marginBottom: '75px'}}>
                        <Button variant="contained" color='success' title='Back'
                                onClick={() => window.location.href = '/dashboard/admin/reports/servicing/all'}>
                            Back
                        </Button>
                        <Button variant="contained" color='error' type='submit' title='Submit'> Next </Button>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default DataComponent;
