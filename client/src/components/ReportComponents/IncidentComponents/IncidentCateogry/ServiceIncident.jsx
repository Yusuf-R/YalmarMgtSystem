import React, {useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import {FormControl} from "@mui/material";
import TextField from "@mui/material/TextField";
import {yupResolver} from "@hookform/resolvers/yup";
import {serviceIncidentSchema} from "@/SchemaValidator/IncidentValidators/serviceIncidentSchema";
import useMediaQuery from "@mui/material/useMediaQuery";

function ServiceIncident({allSite}) {
    const [serviceSiteInfo, setServiceSiteInfo] = useState({
        siteId: '',
        site_id: '',
        state: '',
        cluster: '',
        location: '',
        type: '',
    });

    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');


    const {control, setValue, clearErrors, watch, formState: {errors}} = useFormContext({
        mode: 'onTouched',
        resolver: yupResolver(serviceIncidentSchema),
        reValidateMode: 'onChanged'
    });
    // AllSite Info Section
    const states = Array.from(new Set(allSite.map(site => site.state)));
    const clusters = Array.from(new Set(allSite.filter(site => site.state === serviceSiteInfo.state).map(site => site.cluster)));
    const siteIds = allSite.filter(site => site.cluster === serviceSiteInfo.cluster).map(site => site.siteId);


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
        const newState = event.target.value;
        setServiceSiteInfo(prevState => ({
            ...prevState,
            state: newState,
            cluster: '',
            siteId: '',
            location: '',
            type: '',
            site_id: '',
        }));
    };

    // site cluster
    const getCluster = () => {
        if (!serviceSiteInfo.state) {
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
        const newCluster = event.target.value;
        setServiceSiteInfo(prevState => ({
            ...prevState,
            cluster: newCluster,
            siteId: '',
            location: '',
            type: '',
            site_id: '',
        }));
    };

    // site ID
    const getSiteId = () => {
        if (!serviceSiteInfo.state || !serviceSiteInfo.cluster) {
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
        const selectedSiteId = event.target.value;
        const selectedSite = allSite.find(site => site.siteId === selectedSiteId);
        if (selectedSite) {
            setServiceSiteInfo({
                site_id: selectedSite._id,
                siteId: selectedSiteId,
                state: serviceSiteInfo.state,
                cluster: serviceSiteInfo.cluster,
                location: selectedSite.location || 'N/A',
                type: selectedSite.type || 'N/A',
            });
            setValue('serviceSiteInfo', {
                site_id: selectedSite._id,
                siteId: selectedSiteId,
                state: serviceSiteInfo.state,
                cluster: serviceSiteInfo.cluster,
                location: selectedSite.location || 'N/A',
                type: selectedSite.type || 'N/A',
            });
            clearErrors('serviceSiteInfo');
        }
    };
    // All
    const catA = ['Maintenance', 'Repair', 'Overhauling', 'Replacement', 'Others']
    const getCat = () => catA.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}
                  sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
            {catOpt}
        </MenuItem>
    ));
    const handleCat = (event) => {
        event.preventDefault();
        setValue('serviceIncidentInfo.category', event.target.value);
    }

    //Maintenance
    const catM = ['Routine', 'Scheduled', 'Unscheduled'];
    const getCatM = () => catM.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}
                  sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
            {catOpt}
        </MenuItem>
    ));
    const handleCatM = (event) => {
        event.preventDefault();
        setValue('serviceIncidentInfo.subCategory.maintenance.action', event.target.value);
    }

    //Repair
    const catR = ['Minor', 'Major'];
    const getCatR = () => catR.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}
                  sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
            {catOpt}
        </MenuItem>
    ));
    const handleCatR = (event) => {
        event.preventDefault();
        setValue('serviceIncidentInfo.subCategory.repair.action', event.target.value);
    }

    const catO = ['Partial', 'Complete'];
    const getCatO = () => catO.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}
                  sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
            {catOpt}
        </MenuItem>
    ));
    const handleCatO = (event) => {
        event.preventDefault();
        setValue('serviceIncidentInfo.subCategory.overhauling.action', event.target.value);
    }

    // Replacement
    const getCatRep = () => catR.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}
                  sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
            {catOpt}
        </MenuItem>
    ));
    const handleCatRep = (event) => {
        event.preventDefault();
        setValue('serviceIncidentInfo.subCategory.replacement.action', event.target.value);
    }

    const catSelector = watch('serviceIncidentInfo.category');

    const accordionSx = {
        bgcolor: '#274e61',
    }
    const cardSx = {
        bgcolor: '#274e61',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        border: '1px solid rgb(163, 163, 117)',
        p: 0.1,
    }

    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
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
    const paperSx = {
        padding: '10px',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        width: '100%',
        height: 'auto',
    }

    return (
        <>
            <Paper elevation={5} sx={paperSx}>
                <Stack direction='column' gap={1}>
                    <Typography variant='h6' sx={{
                        fontWeight: 'bold',
                        fontFamily: 'Poppins',
                        ml: '30px',
                        fontSize: '16px',
                        borderRadius: '30px',
                        textAlign: 'left',
                        color: '#46F0F9',
                    }}>
                        Service-Related
                    </Typography>
                    <Card sx={{bgcolor: '#274e61', color: '#FFF'}}>
                        <CardContent>
                            {/*AllSite info*/}
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: '16px',
                                    }}>
                                        AllSite-Info
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <Grid container spacing={4} sx={{mt: 0.5}}>
                                        {/*AllSite State*/}
                                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name="serviceSiteInfo.state"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({field}) => (
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
                                                            error={!!errors.serviceSiteInfo?.state}
                                                            helperText={errors.serviceSiteInfo?.state ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.serviceSiteInfo.state.message}
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
                                                            {serviceSiteInfo.state !== '' && (
                                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                    Select State
                                                                </MenuItem>
                                                            )}
                                                            {getState()}
                                                        </TextField>
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        {/*AllSite cluster*/}
                                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name="serviceSiteInfo.cluster"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({field}) => (

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
                                                            error={!!errors.serviceSiteInfo?.cluster}
                                                            helperText={errors.serviceSiteInfo?.cluster ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.serviceSiteInfo.cluster.message}
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
                                                            {serviceSiteInfo.cluster !== '' && (
                                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                    Select Cluster
                                                                </MenuItem>
                                                            )}
                                                            {getCluster()}
                                                        </TextField>

                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        {/*AllSite ID*/}
                                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name="serviceSiteInfo.siteId"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({field}) => (
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
                                                            error={!!errors.serviceSiteInfo?.siteId}
                                                            helperText={errors.serviceSiteInfo?.siteId ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.serviceSiteInfo?.siteId.message}
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
                                                            }}>
                                                            {serviceSiteInfo.cluster !== '' && (
                                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                    Select SiteID
                                                                </MenuItem>
                                                            )}
                                                            {getSiteId()}
                                                        </TextField>

                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        {/*AllSite Type if available*/}
                                        {serviceSiteInfo.siteId && (
                                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                <FormControl fullWidth>
                                                    <Controller
                                                        name="serviceSiteInfo.type"
                                                        control={control}
                                                        defaultValue=""
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
                                                                label="AllSite Type"
                                                                variant="outlined"
                                                                error={!!errors.serviceSiteInfo?.type}
                                                                helperText={errors.serviceSiteInfo?.type ? errors.serviceSiteInfo.type.message : ''}
                                                                type="text"
                                                                value={serviceSiteInfo.type}
                                                                readOnly
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        )}
                                        {/*Location if available*/}
                                        {serviceSiteInfo.siteId && (
                                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                <FormControl fullWidth>
                                                    <Controller
                                                        name="serviceSiteInfo.location"
                                                        control={control}
                                                        defaultValue=""
                                                        render={({field}) => (
                                                            <TextField
                                                                {...field}
                                                                InputProps={{
                                                                    sx:
                                                                    txProps,
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
                                                                error={!!errors.serviceSiteInfo?.location}
                                                                helperText={errors.serviceSiteInfo?.location ? errors.serviceSiteInfo.location.message : ''}
                                                                type="text"
                                                                value={serviceSiteInfo.location}
                                                                readOnly
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        )}
                                    </Grid>
                                    <br/>
                                </AccordionDetails>
                            </Accordion>
                            <br/>
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: '16px',
                                    }}>
                                        Incident-Info
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'salmon',}}>
                                    <Grid container spacing={4} sx={{mt: 0.5}}>
                                        {/*AllSite State*/}
                                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name="serviceIncidentInfo.category"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({field}) => (
                                                        <TextField
                                                            {...field}
                                                            select
                                                            value={field.value}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                handleCat(e);
                                                            }}
                                                            required
                                                            label="Category"
                                                            error={!!errors.serviceIncidentInfo?.category}
                                                            helperText={errors.serviceIncidentInfo?.category ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.serviceIncidentInfo?.category.message}
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
                                                            {getCat()}
                                                        </TextField>
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        {catSelector === 'Maintenance' && (
                                            <>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="serviceIncidentInfo.subCategory.maintenance.action"
                                                            control={control}
                                                            defaultValue=""
                                                            render={({field}) => (
                                                                <TextField
                                                                    {...field}
                                                                    select
                                                                    defaultValue='' // <-- Set default value to an empty string
                                                                    value={field.value}
                                                                    onChange={(e) => {
                                                                        field.onChange(e);
                                                                        handleCatM(e);
                                                                    }}
                                                                    required
                                                                    label="Sub-Action"
                                                                    error={!!errors.serviceIncidentInfo?.subCategory?.maintenance?.action}
                                                                    helperText={errors.serviceIncidentInfo?.subCategory?.maintenance?.action ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.serviceIncidentInfo?.subCategory?.maintenance?.action.message}
                                                                                </span>
                                                                    ) : ''}
                                                                    InputProps={{
                                                                        sx:
                                                                        txProps,
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
                                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                        Select Option
                                                                    </MenuItem>
                                                                    {getCatM()}
                                                                </TextField>
                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </>
                                        )}
                                        {catSelector === 'Repair' && (
                                            <>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="serviceIncidentInfo.subCategory.repair.action"
                                                            control={control}
                                                            defaultValue=""
                                                            render={({field}) => (
                                                                <TextField
                                                                    {...field}
                                                                    select
                                                                    defaultValue='' // <-- Set default value to an empty string
                                                                    value={field.value}
                                                                    onChange={(e) => {
                                                                        field.onChange(e);
                                                                        handleCatR(e);
                                                                    }}
                                                                    required
                                                                    label="Sub-Action"
                                                                    error={!!errors.serviceIncidentInfo?.subCategory?.repair?.action}
                                                                    helperText={errors.serviceIncidentInfo?.subCategory?.repair?.action ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.serviceIncidentInfo?.subCategory?.repair?.action.message}
                                                                                </span>
                                                                    ) : ''}
                                                                    InputProps={{
                                                                        sx:
                                                                        txProps,
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
                                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                        Select Option
                                                                    </MenuItem>
                                                                    {getCatR()}
                                                                </TextField>

                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </>
                                        )}
                                        {catSelector === 'Overhauling' && (
                                            <>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="serviceIncidentInfo.subCategory.overhauling.action"
                                                            control={control}
                                                            defaultValue=""
                                                            render={({field}) => (

                                                                <TextField
                                                                    {...field}
                                                                    select
                                                                    defaultValue='' // <-- Set default value to an empty string
                                                                    value={field.value}
                                                                    onChange={(e) => {
                                                                        field.onChange(e);
                                                                        handleCatO(e);
                                                                    }}
                                                                    required
                                                                    label="Sub-Action"
                                                                    error={!!errors.serviceIncidentInfo?.subCategory?.overhauling?.action}
                                                                    helperText={errors.serviceIncidentInfo?.subCategory?.overhauling?.action ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.serviceIncidentInfo?.subCategory?.overhauling?.action.message}
                                                                                </span>
                                                                    ) : ''}
                                                                    InputProps={{
                                                                        sx:
                                                                        txProps,
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
                                                                    }}>
                                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                        Select Option
                                                                    </MenuItem>
                                                                    {getCatO()}
                                                                </TextField>
                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </>
                                        )}
                                        {catSelector === 'Replacement' && (
                                            <>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="serviceIncidentInfo.subCategory.replacement.action"
                                                            control={control}
                                                            defaultValue=""
                                                            render={({field}) => (

                                                                <TextField
                                                                    {...field}
                                                                    select
                                                                    defaultValue='' // <-- Set default value to an empty string
                                                                    value={field.value || null}
                                                                    onChange={(e) => {
                                                                        field.onChange(e);
                                                                        handleCatRep(e);
                                                                    }}
                                                                    required
                                                                    label="Sub-Action"
                                                                    error={!!errors.serviceIncidentInfo?.subCategory?.replacement?.action}
                                                                    helperText={errors.serviceIncidentInfo?.subCategory?.replacement?.action ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.serviceIncidentInfo?.subCategory?.replacement?.action.message}
                                                                                </span>
                                                                    ) : ''}
                                                                    InputProps={{
                                                                        sx:
                                                                        txProps,
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
                                                                    }}>
                                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                        Select Option
                                                                    </MenuItem>
                                                                    {getCatRep()}
                                                                </TextField>

                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </>
                                        )}
                                        {catSelector === 'Others' && (
                                            <>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="serviceIncidentInfo.subCategory.others"
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
                                                                                color: "white",
                                                                            },
                                                                        }
                                                                    }}
                                                                    label="Others"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    required
                                                                    error={!!errors.serviceIncidentInfo?.subCategory?.others}
                                                                    helperText={errors.serviceIncidentInfo?.serviceIncidentInfo?.subCategory?.others.others ? errors.categoryServiceOthers.message : ''}
                                                                />
                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </>
                                        )}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <br/>
                        </CardContent>
                    </Card>
                </Stack>
            </Paper>
            <br/>
        </>
    )
}

export default ServiceIncident;