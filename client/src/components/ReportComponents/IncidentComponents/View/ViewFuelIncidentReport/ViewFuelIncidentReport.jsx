'use client'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {mainSection} from "@/utils/data";
import useIncidentStore from "@/store/useIncidentStore";
import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import dayjs from "dayjs";
import {useSwipeable} from "react-swipeable";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";


const goPrev = () => {
    window.history.back();
}

function ViewFuelIncidentReport() {
    // get the siteIncidentReport from the useIncidentStore
    const viewFuelIncidentReport = useIncidentStore(state => state.viewFuelIncidentReport);
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/incident/fuel/view');
    const pathname = usePathname();

    // Media Queries for responsiveness
    const isXSmall = useMediaQuery('(max-width:599.99px)');


    // Media Queries for responsiveness
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');


    // useEffect or handling navigation between new and staff
    useEffect(() => {
        if (pathname.includes('view')) {
            setActiveTab('/dashboard/admin/reports/incident/fuel/view');
        } else if (pathname.includes('fuel')) {
            setActiveTab('/dashboard/admin/reports/incident/fuel');
        } else if (pathname.includes('incident')) {
            setActiveTab('/dashboard/admin/reports/incident');
        } else {
            setActiveTab('/dashboard/admin/reports');
        }
    }, [pathname]);


    if (!viewFuelIncidentReport) {
        return (
            <Box
                sx={{
                    padding: xSmall || small ? '5px' : medium || large ? '10px' : '5px',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%', // This ensures nothing overflows
                    overflow: 'hidden', // Handles overflowing content
                }}
            >
                {/*Navigation Tabs */}
                <Stack direction='row' spacing={2} sx={{
                    justifyContent: 'flex-start',
                }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        variant={isXSmall ? "scrollable" : "standard"}
                        centered
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#46F0F9',
                            },
                        }}
                    >
                        <Tab
                            label="Reports"
                            component={Link}
                            href="/dashboard/admin/reports"
                            value="/dashboard/admin/reports"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                                "&.Mui-selected": {color: "#46F0F9"},
                            }}
                        />

                        {['Incident-Center', 'Fuel'].map((label) => (
                            <Tab
                                key={label}
                                label={label}
                                component={Link}
                                href={`/dashboard/admin/reports/incident${label === 'Incident-Center' ? '' : `/${label.toLowerCase()}`}`}
                                value={`/dashboard/admin/reports/incident${label === 'Incident-Center' ? '' : `/${label.toLowerCase()}`}`}
                                sx={{
                                    color: "#FFF",
                                    fontWeight: 'bold',
                                    fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                                    "&.Mui-selected": {color: "#46F0F9"},
                                }}
                            />
                        ))}

                        <Tab
                            label="View"
                            component={Link}
                            href="/dashboard/admin/reports/incident/fuel/view"
                            value="/dashboard/admin/reports/incident/fuel/view"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                    </Tabs>
                </Stack>
                <br/>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '20px',
                    width: '100%',
                }}>
                    <Typography variant="h6"
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    borderRadius: 5,
                                    padding: '10px 15px',
                                    bgcolor: '#0059b3',
                                    color: '#FFF',
                                    width: 'auto',
                                    maxWidth: '90%',
                                    textAlign: 'center',
                                    fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                        Oops!!! No Report found.
                        <IconButton><ArrowBackSharpIcon
                            sx={{color: 'lime', fontSize: 25}} onClick={goPrev}/>
                        </IconButton>
                    </Typography>
                </Box>
            </Box>
        )
    }

    return (
        <>
            <Box
                sx={{
                    padding: xSmall || small ? '5px' : medium || large ? '10px' : '5px',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%', // This ensures nothing overflows
                    overflow: 'hidden', // Handles overflowing content
                }}
            >
                {/*Navigation Tabs */}
                <Stack direction='row' spacing={2} sx={{
                    justifyContent: 'flex-start',
                }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        variant={isXSmall ? "scrollable" : "standard"}
                        centered
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#46F0F9',
                            },
                        }}
                    >
                        <Tab
                            label="Reports"
                            component={Link}
                            href="/dashboard/admin/reports"
                            value="/dashboard/admin/reports"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                                "&.Mui-selected": {color: "#46F0F9"},
                            }}
                        />

                        {['Incident-Center', 'Fuel'].map((label) => (
                            <Tab
                                key={label}
                                label={label}
                                component={Link}
                                href={`/dashboard/admin/reports/incident${label === 'Incident-Center' ? '' : `/${label.toLowerCase()}`}`}
                                value={`/dashboard/admin/reports/incident${label === 'Incident-Center' ? '' : `/${label.toLowerCase()}`}`}
                                sx={{
                                    color: "#FFF",
                                    fontWeight: 'bold',
                                    fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                                    "&.Mui-selected": {color: "#46F0F9"},
                                }}
                            />
                        ))}

                        <Tab
                            label="View"
                            component={Link}
                            href="/dashboard/admin/reports/incident/fuel/view"
                            value="/dashboard/admin/reports/incident/fuel/view"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                    </Tabs>
                </Stack>
                <br/>
                <RenderedData data={viewFuelIncidentReport}/>
            </Box>
        </>
    )
}

