import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Popper from "@mui/material/Popper";
import {autoCompleteSx} from "@/utils/data";

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


function YearDropdown({value, onChange}) {
    const currentYear = new Date().getFullYear();
    const startYear = 2022; // Set the starting year
    const years = Array.from(new Array(currentYear - startYear + 1), (val, index) => startYear + index);
    
    return (
        <Autocomplete
            options={years}
            value={value}
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
            PopperComponent={CustomPopper}
            getOptionLabel={(option) => option.toString()}
            renderInput={(params) => <TextField {...params} label="Select Year" variant="outlined"
                                                sx={autoCompleteSx}/>}
            isOptionEqualToValue={(option, value) => option.toString() === value.toString()}
        />
    );
}

export default YearDropdown;
