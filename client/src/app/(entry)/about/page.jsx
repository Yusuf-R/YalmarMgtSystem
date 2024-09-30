'use client';

import {motion} from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

const fadeIn = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {duration: 1.1, ease: 'easeInOut'}},
    exit: {opacity: 0, y: -20, transition: {duration: 1.1, ease: 'easeInOut'}}
};

function About() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLargestScreen = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeIn}
            style={{height: "100%", width: "100%"}}
        >
            <Box
                sx={{
                    backgroundImage: 'url(/bg-about.jpg)', // Add your background wallpaper here
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    padding: isSmallScreen ? '20px' : '50px',
                    color: '#ffffff',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" sx={{fontWeight: 'bold', color: '#fff', mb: 3}}>
                    About Yalmar Management System
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontSize: isSmallScreen ? '0.9rem' : isTablet ? '1.1rem' : '1.2rem',
                        lineHeight: isSmallScreen ? '1.4' : '1.8',
                        maxWidth: '800px',
                        margin: 'auto',
                        mb: 4,
                    }}
                >
                    Yalmar Management System is an innovative platform designed to streamline client and staff
                    operations.
                    Built with efficiency and scalability in mind, it offers comprehensive solutions tailored for
                    industries like telecommunications, ensuring smooth service management for clients and staff alike.
                </Typography>

                <motion.div
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{duration: 0.8, ease: 'easeInOut'}}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: isSmallScreen ? '0.9rem' : isTablet ? '1.1rem' : '1.2rem',
                            lineHeight: isSmallScreen ? '1.4' : '1.8',
                            maxWidth: '800px',
                            margin: 'auto',
                            mb: 4,
                            color: '#ffffff'
                        }}
                    >
                        From managing complex generator operations to overseeing site logistics and staff coordination,
                        Yalmar
                        ensures businesses can focus on what matters most—delivering top-quality services to their
                        clients.
                    </Typography>
                </motion.div>

                {/* Service Highlights with subtle zoom-in animation */}
                <Grid container spacing={4} justifyContent="center" sx={{mt: 5}}>
                    {['Generator Management', 'Fuel Logistics', 'Site & Staff Management'].map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <motion.div
                                initial={{scale: 0.9, opacity: 0}}
                                animate={{scale: 1, opacity: 1}}
                                transition={{duration: 0.6, delay: index * 0.2}}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: '#ffffff33',
                                        padding: '20px',
                                        borderRadius: '8px',
                                        backdropFilter: 'blur(6px)',
                                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <Typography variant="h6" sx={{color: '#fff', fontWeight: 'bold', mb: 2}}>
                                        {service}
                                    </Typography>
                                    <Typography variant="body2" sx={{color: '#e0e0e0'}}>
                                        {/* Dynamic descriptions */}
                                        {service === 'Generator Management' && 'Complete generator solutions to ensure consistent power for your operations.'}
                                        {service === 'Fuel Logistics' && 'Seamless fuel management to keep your power supply running smoothly.'}
                                        {service === 'Site & Staff Management' && 'Comprehensive management of staff and site operations for efficient services.'}
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </motion.div>
    );
}

export default About;
