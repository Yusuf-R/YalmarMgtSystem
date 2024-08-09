'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// import AdvImgResizerMultiFile from "@/components/AdvImgResizerMultiFile/AdvImgResizerMultiFile";
// import AdvImageResizerV2 from "@/components/AdvImageResizerV2/AdvImageResizerV2";
import LazySubmitting from "@/components/LazySubmitting/LazySubmitting";
import RingLoader from "react-spinners/RingLoader";
import {mainSection} from "@/utils/data";



function TestComponent() {
    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
        width: '250px',
        fontSize: '16px',
        fontStyle: 'bold',
        '&:hover': {
            bgcolor: '#051935',
        },
        fontFamily: 'Poppins',
        "& .MuiInputBase-input": {
            color: 'white',
        },
        "& .MuiFormHelperText-root": {
            color: 'red',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: 'green',
        },
        "& input:-webkit-autofill": {
            WebkitBoxShadow: '0 0 0 1000px #274e61 inset',
            WebkitTextFillColor: 'white',
        },
    };
    return (
        <>
            <LazySubmitting/>
        </>
    )
}

export default TestComponent;