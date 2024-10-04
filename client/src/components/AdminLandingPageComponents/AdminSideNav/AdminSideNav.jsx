'use client';
import {useState} from 'react';
import {useRouter, usePathname} from 'next/navigation';
import {FcHome, FcManager, FcExpired, FcAutomatic, FcCustomerSupport, FcPositiveDynamic} from "react-icons/fc";
import {BiLogOut} from "react-icons/bi";
import {ImExit} from "react-icons/im";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useEffect} from "react";
import {useLogout} from "@/customHooks/useLogout";
import Box from "@mui/material/Box";

function AdminSideNav({isCollapsed, setIsCollapsed}) {
    const theme = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const handleLogout = useLogout();

    // Capture breakpoints for dynamic behavior
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');

    const [confirmExit, setConfirmExit] = useState(false);
    const [selectedNav, setSelectedNav] = useState(pathname);

    const navItems = [
        {icon: <FcHome/>, text: 'Dashboard', path: '/dashboard/admin'},
        {icon: <FcManager/>, text: 'Staff', path: '/dashboard/admin/staff'},
        {icon: <FcPositiveDynamic/>, text: 'Sites', path: '/dashboard/admin/site'},
        {icon: <FcExpired/>, text: 'Reports', path: '/dashboard/admin/reports'},
        {icon: <FcCustomerSupport/>, text: 'HelpDesk', path: '/dashboard/admin/helpdesk'},
        {icon: <FcAutomatic/>, text: 'Settings', path: '/dashboard/admin/settings'},
        {icon: <BiLogOut style={{color: 'salmon'}}/>, text: 'Logout', path: '/dashboard/admin/logout', isLogout: true}
    ];

    // Adjusting the behavior dynamically
    const sideNavWidth = isCollapsed ? '40px' : '160px';
    const mL = isCollapsed ? 3.5 : 1;


    useEffect(() => {
        // Auto-collapse SideNav on smaller screens
        if (small || xSmall) {
            setIsCollapsed(true);
        }
    }, [small, xSmall, setIsCollapsed]);

    return (
        <>
            {/* Sidebar */}
            <List sx={{
                backdropFilter: 'blur(10px)',
                bgcolor: 'inherit',
                width: sideNavWidth,
                transition: 'width 0.3s ease',
                position: 'fixed',
                top: '75px',
                height: 'calc(100vh - 48px)',
                overflowY: 'auto',
                zIndex: 2,
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
            }}>
                {navItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            sx={{
                                bgcolor: !isCollapsed && selectedNav === item.path ? 'rgba(16,201,186,0.41)' : null,
                                borderRadius: 3,
                                // "&:hover": {
                                //     bgcolor: !isCollapsed && 'rgba(178,40,224,0.54)',
                                //
                                // },
                                "&:hover": {
                                    bgcolor: isCollapsed ? 'rgba(178,40,224,0.2)' : 'rgba(178,40,224,0.54)',  // Updated hover behavior
                                },
                                justifyContent: isCollapsed ? 'center' : 'flex-start',
                                transition: 'all 0.3s ease',
                                padding: isCollapsed ? '8px 0' : '8px 0',
                                ml: mL,
                            }}
                            onClick={() => {
                                if (item.isLogout) {
                                    setConfirmExit(true);
                                } else {
                                    router.push(item.path);
                                    setSelectedNav(item.path);
                                }
                            }}
                        >
                            <ListItemIcon sx={{
                                fontSize: 25,
                                justifyContent: 'left',
                                transition: 'all 0.3s ease',
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            {/* Small dot below the icon when tab is selected */}
                            {selectedNav === item.path && isCollapsed && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        width: '8px',
                                        height: '8px',
                                        bgcolor: '#f0ad4e', // Color of the indicator dot
                                        borderRadius: '50%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                    }}
                                />
                            )}
                            {!isCollapsed && (
                                <ListItemText
                                    primary={item.text}
                                    sx={{color: '#FFF'}}
                                />
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            {/* Confirmation Dialog for Logout */}
            <Dialog open={confirmExit}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to logout?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmExit(false)} variant="contained" color="success">No</Button>
                    <Button onClick={handleLogout} variant="contained" color="error">Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AdminSideNav;
