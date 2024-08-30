import React, {useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {DayPicker} from "react-day-picker";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import {autoCompleteSx} from "@/utils/data";
import "react-day-picker/dist/style.css";

function IncidentCategorySelector({
                                      incidentReportsCategory,
                                      incidentReportSeverity,
                                      customStyles,
                                      onCategoryChange,
                                  }) {
    const {control, setValue, clearErrors, watch, formState: {errors}} = useFormContext();
    
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const incidentDate = watch('incidentDate');
    
    const handleToggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };
    
    const handleDateSelect = (date) => {
        setValue('incidentDate', date);
        setShowCalendar(false); // Hide the date picker after selecting a date
    };
    
    const handleCategoryChange = (event, newValue) => {
        setSelectedCategories(newValue);
        setValue('reportCategory', newValue);
        clearErrors('reportCategory');
        onCategoryChange(newValue);
    };
    
    const handleIncidentReportSeverity = (event) => {
        const selectedSeverity = event.target.value;
        setValue('severity', selectedSeverity);
        clearErrors('severity');
    };
    
    return (
        <Paper elevation={5} sx={customStyles.paperSx}>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Typography variant="subtitle 4" sx={customStyles.typographyStyle}>Date of Incident</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle 4" sx={customStyles.typographyStyle}>Report Category</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle 4" sx={customStyles.typographyStyle}>Severity</Typography>
                </Grid>
                {/* Date of Incident */}
                <Grid item xs={4}>
                    <Controller
                        name="incidentDate"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                onClick={handleToggleCalendar}
                                value={incidentDate ? incidentDate.toLocaleDateString() : 'Enter Incident Date'}
                                InputProps={{sx: customStyles.txProps, readOnly: true}}
                                label="Incident Date"
                                InputLabelProps={{
                                    sx: {
                                        color: "#46F0F9",
                                        "&.Mui-focused": {color: "white"},
                                    },
                                }}
                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: '#134357',
                                                color: 'white',
                                                maxHeight: 450,
                                                overflow: 'auto',
                                            },
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                    {showCalendar && (
                        <DayPicker
                            mode="single"
                            captionLayout="dropdown"
                            selected={incidentDate}
                            onSelect={handleDateSelect}
                            numberOfMonths={2}
                            required
                            modifiers={{today: new Date()}}
                            styles={{
                                caption: {color: '#FFF'},
                                day: {color: '#FFF'},
                            }}
                            modifiersStyles={{
                                today: {color: '#FFF', backgroundColor: 'red'},
                                selected: {backgroundColor: 'rgb(0, 153, 0)'},
                            }}
                        />
                    )}
                </Grid>
                {/* Report Category */}
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <Controller
                            name="reportCategory"
                            control={control}
                            render={({field}) => (
                                <Autocomplete
                                    multiple
                                    id="incident-category"
                                    options={incidentReportsCategory.filter(category => !selectedCategories.includes(category))}
                                    {...field}
                                    value={selectedCategories}
                                    onChange={handleCategoryChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Incident Category"
                                            placeholder="Select categories"
                                            sx={{...autoCompleteSx, width: 450}}
                                        />
                                    )}
                                    filterSelectedOptions
                                    ChipProps={{
                                        sx: {
                                            fontWeight: 'bold',
                                            color: '#FFF',
                                            fontFamily: 'Poppins',
                                            fontSize: '16px',
                                            textAlign: 'left',
                                            backgroundColor: '#660066',
                                        },
                                        deleteIcon: <span style={{color: 'lime'}}>×</span>,
                                    }}
                                    PaperComponent={(props) => (
                                        <Paper
                                            {...props}
                                            sx={{
                                                backgroundColor: "#274e61",
                                                color: "white",
                                                borderRadius: "10px",
                                                "& .MuiAutocomplete-option": {
                                                    color: "white",
                                                    '&:hover': {
                                                        backgroundColor: '#00004d',
                                                    },
                                                },
                                            }}
                                        />
                                    )}
                                />
                            )}
                        />
                        {errors.reportCategory && (
                            <FormHelperText style={{color: "#fc8947"}}>
                                {errors.reportCategory.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                {/* Severity */}
                <Grid item xs={4}>
                    <Controller
                        name="severity"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <FormControl fullWidth>
                                <TextField
                                    {...field}
                                    select
                                    value={field.value || ''}
                                    onChange={handleIncidentReportSeverity}
                                    required
                                    label="Severity"
                                    error={!!errors.severity}
                                    helperText={errors.severity ? (
                                        <span style={{color: "#fc8947"}}>
                                            {errors.severity.message}
                                        </span>
                                    ) : ''}
                                    InputProps={{sx: {...customStyles.txProps, width: '40%'}}}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {color: "white"},
                                        },
                                    }}
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#134357',
                                                    color: 'white',
                                                    fontSize: '40px',
                                                },
                                            },
                                        },
                                    }}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#fff',
                                        },
                                        textAlign: 'left',
                                    }}>
                                    {incidentReportSeverity.map(severity => (
                                        <MenuItem key={severity} value={severity}
                                                  sx={{color: 'white', '&:hover': {backgroundColor: '#051935'}}}>
                                            {severity}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>
            <br/>
        </Paper>
    );
};

export default IncidentCategorySelector;
