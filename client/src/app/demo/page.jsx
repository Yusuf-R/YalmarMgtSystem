'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LazyComponent from "@/components/LazyComponent/LazyComponent";
import RingLoader from "react-spinners/RingLoader";
import ConfirmationDialog from "@/components/Utilities/ConfirmationDialog";
import {mainSection} from "@/utils/data";
import AdvImageResizerV2 from "@/components/AdvImageResizerV2/AdvImageResizerV2";
import Yalmar from "@/components/Demo/Yalmar";
import LazyLoading from "@/components/LazyLoading/LazyLoading"


function TestComponent() {
    // const txProps = {
    //     color: "white",
    //     bgcolor: "#274e61",
    //     borderRadius: "10px",
    //     width: '250px',
    //     fontSize: '16px',
    //     fontStyle: 'bold',
    //     '&:hover': {
    //         bgcolor: '#051935',
    //     },
    //     fontFamily: 'Poppins',
    //     "& .MuiInputBase-input": {
    //         color: 'white',
    //     },
    //     "& .MuiFormHelperText-root": {
    //         color: 'red',
    //     },
    //     "& .MuiOutlinedInput-notchedOutline": {
    //         borderColor: 'green',
    //     },
    //     "& input:-webkit-autofill": {
    //         WebkitBoxShadow: '0 0 0 1000px #274e61 inset',
    //         WebkitTextFillColor: 'white',
    //     },
    // };
    return (
        <>
            {/*<AdvImageResizerV2/>*/}
            {/*<Yalmar/>*/}
            <LazyLoading/>
        </>
    )
}

export default TestComponent;