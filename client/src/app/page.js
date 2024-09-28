import Hero from "@/components/HomeComponents/HeroSection/Hero";
import Nav from "@/components/HomeComponents/Navigation/Nav";
import Box from '@mui/material/Box';

export default function Home() {
    return (
        <>
            <Box sx={{
                fontFamily: 'Poppins',
                bgcolor: '#274e61',
                color: 'white',
                height: '100vh',
                backgroundImage: 'url(/bg-15.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>
                <Nav/>
                <Hero/>
            </Box>
        </>
    );
}
