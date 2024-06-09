'use client';
import {useRouter, usePathname, useParams} from 'next/navigation';
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
import {FcAutomatic} from "react-icons/fc";
import {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useLogout} from "@/customHooks/useLogout";
import {FcCustomerSupport} from "react-icons/fc";


function AdminSideNav() {
    const [confirmExit, setConfirmExit] = useState(false);
    
    const handleLogout = useLogout();
    const router = useRouter();
    const handleDialog = () => {
        setConfirmExit(true);
    }
    const pathname = usePathname();
    const [selectedNav, setSelectedNav] = useState(pathname);
    return (
        <>
            <List sx={{
                bgcolor: '#274e61',
                fontSize: '40px',
                borderRadius: '10px',
                width: '170px',
                position: 'fixed',
                top: '100px',
                height: 'calc(100vh - 48px)', /* Adjust the height as needed */
                overflowY: 'auto',
                zIndex: '20',
            }}
            >
                <ListItem>
                    <ListItemButton
                        sx={{
                            bgcolor: selectedNav === '/dashboard/admin' ? '#2c74f2' : null,
                            "&:hover": {bgcolor: '#2c74f2'},
                        }}
                        onClick={() => {
                            router.push('/dashboard/admin');
                            setSelectedNav('/dashboard/admin');
                        }}
                    >
                        <ListItemIcon sx={{fontSize: 28, m: -2}}>
                            <FcHome/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItemButton>
                </ListItem>
                
                <ListItem>
                    <ListItemButton sx={{
                        bgcolor: selectedNav === '/dashboard/admin/staff' ? '#2c74f2' : null,
                        "&:hover": {bgcolor: '#2c74f2'},
                    }}
                                    onClick={() => {
                                        router.push('/dashboard/admin/staff');
                                        setSelectedNav('/dashboard/admin/staff');
                                    }}
                    >
                        <ListItemIcon sx={{fontSize: 28, m: -2}}>
                            <FcManager/>
                        </ListItemIcon>
                        <ListItemText primary="Staff"/>
                    </ListItemButton>
                </ListItem>
                
                <ListItem>
                    <ListItemButton sx={{
                        bgcolor: selectedNav === '/dashboard/admin/site' ? '#2c74f2' : null,
                        "&:hover": {bgcolor: '#2c74f2'}
                    }}
                                    onClick={() => {
                                        router.push('/dashboard/admin/site');
                                        setSelectedNav('/dashboard/admin/site');
                                    }}>
                        <ListItemIcon sx={{fontSize: 28, m: -2}}>
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
                        bgcolor: selectedNav === '/dashboard/admin/reports' ? '#2c74f2' : null,
                        "&:hover": {
                            bgcolor: '#2c74f2',
                        },
                        "&.Mui-selected": {bgcolor: '#2c74f2'},
                        
                    }}
                                    onClick={() => {
                                        router.push('/dashboard/admin/reports');
                                        setSelectedNav('/dashboard/admin/reports');
                                    }}
                    >
                        <ListItemIcon sx={{fontSize: 28, m: -2}}>
                            <FcExpired/>
                        </ListItemIcon>
                        <ListItemText primary="Operatioinal Reports"/>
                    </ListItemButton>
                </ListItem>
                {/*Request HelpDesk*/}
                <ListItem>
                    <ListItemButton sx={{
                        bgcolor: selectedNav === '/dashboard/admin/helpdesk' ? '#2c74f2' : null,
                        "&:hover": {
                            bgcolor: '#2c74f2',
                        }
                    }}
                                    onClick={() => {
                                        router.push('/dashboard/admin/helpdesk');
                                        setSelectedNav('/dashboard/admin/helpdesk');
                                    }}
                    >
                        <ListItemIcon sx={{fontSize: 28, m: -2}}>
                            <FcCustomerSupport/>
                        </ListItemIcon>
                        <ListItemText primary="HelpDesk"/>
                    </ListItemButton>
                </ListItem>
                
                
                <ListItem>
                    <ListItemButton sx={{
                        bgcolor: selectedNav === '/dashboard/admin/settings' ? '#2c74f2' : null,
                        "&:hover": {
                            bgcolor: '#2c74f2',
                        },
                    }}
                                    onClick={() => {
                                        router.push('/dashboard/admin/settings');
                                        setSelectedNav('/dashboard/admin/settings');
                                    }}
                    >
                        <ListItemIcon sx={{fontSize: 28, m: -2}}>
                            <FcAutomatic/>
                        </ListItemIcon>
                        <ListItemText primary="Settings"/>
                    </ListItemButton>
                </ListItem>
                
                <ListItem>
                    <ListItemButton sx={{
                        bgcolor: selectedNav === '/dashboard/admin/logout' ? '#2c74f2' : null,
                        "&:hover": {
                            bgcolor: '#2c74f2',
                        }
                    }}
                                    onClick={handleDialog}
                    >
                        <ListItemIcon sx={{fontSize: 28, m: -2}}>
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