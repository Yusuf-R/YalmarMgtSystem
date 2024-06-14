import React from 'react';
import {Controller} from 'react-hook-form';
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo'; // Adjust this import based on your setup

const theme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#274e61",
                    color: '#ffffff',
                    fontSize: '28px',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#FFF',
                    '&:hover': {
                        backgroundColor: '#191844',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#FFF',
                    
                },
            },
        },
        MuiStack: {
            styleOverrides: {
                root: {
                    marginTop: '-8px !important',
                    width: '200px',
                },
            },
        },
    }
});

const DateComponent = ({name, control, errors, label, setDate, labelText}) => (
    <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({field}) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            {...field}
                            value={field.value}
                            onChange={(newValue) => {
                                field.onChange(newValue);
                                setDate(newValue);
                            }}
                            views={['year', 'month', 'day']}
                            error={!!errors[name]}
                            helperText={errors[name] ? errors[name].message : ''}
                            inputRef={field.ref}
                            closeOnSelect={false}
                            label={labelText}
                            localeText={{toolbarTitle: label}}
                            format={'DD/MM/YYYY'}
                            slotProps={{
                                openPickerButton: {
                                    sx: {
                                        color: 'white',
                                    }
                                },
                                textField: {
                                    sx: {
                                        color: 'white',
                                        bgcolor: '#274e61',
                                        borderRadius: '10px',
                                        width: '350px',
                                        
                                        
                                        "& .MuiInputLabel-root": {
                                            color: '#46F0F9',
                                        },
                                        "& .MuiInputBase-input": {
                                            color: 'white',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                        },
                                        "& .MuiFormHelperText-root": {
                                            color: 'red',
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: errors[name] ? 'red' : '',
                                        },
                                        "& input:-webkit-autofill": {
                                            WebkitBoxShadow: '0 0 0 1000px #274e61 inset',
                                            WebkitTextFillColor: 'white',
                                        },
                                    },
                                    helperText: errors[name] ? (
                                        <span style={{color: "#fc8947"}}>
                                            {errors[name].message}
                                        </span>
                                    ) : null,
                                },
                                actionBar: {
                                    actions: ['cancel', 'clear', 'accept'],
                                },
                                toolbar: {
                                    hidden: false,
                                    sx: {
                                        '& .MuiTypography-root': {
                                            color: '#FFF',
                                        },
                                    },
                                },
                                tabs: {
                                    hidden: false
                                },
                                layout: {
                                    sx: {
                                        '& .MuiDayCalendar-weekDayLabel': {
                                            color: '#F51313',
                                            backgroundColor: '#0B0337',
                                            borderRadius: '50px',
                                        },
                                    },
                                },
                                day: {
                                    sx: {
                                        color: 'white',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: '#07053B',
                                        },
                                    }
                                },
                            }}
                        />
                    </DemoContainer>
                </ThemeProvider>
            </LocalizationProvider>
        )}
    />
);

export default DateComponent;
