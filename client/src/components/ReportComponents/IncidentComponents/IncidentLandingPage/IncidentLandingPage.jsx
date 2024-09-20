'use client';
import Box from "@mui/material/Box";
import {mainSection} from "@/utils/data";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import {useRouter} from 'next/navigation'
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import React, {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {usePathname} from "next/navigation";

function IncidentLandingPage({allIncidentReport}) {
    const router = useRouter();
    const typographyStyle = {
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: '16px',
    };
    const cardSx = {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        border: '4px solid rgb(163, 163, 117)',
        p: 0.1,
    }
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/incident');
    const accordionSx = {
        bgcolor: '#274e61',
    }
    const pathname = usePathname();
    // useEffect or handling navigation between new and staff
    useEffect(() => {
        if (pathname.includes('new')) {
            setActiveTab('/dashboard/admin/reports/incident/new');
        } else {
            setActiveTab('/dashboard/admin/incident');
        }
    }, [pathname]);

    return (
        <>
            <Box sx={mainSection}>

                {/*Header*/}
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
                    <Typography variant='h6' textAlign='center'
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    fontSize: '25px',
                                }}>
                        Incident Report Center</Typography>
                </Paper>
                <br/>
                <Grid container spacing={0.5}>
                    <Grid item xs={2}>
                        <Typography variant='h6' textAlign='left'
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        color: '#FFF',
                                        cursor: 'pointer',
                                        // backgroundColor: '#FF8080',
                                        borderRadius: '10px',
                                        padding: '10px',
                                    }}>
                            Create a new Report.</Typography>
                    </Grid>
                    <Grid item xs={0.6}>
                        <Typography
                            sx={{
                                textDecoration: 'none',
                                fontFamily: 'Poppins',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                color: '#FFF',
                                cursor: 'pointer',
                                backgroundColor: 'rgb(51, 153, 51)',
                                borderRadius: '10px',
                                padding: '10px',
                            }}
                            onClick={() => {
                                router.push('/dashboard/admin/reports/incident/new');
                            }}
                        >
                            New +
                        </Typography>
                    </Grid>
                </Grid>
                <br/><br/><br/>
                <Paper elevation={5} sx={{
                    padding: '10px',
                    backgroundColor: '#274e61',
                    color: '#FFF',
                    borderRadius: '10px',
                    width: '100%',
                    height: 'auto',
                }}>
                    <Typography variant='h6' textAlign='left'
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                }}>
                        Click to view any of the following report category.</Typography>
                </Paper>
                <br/>
                <Stack spacing={2} direction='column'
                       sx={{
                           m: -3,
                           p: 0,
                       }}>
                    <Grid container spacing={0.5}>
                        <Grid item xs={2}>
                            <Stack spacing={0.5} direction='column'>
                                <CardContent>
                                    <Accordion sx={accordionSx}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                          sx={cardSx}
                                                          onClick={() => {
                                                              router.push('/dashboard/admin/reports/incident/staff');
                                                          }}
                                        >
                                            <Typography variant='h6' sx={{
                                                fontWeight: 'bold',
                                                color: 'white',
                                                fontFamily: 'Poppins',
                                                ml: '30px',
                                                fontSize: '16px',
                                            }}
                                                        onClick={() => {
                                                            router.push('/dashboard/admin/reports/incident/staff');
                                                        }}
                                            >
                                                Staff
                                            </Typography>
                                        </AccordionSummary>
                                    </Accordion>
                                </CardContent>
                                <CardContent>
                                    <Accordion sx={accordionSx}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                          sx={cardSx}
                                                          onClick={() => {
                                                              router.push('/dashboard/admin/reports/incident/site');
                                                          }}
                                        >
                                            <Typography variant='h6' sx={{
                                                fontWeight: 'bold',
                                                color: 'white',
                                                fontFamily: 'Poppins',
                                                ml: '30px',
                                                fontSize: '16px',
                                            }}
                                                        onClick={() => {
                                                            router.push('/dashboard/admin/reports/incident/site');
                                                        }}
                                            >
                                                Site
                                            </Typography>
                                        </AccordionSummary>
                                    </Accordion>
                                </CardContent>
                                <CardContent>
                                    <Accordion sx={accordionSx}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                          sx={cardSx}
                                                          onClick={() => {
                                                              router.push('/dashboard/admin/reports/incident/service');
                                                          }}
                                        >
                                            <Typography variant='h6' sx={{
                                                fontWeight: 'bold',
                                                color: 'white',
                                                fontFamily: 'Poppins',
                                                ml: '30px',
                                                fontSize: '16px',
                                            }}
                                                        onClick={() => {
                                                            router.push('/dashboard/admin/reports/incident/service');
                                                        }}
                                            >
                                                Service
                                            </Typography>
                                        </AccordionSummary>
                                    </Accordion>
                                </CardContent>
                                <CardContent>
                                    <Accordion sx={accordionSx}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                          sx={cardSx}
                                                          onClick={() => {
                                                              router.push('/dashboard/admin/reports/incident/fuel');
                                                          }}
                                        >
                                            <Typography variant='h6'
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            color: 'white',
                                                            fontFamily: 'Poppins',
                                                            ml: '30px',
                                                            fontSize: '16px',
                                                        }}
                                                        onClick={() => {
                                                            router.push('/dashboard/admin/reports/incident/fuel');
                                                        }}
                                            >
                                                Fuel
                                            </Typography>
                                        </AccordionSummary>
                                    </Accordion>
                                </CardContent>
                                <CardContent>
                                    <Accordion sx={accordionSx}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: '#FFF'}}/>}
                                                          sx={cardSx}
                                                          onClick={() => {
                                                              router.push('/dashboard/admin/reports/incident/others');
                                                          }}
                                        >
                                            <Typography variant='h6' sx={{
                                                fontWeight: 'bold',
                                                color: 'white',
                                                fontFamily: 'Poppins',
                                                ml: '30px',
                                                fontSize: '16px',
                                            }}
                                                        onClick={() => {
                                                            router.push('/dashboard/admin/reports/incident/others');
                                                        }}
                                            >
                                                Others
                                            </Typography>
                                        </AccordionSummary>
                                    </Accordion>
                                </CardContent>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>

            </Box>
        </>
    )
}

export default IncidentLandingPage;