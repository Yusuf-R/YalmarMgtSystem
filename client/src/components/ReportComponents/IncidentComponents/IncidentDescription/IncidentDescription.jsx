import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Controller, useFormContext} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {txProps} from "@/utils/data";
import React from "react";
import {descriptionSchema} from "@/SchemaValidator/IncidentValidators/descriptionSchema";
import {yupResolver} from "@hookform/resolvers/yup";


function IncidentDescription({customStyles}) {
    const {control, setValue, clearErrors, watch, formState: {errors}} = useFormContext({
        mode: 'onTouched',
        reValidateMode: 'onChange',
        resolver: yupResolver(descriptionSchema),

    });
    return (
        <>
            <Paper sx={customStyles.paperSx}>
                {/*Summary info of the Incident Report*/}
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle 4" sx={customStyles.typographyStyle}>Detailed Summary of
                            Report</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="reportDescription"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    InputProps={{
                                        sx: txProps,
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white",
                                            },
                                        }
                                    }}
                                    label="Report Description"
                                    multiline
                                    minRows={5}
                                    maxRows={25}
                                    variant="outlined"
                                    placeholder="Provide Orderd details of the incident report"
                                    fullWidth
                                    required
                                    error={!!errors.reportDescription}
                                    helperText={errors.reportDescription ? errors.reportDescription.message : ''}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default IncidentDescription;