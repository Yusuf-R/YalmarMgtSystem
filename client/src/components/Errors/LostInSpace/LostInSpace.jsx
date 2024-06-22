"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React from 'react';
import {keyframes} from '@emotion/react';
import {styled} from '@mui/system';

const rocketMovement = keyframes`
    100% {
        transform: translate(1200px, -600px);
    }
`;

const spinEarth = keyframes`
    100% {
        transform: rotate(-360deg);
    }
`;

const moveAstronaut = keyframes`
    100% {
        transform: translate(-160px, -160px);
    }
`;

const rotateAstronaut = keyframes`
    100% {
        transform: rotate(-720deg);
    }
`;

const glowStar = keyframes`
    40% {
        opacity: 0.3;
    }
    90%, 100% {
        opacity: 1;
        transform: scale(1.2);
        border-radius: 999999px;
    }
`;

const Background = styled(Box)({
    background: 'url(http://salehriaz.com/404Page/img/bg_purple.png)',
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'cover',
    backgroundPosition: 'left top',
    height: '100vh',
    overflow: 'hidden',
});

const Stars = styled(Box)({
    background: 'url(http://salehriaz.com/404Page/img/overlay_stars.svg)',
    backgroundRepeat: 'repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'left top',
});

const CentralBody = styled(Box)({
    padding: '17% 5% 10% 5%',
    textAlign: 'center',
});

const GlowingStar = styled(Box)({
    position: 'absolute',
    borderRadius: '100%',
    backgroundColor: '#fff',
    width: '3px',
    height: '3px',
    opacity: 0.3,
    animation: `${glowStar} 2s infinite ease-in-out alternate`,
    '&:nth-of-type(1)': {
        top: '80%',
        left: '25%',
        animationDelay: '1s',
    },
    '&:nth-of-type(2)': {
        top: '20%',
        left: '40%',
        animationDelay: '3s',
    },
    '&:nth-of-type(3)': {
        top: '25%',
        left: '25%',
        animationDelay: '5s',
    },
    '&:nth-of-type(4)': {
        top: '75%',
        left: '80%',
        animationDelay: '7s',
    },
    '&:nth-of-type(5)': {
        top: '90%',
        left: '50%',
        animationDelay: '9s',
    },
});

const Rocket = styled('img')({
    position: 'absolute',
    top: '75%',
    transform: 'translateX(-50px)',
    animation: `${rocketMovement} 200s linear infinite`,
});

const Earth = styled('img')({
    position: 'absolute',
    top: '20%',
    left: '15%',
    animation: `${spinEarth} 20s linear infinite`,
});

const Moon = styled('img')({
    position: 'absolute',
    top: '12%',
    left: '25%',
});

const Astronaut = styled('img')({
    position: 'absolute',
    top: '60%',
    right: '20%',
    animation: `${moveAstronaut} 50s infinite linear, ${rotateAstronaut} 200s infinite linear`,
});

const LostInSpace = () => {
    return (
        <Box sx={{
            padding: '20px',
            width: 'calc(100% - 250px)',
            position: 'absolute',
            top: '60px',
            left: '200px',
        }}>
            <Background>
                <Stars>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', p: 2}}>
                        <img src="http://salehriaz.com/404Page/img/logo.svg" alt="Logo" width="80px"/>
                    </Box>
                    <CentralBody>
                        <img src="http://salehriaz.com/404Page/img/404.svg" alt="404" width="300px"/>
                        <br/>
                        <Stack direction='column' justifyContent="center" alignItems="center" spacing={2} sx={{mt: 5}}>
                            <Typography variant="button" display="block" gutterBottom
                                        sx={{color: 'white', fontSize: '20px'}}>Use
                                the Page Buttons for
                                navigating</Typography>
                            <Link href="/dashboard/admin/staff">
                                <Button variant="contained" color='error'
                                        sx={{
                                            color: 'white',
                                            fontSize: '15px',
                                            border: '1px solid #FFCB39',
                                            borderRadius: '20px'
                                        }}>GO
                                    STAFF VIEW
                                </Button>
                            </Link>
                        </Stack>
                    
                    </CentralBody>
                    <Box sx={{position: 'relative', zIndex: 1}}>
                        <Rocket src="http://salehriaz.com/404Page/img/rocket.svg" alt="Rocket" width="40px"/>
                        <Box sx={{position: 'relative'}}>
                            <Earth src="http://salehriaz.com/404Page/img/earth.svg" alt="Earth" width="100px"/>
                            <Moon src="http://salehriaz.com/404Page/img/moon.svg" alt="Moon" width="80px"/>
                        </Box>
                        <Astronaut src="http://salehriaz.com/404Page/img/astronaut.svg" alt="Astronaut" width="140px"/>
                    </Box>
                    <Box sx={{position: 'relative', zIndex: 0}}>
                        <GlowingStar/>
                        <GlowingStar/>
                        <GlowingStar/>
                        <GlowingStar/>
                        <GlowingStar/>
                    </Box>
                </Stars>
            </Background>
        
        </Box>
    
    );
};

export default LostInSpace;
//
// function LostInSpace() {
//     return (
//         <>
//             <Box style={{
//                 textAlign: 'center',
//                 padding: '50px',
//                 width: 'calc(100% - 250px)',
//                 position: 'absolute',
//                 top: '70px',
//                 left: '250px',
//             }}>
//                 <Typography variant="h4" gutterBottom>Invalid Navigation</Typography>
//                 <Typography variant="h4" gutterBottom>Lost in Space...</Typography>
//                 <Link href="/dashboard/admin/staff">
//                     <Button variant="contained" color='error'
//                             style={{padding: '10px 20px', marginTop: '20px', cursor: 'pointer'}}>Go to Staff Page
//                     </Button>
//                 </Link>
//             </Box>
//         </>
//     )
// }
//
// export default LostInSpace;