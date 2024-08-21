import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Popper from '@mui/material/Popper';
import {autoCompleteSx} from "@/utils/data";

// Custom Popper to modify the background color of the dropdown list
// const CustomPopper = (props) => {
//     return <Popper {...props}
//                    sx={{
//                        '& .MuiAutocomplete-listbox': {
//                            bgcolor: '#274e61', // Background color of the dropdown list
//                            color: 'white',
//                            fontSize: '16px',
//                            fontFamily: 'Poppins',
//                            fontWeight: '500',
//                        },
//                        '& .MuiAutocomplete-option': {
//                            '&[aria-selected="true"]': {
//                                bgcolor: '#1a3a4f',
//                                color: 'white',
//                            },
//                            '&:hover': {
//                                bgcolor: '#051935', // Background color of the hovered option
//                                color: 'white', // Ensure the text color of the hovered option is white
//                            },
//                        },
//                        '& .MuiAutocomplete-option[aria-selected="true"]': {
//                            bgcolor: '#051935', // Background color of the selected option
//                            color: 'white', // Ensure the text color of the selected option is white
//                        },
//                    }}
//     />;
// };

// Custom Popper to modify the background color of the dropdown list
const CustomPopper = (props) => {
    return (
        <Popper
            {...props}
            sx={{
                '& .MuiAutocomplete-listbox': {
                    bgcolor: '#274e61', // Background color of the dropdown list
                    color: 'white',
                    fontSize: '16px',
                    fontFamily: 'Poppins',
                    fontWeight: '500',
                },
                '& .MuiAutocomplete-option': {
                    '&[aria-selected="true"]': {
                        bgcolor: '#051935 !important', // Background color of the selected option
                        color: 'white !important', // Ensure the text color of the selected option is white
                    },
                    '&:hover': {
                        bgcolor: '#1a3a4f !important', // Background color of the hovered option
                        color: 'white !important', // Ensure the text color of the hovered option is white
                    },
                },
            }}
        />
    );
};

function MonthDropdown({value, onChange}) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return (
        <Autocomplete
            options={months}
            value={value}
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
            PopperComponent={CustomPopper}
            renderInput={(params) => <
                TextField {...params} label="Select Month" variant="outlined" sx={autoCompleteSx}/>}
            isOptionEqualToValue={(option, value) => option === value}
        />
    );
}

export default MonthDropdown;
