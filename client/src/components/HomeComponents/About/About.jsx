'use client';
import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Fade, Zoom } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function About() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

    return (
        <Box
            sx={{
                // background: 'linear-gradient(135deg, #1c1c1c 0%, #4a4a4a 100%)',
                minHeight: 'calc(100vh - 120px)',  // Adjust to account for the navbar height
                paddingTop: 2,
                paddingX: isSmallScreen ? '10px' : '20px',
                paddingBottom: '20px',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
            }}
        >
            <Fade in timeout={1000}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ffeb3b', mb: 2 }}>
                    About Yalmar Management System
                </Typography>
            </Fade>

            <Fade in timeout={1200}>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: isSmallScreen ? '0.9rem' : isTablet ? '1.1rem' : '1.2rem',
                        lineHeight: isSmallScreen ? '1.4' : '1.8',
                        maxWidth: '800px',
                        marginBottom: 2,
                        color: "#e0e0e0",
                    }}
                >
                    Yalmar Management System is an innovative platform designed to streamline client and staff operations.
                    Built with efficiency and scalability in mind, it offers comprehensive solutions tailored for industries like
                    telecommunications, ensuring smooth service management for clients and staff alike.
                </Typography>
            </Fade>

            <Fade in timeout={1400}>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: isSmallScreen ? '0.9rem' : isTablet ? '1.1rem' : '1.2rem',
                        lineHeight: isSmallScreen ? '1.4' : '1.8',
                        maxWidth: '800px',
                        marginBottom: 2,
                        color: "#e0e0e0",
                    }}
                >
                    From managing complex generator operations to overseeing site logistics and staff coordination, Yalmar
                    ensures businesses can focus on what matters most—delivering top-quality services to their clients.
                </Typography>
            </Fade>

            <Zoom in timeout={1500}>
                <Grid container spacing={3} justifyContent="flex-start" sx={{ mt: 2, maxWidth: '800px' }}>
                    {['Generator Management', 'Fuel Logistics', 'AllSite & AllStaff Management'].map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box
                                sx={{
                                    backgroundColor: '#ffffff33',
                                    padding: '15px',
                                    borderRadius: '12px',
                                    backdropFilter: 'blur(8px)',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0px 6px 20px rgba(255, 255, 255, 0.4)",
                                        background: "linear-gradient(145deg, #303f9f, #7986cb)",
                                    },
                                }}
                            >
                                <Typography variant="h6" sx={{ color: '#ffeb3b', fontWeight: 'bold', mb: 1 }}>
                                    {service}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                                    {service === 'Generator Management' && 'Complete generator solutions to ensure consistent power for your operations.'}
                                    {service === 'Fuel Logistics' && 'Seamless fuel management to keep your power supply running smoothly.'}
                                    {service === 'AllSite & AllStaff Management' && 'Comprehensive management of staff and site operations for efficient services.'}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Zoom>
        </Box>
    );
};

export default About;
