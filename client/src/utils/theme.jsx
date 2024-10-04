'use client';
import {Poppins} from 'next/font/google';
import {createTheme} from '@mui/material/styles';

// const roboto = Roboto({
//     weight: ['300', '400', '500', '700'],
//     subsets: ['latin'],
//     display: 'swap',
// });

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
    title: "Yalmar Management System",
    description: "The smart system for managing staff and client operations.",
};


const theme = createTheme({
    typography: {
        fontFamily: poppins.style.fontFamily,
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    "&:-webkit-autofill": {
                        "WebkitBoxShadow": "0 0 0 100px #274e61 inset", // Set the background color to your own color
                        "WebkitTextFillColor": "#FFF", // Set the text color to your own color
                    },
                    "&:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
                        backgroundColor: "#274e61", // Set the background color to your own color when it auto-fills
                        color: "#FFF", // Set the text color to your own color when it auto-fills
                    },
                },
            },
        },
    },
});

export default theme;
