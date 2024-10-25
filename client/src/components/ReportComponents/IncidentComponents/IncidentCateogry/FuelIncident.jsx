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
import {Controller, useFormContext, useWatch} from "react-hook-form";
import {FormControl} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import React, {useEffect, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {fuelIncidentSchema} from "@/SchemaValidator/IncidentValidators/fuelIncidentSchema";
import useMediaQuery from "@mui/material/useMediaQuery";

// setting up yupSchema for my fuelIncident form

function FuelIncident({allSite}) {
    const [fuelSiteInfo, setFuelSiteInfo] = useState({
        siteId: '',
        site_id: '',
        state: '',
        cluster: '',
        location: '',
        type: '',
    })

    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');


    const {control, setValue, clearErrors, watch, formState: {errors}} = useFormContext(
        {
            mode: 'onTouched',
            resolver: yupResolver(fuelIncidentSchema),
            reValidateMode: "onChange",
        }
    );
    // AllSite Info Section
    const states = Array.from(new Set(allSite.map(site => site.state)));
    const clusters = Array.from(new Set(allSite.filter(site => site.state === fuelSiteInfo.state).map(site => site.cluster)));
    const siteIds = allSite.filter(site => site.cluster === fuelSiteInfo.cluster).map(site => site.siteId);

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
        setFuelSiteInfo(prevState => ({
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
        if (!fuelSiteInfo.state) {
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
        setFuelSiteInfo(prevState => ({
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
        if (!fuelSiteInfo.state || !fuelSiteInfo.cluster) {
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
            setFuelSiteInfo({
                site_id: selectedSite._id,
                siteId: selectedSiteId,
                state: fuelSiteInfo.state,
                cluster: fuelSiteInfo.cluster,
                location: selectedSite.location || 'N/A',
                type: selectedSite.type || 'N/A',
            });
            setValue('fuelSiteInfo', {
                site_id: selectedSite._id,
                siteId: selectedSiteId,
                state: fuelSiteInfo.state,
                cluster: fuelSiteInfo.cluster,
                location: selectedSite.location || 'N/A',
                type: selectedSite.type || 'N/A',
            });
            clearErrors('serviceSiteInfo');
        }
    };

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

    const typographyStyle = {
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: '16px',
        textAlign: 'left',
        ml: '30px',
    };

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

    // All
    const catA = ['Theft', 'Quality', 'Consumption', 'Intervention', 'Others']
    const getCat = () => catA.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}
                  sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
            {catOpt}
        </MenuItem>
    ));
    const handleCat = (event) => {
        event.preventDefault();
        setValue('fuelIncidentInfo.category', event.target.value);
    }

    // Quality
    const catQ = ['Bad', 'Adulterated'];
    const getCatQ = () => catQ.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}
                  sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
            {catOpt}
        </MenuItem>
    ));
    const handleCatQ = (event) => {
        event.preventDefault();
        setValue('fuelIncidentInfo.subCategory.quality.action', event.target.value);
    }

    // Intervention
    const catI = ['Top-up', 'Emergency', 'Routine'];
    const getCatI = () => catI.map((catOpt) => (
        <MenuItem key={catOpt} value={catOpt}
                  sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
            {catOpt}
        </MenuItem>
    ));
    const handleCatI = (event) => {
        event.preventDefault();
        setValue('fuelIncidentInfo.subCategory.intervention.action', event.target.value);
    }

    //
    const oldQ = useWatch({control, name: 'fuelIncidentInfo.subCategory.intervention.oldQty', defaultValue: 0});
    const addedQ = useWatch({control, name: 'fuelIncidentInfo.subCategory.intervention.qtyAdded', defaultValue: 0});
    const newQ = (Number(oldQ) + Number(addedQ)) || 0;

    //
    const oldQt = useWatch({control, name: 'fuelIncidentInfo.subCategory.theft.oldQty', defaultValue: 0});
    const stolenQ = useWatch({control, name: 'fuelIncidentInfo.subCategory.theft.qtyStolen', defaultValue: 0});
    const newQt = (Number(oldQt) - Number(stolenQ)) || 0;

    useEffect(() => {
        // Set the calculated value to the newQty field
        setValue('fuelIncidentInfo.subCategory.intervention.newQty', newQ);
    }, [newQ, setValue]);

    useEffect(() => {
        // Set the calculated value to the newQty field
        setValue('fuelIncidentInfo.subCategory.theft.newQty', newQt);
    }, [newQt, setValue]);
    // Consumption

    const catSelector = watch('fuelIncidentInfo.category');

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
                        Fuel-Related
                    </Typography>
                    <Card sx={{bgcolor: '#274e61', color: '#FFF'}}>
                        <CardContent>
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
                                                    name="fuelSiteInfo.state"
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
                                                            error={!!errors.fuelSiteInfo?.state}
                                                            helperText={errors.fuelSiteInfo?.state ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.fuelSiteInfo.state.message}
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
                                                                border: '1px solid rgb(163, 163, 117)',
                                                            }}>
                                                            {fuelSiteInfo.state !== '' && (
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
                                                    name="fuelSiteInfo.cluster"
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
                                                            error={!!errors.fuelSiteInfo?.cluster}
                                                            helperText={errors.fuelSiteInfo?.cluster ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.fuelSiteInfo.cluster.message}
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
                                                                border: '1px solid rgb(163, 163, 117)',
                                                            }}>
                                                            {fuelSiteInfo.cluster !== '' && (
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
                                                    name="fuelSiteInfo.siteId"
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
                                                            label="AllSite ID"
                                                            required
                                                            error={!!errors.sitfuelSiteInfo?.siteIdeId}
                                                            helperText={errors.fuelSiteInfo?.siteId ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.fuelSiteInfo.siteId.message}
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
                                                                border: '1px solid rgb(163, 163, 117)',
                                                            }}>
                                                            {fuelSiteInfo.cluster !== '' && (
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
                                        {fuelSiteInfo.siteId && (
                                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                <FormControl fullWidth>
                                                    <Controller
                                                        name="siteInfo.type"
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
                                                                    border: '1px solid rgb(163, 163, 117)',

                                                                }}
                                                                label="AllSite Type"
                                                                variant="outlined"
                                                                type="text"
                                                                value={fuelSiteInfo.type}
                                                                readOnly
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        )}
                                        {/*Location if available*/}
                                        {fuelSiteInfo.siteId && (
                                            <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                <FormControl fullWidth>
                                                    <Controller
                                                        name="siteInfo.location"
                                                        control={control}
                                                        defaultValue=""
                                                        render={({field}) => (
                                                            <TextField
                                                                {...field}
                                                                InputProps={{
                                                                    sx: txProps,


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
                                                                    border: '1px solid rgb(163, 163, 117)',
                                                                }}
                                                                label="Location"
                                                                variant="outlined"
                                                                type="text"
                                                                value={fuelSiteInfo.location}
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
                                <br/>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                        {/*AllSite State*/}
                                        <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                            <FormControl fullWidth>
                                                <Controller
                                                    name="fuelIncidentInfo.category"
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
                                                            error={!!errors.fuelIncidentInfo?.category}
                                                            helperText={errors.fuelIncidentInfo?.category ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.fuelIncidentInfo.category.message}
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
                                                            {fuelSiteInfo.state !== '' && (
                                                                <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                    Select State
                                                                </MenuItem>
                                                            )}
                                                            {getCat()}
                                                        </TextField>
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        {catSelector === 'Intervention' && (
                                            <>
                                                <br/>
                                                {/*action Taken*/}
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="fuelIncidentInfo.subCategory.intervention.action"
                                                            control={control}
                                                            defaultValue=""
                                                            render={({field}) => (
                                                                <TextField
                                                                    {...field}
                                                                    select
                                                                    defaultValue='' // <-- Set default value to an empty string
                                                                    value={field.value || ''}
                                                                    onChange={(e) => {
                                                                        field.onChange(e);
                                                                        handleCatI(e);
                                                                    }}
                                                                    required
                                                                    label="Sub-Action"
                                                                    error={!!errors.fuelIncidentInfo?.subCategory?.intervention?.action}
                                                                    helperText={errors.fuelIncidentInfo?.subCategory?.intervention?.action ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.fuelIncidentInfo.subCategory.intervention.action.message}
                                                                                </span>
                                                                    ) : ''}
                                                                    InputProps={{
                                                                        sx: {
                                                                            ...txProps,
                                                                            // width: '25%',
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
                                                                        border: '1px solid rgb(163, 163, 117)',
                                                                    }}>
                                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                        Select Option
                                                                    </MenuItem>
                                                                    {getCatI()}
                                                                </TextField>
                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <br/>
                                                {/*oldQty - Estimated*/}
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="fuelIncidentInfo.subCategory.intervention.oldQty"
                                                            control={control}
                                                            render={({field}) => (

                                                                <TextField
                                                                    {...field}
                                                                    label="Old Qty"
                                                                    type="number"
                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                                    required
                                                                    error={!!errors.fuelIncidentInfo?.subCategory?.intervention?.oldQty}
                                                                    helperText={errors.fuelIncidentInfo?.subCategory?.intervention?.oldQty ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.fuelIncidentInfo.subCategory?.intervention?.oldQty.message}
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
                                                                        border: '1px solid rgb(163, 163, 117)',
                                                                    }}
                                                                    fullWidth
                                                                />

                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <br/>
                                                {/*QtyAdded*/}
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="fuelIncidentInfo.subCategory.intervention.qtyAdded"
                                                            control={control}
                                                            render={({field}) => (
                                                                <TextField
                                                                    {...field}
                                                                    label="Qty Added"
                                                                    type="number"
                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                                    required
                                                                    error={!!errors.fuelIncidentInfo?.subCategory?.intervention?.qtyAdded}
                                                                    helperText={errors.fuelIncidentInfo?.subCategory?.intervention?.qtyAdded ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.fuelIncidentInfo?.subCategory?.intervention?.qtyAdded.message}
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
                                                                        border: '1px solid rgb(163, 163, 117)',
                                                                    }}
                                                                />

                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                {/*NewQty*/}
                                                <br/>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="fuelIncidentInfo.subCategory.intervention.newQty"
                                                            control={control}
                                                            render={({field}) => (
                                                                <TextField
                                                                    {...field}
                                                                    label="New Qty"
                                                                    type="number"
                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                                    required
                                                                    error={!!errors.fuelIncidentInfo?.subCategory?.intervention?.newQty}
                                                                    helperText={errors.fuelIncidentInfo?.subCategory?.intervention?.newQty ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.fuelIncidentInfo?.subCategory?.intervention?.newQty.message}
                                                                                </span>
                                                                    ) : ''}
                                                                    InputProps={{
                                                                        sx: txProps,
                                                                        readOnly: true,
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
                                                                        border: '1px solid rgb(163, 163, 117)',
                                                                    }}
                                                                    fullWidth
                                                                    value={newQ}
                                                                />
                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <br/>
                                            </>
                                        )}
                                        {catSelector === 'Quality' && (
                                            <>
                                                <br/>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="fuelIncidentInfo.subCategory.quality"
                                                            control={control}
                                                            defaultValue=""
                                                            render={({field}) => (

                                                                <TextField
                                                                    {...field}
                                                                    select
                                                                    defaultValue='' // <-- Set default value to an empty string
                                                                    value={field.value || ''}
                                                                    onChange={(e) => {
                                                                        field.onChange(e);
                                                                        handleCatQ(e);
                                                                    }}
                                                                    required
                                                                    label="Sub-Action"
                                                                    error={!!errors.fuelIncidentInfo?.subCategory?.quality}
                                                                    helperText={errors.fuelIncidentInfo?.subCategory?.quality ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.fuelIncidentInfo?.subCategory?.quality.message}
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
                                                                                    maxHeight: 450,
                                                                                    overflow: 'auto',
                                                                                    fontSize: '40px',
                                                                                    // width: '20%'
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
                                                                        border: '1px solid rgb(163, 163, 117)',
                                                                    }}>
                                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                        Select Option
                                                                    </MenuItem>
                                                                    {getCatQ()}
                                                                </TextField>
                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <br/>
                                            </>
                                        )}
                                        {catSelector === 'Theft' && (
                                            <>
                                                {/*oldQty - Estimated*/}
                                                <br/>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="fuelIncidentInfo.subCategory.theft.oldQty"
                                                            control={control}
                                                            render={({field}) => (

                                                                <TextField
                                                                    {...field}
                                                                    label="Old Qty"
                                                                    type="number"
                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                                    required
                                                                    error={!!errors.fuelIncidentInfo?.subCategory?.theft?.oldQty}
                                                                    helperText={errors.fuelIncidentInfo?.subCategory?.theft?.oldQty ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.fuelIncidentInfo?.subCategory?.theft?.oldQty.message}
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
                                                                        border: '1px solid rgb(163, 163, 117)',
                                                                    }}
                                                                    fullWidth
                                                                />

                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <br/>
                                                {/*QtyAdded*/}
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="fuelIncidentInfo.subCategory.theft.qtyStolen"
                                                            control={control}
                                                            render={({field}) => (

                                                                <TextField
                                                                    {...field}
                                                                    label="Qty Stolen"
                                                                    type="number"
                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                                    required
                                                                    error={!!errors.fuelIncidentInfo?.subCategory?.theft?.qtyStolen}
                                                                    helperText={errors.fuelIncidentInfo?.subCategory?.theft?.qtyStolen ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.fuelIncidentInfo?.subCategory?.theft?.qtyStolen.message}
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
                                                                        border: '1px solid rgb(163, 163, 117)',
                                                                    }}
                                                                    fullWidth
                                                                />

                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <br/>
                                                {/*NewQty*/}
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="fuelIncidentInfo.subCategory.theft.newQty"
                                                            control={control}
                                                            render={({field}) => (

                                                                <TextField
                                                                    {...field}
                                                                    label="New Qty"
                                                                    type="number"
                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                                    required
                                                                    error={!!errors.fuelIncidentInfo?.subCategory?.theft?.newQty}
                                                                    helperText={errors.fuelIncidentInfo?.subCategory?.theft?.newQty ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.fuelIncidentInfo?.subCategory?.theft?.newQty.message}
                                                                                </span>
                                                                    ) : ''}
                                                                    InputProps={{
                                                                        sx: txProps,
                                                                        readOnly: true,
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
                                                                        border: '1px solid rgb(163, 163, 117)',
                                                                    }}
                                                                    fullWidth
                                                                    value={newQt}
                                                                />

                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <br/>
                                            </>
                                        )}
                                        {catSelector === 'Others' && (
                                            <>
                                                <br/>
                                                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                                                    <FormControl fullWidth>
                                                        <Controller
                                                            name="fuelIncidentInfo.subCategory.others"
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
                                                                    error={!!errors.fuelIncidentInfo?.subCategory?.others}
                                                                    helperText={errors.fuelIncidentInfo?.subCategory?.others ? errors.fuelIncidentInfo?.subCategory?.others?.message : ''}
                                                                />
                                                            )}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <br/>
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

export default FuelIncident;