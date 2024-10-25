'use client'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import IconButton from "@mui/material/IconButton";
import useIncidentStore from "@/store/useIncidentStore";
import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Link from "next/link";
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

function ViewStaffIncidentReport() {
    // get the siteIncidentReport from the useIncidentStore
    const viewStaffIncidentReport = useIncidentStore(state => state.viewStaffIncidentReport);
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/incident/staff/view');
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
            setActiveTab('/dashboard/admin/reports/incident/staff/view');
        } else if (pathname.includes('staff')) {
            setActiveTab('/dashboard/admin/reports/incident/staff');
        } else if (pathname.includes('incident')) {
            setActiveTab('/dashboard/admin/reports/incident');
        } else {
            setActiveTab('/dashboard/admin/reports');
        }
    }, [pathname]);


    if (!viewStaffIncidentReport) {
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
                <Tabs
                    value={activeTab}
                    onChange={(e, newValue) => setActiveTab(newValue)}
                    variant={isXSmall ? "scrollable" : "standard"}
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTabs-indicator': {backgroundColor: '#46F0F9'},
                        marginBottom: 3
                    }}
                >
                    <Tab
                        label="Reports "
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
                    {['Incident-Center', 'Staff'].map((label) => (
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
                        label="View "
                        component={Link}
                        href="/dashboard/admin/reports/incident/staff/view"
                        value="/dashboard/admin/reports/incident/staff/view"
                        sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                            "&.Mui-selected": {color: "#46F0F9"},
                        }}
                    />
                </Tabs>
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
                                    fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                        No Report found.
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
                    maxWidth: '100%',
                    flexWrap: 'nowrap',
                }}
            >
                {/*Navigation Tabs */}
                <Tabs
                    value={activeTab}
                    onChange={(e, newValue) => setActiveTab(newValue)}
                    variant={isXSmall ? "scrollable" : "standard"}
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTabs-indicator': {backgroundColor: '#46F0F9'},
                        marginBottom: 3
                    }}
                >
                    {['Incident-Center', 'Staff'].map((label) => (
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
                        label="View "
                        component={Link}
                        href="/dashboard/admin/reports/incident/staff/view"
                        value="/dashboard/admin/reports/incident/staff/view"
                        sx={{
                            color: "#FFF",
                            fontWeight: 'bold',
                            fontSize: {xs: '0.7rem', sm: '0.8rem', md: '0.9rem'},
                            "&.Mui-selected": {color: "#46F0F9"},
                            p: 0,
                        }}
                    />
                </Tabs>
                <br/>
                <RenderedData data={viewStaffIncidentReport}/>
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
        fontSize: {xs: '0.9rem', sm: '1.0rem', md: '1.1rem'},
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
        severity,
        adminFullName,
        adminEmail,
        adminRole,
        incidentDate,
        staffInfo,
        staffIncidentInfo,
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


    // Media Queries for responsiveness
    const isXSmall = useMediaQuery('(max-width:599.99px)');
    const isSmall = useMediaQuery('(min-width:600px) and (max-width:899.99px)');
    const isMedium = useMediaQuery('(min-width:900px) and (max-width:1199.99px)');
    const isLarge = useMediaQuery('(min-width:1200px)');

    // Media Queries for responsiveness
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');

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
                    Incident Report Data : {formattedDate}
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
                                fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
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
                    <br/>
                    {/*AllSite Info*/}
                    <Grid item xs={12}>
                        <Card sx={{...cardSx, border: 'none',}}>
                            <Typography variant='h6' sx={{
                                fontWeight: 'bold',
                                color: 'white',
                                fontFamily: 'Poppins',
                                ml: '30px',
                                mt: '30px',
                                fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                            }}>
                                AllStaff Info:
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
                                                    {`FullName: ${staffInfo.fullName}`}
                                                </Typography>
                                            </ListItem>
                                            <ListItem>
                                                <Typography sx={{
                                                    ...typographyStyle,
                                                    wordBreak: 'break-word',
                                                    overflowWrap: 'break-word',
                                                    whiteSpace: 'normal',
                                                }}>
                                                    {`Email: ${staffInfo.email}`}
                                                </Typography>
                                            </ListItem>
                                            <ListItem>
                                                <Typography sx={typographyStyle}>
                                                    {`Role: ${staffInfo.role}`}
                                                </Typography>
                                            </ListItem>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </Grid>
                    <br/>
                    {/*Severity*/}
                    <Grid item xs={12}>
                        <Card sx={{...cardSx, border: 'none', p: 1}}>
                            <Typography variant='h6' sx={{
                                fontWeight: 'bold',
                                color: 'white',
                                fontFamily: 'Poppins',
                                mt: '10px',
                                mb: '10px',
                                fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
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
                    <br/>
                    {/*AllSite Incident Full Information*/}
                    <Grid item xs={12}>
                        <Card sx={{...cardSx, border: 'none',}}>
                            <Typography variant='h6' sx={{
                                fontWeight: 'bold',
                                color: 'white',
                                fontFamily: 'Poppins',
                                ml: '30px',
                                mt: '30px',
                                fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                            }}>
                                Staff Incident Details:
                            </Typography>
                            <CardContent sx={{color: 'white', margin: '5px',}}>
                                {/* Category */}
                                <Accordion sx={accordionSx}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                      sx={cardSx}>
                                        <Typography variant='h6' sx={{
                                            fontWeight: 'bold',
                                            color: 'white',
                                            fontFamily: 'Poppins',
                                            ml: '30px',
                                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                        }}>ClassAction</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                        <List>
                                            <ListItem>
                                                <Typography sx={typographyStyle}>
                                                    {`${staffIncidentInfo.classAction}`}
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
                                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                        }}>Category</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                        <List>
                                            {staffIncidentInfo.category.employment && (
                                                <ListItem>
                                                    <Typography sx={typographyStyle}>
                                                        {`${staffIncidentInfo.category.employment}`}
                                                    </Typography>
                                                </ListItem>
                                            )}
                                            {staffIncidentInfo.category.role && (
                                                <ListItem>
                                                    <Typography sx={typographyStyle}>
                                                        {`${staffIncidentInfo.category.role}`}
                                                    </Typography>
                                                </ListItem>
                                            )}
                                            {staffIncidentInfo.category.violence && (
                                                <ListItem>
                                                    <Typography sx={typographyStyle}>
                                                        {`${staffIncidentInfo.category.violence}`}
                                                    </Typography>
                                                </ListItem>
                                            )}
                                            {staffIncidentInfo.category.others && (
                                                <ListItem>
                                                    <Typography sx={typographyStyle}>
                                                        {`${staffIncidentInfo.category.others}`}
                                                    </Typography>
                                                </ListItem>
                                            )}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </Grid>
                    <br/>
                    {/* Report Description */}
                    <Grid item xs={12}>
                        <Card sx={{...cardSx, border: 'none',}}>
                            <Typography variant='h6' sx={{
                                fontWeight: 'bold',
                                color: 'white',
                                fontFamily: 'Poppins',
                                ml: '30px',
                                mt: '30px',
                                fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
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
                                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                        }}>Description Details</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{bgcolor: '#274e61', color: 'white'}}>
                                        <List> {/* Wrap all ListItems in one List */}
                                            {description.map((line, indexA) => (
                                                <ListItem sx={{margin: 0, p: 0}} key={`list-item-${indexA}`}>
                                                    <ListItemIcon sx={{mr: -1}}>
                                                        <PlaylistAddCheckIcon
                                                            sx={{color: "lime", fontSize: "25px"}}
                                                        />
                                                    </ListItemIcon>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            color: 'white',
                                                            fontFamily: 'Poppins',
                                                            fontSize: xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
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

                {
                    images.length > 0 && (
                        <Box sx={{
                            bgcolor: '#274e61',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
                            borderRadius: 5,
                            mt: 3,
                            p: 5, // Padding inside the box to ensure content is not touching edges
                        }}>
                            <Typography sx={{
                                fontWeight: 'bold',
                                color: '#FFF',
                                fontFamily: 'Poppins',
                                fontSize: isXSmall || xSmall || small ? '0.8rem' : medium || large ? '1.0rem' : '1.1rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                Reporting Images
                            </Typography>

                            <Grid container spacing={3} justifyContent="center" sx={{mt: 3}}>
                                {images.map((img, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card
                                            onClick={() => handleOpenModal(index)}
                                            sx={{
                                                bgcolor: '#274e61',
                                                color: 'white',
                                                border: '2px solid #FFF',
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                                position: 'relative',
                                                width: '100%',
                                                '&:hover img': {
                                                    transform: 'scale(1.05)', // Zoom-in effect on hover
                                                    opacity: 0.9, // Slight transparency
                                                },
                                                '&:hover .overlay': {
                                                    opacity: 1,
                                                }
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    transition: 'transform 0.3s ease, opacity 0.3s ease', // Smooth hover effect
                                                }}
                                                src={img}
                                                alt={`Image ${index + 1}`}
                                            />
                                            {/* Overlay for hover effect */}
                                            <Box
                                                className="overlay"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    bgcolor: 'rgba(0,0,0,0.5)',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease',
                                                }}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{color: 'white', fontSize: '1.2rem'}}
                                                >
                                                    Click to Enlarge
                                                </Typography>
                                            </Box>
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
            </Box>
        </>
    )

}

export default ViewStaffIncidentReport;