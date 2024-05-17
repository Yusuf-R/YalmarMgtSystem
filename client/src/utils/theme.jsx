'use client';
import {Roboto} from 'next/font/google';
import {createTheme} from '@mui/material/styles';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
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
