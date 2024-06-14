'use client';
import React, {useState, useEffect} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "next/link";
import Button from "@mui/material/Button";

const Error408 = () => {
    const [time, setTime] = useState("🕐");
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => {
                switch (prevTime) {
                    case "🕐":
                        return "🕑";
                    case "🕑":
                        return "🕒";
                    case "🕒":
                        return "🕓";
                    case "🕓":
                        return "🕔";
                    case "🕔":
                        return "🕕";
                    case "🕕":
                        return "🕖";
                    case "🕖":
                        return "🕗";
                    case "🕗":
                        return "🕘";
                    case "🕘":
                        return "🕙";
                    case "🕙":
                        return "🕚";
                    case "🕚":
                        return "🕛";
                    case "🕛":
                        return "🕐";
                    default:
                        return prevTime;
                }
            });
        }, 1000); // Change every 5 seconds
        
        return () => clearInterval(timer); // Cleanup on unmount
    }, []);
    
    return (
        <>
            <CssBaseline/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    fontFamily: 'Open Sans, Arial, sans-serif',
                    fontSize: 'calc(4em + 10vw)',
                    textAlign: 'center',
                    color: '#fff',
                    backgroundImage: 'linear-gradient(-225deg, #cf2778, #7c64d5, #4cc3ff)',
                    overflow: 'hidden',
                }}
            >
                <Typography
                    variant="h1"
                    aria-label="408 Error"
                    sx={{
                        fontSize: '1em',
                        fontWeight: 700,
                        textShadow: '0 0 0.1em rgba(0, 0, 0, 0.5)',
                    }}
                >
                    4{time}<span></span>8
                </Typography>
                <Typography variant="h2">Error 408: Server request timed out.</Typography>
                <Link href="/dashboard/admin" aria-label="Back to Home Page">
                    <Button variant='contained' color='success'
                            sx={{borderRadius: '30px', color: '#FFF', fontWeight: "bold"}}>
                        Back to Home Page
                    </Button>
                </Link>
            </Box>
        </>
    );
};

export default Error408;
