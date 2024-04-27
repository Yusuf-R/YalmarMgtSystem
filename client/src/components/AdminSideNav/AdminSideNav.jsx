'use client';
import {useRouter} from 'next/navigation';
import {FcHome} from "react-icons/fc";
import {ImExit} from "react-icons/im";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {FcManager} from "react-icons/fc";
import Avatar from "@mui/material/Avatar";
import {FcExpired} from "react-icons/fc";
import {FcComboChart} from "react-icons/fc";
import UserUtils from "@/utils/UserUtilities";
import {toast} from "react-toastify";
import {FcAutomatic} from "react-icons/fc";
import {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";


function AdminSideNav() {
    const [confirmExit, setConfirmExit] = useState(false);
    const router = useRouter();
    const handleLogout = () => {
        // UserUtils.userLogout();
        Cookies.remove('accessToken');
        Cookies.remove('userData');
        Cookies.remove('rememberMe');
        setConfirmExit(false);
        toast.success('Logged out successfully', {
            autoClose: 2000,
        });
        setTimeout(() => {
            router.push('/login');
        }, 2500);
    }
    
    const handleDialog = () => {
        setConfirmExit(true);
    }
    return (
        <>
            <List sx={{
                bgcolor: '#274e61',
                fontSize: '40px',
                borderRadius: '10px',
                width: '220px',
                position: 'fixed',
                top: '100px',
                height: 'calc(100vh - 48px)', /* Adjust the height as needed */
                overflowY: 'auto',
                zIndex: '20',
            }}
            >
                <ListItem>
                    <ListItemButton sx={{
                        "&:hover": {
                            bgcolor: '#2c74f2',
                        }
                    }} onClick={() => router.push('/dashboard/admin')}>
                        <ListItemIcon>
                            <FcHome/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItemButton>
                </ListItem>
                
                <ListItem>
                    <ListItemButton sx={{
                        "&:hover": {bgcolor: '#2c74f2'}
                    }}
                                    onClick={() => router.push('/dashboard/admin/staff')}
                    >
                        <ListItemIcon>
                            <FcManager/>
                        </ListItemIcon>
                        <ListItemText primary="Staff"/>
                    </ListItemButton>
                </ListItem>
                
                <ListItem>
                    <ListItemButton sx={{
                        "&:hover": {
                            bgcolor: '#2c74f2',
                        }
                    }}>
                        <ListItemIcon>
                            <Avatar
                                src="/Tower-1.svg"
                                alt="Tower"
                                // sx = {{width: 40, height: 60}}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Sites"/>
                    </ListItemButton>
                </ListItem>
                
                <ListItem>
                    <ListItemButton sx={{
                        "&:hover": {
                            bgcolor: '#2c74f2',
                        }
                    }}>
                        <ListItemIcon>
                            <Avatar
                                src="/Generator-1.svg"
                                alt="Generator"
                                color="red"
                            />
                        </ListItemIcon>
                        <ListItemText primary="Generators"/>
                    </ListItemButton>
                </ListItem>
                
                <ListItem>
                    <ListItemButton sx={{
                        "&:hover": {
                            bgcolor: '#2c74f2',
                        }
                    }}>
                        <ListItemIcon>
                            <Avatar
                                src="/Diesel.svg"
                                alt="Fuel"
                                color="red"
                                // sx = {{ width: 40, height: 45}}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Fuelling"/>
                    </ListItemButton>
                </ListItem>
                
                <ListItem>
                    <ListItemButton sx={{
                        "&:hover": {
                            bgcolor: '#2c74f2',
                        }
                    }}>
                        <ListItemIcon>
                            <FcComboChart/>
                        </ListItemIcon>
                        <ListItemText primary="Planning"/>
                    </ListItemButton>
                </ListItem>
                
                <ListItem>
                    <ListItemButton sx={{
                        "&:hover": {
                            bgcolor: '#2c74f2',
                        }
                    }}>
                        <ListItemIcon>
                            <FcExpired/>
                        </ListItemIcon>
                        <ListItemText primary="Reports"/>
                    </ListItemButton>
                </ListItem>
                
                <ListItem>
                    <ListItemButton sx={{
                        "&:hover": {
                            bgcolor: '#2c74f2',
                        }
                    }}>
                        <ListItemIcon>
                            <FcAutomatic/>
                        </ListItemIcon>
                        <ListItemText primary="Settings"/>
                    </ListItemButton>
                </ListItem>
                
                <ListItem>
                    <ListItemButton sx={{
                        "&:hover": {
                            bgcolor: '#2c74f2',
                        }
                    }}
                                    onClick={handleDialog}
                    >
                        <ListItemIcon>
                            <ImExit style={{
                                color: '#db818c',
                            }}/>
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Dialog open={confirmExit}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmExit(false)}>No</Button>
                    <Button onClick={handleLogout}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AdminSideNav;