import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from '@mui/material/Badge';
import TextField from "@mui/material/TextField";
import AdminUtilities from "@/utils/AdminUtilities";
import {useState, useEffect} from "react";
import {useRouter, usePathname} from "next/navigation";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';
import PublicIcon from '@mui/icons-material/Public';
import DomainIcon from '@mui/icons-material/Domain';
import MapIcon from '@mui/icons-material/Map';
import Avatar from "@mui/material/Avatar";
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import MosqueIcon from '@mui/icons-material/Mosque';
import ChurchIcon from '@mui/icons-material/Church';
import ChaletIcon from '@mui/icons-material/Chalet';
import DeckIcon from '@mui/icons-material/Deck';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import Select from "@mui/material/Select";
import {
    yellow,
    blueGrey,
} from "@mui/material/colors";

const colorSuspended = yellow[200];
const colorDeceased = blueGrey[500];

const getBadgeStyles = (status) => {
    switch (status) {
        case 'Active':
            return {
                backgroundColor: 'success.main',
                color: 'white',
            };
        case 'Suspended':
            return {
                backgroundColor: colorSuspended,
                color: 'black',
            };
        case 'Terminated':
            return {
                backgroundColor: 'error.main',
                color: 'white',
            };
        case 'Deceased':
            return {
                backgroundColor: colorDeceased,
                color: 'white',
            };
        case 'Pending':
            return {
                backgroundColor: 'secondary.main',
                color: 'white',
            };
        default:
            return {
                backgroundColor: 'default',
                color: 'white',
            };
    }
};

import Image from "next/image";
import dayjs from "dayjs";
import {mainSection} from "@/utils/data";

