import React, {useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {DayPicker} from "react-day-picker";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import {autoCompleteSx} from "@/utils/data";
import "react-day-picker/dist/style.css";
import {yupResolver} from '@hookform/resolvers/yup';
import {categorySelectorSchema} from "@/SchemaValidator/IncidentValidators/categorySelectorSchema";
import useMediaQuery from "@mui/material/useMediaQuery";


// Category fields mapping based on the provided schema
const categoryFields = {
    Staff: [
        'staff_id', 'fullName', 'email', 'role', 'classAction',
        'categoryEmployment', 'categoryRole', 'categoryViolence', 'categoryStaffOthers'
    ],
    Site: [
        'siteInfo.site_id', 'siteInfo.siteId', 'siteInfo.state', 'siteInfo.cluster',
        'siteInfo.location', 'siteInfo.type', 'categorySite', 'categorySecurity',
        'categoryShelter', 'categorySiteOthers'
    ],
    Fuel: [
        'fuelSiteInfo.site_id', 'fuelSiteInfo.siteId', 'fuelSiteInfo.state', 'fuelSiteInfo.cluster',
        'fuelSiteInfo.location', 'fuelSiteInfo.type', 'categoryFuel', 'categoryTheft.oldQty',
        'categoryTheft.newQty', 'categoryTheft.qtyStolen', 'categoryQuality.quality',
        'categoryIntervention.action', 'categoryIntervention.oldQty', 'categoryIntervention.newQty',
        'categoryIntervention.qtyAdded', 'categoryFuelOthers'
    ],
    Service: [
        'serviceSiteInfo.site_id', 'serviceSiteInfo.siteId', 'serviceSiteInfo.state', 'serviceSiteInfo.cluster',
        'serviceSiteInfo.location', 'serviceSiteInfo.type', 'categoryService', 'categoryMaintenance.action',
        'categoryRepair.action', 'categoryOverhauling.action', 'categoryReplacement.action',
        'categoryServiceOthers'
    ],
    Others: []
};

function IncidentCategorySelector({
                                      incidentReportsCategory,
                                      incidentReportSeverity,
                                      customStyles,
                                      onCategoryChange,
                                  }) {
    const {control, setValue, clearErrors, watch, formState: {errors}, resetField} = useFormContext({
        mode: 'onTouched',
        resolver: yupResolver(categorySelectorSchema),
        revalidateMode: 'onChange',
    });

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const incidentDate = watch('incidentDate')


    const handleToggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateSelect = (date) => {
        setValue('incidentDate', date);
        setShowCalendar(false); // Hide the date picker after selecting a date
        clearErrors('incidentDate');
    };

    const handleCategoryChange = (event, newValue) => {
        const removedCategories = selectedCategories.filter(cat => !newValue.includes(cat));

        removedCategories.forEach(category => {
            if (categoryFields[category]) {
                categoryFields[category].forEach(field => {
                    resetField(field); // Reset field for deselected categories
                });
            }
        });
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


    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');


    const today = new Date();

    return (
        <Paper elevation={5} sx={customStyles.paperSx}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="subtitle 4" sx={customStyles.typographyStyle}>Incident Info</Typography>
                </Grid>
                {/* Date of Incident */}
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="incidentDate"
                            control={control}
                            render={({onChange}) => (
                                <TextField
                                    onFocus={handleToggleCalendar}
                                    value={incidentDate ? incidentDate.toLocaleDateString() : 'Enter Incident Date'}
                                    InputProps={{sx: customStyles.txProps, readOnly: true}}
                                    error={!!errors.incidentDate}
                                    helperText={errors.incidentDate ? (
                                        <span style={{color: "#fc8947"}}>
                                            {errors.incidentDate.message}
                                        </span>
                                    ) : ''}
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
                                                    overflow: 'auto',
                                                },
                                            },
                                        },
                                    }}
                                />
                            )}
                        />
                    </FormControl>
                    {showCalendar && (
                        <DayPicker
                            mode="single"
                            captionLayout="dropdown"
                            selected={incidentDate}
                            onSelect={handleDateSelect}
                            onToggle={handleToggleCalendar}
                            disabledDays={{after: today}}
                            numberOfMonths={1}
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
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
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
                                            sx={{...autoCompleteSx}}
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
                <Grid item xs={xSmall || small || medium ? 12 : large ? 6 : 4}>
                    <FormControl fullWidth>
                        <Controller
                            name="severity"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
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
                                    InputProps={{sx: {...customStyles.txProps}}}
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
                            )}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <br/>
        </Paper>
    );
};

export default IncidentCategorySelector;
