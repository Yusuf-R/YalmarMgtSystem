// src/utils/theme.jsx
'use client';
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    "&:-webkit-autofill": {
                        "WebkitBoxShadow": "0 0 0 100px #274e61 inset",
                        "WebkitTextFillColor": "#FFF",
                    },
                    "&:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
                        backgroundColor: "#274e61",
                        color: "#FFF",
                    },
                },
            },
        },
    },
});

export default theme;