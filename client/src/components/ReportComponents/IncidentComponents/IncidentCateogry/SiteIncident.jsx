import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import {Controller, useFormContext} from "react-hook-form";
import {FormControl} from "@mui/material";
import TextField from "@mui/material/TextField";
import {txProps} from "@/utils/data";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import React, {useState} from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {yupResolver} from "@hookform/resolvers/yup";
import {siteIncidentSchema} from "@/SchemaValidator/IncidentValidators/siteIncidentSchema";


function SiteIncident({allSite}) {
    const [siteInfo, setSiteInfo] = useState({
        siteId: '',
        site_id: '',
        state: '',
        cluster: '',
        location: '',
        type: '',
    });
    const {control, setValue, clearErrors, watch, formState: {errors}} = useFormContext({
        mode: 'onTouch',
        reValidateMode: 'onChange',
        resolver: yupResolver(siteIncidentSchema),
    });
    // AllSite Info Section
    const states = Array.from(new Set(allSite.map(site => site.state)));
    const clusters = Array.from(new Set(allSite.filter(site => site.state === siteInfo.state).map(site => site.cluster)));
    const siteIds = allSite.filter(site => site.cluster === siteInfo.cluster).map(site => site.siteId);

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
        setSiteInfo(prevState => ({
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
        if (!siteInfo.state) {
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
        setSiteInfo(prevState => ({
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
        if (!siteInfo.state || !siteInfo.cluster) {
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
            setSiteInfo({
                site_id: selectedSite._id,
                siteId: selectedSiteId,
                state: siteInfo.state,
                cluster: siteInfo.cluster,
                location: selectedSite.location || 'N/A',
                type: selectedSite.type || 'N/A',
            });
            setValue('siteInfo', {
                site_id: selectedSite._id,
                siteId: selectedSiteId,
                state: siteInfo.state,
                cluster: siteInfo.cluster,
                location: selectedSite.location || 'N/A',
                type: selectedSite.type || 'N/A',
            });
            clearErrors('siteInfo');
        }
    };


    // category
    const catReport = ['Shelter', 'Security', 'Others']
    const getCatReport = () => {
        // if (!siteInfo.state || !siteInfo.cluster) {
        //     return [];
        // }
        return catReport.map((category) => (
            <MenuItem key={category} value={category}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {category}
            </MenuItem>
        ));
    };
    const handleCatReport = (event) => {
        event.preventDefault();
        setValue('siteIncidentInfo.category', event.target.value);
        clearErrors('siteIncidentInfo.category');
    };

    const catSec = ['Theft', 'Vandalism', 'Intrusion', 'Others']
    const getCatSec = () => {
        return catSec.map((category) => (
            <MenuItem key={category} value={category}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {category}
            </MenuItem>
        ))
    }
    const handleCatSec = (event) => {
        event.preventDefault();
        setValue('siteIncidentInfo.subCategory.security', event.target.value);
        clearErrors('siteIncidentInfo.subCategory.security');
    }

    const catShe = ['Fire', 'Flooding', 'Structural-Damage', 'Others']
    const getCatShe = () => {
        return catShe.map((category) => (
            <MenuItem key={category} value={category}
                      sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                {category}
            </MenuItem>
        ))
    }
    const handleCatShe = (event) => {
        event.preventDefault();
        setValue('siteIncidentInfo.subCategory.shelter', event.target.value);
        clearErrors('siteIncidentInfo.subCategory.shelter');
    }


    const catSelector = watch('siteIncidentInfo.category');
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
                        AllSite-Related
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
                                        <Grid item xs={2}>
                                            <Controller
                                                name="siteInfo.state"
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
                                                            error={!!errors.siteInfo?.state}
                                                            helperText={errors.siteInfo?.state ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.siteInfo.state.message}
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
                                                            {siteInfo.state !== '' && (
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
                                        {/*AllSite cluster*/}
                                        <Grid item xs={2}>
                                            <Controller
                                                name="siteInfo.cluster"
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
                                                            error={!!errors.siteInfo?.cluster}
                                                            helperText={errors.siteInfo?.cluster ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.siteInfo.cluster.message}
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
                                                            {siteInfo.cluster !== '' && (
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
                                        {/*AllSite ID*/}
                                        <Grid item xs={2}>
                                            <Controller
                                                name="siteInfo.siteId"
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
                                                            label="AllSite ID"
                                                            required
                                                            error={!!errors.siteInfo?.siteId}
                                                            helperText={errors.siteInfo?.siteId ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.siteInfo.siteId.message}
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
                                                            {siteInfo.siteId !== '' && (
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
                                        {/*AllSite Type if available*/}
                                        {siteInfo.siteId && (
                                            <Grid item xs={2}>
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
                                                            }}
                                                            label="AllSite Type"
                                                            variant="outlined"
                                                            error={!!errors.siteInfo?.type}
                                                            helperText={errors.siteInfo?.type ? errors.siteInfo.type.message : ''}
                                                            type="text"
                                                            value={siteInfo.type}
                                                            readOnly
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        )}
                                        {/*Location if available*/}
                                        {siteInfo.siteId && (
                                            <Grid item xs={4}>
                                                <Controller
                                                    name="siteInfo.location"
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
                                                            error={!!errors.siteInfo?.location}
                                                            helperText={errors.siteInfo?.location ? errors.location.message : ''}
                                                            type="text"
                                                            value={siteInfo.location}
                                                            readOnly
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        )}
                                    </Grid>
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
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <Grid container spacing={4} sx={{mt: 0.5}}>
                                        <Grid item xs={4}>
                                            <Controller
                                                name="siteIncidentInfo.category"
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
                                                                handleCatReport(e);
                                                            }}
                                                            required
                                                            label="Action"
                                                            error={!!errors.siteIncidentInfo?.category}
                                                            helperText={errors.siteIncidentInfo?.category ? (
                                                                <span style={{color: "#fc8947"}}>
                                                                                {errors.siteIncidentInfo?.category.message}
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
                                                            }}>
                                                            <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                Select Class Action
                                                            </MenuItem>
                                                            {getCatReport()}
                                                        </TextField>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        {catSelector === 'Shelter' && (
                                            <>
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="siteIncidentInfo.subCategory.shelter"
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
                                                                        handleCatShe(e);
                                                                    }}
                                                                    required
                                                                    label="Sub-Action"
                                                                    error={!!errors.siteIncidentInfo?.subCategory?.shelter}
                                                                    helperText={errors.siteIncidentInfo?.subCategory?.shelter ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.siteIncidentInfo?.subCategory?.shelter?.message}
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
                                                                    }}>
                                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                        Select Option
                                                                    </MenuItem>
                                                                    {getCatShe()}
                                                                </TextField>
                                                            </FormControl>
                                                        )}
                                                    />
                                                </Grid>


                                            </>
                                        )}
                                        {catSelector === 'Security' && (
                                            <>
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="siteIncidentInfo.subCategory.security"
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
                                                                        handleCatSec(e);
                                                                    }}
                                                                    required
                                                                    label="Sub-Action"
                                                                    error={!!errors.siteIncidentInfo?.subCategory?.security}
                                                                    helperText={errors.siteIncidentInfo?.subCategory?.security ? (
                                                                        <span style={{color: "#fc8947"}}>
                                                                                {errors.siteIncidentInfo?.subCategory?.security?.message}
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
                                                                    }}>
                                                                    <MenuItem value='' sx={{color: "#4BF807"}}>
                                                                        Select Option
                                                                    </MenuItem>
                                                                    {getCatSec()}
                                                                </TextField>
                                                            </FormControl>
                                                        )}
                                                    />
                                                </Grid>
                                            </>
                                        )}
                                        {catSelector === 'Others' && (
                                            <>
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="siteIncidentInfo.subCategory.others"
                                                        control={control}
                                                        render={({field}) => (
                                                            <TextField
                                                                {...field}
                                                                InputProps={{
                                                                    sx: {...txProps, width: '50%'}
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
                                                                error={!!errors.siteIncidentInfo?.subCategory?.others}
                                                                helperText={errors.siteIncidentInfo?.subCategory?.others ? errors.siteIncidentInfo.subCategory.others.message : ''}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            </>
                                        )}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Stack>
            </Paper>
            <br/>
        </>
    )
}

export default SiteIncident;