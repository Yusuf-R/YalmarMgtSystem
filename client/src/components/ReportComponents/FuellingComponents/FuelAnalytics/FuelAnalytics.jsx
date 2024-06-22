import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import React, {useState, useEffect} from "react";
import {useRouter, usePathname} from "next/navigation";
import {mainSection} from '@/utils/data';
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import {LinearProgress} from "@mui/material";
import DateComponent from "@/components/DateComponent/DateComponent";
import {useForm} from "react-hook-form";
import DailyConsumptionTrend
    from "@/components/Analytics/DailyConsumptionTrend/DailyConsumptionTrend";
import GaugeChartCurrentFuel from "@/components/Analytics/GaugeChartCurrentFuel/GaugeChartCurrentFuel";

function FuelAnalytics({siteData}) {
    const {
        control, handleSubmit, formState: {errors}, setError, reset
    } = useForm({
        mode: "onTouched",
        // resolver: yupResolver(newFuelReportSchema),
        reValidateMode: "onChange",
    });
    const [activeTab, setActiveTab] = useState('/dashboard/admin/reports/fuel/analytics');
    const [customDate, setCustomDate] = useState(null);
    const pathname = usePathname();
    const router = useRouter();
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
        overflow: 'scroll',
    };
    
    const paperInnerStyle = {
        // textAlign: 'center',
        padding: '5px',
        backgroundColor: '#274e61',
        color: '#46F0F9',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
        margin: 0, // Ensure no margin
    };
    
    const gridStyle = {
        padding: '5px', // Optional: Add padding inside the Grid to avoid overlapping borders
    };
    
    const gridItemStyle = {
        padding: '5px', // Optional: Add padding inside the Grid item to avoid overlapping borders
    };
    
    const [selectedDate, setSelectedDate] = useState(dayjs());
    
    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };
    // tabs set up
    useEffect(() => {
        if (pathname.includes('analytics')) {
            setActiveTab('/dashboard/admin/reports/fuel/analytics');
        } else if (pathname.includes('all')) {
            setActiveTab('/dashboard/admin/reports/fuel/all');
        } else {
            setActiveTab('/dashboard/admin/reports');
        }
    }, [pathname])
    
    
    // extract all our credentials from siteData
    const calculateFuelAnalytics = (dateSupplied, nextDueDate, customDate, initialQty, suppliedQty, cpd) => {
        let today;
        if (customDate) {
            today = dayjs(customDate);
        } else {
            today = dayjs();
        }
        initialQty = Number(initialQty);
        suppliedQty = Number(suppliedQty);
        cpd = Number(cpd);
        
        
        const dateSuppliedDayjs = dayjs(dateSupplied, "DD/MMM/YYYY");
        const nextDueDateDayjs = dayjs(nextDueDate, "DD/MMM/YYYY");
        
        const totalQty = initialQty + suppliedQty;
        
        // if supply was done in future(not today), return no analytics
        if (today.isBefore(dateSuppliedDayjs)) {
            return ({dataError: 'Unavailable Analytics: Consumption has not started'})
        }
        // check if today is greater than the dueDate, if true return No Analytics Available
        if (today.isAfter(nextDueDateDayjs)) {
            return ({dataError: 'Unavailable Analytics: Consumption has ended'})
        }
        // Check for non-negative initial and supplied quantities
        if (initialQty < 0 || suppliedQty < 0) {
            return ({dataError: 'Error: Initial and supplied quantities must be non-negative.'})
        }
        
        // Calculate days passed only if the dateSupplied is in the past or today
        const daysPassed = today.isAfter(dateSuppliedDayjs) ? today.diff(dateSuppliedDayjs, 'day') : 0;
        const consumptionSoFar = daysPassed * cpd;
        
        // Ensure that the consumption so far does not exceed the total quantity available
        const currentFuelAvailable = Math.max(0, totalQty - consumptionSoFar);
        const remainingFuelDuration = Math.floor(currentFuelAvailable / cpd);
        
        let bufferStockStatus = "";
        let bufferStockColor = "";
        
        if (remainingFuelDuration <= 1) {
            bufferStockStatus = "SITE DOWN";
            bufferStockColor = "red";
        } else if (remainingFuelDuration <= 5) {
            bufferStockStatus = "REFUEL ALERT";
            bufferStockColor = "#ff66cc";
        } else {
            bufferStockStatus = "ACTIVE OPERATION";
            bufferStockColor = "green";
        }
        
        const fuelToDatePercentage = (currentFuelAvailable / totalQty) * 100;
        let fuelToDateColor = "";
        let fuelToDateText = "";
        
        if (fuelToDatePercentage <= 20) {
            fuelToDateColor = "#ff3300";
            fuelToDateText = "<= 20% left";
        } else if (fuelToDatePercentage <= 40) {
            fuelToDateColor = "#ff66cc";
            fuelToDateText = "<= 40% left";
        } else if (fuelToDatePercentage <= 75) {
            fuelToDateColor = "#00ccff";
            fuelToDateText = "<= 75% left";
        } else {
            fuelToDateColor = "#33cc33";
            fuelToDateText = "75-100% left";
        }
        
        return {
            currentFuelAvailable,
            consumptionSoFar,
            remainingFuelDuration,
            bufferStockStatus,
            bufferStockColor,
            fuelToDatePercentage,
            fuelToDateColor,
            fuelToDateText,
        };
    };
    const FuelAnalytics = ({
                               dateSupplied,
                               nextDueDate,
                               customDate,
                               initialQty,
                               suppliedQty,
                               cpd,
                               paperInnerStyle,
                               gridStyle,
                               gridItemStyle
                           }) => {
        const analytics = calculateFuelAnalytics(dateSupplied, nextDueDate, customDate, initialQty, suppliedQty, cpd);
        
        if (analytics.dataError) {
            return (
                <>
                    <Paper elevation={5} sx={paperInnerStyle}>
                        <Grid container spacing={2} sx={gridStyle}>
                            <Grid item xs={12} sx={gridItemStyle}>
                                <Typography display='block' variant='h6'
                                            sx={{
                                                fontFamily: 'Poppins',
                                                fontWeight: 'bold',
                                                color: '#FFF',
                                            }}>Analytics</Typography>
                            </Grid>
                            <Grid item xs={12} sx={gridItemStyle}>
                                <Typography sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    flexDirection: 'column',
                                    fontSize: '18px',
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    // color: '#FFF',
                                }}>{analytics.dataError}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            )
        }
        return (
            <Paper elevation={5} sx={paperInnerStyle}>
                <Grid container spacing={3} sx={gridStyle}>
                    <Grid item xs={12} sx={gridItemStyle}>
                        <Typography display='block' variant='h6' sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 'bold',
                            color: '#FFF',
                        }}>Analytics</Typography>
                    </Grid>
                    <Grid item xs={6} sx={gridItemStyle}>
                        <Stack direction='row' spacing={2}>
                            <Typography align="left" sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                flexDirection: 'column',
                                fontSize: '18px',
                                fontFamily: 'Poppins',
                                fontWeight: 'bold',
                                // color: '#FFF',
                            }}>
                                Current Fuel Available:
                            </Typography>
                            <TextField
                                id="input-with-icon-textfield"
                                defaultValue={analytics.currentFuelAvailable + ' litres'}
                                InputLabelProps={{
                                    sx: {
                                        
                                        color: "#46F0F9",
                                        fontSize: '14px',
                                        "&.Mui-focused": {
                                            color: "white"
                                        },
                                    }
                                }}
                                InputProps={{
                                    readOnly: true,
                                    sx: {
                                        // color: "#46F0F9",
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                        color: '#FFF',
                                        fontSize: '18px',
                                    },
                                }}
                                variant="filled"
                                size='small'
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6} sx={gridItemStyle}>
                        <Stack direction='row' spacing={2}>
                            <Typography align="left" sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                flexDirection: 'column',
                                fontSize: '18px',
                                fontFamily: 'Poppins',
                                fontWeight: 'bold',
                            }}>
                                Consumption So Far:
                            </Typography>
                            <TextField
                                id="input-with-icon-textfield"
                                defaultValue={analytics.consumptionSoFar + ' litres'}
                                InputLabelProps={{
                                    sx: {
                                        color: "#46F0F9",
                                        fontSize: '14px',
                                        "&.Mui-focused": {
                                            color: "white"
                                        },
                                    }
                                }}
                                InputProps={{
                                    readOnly: true,
                                    sx: {
                                        // color: "#46F0F9",
                                        fontSize: '18px',
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                        color: '#FFF',
                                    },
                                }}
                                variant="filled"
                                size='small'
                            />
                        </Stack>
                    </Grid>
                    {/*Second Row*/}
                    <Grid item xs={6} sx={gridItemStyle}>
                        <Stack direction='row' spacing={2}>
                            <Typography align="left" sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                flexDirection: 'column',
                                fontSize: '18px',
                                fontFamily: 'Poppins',
                                fontWeight: 'bold',
                            }}>
                                Remaining Fuel Duration:
                            </Typography>
                            <TextField
                                id="input-with-icon-textfield"
                                defaultValue={analytics.remainingFuelDuration + ' day(s)'}
                                InputLabelProps={{
                                    sx: {
                                        color: "#46F0F9",
                                        fontSize: '14px',
                                        "&.Mui-focused": {
                                            color: "white"
                                        },
                                    }
                                }}
                                InputProps={{
                                    readOnly: true,
                                    sx: {
                                        // color: "#46F0F9",
                                        fontSize: '18px',
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                        color: '#FFF',
                                    },
                                }}
                                variant="filled"
                                size='small'
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6} sx={gridItemStyle}>
                        <Stack direction='row' spacing={2}>
                            <Typography align="left" sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                flexDirection: 'column',
                                fontSize: '18px',
                                fontFamily: 'Poppins',
                                fontWeight: 'bold',
                                // color: '#FFF',
                            }}>
                                Buffer Stock Status:
                            </Typography>
                            <TextField
                                id="input-with-icon-textfield"
                                defaultValue={analytics.bufferStockStatus}
                                InputLabelProps={{
                                    sx: {
                                        color: "#46F0F9",
                                        fontSize: '14px',
                                        "&.Mui-focused": {
                                            color: "white"
                                        },
                                    }
                                }}
                                InputProps={{
                                    readOnly: true,
                                    sx: {
                                        color: "#FFF",
                                        fontSize: '18px',
                                        backgroundColor: analytics.bufferStockColor,
                                        fontFamily: 'Poppins',
                                        // fontWeight: 'bold',
                                    },
                                }}
                                variant="filled"
                                size='small'
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sx={gridItemStyle}>
                        <br/>
                    </Grid>
                    <Grid item xs={12} sx={gridItemStyle}>
                        <Typography sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            flexDirection: 'column',
                            fontSize: '18px',
                            fontFamily: 'Poppins',
                            fontWeight: 'bold',
                            color: '#FFF',
                        }}>
                            Fuel to Date (FTD):
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{width: '100%'}}>
                            <LinearProgress
                                variant="determinate"
                                value={analytics.fuelToDatePercentage}
                                sx={{
                                    flexGrow: 1,
                                    height: 10,
                                    backgroundColor: '#e0e0e0',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: analytics.fuelToDateColor
                                    }
                                }}
                            />
                            <Typography sx={{marginLeft: 2, color: analytics.fuelToDateColor}}>
                                {analytics.fuelToDatePercentage.toFixed(2)}% left
                            </Typography>
                        </Stack>
                    </Grid>
                
                </Grid>
            </Paper>
        );
    };
    
    return (
        <>
            <Box sx={mainSection}>
                {/*Header*/}
                <Paper elevation={5} sx={{
                    alignCenter: 'center',
                    textAlign: 'center',
                    padding: '10px',
                    backgroundColor: '#274e61',
                    color: '#46F0F9',
                    borderRadius: '10px',
                }}>
                    <Typography variant='h5' sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>Fuel Analytics
                        Manager</Typography>
                </Paper>
                <br/>
                {/*Tabs*/}
                <Stack direction='row' spacing={2} sx={{
                    justifyContent: 'flex-start',
                }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        centered
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#46F0F9',
                            },
                        }}
                    >
                        <Tab
                            label="Reports"
                            component={Link}
                            href="/dashboard/admin/reports"
                            value="/dashboard/admin/reports"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Fuel"
                            component={Link}
                            href="/dashboard/admin/reports/fuel/all"
                            value="/dashboard/admin/reports/fuel/all"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Analytics"
                            href="/dashboard/admin/reports/fuel/analytics"
                            value="/dashboard/admin/reports/fuel/analytics"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                    </Tabs>
                </Stack>
                <br/>
                {/*Analytics*/}
                <Paper elevation={5} sx={{
                    alignCenter: 'center',
                    textAlign: 'center',
                    padding: '12px',
                    backgroundColor: '#274e61',
                    color: '#46F0F9',
                    borderRadius: '10px',
                }}>
                    <Typography variant='h6'
                                sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                        SiteID: {siteData.siteId}
                    </Typography>
                    <Stack direction='row' justifyContent="center"
                           alignItems="center"
                           spacing={2}>
                        <Typography variant='h6'
                                    sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                            Cluster: {siteData.cluster}
                        </Typography>
                        <Divider orientation="vertical" flexItem sx={{border: '2px solid #FFF'}}/>
                        <Typography variant='h6'
                                    sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                            Type: {siteData.type}
                        </Typography>
                        <Divider orientation="vertical" flexItem sx={{border: '2px solid #FFF'}}/>
                        <Typography variant='h6'
                                    sx={{fontFamily: 'Poppins', fontWeight: 'bold',}}>
                            Location: {siteData.location}
                        </Typography>
                    </Stack>
                    <br/>
                    <Typography variant='h6'
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    textAlign: 'left',
                                }}>
                        Supply Date: <span style={{color: 'white'}}>{siteData.dateSupplied}</span>
                    </Typography>
                    <br/>
                    {/* massive data analytics to be performed here*/}
                    <Stack direction='column' gap={2}>
                        <Stack direction='row' gap={1}>
                            {/*Supply info*/}
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <Stack direction='row' spacing={2}>
                                        <Typography align="left" sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            flexDirection: 'column',
                                            fontSize: '18px',
                                            width: '250px',
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            // color: '#FFF',
                                        }}>
                                            Initial Qty (litres)
                                        </Typography>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            defaultValue={siteData.qtyInitial}
                                            InputLabelProps={{
                                                sx: {
                                                    
                                                    color: "#46F0F9",
                                                    fontSize: '14px',
                                                    "&.Mui-focused": {
                                                        color: "white"
                                                    },
                                                }
                                            }}
                                            InputProps={{
                                                readOnly: true,
                                                sx: {
                                                    // color: "#46F0F9",
                                                    fontFamily: 'Poppins',
                                                    fontWeight: 'bold',
                                                    color: '#FFF',
                                                    fontSize: '18px',
                                                    width: '150px',
                                                },
                                            }}
                                            variant="filled"
                                            size='small'
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={4}>
                                    <Stack direction='row' spacing={2}>
                                        <Typography align="left" sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            flexDirection: 'column',
                                            fontSize: '18px',
                                            width: '280px',
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            // color: '#FFF',
                                        }}>
                                            Supplied Qty (litres)
                                        </Typography>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            defaultValue={siteData.qtySupplied}
                                            InputLabelProps={{
                                                sx: {
                                                    
                                                    color: "#46F0F9",
                                                    fontSize: '14px',
                                                    "&.Mui-focused": {
                                                        color: "white"
                                                    },
                                                }
                                            }}
                                            InputProps={{
                                                readOnly: true,
                                                sx: {
                                                    // color: "#46F0F9",
                                                    fontFamily: 'Poppins',
                                                    fontWeight: 'bold',
                                                    color: '#FFF',
                                                    fontSize: '18px',
                                                    width: '150px',
                                                },
                                            }}
                                            variant="filled"
                                            size='small'
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={4}>
                                    <Stack direction='row' spacing={2}>
                                        <Typography align="left" sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            flexDirection: 'column',
                                            fontSize: '18px',
                                            width: '250px',
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            // color: '#FFF',
                                        }}>
                                            New Qty (litres)
                                        </Typography>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            defaultValue={siteData.qtyNew}
                                            InputLabelProps={{
                                                sx: {
                                                    
                                                    color: "#46F0F9",
                                                    fontSize: '14px',
                                                    "&.Mui-focused": {
                                                        color: "white"
                                                    },
                                                }
                                            }}
                                            InputProps={{
                                                readOnly: true,
                                                sx: {
                                                    // color: "#46F0F9",
                                                    fontFamily: 'Poppins',
                                                    fontWeight: 'bold',
                                                    color: '#FFF',
                                                    fontSize: '18px',
                                                    width: '150px',
                                                },
                                            }}
                                            variant="filled"
                                            size='small'
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={4}>
                                    <Stack direction='row' spacing={2}>
                                        <Typography align="left" sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            flexDirection: 'column',
                                            fontSize: '18px',
                                            width: '250px',
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            // color: '#FFF',
                                        }}>
                                            CPD
                                        </Typography>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            defaultValue={siteData.cpd}
                                            InputLabelProps={{
                                                sx: {
                                                    
                                                    color: "#46F0F9",
                                                    fontSize: '14px',
                                                    "&.Mui-focused": {
                                                        color: "white"
                                                    },
                                                }
                                            }}
                                            InputProps={{
                                                readOnly: true,
                                                sx: {
                                                    // color: "#46F0F9",
                                                    fontFamily: 'Poppins',
                                                    fontWeight: 'bold',
                                                    color: '#FFF',
                                                    fontSize: '18px',
                                                    width: '150px',
                                                },
                                            }}
                                            variant="filled"
                                            size='small'
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={4}>
                                    <Stack direction='row' spacing={2}>
                                        <Typography align="left" sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            flexDirection: 'column',
                                            fontSize: '18px',
                                            width: '280px',
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            // color: '#FFF',
                                        }}>
                                            Expected Duration (days)
                                        </Typography>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            defaultValue={siteData.duration}
                                            InputLabelProps={{
                                                sx: {
                                                    
                                                    color: "#46F0F9",
                                                    fontSize: '14px',
                                                    "&.Mui-focused": {
                                                        color: "white"
                                                    },
                                                }
                                            }}
                                            InputProps={{
                                                readOnly: true,
                                                sx: {
                                                    // color: "#46F0F9",
                                                    fontFamily: 'Poppins',
                                                    fontWeight: 'bold',
                                                    color: '#FFF',
                                                    fontSize: '18px',
                                                    width: '150px',
                                                },
                                            }}
                                            variant="filled"
                                            size='small'
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={4}>
                                    <Stack direction='row' spacing={2}>
                                        <Typography align="left" sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            flexDirection: 'column',
                                            fontSize: '18px',
                                            width: '250px',
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            // color: '#FFF',
                                        }}>
                                            Due-Date
                                        </Typography>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            defaultValue={siteData.nextDueDate}
                                            InputLabelProps={{
                                                sx: {
                                                    
                                                    color: "#46F0F9",
                                                    fontSize: '14px',
                                                    "&.Mui-focused": {
                                                        color: "white"
                                                    },
                                                }
                                            }}
                                            InputProps={{
                                                readOnly: true,
                                                sx: {
                                                    // color: "#46F0F9",
                                                    fontFamily: 'Poppins',
                                                    fontWeight: 'bold',
                                                    color: '#FFF',
                                                    fontSize: '18px',
                                                    width: '150px',
                                                },
                                            }}
                                            variant="filled"
                                            size='small'
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                </Paper>
                <br/>
                <Paper elevation={5} sx={{
                    alignCenter: 'center',
                    textAlign: 'left',
                    padding: '12px',
                    backgroundColor: '#274e61',
                    color: '#46F0F9',
                    borderRadius: '10px',
                }}>
                    <Typography variant='h6'
                                sx={{fontFamily: 'Poppins', fontWeight: 'bold', textAlign: 'center',}}>
                        Current Day Analytics
                    </Typography>
                    <FuelAnalytics
                        cpd={siteData.cpd}
                        nextDueDate={siteData.nextDueDate}
                        dateSupplied={siteData.dateSupplied}
                        initialQty={siteData.qtyInitial}
                        suppliedQty={siteData.qtySupplied}
                        paperInnerStyle={paperInnerStyle}
                        gridStyle={gridStyle}
                        gridItemStyle={gridItemStyle}
                    />
                </Paper>
                <br/>
                <Paper elevation={5} sx={{
                    alignCenter: 'center',
                    textAlign: 'left',
                    padding: '12px',
                    backgroundColor: '#274e61',
                    color: '#46F0F9',
                    borderRadius: '10px',
                }}>
                    <Typography variant='h6'
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    direction: ''
                                }}>
                        Custom Day Analytics
                    </Typography>
                    {/*select date*/}
                    <br/>
                    <Stack direction='column' gap={2}>
                        <Typography variant='h6'
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-end',
                                        color: 'info',
                                    }}>
                            Note: Date must be not be less than supply date or greater than dueDate
                        </Typography>
                        <Stack direction='row' gap={4} sx={{fontSize: '38px',}}>
                            <Typography variant='h6' color='info'
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            fontSize: '18px',
                                        }}>
                                Select Custom Date:
                            </Typography>
                            <DateComponent
                                name="dateSupplied"
                                control={control}
                                errors={errors}
                                labelText={null}
                                setDate={setCustomDate}
                                defaultValue={siteData.dateSupplied}
                            />
                        </Stack>
                    </Stack>
                    <br/>
                    {customDate && (
                        <>
                            {/*    Render the custom date analytics*/}
                            <FuelAnalytics
                                cpd={siteData.cpd}
                                nextDueDate={siteData.nextDueDate}
                                dateSupplied={siteData.dateSupplied}
                                customDate={customDate}
                                initialQty={siteData.qtyInitial}
                                suppliedQty={siteData.qtySupplied}
                                paperInnerStyle={paperInnerStyle}
                                gridStyle={gridStyle}
                                gridItemStyle={gridItemStyle}
                            />
                        
                        </>
                    )}
                </Paper>
                <br/>
                <Typography variant='h6'
                            sx={{
                                fontFamily: 'Poppins',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                direction: ''
                            }}>
                    Analytical Charts
                </Typography>
                <br/>
                <Paper elevation={5} sx={{
                    alignCenter: 'center',
                    textAlign: 'left',
                    padding: '12px',
                    backgroundColor: '#274e61',
                    color: '#46F0F9',
                    borderRadius: '10px',
                }}>
                    <Typography variant='h6'
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    direction: ''
                                }}>
                        Daily Consumption Trend
                    </Typography>
                    <DailyConsumptionTrend dateSupplied={siteData.dateSupplied} cpd={siteData.cpd}/>
                    <br/>
                </Paper>
                <br/>
                <Paper elevation={5} sx={{
                    alignCenter: 'center',
                    textAlign: 'left',
                    padding: '12px',
                    backgroundColor: '#274e61',
                    color: '#46F0F9',
                    borderRadius: '10px',
                }}>
                    <Typography variant='h6'
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    direction: ''
                                }}>
                        Fuel To Date (FTD) Analytics
                    </Typography>
                    <Stack>
                        <GaugeChartCurrentFuel
                            currentFuelAvailable={siteData.qtyNew - (selectedDate.diff(dayjs(siteData.dateSupplied, "DD/MMM/YYYY"), 'day') * siteData.cpd)}
                            totalQty={siteData.qtyNew}/>
                    </Stack>
                </Paper>
            </Box>
        </>
    )
}

export default FuelAnalytics