'use client';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import {mainSection} from "@/utils/data";
import Box from "@mui/material/Box";

function ConfirmationDialog({open, onClose, onConfirm}) {
    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Confirm Submission</DialogTitle>
                <DialogContent>
                    Please ensure all data entered is correct before submitting. This action cannot be edited or
                    undone.
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onClose} color="error">
                        No
                    </Button>
                    <Button variant="contained" onClick={onConfirm} color="success">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const MainComponent = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    
    const handleOpenDialog = () => {
        setDialogOpen(true);
    };
    
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };
    
    const handleConfirm = () => {
        setDialogOpen(false);
        // Perform your submit action here
        console.log('Confirmed and submitting...');
    };
    
    return (
        <Box sx={mainSection}>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                Submit
            </Button>
            
            <ConfirmationDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirm}
            />
        </Box>
    );
};

export default MainComponent;
// export default ConfirmationDialog