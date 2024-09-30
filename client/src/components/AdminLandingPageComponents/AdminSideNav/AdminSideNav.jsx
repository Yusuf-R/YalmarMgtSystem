'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {FcHome, FcManager, FcExpired, FcAutomatic, FcCustomerSupport, FcPositiveDynamic} from "react-icons/fc";
import {ImExit} from "react-icons/im";
import {
    Avatar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    IconButton
} from '@mui/material';
import {Menu as MenuIcon} from '@mui/icons-material';
import {useLogout} from "@/customHooks/useLogout";

function AdminSideNav() {
    const [isIconOnly, setIsIconOnly] = useState(false); // Track sidebar state: icon-only or icon + text
    const [confirmExit, setConfirmExit] = useState(false);
    const router = useRouter();
    const [selectedNav, setSelectedNav] = useState(router.pathname);

    const handleLogout = useLogout();

    const toggleSidebar = () => setIsIconOnly(!isIconOnly); // Toggle sidebar state

    const navItems = [
        {icon: <FcHome/>, text: 'Dashboard', path: '/dashboard/admin'},
        {icon: <FcManager/>, text: 'Staff', path: '/dashboard/admin/staff'},
        {icon: <FcPositiveDynamic/>, text: 'Sites', path: '/dashboard/admin/site'},
        {icon: <FcExpired/>, text: 'Reports', path: '/dashboard/admin/reports'},
        {icon: <FcCustomerSupport/>, text: 'HelpDesk', path: '/dashboard/admin/helpdesk'},
        {icon: <FcAutomatic/>, text: 'Settings', path: '/dashboard/admin/settings'},
        {icon: <ImExit style={{color: '#db818c'}}/>, text: 'Logout', path: '/dashboard/admin/logout', isLogout: true}
    ];

    return (
        <>
            {/* Button to toggle sidebar state */}
            <IconButton
                onClick={toggleSidebar}
                sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    zIndex: 3,  // Ensure the button is above the sidebar and content
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                }}
            >
                <MenuIcon/>
            </IconButton>

            {/* Sidebar */}
            <List sx={{
                bgcolor: '#274e61',
                width: isIconOnly ? '70px' : '200px', // Sidebar width dynamically changes
                transition: 'width 0.3s ease', // Smooth transition
                position: 'fixed',
                top: '100px',
                height: 'calc(100vh - 48px)', // Fill the height dynamically
                overflowY: 'auto',
                zIndex: 2, // Sidebar below the button
                borderRadius: '10px',
            }}>
                {navItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            sx={{
                                bgcolor: selectedNav === item.path ? '#2c74f2' : null,
                                "&:hover": {bgcolor: '#2c74f2'},
                                justifyContent: isIconOnly ? 'center' : 'flex-start',
                                transition: 'all 0.3s ease', // Smooth transition
                            }}
                            onClick={() => {
                                if (item.isLogout) {
                                    setConfirmExit(true); // Open confirmation dialog for logout
                                } else {
                                    router.push(item.path); // Navigate to selected route
                                    setSelectedNav(item.path); // Mark the selected nav
                                }
                            }}
                        >
                            <ListItemIcon sx={{fontSize: 28}}>
                                {item.icon}
                            </ListItemIcon>
                            {/* Conditionally render the text if sidebar is not in icon-only mode */}
                            {!isIconOnly && <ListItemText primary={item.text}/>}
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
                    <Button onClick={() => setConfirmExit(false)}>No</Button>
                    <Button onClick={handleLogout}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AdminSideNav;
