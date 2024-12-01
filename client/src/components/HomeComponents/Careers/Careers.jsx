'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from '@react-spring/web';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import useMediaQuery from "@mui/material/useMediaQuery";

function Careers() {
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    
    // Pulsing animation for "Coming Soon" hint
    const hintAnimation = useSpring({
        from: { opacity: 0.8 },
        to: { opacity: 1 },
        config: { duration: 1000 },
        loop: { reverse: true },
    });

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
                color: "white",
                padding: xSmall ? 1 : small ? 2 : medium ? 3 : large ? 4 : 6,
                minHeight: "calc(100vh - 200px)", // Fills remaining height, adjust for navbar height
                overflow: "hidden",
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ffeb3b", mb: 5 }}>
                Careers at Yalmar Management System
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    fontSize: xSmall ? "0.9rem" : "1.2rem",
                    lineHeight: xSmall ? "1.4" : "1.8",
                    maxWidth: "800px",
                    mb: 2,
                    color: "#e0e0e0",
                }}
            >
                Yalmar Management System is an innovative platform designed to streamline client and staff operations.
                Built with efficiency and scalability in mind, it offers comprehensive solutions tailored for industries
                like telecommunications, ensuring smooth service management for clients and staff alike.
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    fontSize: xSmall ? "0.9rem" : "1.2rem",
                    lineHeight: xSmall ? "1.4" : "1.8",
                    maxWidth: "800px",
                    mb: 3,
                    color: "#ffffff",
                }}
            >
                We are always looking for talented individuals to join our team. If you are passionate about technology and 
                innovation, and are looking for a challenging and rewarding career, we would love to hear from you.
            </Typography>

            {/* Coming Soon Hint */}
            <animated.div style={hintAnimation}>
                <Card
                    sx={{
                        maxWidth: 500,
                        background: "rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                        mb: 1,
                        p: 3,
                        textAlign: 'center',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        transition: 'transform 0.3s',
                        "&:hover": {
                            transform: 'scale(1.03)',
                        },
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" sx={{ color: "#ff4081", mb: 1 }}>
                            Careers Section - Coming Soon!
                        </Typography>
                        <Typography variant="body2" color="white" sx={{ fontSize: "1rem" }}>
                            The application progress and detailed career opportunities are under construction.
                            Please check back soon for exciting updates!
                        </Typography>
                    </CardContent>
                </Card>
            </animated.div>
        </Box>
    );
}

export default Careers;