function RenderedData({data}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const typographyStyle = {
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: {xs: '0.9rem', sm: '1.0rem', md: '1.2rem'},
    };

    // Media Queries for responsiveness
    const isXSmall = useMediaQuery('(max-width:599.99px)');


    // Media Queries for responsiveness
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');

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
        severity,
        adminFullName,
        adminEmail,
        adminRole,
        incidentDate,
        fuelSiteInfo,
        fuelIncidentInfo,
        reportDescription,
        images,
    } = data;
    const formattedDate = dayjs(incidentDate).format('DD/MMM/YYYY');
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
    const description = reportDescription.split('\r\n');

    // // handle modal opening
    const handleOpenModal = (index) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
    };

    // handle modal closing
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
            <Typography variant="h6"
                        sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 'bold',
                            color: '#FFF',
                            fontSize: xSmall || small ? '0.9rem' : medium || large ? '1.0rem' : '1.1rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '10px',
                            borderRadius: '10px',
                            bgcolor: '#0059b3',
                        }}>
                Data for {fuelSiteInfo.siteId} : {formattedDate}
            </Typography>
            <br/>
            {/*Submission Info*/}
            <Grid container spacing={3}>
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
                                            <Typography sx={{
                                                ...typographyStyle,
                                                wordBreak: 'break-word',
                                                overflowWrap: 'break-word',
                                                whiteSpace: 'normal',
                                            }}>
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
            </Grid>
            <br/>
            {/*AllSite Info*/}
            <Grid container spacing={3}>
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
                            Site Info:
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
                                                {`Site ID: ${fuelSiteInfo.siteId}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Cluster: ${fuelSiteInfo.cluster}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`SiteType: ${fuelSiteInfo.type}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Location: ${fuelSiteInfo.location}`}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <br/>
            {/*Severity*/}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card sx={{...cardSx, border: 'none', p: 1}}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Poppins',
                            mt: '10px',
                            mb: '10px',
                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.2rem',
                            backgroundColor: severity === 'Critical' ? 'hsl(12, 100%, 50%)' : severity === 'Major' ? 'hsl(240, 100%, 50%)' : severity === 'Minor' ? 'limegreen' : 'inherit',
                            padding: '5px', // Optional: Add some padding for better readability
                            borderRadius: '10px', // Optional: Add border-radius for rounded corners
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            Severity: {severity} 

                        </Typography>
                    </Card>
                </Grid>
            </Grid>
            <br/>
            {/*AllSite Incident Full Information*/}
            <Grid container spacing={3}>
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
                            Site Incident Details:
                        </Typography>
                        <CardContent>
                            {/* Category */}
                            <Accordion sx={accordionSx}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                  sx={cardSx}>
                                    <Typography variant='h6' sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        ml: '30px',
                                        fontSize: '16px',
                                    }}>Category</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`${fuelIncidentInfo.category}`}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>

                            {/* SubCategory */}
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
                                    }}>SubCategory</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        {/* Check if theft data exists */}
                                        {/* Check if theft exists and is relevant (not all zero) */}
                                        {fuelIncidentInfo.subCategory?.theft &&
                                            (fuelIncidentInfo.subCategory.theft.oldQty > 0 ||
                                                fuelIncidentInfo.subCategory.theft.newQty > 0 ||
                                                fuelIncidentInfo.subCategory.theft.qtyStolen > 0) && (
                                                <>
                                                    <ListItem>
                                                        <Typography sx={typographyStyle}>
                                                            {`Old Quantity (litres): ${fuelIncidentInfo.subCategory.theft.oldQty}`}
                                                        </Typography>
                                                    </ListItem>
                                                    <ListItem>
                                                        <Typography
                                                            sx={{...typographyStyle, color: 'salmon'}}>
                                                            {`Quantity Stolen (litres): ${fuelIncidentInfo.subCategory.theft.qtyStolen}`}
                                                        </Typography>
                                                    </ListItem>
                                                    <ListItem>
                                                        <Typography sx={typographyStyle}>
                                                            {`New Quantity (litres): ${fuelIncidentInfo.subCategory.theft.newQty}`}
                                                        </Typography>
                                                    </ListItem>
                                                </>
                                            )}

                                        {/* Check if quality action exists */}
                                        {fuelIncidentInfo.subCategory?.quality?.action && (
                                            <ListItem>
                                                <Typography sx={typographyStyle}>
                                                    {`Quality Action: ${fuelIncidentInfo.subCategory.quality.action}`}
                                                </Typography>
                                            </ListItem>
                                        )}

                                        {/* Check if intervention data exists */}
                                        {fuelIncidentInfo.subCategory?.intervention?.action && (
                                            <>
                                                <ListItem>
                                                    <Typography sx={typographyStyle}>
                                                        {`Intervention Action: ${fuelIncidentInfo.subCategory.intervention.action}`}
                                                    </Typography>
                                                </ListItem>
                                                <ListItem>
                                                    <Typography sx={typographyStyle}>
                                                        {`Old Quantity (litres): ${fuelIncidentInfo.subCategory.intervention.oldQty}`}
                                                    </Typography>
                                                </ListItem>
                                                <ListItem>
                                                    <Typography sx={{...typographyStyle, color: 'limegreen'}}>
                                                        {`Added Quantity (litres): ${fuelIncidentInfo.subCategory.intervention.qtyAdded}`}
                                                    </Typography>
                                                </ListItem>
                                                <ListItem>
                                                    <Typography sx={typographyStyle}>
                                                        {`New Quantity (litres): ${fuelIncidentInfo.subCategory.intervention.newQty}`}
                                                    </Typography>
                                                </ListItem>
                                            </>
                                        )}

                                        {/* Handle any others category */}
                                        {fuelIncidentInfo.subCategory?.others && (
                                            <ListItem>
                                                <Typography sx={typographyStyle}>
                                                    {`Others: ${fuelIncidentInfo.subCategory.others}`}
                                                </Typography>
                                            </ListItem>
                                        )}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <br/>
            {/* Report Description */}
            <Grid container spacing={3}>
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
                            Incident Summary:
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
                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.2rem',
                                    }}>Description Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white'}}>
                                    <List> {/* Wrap all ListItems in one List */}
                                        {description.map((line, indexA) => (
                                            <ListItem sx={{margin: 0, p: 0}} key={`list-item-${indexA}`}>
                                                <ListItemIcon sx={{mr: -1}}>
                                                    <PlaylistAddCheckIcon
                                                        sx={{color: "lime", fontSize: "32px"}}
                                                    />
                                                </ListItemIcon>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: 'white',
                                                        fontFamily: 'Poppins',
                                                        fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.2rem',
                                                        wordBreak: 'break-word',
                                                        overflowWrap: 'break-word',
                                                        whiteSpace: 'normal',
                                                    }}
                                                >
                                                    {line}
                                                </Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <br/>
            {/* Image Carousel Section */}
            {
                images.length > 0 && (
                    <Box sx={{
                        bgcolor: '#274e61',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
                        borderRadius: 5,
                        border: '1px solid rgb(163, 163, 117)',
                        p: 0.1,
                    }}>
                        <Typography sx={{
                            fontWeight: 'bold',
                            color: '#FFF',
                            fontFamily: 'Poppins',
                            fontSize: isXSmall || xSmall || small ? '0.9rem' : medium || large ? '1.1rem' : '1.2rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 3,
                            marginBottom: 1,
                        }}>
                            Report Images
                        </Typography>
                        <br/>
                        <Grid container spacing={5} sx={{
                            p: 3,
                        }}>
                            {images.map((img, index) => (
                                <Grid item xs={12} sm={4} key={index}>
                                    <Card
                                        onClick={() => handleOpenModal(index)}
                                        sx={{
                                            bgcolor: '#274e61',
                                            color: 'white',
                                            border: '2px solid #FFF',
                                            borderRadius: 3,
                                            cursor: 'pointer',
                                            maxWidth: '100%',
                                        }}>
                                        <Box
                                            component="img"
                                            sx={{
                                                width: "100%",
                                                height: "auto",
                                                borderRadius: 2,
                                                boxShadow: 3,
                                            }}
                                            src={img}
                                            alt={`Image ${index + 1}`}
                                        />
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )
            }

            {/* Modal for enlarged image */}
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
                        bgcolor: '#000',
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
                            maxHeight: '80vh',
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

export default ViewFuelIncidentReport;