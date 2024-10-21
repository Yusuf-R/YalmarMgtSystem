import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useTheme} from "@mui/material/styles";
import {useSwipeable} from 'react-swipeable';
import React, {useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListItemIcon from "@mui/material/ListItemIcon";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Dialog from "@mui/material/Dialog";
import {Tooltip} from "recharts";
import CloseIcon from "@mui/icons-material/Close";

import dayjs from 'dayjs';
import Divider from "@mui/material/Divider";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import useMediaQuery from "@mui/material/useMediaQuery";

function ServicingReportRecord({data}) {
    const theme = useTheme();

    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');

    const [currentIndex, setCurrentIndex] = useState(0);
    const typographyStyle = {
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: {xs: '0.9rem', sm: '1.0rem', md: '1.1rem'},
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cardSx = {
        bgcolor: '#274e61',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        border: '1px solid rgb(163, 163, 117)',
        p: 0.1,
        m: 0,
    }
    const accordionSx = {
        bgcolor: '#274e61',
        // p: 2,
        overflowX: 'hidden',
    }
    const {
        siteId,
        cluster,
        location,
        siteType,
        shelterType,
        siteGenModes,
        fullName,
        email,
        role,
        pmInstance,
        adminFullName,
        adminEmail,
        adminRole,
        generatorPM,
        airconPM,
        shelterPM,
        lightningPM,
        dcSystem,
        otherPM,
        securityPM,
        images,
        summary,
        servicingDate,
        nextServiceDate,
    } = data[0] || data;

    // format servicingDate to a more readable format
    const formattedServicingDate = dayjs(servicingDate).format('DD/MMM/YYYY');

    // format nextServiceDate to a more readable format
    const formattedNextServiceDate = dayjs(nextServiceDate).format('DD/MMM/YYYY');

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    const handlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrevious,
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    // Split the summary into an array of sentences
    const summaryLines = summary.split('\r\n');

    // handle modal opening and closing
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Keyboard navigation within the modal
    const handleKeyDown = (event) => {
        if (event.key === 'ArrowLeft') {
            handlePrevious();
        } else if (event.key === 'ArrowRight') {
            handleNext();
        }
    };
    const goPrev = () => {
        window.history.back();
    }
    return (
        <>
            <br/>
            <Typography variant="h6"
                        sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 'bold',
                            color: '#FFF',
                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '10px',
                            borderRadius: '10px',
                            bgcolor: '#0059b3',
                        }}>
                {siteId}-{pmInstance} : {formattedServicingDate} <IconButton><ArrowBackSharpIcon
                sx={{color: 'lime', fontSize: 20}} onClick={goPrev}/></IconButton>
            </Typography>
            <br/>
            <Grid container spacing={3}>
                {/* Servicing Dates */}
                <Grid item xs={12} sm={6} md={6}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            fontSize: xSmall || small ? '0.9rem' : medium || large ? '0.9rem' : '1.0rem',
                            m: 2,
                        }}>
                            {`Servicing Date: ${formattedServicingDate}`}
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            fontSize: xSmall || small ? '0.9rem' : medium || large ? '0.9rem' : '1.0rem',
                            m: 2,
                        }}>
                            {`Next Service Date: ${formattedNextServiceDate}`}
                        </Typography>
                    </Card>
                </Grid>
                {/*Submission Info*/}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                        }}>
                            Submission and Approval:
                        </Typography>
                        <CardContent sx={{color: 'white', margin: 0,}}>
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>Submission Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{bgcolor: '#274e61', color: 'white', p: 0, m: 0}}>
                                    <List sx={{p: 0}}>
                                        <ListItem sx={{flexDirection: 'column', alignItems: 'flex-start', py: 1}}>
                                            <Typography sx={typographyStyle}>
                                                <strong>Submission By:</strong> {fullName}
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{flexDirection: 'column', alignItems: 'flex-start', py: 1}}>
                                            <Typography sx={typographyStyle}>
                                                <strong>Email:</strong> {email}
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{flexDirection: 'column', alignItems: 'flex-start', py: 1}}>
                                            <Typography sx={typographyStyle}>
                                                <strong>Role:</strong> {role}
                                            </Typography>
                                        </ListItem>
                                    </List>
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
                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>Approval Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List sx={{p: 0}}>
                                        <ListItem sx={{flexDirection: 'column', alignItems: 'flex-start', py: 1}}>
                                            <Typography sx={typographyStyle}>
                                                <strong>Approved:</strong> {adminFullName}
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{flexDirection: 'column', alignItems: 'flex-start', py: 1}}>
                                            <Typography sx={typographyStyle}>
                                                <strong>Email:</strong> {adminEmail}
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{flexDirection: 'column', alignItems: 'flex-start', py: 1}}>
                                            <Typography sx={typographyStyle}>
                                                <strong>Role:</strong> {adminRole}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Grid>
                {/*AllSite Info*/}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                        }}>
                            Site Summary:
                        </Typography>
                        <CardContent sx={{color: 'white', margin: '5px',}}>
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>Site Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Site ID: ${siteId}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Cluster: ${cluster}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Location: ${location}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`SiteType: ${siteType}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`ShelterType: ${shelterType}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Generator Working Modes: ${siteGenModes}`}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Summary Section */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                        }}>
                            PM Summary:
                        </Typography>
                        <CardContent sx={{color: 'white', margin: '5px',}}>
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>Summary Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    {summaryLines.map((line, index) => (
                                        <List>
                                            <ListItem sx={{margin: 0, p: 0,}} key={index}>
                                                <ListItemIcon sx={{mr: -1}}>
                                                    <PlaylistAddCheckIcon
                                                        sx={{color: "lime", fontSize: "32px"}}/>
                                                </ListItemIcon>
                                                <Typography sx={{
                                                    fontWeight: 'bold',
                                                    color: 'white',
                                                    fontFamily: 'Poppins',
                                                    fontSize: '16px',
                                                    m: -1,
                                                }}>
                                                    {line}
                                                </Typography>
                                            </ListItem>
                                        </List>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Generator PM Section */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                        }}>
                            Generator PM:
                        </Typography>
                        <CardContent>
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>Generator 1 Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Type: ${generatorPM.gen1Type}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Display: ${generatorPM.gen1Display}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Working Hours: ${generatorPM.gen1Hr}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Display Voltage (Volts): ${generatorPM.gen1OperatingVoltage}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Frequency (Hz): ${generatorPM.gen1OperatingFrequency}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Working Status: ${generatorPM.gen1WorkingStatus}`}
                                            </Typography>
                                        </ListItem>
                                    </List>
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
                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>Generator 2 Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Type: ${generatorPM.gen2Type}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Display: ${generatorPM.gen2Display}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Working Hours: ${generatorPM.gen2Hr}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Display Voltage (Volts): ${generatorPM.gen2OperatingVoltage}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Frequency (Hz): ${generatorPM.gen2OperatingFrequency}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Working Status: ${generatorPM.gen2WorkingStatus}`}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Air Conditioning PM Section */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                        }}>
                            Air Conditioning PM:
                        </Typography>
                        <CardContent>
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>AC Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`AC Installed: ${airconPM.acInstalled}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Number of ACs Installed: ${airconPM.noOfACInstalled}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`AC1 Status: ${airconPM.ac1Status}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`AC2 Status: ${airconPM.ac2Status}`}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <br/>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Shelter PM Section */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                        }}>
                            Shelter PM:
                        </Typography>
                        <CardContent>
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>Shelter Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Shelter Cleaning Status: ${shelterPM.shelterCleaningStatus}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Site Cleaning Status: ${shelterPM.siteCleaningStatus}`}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <br/>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Lightning PM Section */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                        }}>
                            Lightning PM:
                        </Typography>
                        <CardContent>
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>Lighting Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Aviation Warning Light (awl): ${lightningPM.awl}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Security Light Availability: ${lightningPM.securityLightAvailability}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Security Light Status: ${lightningPM.securityLightStatus}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Flood Light Availability: ${lightningPM.floodLightAvailability}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Flood Light Status: ${lightningPM.floodLightStatus}`}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <br/>
                        </CardContent>
                    </Card>
                </Grid>

                {/* DC System Section */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                        }}>
                            DC & Rectifier PM:
                        </Typography>
                        <CardContent>
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>Battery Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`BackUp Batteries Availability: ${dcSystem.backUpBatteries}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Security Light Availability: ${dcSystem.batteryCount}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Security Light Status: ${dcSystem.batteryStatus}`}
                                            </Typography>
                                        </ListItem>
                                    </List>
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
                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>Rectifier Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Rectifier Status: ${dcSystem.rectifierStatus}`}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Security PM Section */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                        }}>
                            Security PM:
                        </Typography>
                        <CardContent>
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>Security Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Security Status: ${securityPM.securityStatus}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Site Access: ${securityPM.siteAccess}`}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Other PM Section */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                        }}>
                            Others PM:
                        </Typography>
                        <CardContent>
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                    }}>Other Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Feeder Cable Status: ${otherPM.feederCableStatus}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Change Over Switch Status: ${otherPM.changeOverSwitchStatus}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Earthing Cable Status: ${otherPM.earthingStatus}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Fire Extinguisher Status: ${otherPM.fireExtinguisherStatus}`}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <br/>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Image Carousel Section */}
                {
                    images.length > 0 && (
                        <Grid item xs={12} {...handlers}>
                            <Typography sx={{
                                fontWeight: 'bold',
                                color: '#FFF',
                                fontFamily: 'Poppins',
                                fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                            }} align="center">
                                PM Images
                            </Typography>
                            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <IconButton onClick={handlePrevious}>
                                    <ArrowBackIosNewIcon sx={{color: 'lime'}}/>
                                </IconButton>
                                {/*<Tooltip title="Click to view larger" placement="top">*/}
                                <Card
                                    onClick={handleOpenModal}
                                    sx={{
                                        bgcolor: '#274e61',
                                        color: 'white',
                                        m: 2,
                                        border: '2px solid #FFF',
                                        borderRadius: 3
                                    }}>
                                    <Box
                                        component="img"
                                        src={images[currentIndex]}
                                        alt={`Image ${currentIndex + 1}`}
                                        sx={{
                                            width: {xs: '150px', sm: '350px', md: '450px'},
                                            height: {xs: '150px', sm: '350px', md: '450px'},
                                            objectFit: 'cover',
                                            borderRadius: 2,
                                            p: 1,
                                        }}
                                    />
                                </Card>
                                {/*</Tooltip>*/}
                                <IconButton onClick={handleNext}>
                                    <ArrowForwardIosIcon sx={{color: 'lime'}}/>
                                </IconButton>
                            </Box>
                            <Typography align="center" sx={{mt: 1, color: '#FFF'}}>
                                {currentIndex + 1} / {images.length}
                            </Typography>
                        </Grid>
                    )
                }
            </Grid>
            <Dialog
                open={isModalOpen}
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
                onKeyDown={handleKeyDown}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: '#000', // Dark background for better visibility of the image
                        p: 2,
                    }}
                >
                    <IconButton
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            top: 1,
                            right: 1,
                            color: 'red',
                            fontSize: '25px',
                            bgcolor: '#FFF',
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <IconButton
                        onClick={handlePrevious}
                        sx={{
                            position: 'absolute',
                            left: 1,
                            color: 'lime',
                        }}
                    >
                        <ArrowBackIosNewIcon sx={{fontSize: 20}}/>
                    </IconButton>
                    <Box
                        component="img"
                        sx={{
                            maxHeight: '80vh', // Ensure it fits within the screen height
                            maxWidth: '200%',
                            objectFit: 'contain',
                            borderRadius: 2,
                            width: "100%",
                            height: "auto",
                            p: 1,
                        }}
                        src={images[currentIndex]}
                        alt={`Image ${currentIndex + 1}`}
                    />
                    <IconButton
                        onClick={handleNext}
                        sx={{
                            position: 'absolute',
                            right: 1,
                            color: 'lime',
                        }}
                    >
                        <ArrowForwardIosIcon sx={{fontSize: 20}}/>
                    </IconButton>
                </Box>
            </Dialog>
        </>

    )
}

export default ServicingReportRecord;