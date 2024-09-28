'use client';
import heroStyle from './Hero.module.css';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Hero() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                color: 'white',
                textAlign: 'center',
                px: 3,
                mt: 35,
            }}
        >
            {/* Hero Content */}
            <Typography variant="h2" sx={{fontWeight: 'bold', fontFamily: 'Poppins', mb: 2}}>
                YALMAR Management System
            </Typography>
            <Typography variant="h5" sx={{fontFamily: 'Poppins', mb: 4}}>
                The smart system for managing staff and client operations.
            </Typography>
            <Button className={heroStyle.rainbow}
                    variant='contained'
                    onClick={() => window.location = ('/login')}
            >
                <Typography variant="h5" sx={{fontFamily: 'Poppins'}}>
                    Get Started
                </Typography>
            </Button>
        </Box>
    );
}

export default Hero