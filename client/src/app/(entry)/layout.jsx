'use client';
import Nav from "@/components/HomeComponents/Navigation/Nav";
import Box from '@mui/material/Box';
import {usePathname} from "next/navigation";
import {useEffect, useState} from 'react';
import {useTheme} from '@mui/material/styles';

// Define background images for different routes
const routeBackgrounds = {
    '/home': '/bg-9.jpg',
    '/about': '/bg-5.jpg',
    '/services': '/bg-8.jpg',
    '/contact': '/bg-12.svg',
    '/careers': '/bg-7.jpg',
    '/login': '/bg-6.jpg',
    '/setpassword': '/bg-10.svg',
    '/resetpassword': '/bg-9.jpg',
};

export default function EntryLayout({children}) {
    const pathName = usePathname();
    const theme = useTheme();
    const [backgroundImage, setBackgroundImage] = useState('/bg-10.svg'); // Default background

    // Update the background based on the current route
    useEffect(() => {
        Object.keys(routeBackgrounds).forEach((route) => {
            if (pathName.includes(route)) {
                setBackgroundImage(routeBackgrounds[route]);
            }
        });
    }, [pathName]); // Ensure dependency on pathName

    return (
        <Box
            sx={{
                fontFamily: theme.typography.fontFamily,  // MUI typography
                minHeight: '100vh',  // Ensure the background covers the full viewport
                backgroundImage: `url(${backgroundImage})`,  // Dynamic background
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                bgcolor: theme.palette.background.default,  // Fallback background color
                transition: 'background-image 0.5s ease-in-out',  // Smooth background change
            }}
        >
            {/* Constant Nav */}
            <Nav/>

            {/* Main content area, adjusted to have padding below the nav */}
            <Box sx={{paddingTop: '100px', paddingLeft: '20px', paddingRight: '20px'}}>
                {children}
            </Box>
        </Box>
    );
}
