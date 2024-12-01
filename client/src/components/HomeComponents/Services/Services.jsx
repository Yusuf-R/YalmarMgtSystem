'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Zoom, Grow } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

function Services() {
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const [showCards, setShowCards] = useState(false);

    useEffect(() => {
        // Trigger animations on component mount
        setShowCards(true);
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                color: "white",
                textAlign: "center",
                padding: xSmall ? 1 : small ? 2 : medium ? 3 : large ? 4 : 6,
                minHeight: 'calc(100vh - 120px)',  // Adjust to account for the navbar height
                overflow: "hidden",
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ffeb3b", mb: 1 }}>
                Discover Our Services
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    fontSize: xSmall ? "0.9rem" : "1.2rem",
                    lineHeight: xSmall ? "1.4" : "1.8",
                    maxWidth: "800px",
                    marginTop:0.5,
                    mb: 5,
                    color: "#ffffff",
                    opacity: 0.9,
                }}
            >
                Yalmar Management System specializes in providing streamlined solutions for diverse industries. From
                telecommunications to logistics, our comprehensive services are designed to empower businesses with efficiency and operational excellence.
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {["Generator Management", "Site Management", "Fuel Logistics Management", "Staff Management", "Telecommunications Support", "More Services Coming Soon"].map((service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={service}>
                        <Zoom in={showCards} timeout={(index + 1) * 500}>
                            <Card
                                sx={{
                                    backgroundColor: "#2c3e50",
                                    color: "#fff",
                                    height: "100%",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
                                        background: "linear-gradient(145deg, #6a85b6, #bac8e0)",
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        {service}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 6, opacity: 0.8 }}>
                                        {index === 0 && "Complete generator installation, maintenance, and servicing solutions for guaranteed power and efficiency."}
                                        {index === 1 && "Efficient management of client and staff operations, ensuring smooth and productive workflows."}
                                        {index === 2 && "Reliable fuel supply chain management, from procurement to delivery, ensuring quality and logistics efficiency."}
                                        {index === 3 && "Comprehensive staff management services for optimal productivity and seamless onboarding and tracking."}
                                        {index === 4 && "Technical support and logistics for telecom clients to ensure reliable connectivity and equipment performance."}
                                        {index === 5 && "Stay tuned as we expand our offerings to include even more tailored services."}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Zoom>
                    </Grid>
                ))}
            </Grid>
<br />
            <Grow in={showCards} timeout={2000}>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: "1.8rem",
                        color: "#ffeb3b",
                        marginTop: "12px",
                        opacity: 0.85,
                    }}
                >
                    More services are currently in development and will be available soon. Watch this space for updates!
                </Typography>
            </Grow>
        </Box>
    );
}

export default Services;
