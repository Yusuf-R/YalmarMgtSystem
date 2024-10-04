'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {Suspense, lazy} from 'react';
import LazyLoading from "@/components/LazyLoading/LazyLoading";

const AboutYalmar = lazy(() => import('@/components/HomeComponents/About/About'));

function About() {
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <AboutYalmar/>
            </Suspense>
        </>
    );
}

export default About;