function ViewStaff({id, staffData}) {
    const fullName = `${staffData.firstName} ${staffData.middleName ? staffData.middleName : " "} ${staffData.lastName}`;
    const [activeTab, setActiveTab] = useState('/dashboard/admin/staff/view');
    const pathname = usePathname();
    const router = useRouter();
    const editStaff = async () => {
        const encryptedUserID = await AdminUtilities.encryptUserID(id);
        // encrypt the data and store it in the session storage
        const encryptedData = await AdminUtilities.encryptData(staffData);
        if (sessionStorage.getItem('staffData')) {
            sessionStorage.removeItem('staffData');
        }
        if (sessionStorage.getItem('staffID')) {
            sessionStorage.removeItem('staffID');
        }
        sessionStorage.setItem('staffData', encryptedData);
        sessionStorage.setItem('staffID', encryptedUserID);
        router.push("/dashboard/admin/staff/edit");
    };
    // conditionally rendering the staff cluster and profile
    const SiteInfo = ({staffData}) => {
        // Check if the role is either 'Field Supervisor' or 'Generator Technician'
        if (staffData.role !== 'Field Supervisor' && staffData.role !== 'Generator Technician') {
            return null; // Don't render anything if the role doesn't match
        }
        
        return (
            <>
                <Stack direction='column' spacing={2}>
                    <Stack direction='row' spacing={2}>
                        <TextField
                            id="input-with-icon-textfield"
                            defaultValue={staffData.siteState}
                            label="Site State"
                            InputLabelProps={{
                                sx: {
                                    color: "#46F0F9",
                                    "&.Mui-focused": {
                                        color: "white"
                                    },
                                }
                            }}
                            
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PublicIcon sx={{color: '#FFF'}}/>
                                    </InputAdornment>
                                ),
                                readOnly: true,
                                sx: {
                                    color: "#46F0F9",
                                    fontSize: '20px',
                                },
                            }}
                            variant="filled"
                        />
                    </Stack>
                    <br/>
                    <Stack direction='row' spacing={2}>
                        <TextField
                            id="input-with-icon-textfield"
                            defaultValue={staffData.cluster}
                            label="Cluster"
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
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DomainIcon sx={{color: '#FFF'}}/>
                                    </InputAdornment>
                                ),
                                readOnly: true,
                                sx: {
                                    color: "#46F0F9",
                                    fontSize: '20px',
                                },
                            }}
                            variant="filled"
                        />
                    </Stack>
                    <br/>
                    <Stack direction='row' spacing={2}>
                        <Button
                            variant="outlined"
                            startIcon={<PodcastsIcon sx={{color: '#FFF'}}/>}
                            sx={{
                                color: "#46F0F9",
                                height: '40%',
                                mt: '50px',
                                fontSize: '18px',
                            }}
                        >
                            Site IDs
                        </Button>
                        <Select
                            multiple
                            native
                            inputProps={{
                                id: 'select-multiple-native',
                            }}
                            sx={{
                                backgroundColor: '#134357',
                                color: 'white',
                                overflow: 'auto',
                            }}
                        >
                            {staffData.siteID.map((site) => (
                                <option key={site} value={site}>
                                    {site}
                                </option>
                            ))}
                        </Select>
                    </Stack>
                </Stack>
            </>
        );
    };
    useEffect(() => {
        if (pathname.includes('view')) {
            setActiveTab('/dashboard/admin/staff/view');
        } else if (pathname.includes('edit')) {
            setActiveTab('/dashboard/admin/staff/edit');
        } else {
            setActiveTab('/dashboard/admin/staff');
        }
    }, [pathname]);
    return (
        <>
            <Box sx={mainSection}>
                {/*Header of the page*/}
                <Paper elevation={5} sx={{
                    alignCenter: 'center',
                    textAlign: 'center',
                    padding: '10px',
                    backgroundColor: '#274e61',
                    color: '#46F0F9',
                    borderRadius: '10px',
                    width: '100%',
                    height: 'auto',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
                }}>
                    <Typography variant='h5'>Staff Profile</Typography>
                </Paper>
                <br/>
                {/*Body of the page*/}
                {/* Navigation Tabs */}
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
                            label="Staff"
                            component={Link}
                            href="/dashboard/admin/staff"
                            value="/dashboard/admin/staff"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="View"
                            component={Link}
                            href="/dashboard/admin/staff/view"
                            value="/dashboard/admin/staff/view"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Edit"
                            onClick={editStaff}
                            value="/dashboard/admin/staff/edit"
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
                <Box>
                    {/* Sub Body: Grid Container*/}
                    <Grid container spacing={2}>
                        {/*LHS Container for Avatar and Summary Infos*/}
                        <Grid item xs={3}>
                            {/*LHS Container for Avatar: Name : Role*/}
                            <Paper elevation={9} sx={{
                                alignCenter: 'center',
                                textAlign: 'center',
                                padding: '10px',
                                backgroundColor: '#274e61',
                                // border: '2px solid red',
                                color: '#46F0F9',
                                borderRadius: '10px',
                                width: '100%',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 1.5)',
                            }}>
                                <Grid container spacing={2}>
                                    {/*Profile Picture*/}
                                    <Grid item xs={12}>
                                        {staffData.imgURL !== "" ? (
                                            <Image
                                                src={staffData.imgURL}
                                                alt={staffData.email}
                                                width={350}
                                                height={350}
                                                style={{borderRadius: '50%'}}
                                            
                                            />
                                        ) : (
                                            <Image
                                                src={staffData.gender === 'Male' ? '/Avatar-9.svg' : '/Avatar-10.svg'}
                                                alt={staffData.email}
                                                width={350}
                                                height={350}
                                                style={{borderRadius: '50%'}}
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Badge
                                            sx={{
                                                '& .MuiBadge-badge': getBadgeStyles(staffData.status)
                                            }}
                                            overlap="circular"
                                            badgeContent={staffData.status}
                                            // color='error'
                                            // overlap="circular"
                                            // badgeContent='Terminated'
                                        >
                                        </Badge>
                                    </Grid>
                                    <br/><br/><br/>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            defaultValue={fullName}
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
                                                startAdornment: (
                                                    <InputAdornment position="start"
                                                    >
                                                        <AccountCircleIcon sx={{color: '#FFF'}}/>
                                                    </InputAdornment>
                                                ),
                                                readOnly: true,
                                                sx: {
                                                    color: "#46F0F9",
                                                    fontSize: '20px',
                                                },
                                            }}
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            defaultValue={staffData.role}
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
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AppRegistrationIcon sx={{color: '#FFF'}}/>
                                                    </InputAdornment>
                                                ),
                                                readOnly: true,
                                                sx: {
                                                    color: "#46F0F9",
                                                    fontSize: '20px',
                                                },
                                            }}
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            defaultValue={staffData.email}
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
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MarkEmailReadIcon sx={{color: '#FFF'}}/>
                                                    </InputAdornment>
                                                ),
                                                readOnly: true,
                                                sx: {
                                                    color: "#46F0F9",
                                                    fontSize: '20px',
                                                },
                                            }}
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            defaultValue={staffData.phone}
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
                                                startAdornment: (
                                                    <InputAdornment position="start"
                                                    >
                                                        <PhoneInTalkRoundedIcon sx={{color: '#FFF'}}/>
                                                    </InputAdornment>
                                                ),
                                                readOnly: true,
                                                sx: {
                                                    color: "#46F0F9",
                                                    fontSize: '20px',
                                                },
                                            }}
                                            variant="standard"
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        {/*RHS Container for Major Infos*/}
                        <Grid item xs={9}>
                            <Paper elevation={5} sx={{
                                alignCenter: 'center',
                                textAlign: 'center',
                                padding: '10px',
                                backgroundColor: '#274e61',
                                color: '#46F0F9',
                                borderRadius: '10px',
                                width: '`100%',
                            }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Paper elevation={5} sx={{
                                            alignCenter: 'center',
                                            textAlign: 'center',
                                            padding: '10px',
                                            border: '1px solid #0A4D50',
                                            backgroundColor: '#274e61',
                                            color: '#46F0F9',
                                            borderRadius: '10px',
                                            width: '`100%',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 1.5)',
                                        }}>
                                            <Typography variant='h6' align="left">Name Info</Typography>
                                            <br/>
                                            <Stack direction='row' spacing={10}>
                                                {/* Column 1 : Name: MiddleName: LastName */}
                                                <Stack direction='row' spacing={2}>
                                                    <TextField
                                                        id="input-with-icon-textfield"
                                                        defaultValue={staffData.firstName}
                                                        label="FirstName"
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
                                                            startAdornment: (
                                                                <InputAdornment position="start"
                                                                >
                                                                    <Avatar sx={{
                                                                        width: 32,
                                                                        height: 31,
                                                                        bgcolor: '#074043',
                                                                        fontSize: '0.9rem',
                                                                    }}>FN</Avatar>
                                                                </InputAdornment>
                                                            ),
                                                            readOnly: true,
                                                            sx: {
                                                                color: "#46F0F9",
                                                                fontSize: '20px',
                                                            },
                                                        }}
                                                        variant="filled"
                                                    />
                                                </Stack>
                                                <Stack direction='row' spacing={2}>
                                                    <TextField
                                                        id="input-with-icon-textfield"
                                                        defaultValue={staffData.middleName ? staffData.middleName : "N/A"}
                                                        label="MiddleName"
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
                                                            startAdornment: (
                                                                <InputAdornment position="start"
                                                                >
                                                                    <Avatar sx={{
                                                                        width: 32,
                                                                        height: 31,
                                                                        bgcolor: '#074043',
                                                                        fontSize: '0.9rem',
                                                                        
                                                                    }}>MN</Avatar>
                                                                </InputAdornment>
                                                            ),
                                                            readOnly: true,
                                                            sx: {
                                                                color: "#46F0F9",
                                                                fontSize: '20px',
                                                            },
                                                        }}
                                                        variant="filled"
                                                    />
                                                </Stack>
                                                <Stack direction='row' spacing={2}>
                                                    <TextField
                                                        id="input-with-icon-textfield"
                                                        defaultValue={staffData.lastName}
                                                        label="LastName"
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
                                                            startAdornment: (
                                                                <InputAdornment position="start"
                                                                >
                                                                    <Avatar sx={{
                                                                        width: 32,
                                                                        height: 31,
                                                                        bgcolor: '#074043',
                                                                        fontSize: '0.9rem',
                                                                    }}>LN</Avatar>
                                                                </InputAdornment>
                                                            ),
                                                            readOnly: true,
                                                            sx: {
                                                                color: "#46F0F9",
                                                                fontSize: '20px',
                                                            },
                                                        }}
                                                        variant="filled"
                                                    />
                                                </Stack>
                                            </Stack>
                                            <br/>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                    </Grid>
                                    {/*Second Section */}
                                    <Grid item xs={12}>
                                        <Paper elevation={5} sx={{
                                            alignCenter: 'center',
                                            textAlign: 'center',
                                            padding: '10px',
                                            border: '1px solid #4D4B4B',
                                            backgroundColor: '#274e61',
                                            color: '#46F0F9',
                                            borderRadius: '10px',
                                            width: '`100%',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 1.5)',
                                        }}>
                                            <Typography variant='h6' align="left">Other Info</Typography>
                                            <br/>
                                            {/*Column 1 : Personal Info Row*/}
                                            <Stack direction='row' spacing={10}>
                                                {/* Column 1 : Email: DOB: Phone: Country */}
                                                <Stack direction='column' spacing={2}>
                                                    {/*Email*/}
                                                    <Stack direction='row' spacing={2}>
                                                        <TextField
                                                            id="input-with-icon-textfield"
                                                            defaultValue={staffData.email}
                                                            label="Email"
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
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <MarkEmailReadIcon sx={{color: '#FFF'}}/>
                                                                    </InputAdornment>
                                                                ),
                                                                readOnly: true,
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    fontSize: '20px',
                                                                },
                                                            }}
                                                            variant="filled"
                                                        />
                                                    </Stack>
                                                    <br/>
                                                    {/*DOB*/}
                                                    <Stack direction='row' spacing={2}>
                                                        <TextField
                                                            id="input-with-icon-textfield"
                                                            defaultValue={staffData.dob}
                                                            label="DOB"
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
                                                                startAdornment: (
                                                                    <InputAdornment position="start"
                                                                    >
                                                                        <CalendarMonthIcon sx={{color: '#FFF'}}/>
                                                                    </InputAdornment>
                                                                ),
                                                                readOnly: true,
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    fontSize: '20px',
                                                                },
                                                            }}
                                                            variant="filled"
                                                        />
                                                    </Stack>
                                                    <br/>
                                                    {/*Phone*/}
                                                    <Stack direction='row' spacing={2}>
                                                        <TextField
                                                            id="input-with-icon-textfield"
                                                            defaultValue={staffData.phone}
                                                            label="Phone"
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
                                                                startAdornment: (
                                                                    <InputAdornment position="start"
                                                                    >
                                                                        <PhoneInTalkRoundedIcon sx={{color: '#FFF'}}/>
                                                                    </InputAdornment>
                                                                ),
                                                                readOnly: true,
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    fontSize: '20px',
                                                                },
                                                            }}
                                                            variant="filled"
                                                        />
                                                    </Stack>
                                                    <br/>
                                                </Stack>
                                                {/*Column 2 : Country: StateOfOrigin: LGA: Gender */}
                                                <Stack direction='column' spacing={2}>
                                                    {/*StateOfOrigin*/}
                                                    <Stack direction='row' spacing={2}>
                                                        <TextField
                                                            id="input-with-icon-textfield"
                                                            defaultValue={staffData.stateOfOrigin}
                                                            label="State of Origin"
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
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <DomainIcon sx={{color: '#FFF'}}/>
                                                                    </InputAdornment>
                                                                ),
                                                                readOnly: true,
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    fontSize: '20px',
                                                                },
                                                            }}
                                                            variant="filled"
                                                        />
                                                    </Stack>
                                                    <br/>
                                                    {/*LGA*/}
                                                    <Stack direction='row' spacing={2}>
                                                        <TextField
                                                            id="input-with-icon-textfield"
                                                            defaultValue={staffData.lga}
                                                            label="LGA"
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
                                                                startAdornment: (
                                                                    <InputAdornment position="start"
                                                                    >
                                                                        <MapIcon sx={{color: '#FFF'}}/>
                                                                    </InputAdornment>
                                                                ),
                                                                readOnly: true,
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    fontSize: '20px',
                                                                },
                                                            }}
                                                            variant="filled"
                                                        />
                                                    </Stack>
                                                    <br/>
                                                    <Stack direction='row' spacing={2}>
                                                        <TextField
                                                            id="input-with-icon-textfield"
                                                            defaultValue={staffData.gender}
                                                            label="Gender"
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
                                                                startAdornment: (
                                                                    <InputAdornment position="start"
                                                                    >
                                                                        {
                                                                            staffData.gender === 'Male' ?
                                                                                <ManIcon sx={{color: '#FFF'}}/> :
                                                                                <WomanIcon sx={{color: '#FFF'}}/>
                                                                        }
                                                                    </InputAdornment>
                                                                ),
                                                                readOnly: true,
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    fontSize: '20px',
                                                                },
                                                            }}
                                                            variant="filled"
                                                        />
                                                    </Stack>
                                                    <br/>
                                                </Stack>
                                                {/*Column 3 : Phone: Religion: maritalStatus */}
                                                <Stack direction='column' spacing={2}>
                                                    <Stack direction='row' spacing={2}>
                                                        <TextField
                                                            id="input-with-icon-textfield"
                                                            defaultValue={staffData.religion}
                                                            label="Religion"
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
                                                                startAdornment: (
                                                                    <InputAdornment position="start"
                                                                    >
                                                                        {
                                                                            staffData.religion === 'Islam' ?
                                                                                <MosqueIcon
                                                                                    sx={{color: '#FFF'}}/> : staffData.religion === 'Christian' ?
                                                                                    <ChurchIcon sx={{color: '#FFF'}}/> :
                                                                                    <ChaletIcon sx={{color: '#FFF'}}/>
                                                                        }
                                                                    </InputAdornment>
                                                                ),
                                                                readOnly: true,
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    fontSize: '20px',
                                                                },
                                                            }}
                                                            variant="filled"
                                                        />
                                                    </Stack>
                                                    <br/>
                                                    <Stack direction='row' spacing={2}>
                                                        <TextField
                                                            id="input-with-icon-textfield"
                                                            defaultValue={staffData.maritalStatus}
                                                            label="Marital Status"
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
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <GroupRoundedIcon sx={{color: '#FFF'}}/>
                                                                    </InputAdornment>
                                                                ),
                                                                readOnly: true,
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    fontSize: '20px',
                                                                },
                                                            }}
                                                            variant="filled"
                                                        />
                                                    </Stack>
                                                    <br/>
                                                    <Stack direction='row' spacing={2}>
                                                        <TextField
                                                            id="input-with-icon-textfield"
                                                            defaultValue={staffData.country}
                                                            label="country"
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
                                                                startAdornment: (
                                                                    <InputAdornment position="start"
                                                                    >
                                                                        <PublicIcon sx={{color: '#FFF'}}/>
                                                                    </InputAdornment>
                                                                ),
                                                                readOnly: true,
                                                                sx: {
                                                                    color: "#46F0F9",
                                                                    fontSize: '20px',
                                                                },
                                                            }}
                                                            variant="filled"
                                                        />
                                                    </Stack>
                                                    <br/>
                                                </Stack>
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                    </Grid>
                                    {/*Third Section*/}
                                    <Grid item xs={12}>
                                        <Paper elevation={5} sx={{
                                            alignCenter: 'center',
                                            textAlign: 'center',
                                            padding: '10px',
                                            border: '1px solid #4D4B4B',
                                            backgroundColor: '#274e61',
                                            color: '#46F0F9',
                                            borderRadius: '10px',
                                            width: '`100%',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 1.5)',
                                        }}>
                                            <Typography variant='h6' align="left">Next of Kin Info</Typography>
                                            <br/>
                                            {/*Column 1 : Personal Info Row*/}
                                            <Stack direction='row' spacing={10}>
                                                {/* Column 1 : Name: MiddleName: LastName */}
                                                <Stack direction='row' spacing={2}>
                                                    <TextField
                                                        id="input-with-icon-textfield"
                                                        defaultValue={staffData.nextOfKin}
                                                        label="Next of Kin"
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
                                                            startAdornment: (
                                                                <InputAdornment position="start"
                                                                >
                                                                    <AccountCircleIcon sx={{color: '#FFF'}}/>
                                                                </InputAdornment>
                                                            ),
                                                            readOnly: true,
                                                            sx: {
                                                                color: "#46F0F9",
                                                                fontSize: '20px',
                                                            },
                                                        }}
                                                        variant="filled"
                                                    />
                                                </Stack>
                                                <Stack direction='row' spacing={2}>
                                                    <TextField
                                                        id="input-with-icon-textfield"
                                                        defaultValue={staffData.nextOfKinPhone}
                                                        label="Phone"
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
                                                            startAdornment: (
                                                                <InputAdornment position="start"
                                                                >
                                                                    <PhoneInTalkRoundedIcon sx={{color: '#FFF'}}/>
                                                                </InputAdornment>
                                                            ),
                                                            readOnly: true,
                                                            sx: {
                                                                color: "#46F0F9",
                                                                fontSize: '20px',
                                                            },
                                                        }}
                                                        variant="filled"
                                                    />
                                                </Stack>
                                                <Stack direction='row' spacing={2}>
                                                    <TextField
                                                        id="input-with-icon-textfield"
                                                        
                                                        defaultValue={staffData.nextOfKinRelationship}
                                                        label="Relationship"
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
                                                            startAdornment: (
                                                                <InputAdornment position="start"
                                                                >
                                                                    <DeckIcon sx={{color: '#FFF'}}/>
                                                                </InputAdornment>
                                                            ),
                                                            readOnly: true,
                                                            sx: {
                                                                color: "#46F0F9",
                                                                fontSize: '20px',
                                                            },
                                                        }}
                                                        variant="filled"
                                                    />
                                                </Stack>
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper elevation={5} sx={{
                                            alignCenter: 'center',
                                            textAlign: 'center',
                                            padding: '10px',
                                            // border: '1px solid #4D4B4B',
                                            backgroundColor: '#274e61',
                                            color: '#46F0F9',
                                            borderRadius: '10px',
                                            width: '`100%',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 1.5)',
                                        }}>
                                            <Typography variant='h6' align="left">Address Info</Typography>
                                            <br/>
                                            {/*Column 1 : Personal Info Row*/}
                                            <Stack direction='row' spacing={10}>
                                                {/* Column 1 : Name: MiddleName: LastName */}
                                                <Stack direction='row' spacing={2}>
                                                    <TextField
                                                        id="input-with-icon-textfield"
                                                        defaultValue={staffData.address}
                                                        label="Address"
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
                                                            startAdornment: (
                                                                <InputAdornment position="start"
                                                                >
                                                                    <LocationOnIcon sx={{color: '#FFF'}}/>
                                                                </InputAdornment>
                                                            ),
                                                            readOnly: true,
                                                            sx: {
                                                                color: "#46F0F9",
                                                                fontSize: '20px',
                                                                width: '700px'
                                                            },
                                                        }}
                                                        variant="filled"
                                                    />
                                                </Stack>
                                                <Stack direction='row' spacing={2}>
                                                    <TextField
                                                        id="input-with-icon-textfield"
                                                        defaultValue={staffData.stateOfResidence}
                                                        label="Sate of Residence"
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
                                                            startAdornment: (
                                                                <InputAdornment position="start"
                                                                >
                                                                    <DomainIcon sx={{color: '#FFF'}}/>
                                                                </InputAdornment>
                                                            ),
                                                            readOnly: true,
                                                            sx: {
                                                                color: "#46F0F9",
                                                                fontSize: '20px',
                                                            },
                                                        }}
                                                        variant="filled"
                                                    />
                                                </Stack>
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                    </Grid>
                                    {/**/}
                                    <Grid item xs={12}>
                                        <Paper elevation={5} sx={{
                                            alignCenter: 'center',
                                            textAlign: 'center',
                                            padding: '10px',
                                            border: '1px solid #4D4B4B',
                                            backgroundColor: '#274e61',
                                            color: '#46F0F9',
                                            borderRadius: '10px',
                                            width: '`100%',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 1.5)',
                                        }}>
                                            <Typography variant='h6' align="left">Educational Info</Typography>
                                            <br/>
                                            {/*Column 1 : Personal Info Row*/}
                                            <Stack direction='row' spacing={4} useFlexGap flexWrap="wrap">
                                                {/* Column 1 : Name: MiddleName: LastName */}
                                                
                                                <Stack direction='row' spacing={4}>
                                                    <TextField
                                                        id="input-with-icon-textfield"
                                                        defaultValue={staffData.highestDegree || 'Not Specified'}
                                                        label="Highest Degree"
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
                                                            startAdornment: (
                                                                <InputAdornment position="start"
                                                                >
                                                                    <WorkspacePremiumIcon sx={{color: '#FFF'}}/>
                                                                </InputAdornment>
                                                            ),
                                                            readOnly: true,
                                                            sx: {
                                                                color: "#46F0F9",
                                                                fontSize: '20px',
                                                                width: '350px',
                                                            },
                                                        }}
                                                        variant="filled"
                                                    />
                                                </Stack>
                                                <br/>
                                                <Stack direction='row' spacing={4}>
                                                    <TextField
                                                        id="input-with-icon-textfield"
                                                        label="Graduation Date"
                                                        InputLabelProps={{
                                                            sx: {
                                                                color: "#46F0F9",
                                                                fontSize: '14px',
                                                                "&.Mui-focused": {
                                                                    color: "white"
                                                                },
                                                            }
                                                        }}
                                                        defaultValue={staffData.graduationDate ? dayjs(staffData.graduationDate).format(
                                                            'DD/MMM/YYYY'
                                                        ) : 'N/A'}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start"
                                                                >
                                                                    <CalendarMonthIcon sx={{color: '#FFF'}}/>
                                                                </InputAdornment>
                                                            ),
                                                            readOnly: true,
                                                            sx: {
                                                                color: "#46F0F9",
                                                                fontSize: '20px',
                                                                width: '350px',
                                                            },
                                                        }}
                                                        variant="filled"
                                                    />
                                                </Stack>
                                                <br/>
                                                <Stack direction='row' spacing={4}>
                                                    <TextField
                                                        id="input-with-icon-textfield"
                                                        defaultValue={staffData.courseOfStudy || 'Not Specified'}
                                                        label="Course of Study"
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
                                                            startAdornment: (
                                                                <InputAdornment position="start"
                                                                >
                                                                    <ClassIcon sx={{color: '#FFF'}}/>
                                                                </InputAdornment>
                                                            ),
                                                            readOnly: true,
                                                            sx: {
                                                                color: "#46F0F9",
                                                                fontSize: '20px',
                                                                width: '450px',
                                                            },
                                                        }}
                                                        variant="filled"
                                                    />
                                                </Stack>
                                                <br/>
                                                <Stack direction='row' spacing={6}>
                                                    <TextField
                                                        id="input-with-icon-textfield"
                                                        defaultValue={staffData.institution || 'Not Specified'}
                                                        label="Institution"
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
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <SchoolIcon sx={{color: '#FFF'}}/>
                                                                </InputAdornment>
                                                            ),
                                                            readOnly: true,
                                                            sx: {
                                                                color: "#46F0F9",
                                                                fontSize: '20px',
                                                                width: '600px',
                                                            },
                                                        }}
                                                        variant="filled"
                                                    />
                                                </Stack>
                                            
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper elevation={5} sx={{
                                            alignCenter: 'center',
                                            textAlign: 'center',
                                            padding: '10px',
                                            border: '1px solid #4D4B4B',
                                            backgroundColor: '#274e61',
                                            color: '#46F0F9',
                                            borderRadius: '10px',
                                            width: '`100%',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 1.5)',
                                        }}>
                                            <Typography variant='h6' align="left">Employment Info</Typography>
                                            <br/>
                                            {/*Column 1 : Personal Info Row*/}
                                            <Stack direction='row' spacing={5}>
                                                <Stack direction='row' spacing={10}>
                                                    {/* Column 1 : Name: MiddleName: LastName */}
                                                    <Stack direction='column' spacing={2}>
                                                        <Stack direction='row' spacing={2}>
                                                            <TextField
                                                                id="input-with-icon-textfield"
                                                                defaultValue={staffData.employmentType}
                                                                label="Employment Type"
                                                                InputLabelProps={{
                                                                    sx: {
                                                                        color: "#46F0F9",
                                                                        "&.Mui-focused": {
                                                                            color: "white"
                                                                        },
                                                                    }
                                                                }}
                                                                
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position="start"
                                                                        >
                                                                            {
                                                                                staffData.employmentType === "FullTime" ?
                                                                                    <WorkOutlinedIcon
                                                                                        sx={{color: '#FFF'}}/> :
                                                                                    staffData.employmentType === 'Contract' ?
                                                                                        <WorkHistoryIcon
                                                                                            sx={{color: '#FFF'}}/> :
                                                                                        <EngineeringIcon
                                                                                            sx={{color: '#FFF'}}/>
                                                                            }
                                                                        </InputAdornment>
                                                                    ),
                                                                    readOnly: true,
                                                                    sx: {
                                                                        color: "#46F0F9",
                                                                        fontSize: '20px',
                                                                    },
                                                                }}
                                                                variant="filled"
                                                            />
                                                        </Stack>
                                                        <br/>
                                                        <Stack direction='row' spacing={2}>
                                                            <TextField
                                                                id="input-with-icon-textfield"
                                                                defaultValue={staffData.role}
                                                                label="Role"
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
                                                                    startAdornment: (
                                                                        <InputAdornment position="start">
                                                                            <AppRegistrationIcon sx={{color: '#FFF'}}/>
                                                                        </InputAdornment>
                                                                    ),
                                                                    readOnly: true,
                                                                    sx: {
                                                                        color: "#46F0F9",
                                                                        fontSize: '20px',
                                                                    },
                                                                }}
                                                                variant="filled"
                                                            />
                                                        </Stack>
                                                        <br/>
                                                        <Stack direction='row' spacing={2}>
                                                            <TextField
                                                                id="input-with-icon-textfield"
                                                                defaultValue={staffData.employmentDate ? dayjs(staffData.employmentDate).format(
                                                                    'DD/MMM/YYYY'
                                                                ) : 'N/A'}
                                                                label="Employment Date"
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
                                                                    startAdornment: (
                                                                        <InputAdornment position="start"
                                                                        >
                                                                            <CalendarMonthIcon sx={{color: '#FFF'}}/>
                                                                        </InputAdornment>
                                                                    ),
                                                                    readOnly: true,
                                                                    sx: {
                                                                        color: "#46F0F9",
                                                                        fontSize: '20px',
                                                                    },
                                                                }}
                                                                variant="filled"
                                                            />
                                                        </Stack>
                                                    </Stack>
                                                    <SiteInfo staffData={staffData}/>
                                                </Stack>
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default ViewStaff;