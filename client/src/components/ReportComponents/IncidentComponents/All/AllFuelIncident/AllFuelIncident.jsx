'use client';
import {mainSection} from "@/utils/data";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import React, {useEffect, useState} from "react";
import useIncidentStore from "@/store/useIncidentStore";
import {usePathname} from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";

function AllFuelIncident({fuelIncidentData}) {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/incident/fuel');
    
    // useEffect or handling navigation between new and staff
    useEffect(() => {
        if (pathname.includes('fuel')) {
            setActiveTab('/dashboard/admin/reports/incident/fuel');
        } else {
            setActiveTab('/dashboard/admin/reports/incident');
        }
    }, [pathname]);
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
                    <Typography variant='h5' sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                        All Fuel Incident Report Form
                    </Typography>
                </Paper>
                <br/>
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
                            label="Home"
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
                            label="Fuel"
                            component={Link}
                            href="/dashboard/admin/reports/incident/fuel"
                            value="/dashboard/admin/reports/incident/fuel"
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
                {fuelIncidentData.map((fuelIncident, index) => (
                    <Paper elevation={5} key={index} sx={{
                        alignCenter: 'center',
                        textAlign: 'center',
                        padding: '10px',
                        backgroundColor: '#274e61',
                        color: '#FFF',
                        borderRadius: '10px',
                        width: '100%',
                        height: 'auto',
                    }}>
                        <Stack spacing={2}>
                            <Typography variant='h6' sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                                Incident Date: {fuelIncident.incidentDate}
                            </Typography>
                            <Typography variant='h6' sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                                Incident Time: {fuelIncident.incidentTime}
                            </Typography>
                            <Typography variant='h6' sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                                Incident Location: {fuelIncident.incidentLocation}
                            </Typography>
                            <Typography variant='h6' sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                                Incident Description: {fuelIncident.incidentDescription}
                            </Typography>
                            <Typography variant='h6' sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                                Incident Type: {fuelIncident.incidentType}
                            </Typography>
                            <Typography variant='h6' sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                                Incident Status: {fuelIncident.incidentStatus}
                            </Typography>
                            <Typography variant='h6' sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                                Incident Report: {fuelIncident.incidentReport}
                            </Typography>
                            <Typography variant='h6' sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                                Incident Resolution: {fuelIncident.incidentResolution}
                            </Typography>
                            <Button variant='contained' sx={{
                                backgroundColor: '#46F0F9',
                                color: '#274e61',
                                fontFamily: 'Poppins',
                                fontWeight: 'bold',
                            }}>
                                Edit Incident
                            </Button>
                        </Stack>
                    </Paper>
                ))}
            </Box>
        </>
    )
}

export default AllFuelIncident;