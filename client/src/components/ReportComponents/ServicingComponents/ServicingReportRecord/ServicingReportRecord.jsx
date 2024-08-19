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

function ServicingReportRecord({data}) {
    const theme = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const typographyStyle = {
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: '16px',
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cardSx = {
        bgcolor: '#274e61',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        border: '1px solid rgb(163, 163, 117)',
        p: 0.1,
    }
    const accordionSx = {
        bgcolor: '#274e61',
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
    } = data[0];
    
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
    
    return (
        <>
            <br/>
            <Divider sx={{
                width: '100%',
                backgroundColor: 'rgb(255, 153, 153)',
                color: '#FFF'
            }}/>
            <Typography variant='h6'
                        sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 'bold',
                            color: '#FFF',
                            ml: 60,
                            mt: 5,
                            p: 2,
                            border: '1px solid rgb(255, 153, 153)',
                            borderRadius: 10,
                            width: '35%'
                        }}>
                Report Data for {siteId}-{pmInstance} : {formattedServicingDate}
            </Typography>
            <br/>
            <Grid container spacing={3}>
                {/*Submission Info*/}
                <Grid item xs={12}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: '18px',
                        }}>
                            Submission and Approval:
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
                                        fontSize: '16px',
                                    }}>Submission Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Submission By: ${fullName}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Email: ${email}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Role: ${role}`}
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
                                        fontSize: '16px',
                                    }}>Approval Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Approved: ${adminFullName}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Email: ${adminEmail}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Role: ${adminRole}`}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Grid>
                
                {/*Site Info*/}
                <Grid item xs={12}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: '18px',
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
                                        fontSize: '16px',
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
                
                {/* Servicing Dates */}
                <Grid item xs={6}>
                    <Card sx={{...cardSx, borderRadius: 5, p: 0.2, border: 'none',}}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            fontSize: '16px',
                            m: 2,
                        }}>
                            {`Servicing Date: ${formattedServicingDate}`}
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{...cardSx, borderRadius: 5, p: 0.2, border: 'none',}}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            fontSize: '16px',
                            m: 2,
                        }}>
                            {`Next Service Date: ${formattedNextServiceDate}`}
                        </Typography>
                    </Card>
                </Grid>
                
                {/* Summary Section */}
                <Grid item xs={12}>
                    <Card sx={{...cardSx, border: 'none',}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: '18px',
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
                                        fontSize: '16px',
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
                <Grid item xs={12}>
                    <Card sx={{bgcolor: '#274e61', color: '#FFF'}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: '18px',
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
                                        fontSize: '16px',
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
                                        fontSize: '16px',
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
                <Grid item xs={12}>
                    <Card sx={{bgcolor: '#274e61', color: 'white'}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: '18px',
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
                                        fontSize: '16px',
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
                <Grid item xs={12}>
                    <Card sx={{bgcolor: '#274e61', color: 'white'}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: '18px',
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
                                        fontSize: '16px',
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
                <Grid item xs={12}>
                    <Card sx={{bgcolor: '#274e61', color: 'white'}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: '18px',
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
                                        fontSize: '16px',
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
                <Grid item xs={12}>
                    <Card sx={{bgcolor: '#274e61', color: 'white'}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: '18px',
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
                                        fontSize: '16px',
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
                                        fontSize: '16px',
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
                <Grid item xs={12}>
                    <Card sx={{bgcolor: '#274e61', color: 'white'}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: '18px',
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
                                        fontSize: '16px',
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
                <Grid item xs={12}>
                    <Card sx={{bgcolor: '#274e61', color: 'white'}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            ml: '30px',
                            mt: '30px',
                            fontSize: '18px',
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
                                        fontSize: '16px',
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
                                fontSize: '20px',
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
                                        sx={{
                                            width: "100%",
                                            maxWidth: "500px",
                                            height: "auto",
                                            borderRadius: 2,
                                            boxShadow: 3,
                                        }}
                                        src={images[currentIndex]}
                                        alt={`Image ${currentIndex + 1}`}
                                    />
                                </Card>
                                {/*</Tooltip>*/}
                                <IconButton onClick={handleNext}>
                                    <ArrowForwardIosIcon sx={{color: 'lime'}}/>
                                </IconButton>
                            </Box>
                            <Typography align="center" sx={{mt: 1}}>
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