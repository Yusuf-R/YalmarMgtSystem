'use client';
// import AdvancedImageResizer from "@/components/AdvanceImageResizer/AdvanceImageResizer";
// import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {Controller, useWatch} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import * as yup from 'yup';
import {mainSection} from "@/utils/data";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const siteData = {
    "_id": "6669c9fb2fdadef23e5590e5",
    "site_id": "6666346aed9d75f23629bf54",
    "siteId": "KAD020",
    "state": "KADUNA",
    "cluster": "KADUNA-CENTRAL",
    "location": "AIR FORCE BASE",
    "type": "TERMINAL",
    "qtyInitial": 50,
    "qtySupplied": 600,
    "qtyNew": 650,
    "dateSupplied": "02/Jul/2024",
    "nextDueDate": "15/Jul/2024",
    "duration": 13,
    "cpd": 50,
}


const demoReportSchema = yup.object().shape({
    qtyInitial: yup.number().required('what is wrong here'),
});


function Demo() {
    return (
        <>
            <TestComponent/>
        </>
    );
}

export default Demo;


function TestComponent() {
    const [errors, setErrors] = useState({});
    const {control, handleSubmit, formState: {errors: formErrors}, setValue} = useForm({
        resolver: yupResolver(demoReportSchema),
        defaultValues: siteData
    });
    const paperProps = {
        alignCenter: 'center',
        textAlign: 'center',
        padding: '25px',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
    }
    const txProps = {
        color: "white",
        bgcolor: "#274e61",
        borderRadius: "10px",
        fontSize: '1.2em',
    };
    console.log({errors});
    
    //gen1 frequency
    const gen1Frequency = useWatch({control, name: 'frequency'});
    
    
    const submitUpdate = async (data) => {
        console.log({data});
        try {
            await demoReportSchema.validate(data, {abortEarly: false});
            console.log("Validation passed!"); // Check if validation passes
        } catch (ex) {
            setErrors(ex.errors);
        }
    };
    return (
        <>
            <Box component="form"
                 onSubmit={handleSubmit(submitUpdate)}
                 noValidate
                 sx={mainSection}
            >
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Controller
                            name="qtyInitial"
                            control={control}
                            defaultValue={siteData.qtyInitial}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    InputProps={{
                                        sx: txProps
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white",
                                            },
                                        }
                                    }}
                                    sx={{
                                        color: "#46F0F9",
                                        
                                    }}
                                    label="Initial Quantity"
                                    type="number"
                                    error={!!errors.qtyInitial}
                                    helperText={errors.qtyInitial ? errors.qtyInitial.message : ''}
                                    fullWidth
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value) || 0;
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Controller
                            name="frequency"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    label="Operating frequency Reading"
                                    type="number"
                                    onChange={(e) => field.onChange(e.target.value)}
                                    InputProps={{
                                        sx: {
                                            color: "#46F0F9",
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: "#46F0F9",
                                            "&.Mui-focused": {
                                                color: "white",
                                            },
                                        }
                                    }}
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{mt: 2}}>
                            Current Operating Frequency: {gen1Frequency || 'Not set'}
                        </Typography>
                    </Grid>
                </Grid>
                <br/><br/>
                <Button type='submit' color='success' variant='contained'>Submit</Button>
            </Box>
        </>
    );
}