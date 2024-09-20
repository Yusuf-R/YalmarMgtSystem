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


const goPrev = () => {
    window.history.back();
}

function ViewSiteIncidentReport() {
    // get the siteIncidentReport from the useIncidentStore
    const viewSiteIncidentReport = useIncidentStore(state => state.viewSiteIncidentReport);
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/incident/site/view');
    const pathname = usePathname();

    // useEffect or handling navigation between new and staff
    useEffect(() => {
        if (pathname.includes('view')) {
            setActiveTab('/dashboard/admin/reports/incident/site/view');
        } else if (pathname.includes('site')) {
            setActiveTab('/dashboard/admin/reports/incident/site');
        } else {
            setActiveTab('/dashboard/admin/reports/incident');
        }
    }, [pathname]);


    if (!viewSiteIncidentReport) {
        return (
            <Box sx={mainSection}>
                {/*Navigation Tabs */}
                <Stack direction='row' spacing={2} sx={{
                    justifyContent: 'flex-start',
                }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        centered
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#46F0F9',
                            },
                        }}
                    >

                        <Tab
                            label="Incident"
                            component={Link}
                            href="/dashboard/admin/reports/incident"
                            value="/dashboard/admin/reports/incident"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Site"
                            component={Link}
                            href="/dashboard/admin/reports/incident/site"
                            value="/dashboard/admin/reports/incident/site"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />

                        <Tab
                            label="View"
                            component={Link}
                            href="/dashboard/admin/reports/incident/site/view"
                            value="/dashboard/admin/reports/incident/site/view"
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
                                width: '30%',
                                textAlign: 'center',
                            }}>
                    Oops!!! No Report found. <IconButton><ArrowBackSharpIcon
                    sx={{color: 'lime', fontSize: 30}} onClick={goPrev}/></IconButton>
                </Typography>
            </Box>
        )
    }

    return (
        <>
            <Box sx={mainSection}>
                {/*Navigation Tabs */}
                <Stack direction='row' spacing={2} sx={{
                    justifyContent: 'flex-start',
                }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        centered
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#46F0F9',
                            },
                        }}
                    >

                        <Tab
                            label="Incident"
                            component={Link}
                            href="/dashboard/admin/reports/incident"
                            value="/dashboard/admin/reports/incident"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Site"
                            component={Link}
                            href="/dashboard/admin/reports/incident/site"
                            value="/dashboard/admin/reports/incident/site"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />

                        <Tab
                            label="View"
                            component={Link}
                            href="/dashboard/admin/reports/incident/site/view"
                            value="/dashboard/admin/reports/incident/site/view"
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
                <Divider sx={{
                    width: '100%',
                    backgroundColor: 'rgb(255, 153, 153)',
                    color: '#FFF'
                }}/>
                <RenderedData data={viewSiteIncidentReport}/>
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
        severity,
        adminFullName,
        adminEmail,
        adminRole,
        incidentType,
        incidentDate,
        siteInfo,
        siteIncidentInfo,
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
                            width: '36%'
                        }}>
                Incident Report Data for {siteInfo.siteId} : {formattedDate}
                <IconButton><ArrowBackSharpIcon
                    sx={{color: 'lime', fontSize: 30}} onClick={goPrev}/></IconButton>
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
            </Grid>
            <br/>
            {/*Site Info*/}
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
                                                {`Site ID: ${siteInfo.siteId}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Cluster: ${siteInfo.cluster}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`SiteType: ${siteInfo.type}`}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`Location: ${siteInfo.location}`}
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
            {/*Site Incident Full Information*/}
            <Grid container spacing={3}>
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
                            Site Incident Details:
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
                                    }}>Category</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        <ListItem>
                                            <Typography sx={typographyStyle}>
                                                {`${siteIncidentInfo.category}`}
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
                                    }}>SubCategory</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    <List>
                                        {siteIncidentInfo.subCategory.shelter && (
                                            <ListItem>
                                                <Typography sx={typographyStyle}>
                                                    {`${siteIncidentInfo.subCategory.shelter}`}
                                                </Typography>
                                            </ListItem>
                                        )}
                                        {siteIncidentInfo.subCategory.security && (
                                            <ListItem>
                                                <Typography sx={typographyStyle}>
                                                    {`${siteIncidentInfo.subCategory.security}`}
                                                </Typography>
                                            </ListItem>
                                        )}
                                        {siteIncidentInfo.subCategory.others && (
                                            <ListItem>
                                                <Typography sx={typographyStyle}>
                                                    {`${siteIncidentInfo.subCategory.others}`}
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
                                        fontSize: '16px',
                                    }}>Description Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{bgcolor: '#274e61', color: 'white',}}>
                                    {description.map((line, index) => (
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
            </Grid>
            <br/>
            {/* Image Carousel Section */}
            {
                images.length > 0 && (
                    <Grid container spacing={3}>
                        <Grid item xs={12} {...handlers}>
                            <Typography sx={{
                                fontWeight: 'bold',
                                color: '#FFF',
                                fontFamily: 'Poppins',
                                fontSize: '20px',
                            }} align="center">
                                Report Images
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
                    </Grid>
                )
            }
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

export default ViewSiteIncidentReport;