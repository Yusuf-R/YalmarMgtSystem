'use client';
import styleTopNav from './DashboardTopNav.module.css';
import Image from "next/image";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useState, useEffect} from 'react';
import {useRouter} from "next/navigation";
import {useLogout} from "@/customHooks/useLogout";



function DashboardTopNav({staffData}) {
    const router = useRouter();
    
    const [imgSrc, setImgSrc] = useState('');
    // const staffData = JSON.parse(Cookies.get('staffData') ? Cookies.get('staffData') : '{}');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // Fallback image if Cloudinary image fails to load
    let fallbackImg;
    if (staffData.gender === 'Male') {
        fallbackImg = '/Avatar-9.svg';
    } else {
        fallbackImg = '/Avatar-10.svg';
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = useLogout()
    useEffect(() => {
        if (staffData.imgURL !== '') {
            setImgSrc(staffData.imgURL);
        } else {
            setImgSrc(fallbackImg);
        }
    }, [staffData.imgURL]);
    return (
        <>
            <Box className={styleTopNav.parent} sx={{
                width: '100vw',
            }}>
                <Box className={styleTopNav.LHS}>
                    <div>
                        <Image
                            src={"/YMS.png"}
                            alt="YALMAR Logo"
                            width={75}
                            height={75}
                            quality={100}
                        
                        />
                    </div>
                    <div>
                        <h3>YALMAR <br/>Management System</h3>
                    </div>
                </Box>
                <Stack direction="row" spacing={8}>
                    <Typography variant="h6" sx={{
                        fontWeight: 'bold',
                        paddingTop: '25px',
                    }}>
                        Welcome {staffData.email || 'Anonymous'}
                    </Typography>
                    <Tooltip title="Account-settings">
                        <Button
                            endIcon={<KeyboardArrowDownIcon sx={{color: 'salmon'}}/>}
                            onClick={handleClick}
                            size="small"
                            sx={{ml: 2}}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Image
                                src={imgSrc}
                                alt="Avatar"
                                width={75}
                                height={75}
                                quality={80}
                                style={{borderRadius: '50%'}}
                                priority
                            />
                        </Button>
                    </Tooltip>
                    <IconButton>
                        <>
                            {/*    Will do something here later ON, perhaps the light/Dark mode toggle */}
                        </>
                    </IconButton>
                </Stack>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar sx={{
                        color: 'black',
                    }}/> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Avatar sx={{
                        color: 'black',
                    }}/> My account
                </MenuItem>
                <Divider/>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" sx={{
                            color: 'black',
                        }}/>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{
                    color: 'red',
                }}>
                    <ListItemIcon>
                        <Logout fontSize="small" sx={{
                            color: 'red',
                        }}/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default DashboardTopNav;