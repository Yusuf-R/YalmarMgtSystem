'use client';
import React, {useState, useEffect} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import {Zoom, Grow} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TwitterIcon from '@mui/icons-material/Twitter';

function Contacts() {
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowCards(true), 300);
    }, []);

    const contactDetails = [
        {
            title: "Email Us",
            icon: <EmailIcon sx={{fontSize: 40, color: "#ffeb3b"}}/>,
            description: "yalmarventures@gmail.com",
        },
        {
            title: "Call Us",
            icon: <PhoneIcon sx={{fontSize: 40, color: "#ffeb3b"}}/>,
            description: "08088818451 / +2348088818451",
        },
        {
            title: "Visit Us",
            icon: <LocationOnIcon sx={{fontSize: 40, color: "#ffeb3b"}}/>,
            description: "Kaduna State, Nigeria",
        },
        {
            title: "Follow Us on Twitter",
            icon: <TwitterIcon sx={{fontSize: 40, color: "#ffeb3b"}}/>,
            description: "@Yamar-tech",
        },
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "white",
                paddingTop: 10, // Offset to sit right below navbar
                paddingBottom: 5,
                // background: "linear-gradient(135deg, #282c34 0%, #4b6cb7 100%)",
                minHeight: "calc(100vh - 120px)",  // Adjust based on navbar height
                overflow: "hidden",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    color: "#ffeb3b",
                    mb: 4,
                    textShadow: "2px 2px 6px rgba(0,0,0,0.5)"
                }}
            >
                Get in Touch with Yalmar
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    fontSize: "1.2rem",
                    lineHeight: "1.8",
                    maxWidth: "700px",
                    marginBottom: 4,
                    color: "#ffffff",
                    opacity: 0.85,
                }}
            >
                Have questions? Reach out to us through any of our communication channels. We’re here to help!
            </Typography>

            <Grid container spacing={4} justifyContent="center" sx={{width: '100%', maxWidth: '1200px'}}>
                {contactDetails.map((contact, index) => (
                    <Grow in={showCards} timeout={600 + index * 200} key={index}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    backgroundColor: "#ffffff22",
                                    color: "#e0e0e0",
                                    padding: 3,
                                    borderRadius: "12px",
                                    textAlign: "center",
                                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
                                    backdropFilter: "blur(6px)",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0px 6px 20px rgba(255, 255, 255, 0.3)",
                                    }
                                }}
                            >
                                <CardContent>
                                    <Zoom in timeout={500}>
                                        <Box sx={{mb: 2}}>{contact.icon}</Box>
                                    </Zoom>
                                    <Typography variant="h6" sx={{fontWeight: "bold", mb: 1, color: "#ffeb3b"}}>
                                        {contact.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{fontSize: "1rem"}}>
                                        {contact.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grow>
                ))}
            </Grid>
        </Box>
    );
}

export default Contacts;
