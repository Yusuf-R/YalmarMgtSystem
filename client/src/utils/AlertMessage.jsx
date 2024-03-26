"use client";
import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar'

const AlertMessage = ({ button, message }) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true)
  };
  const handleClose =(event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    setOpen(false);
  }
  return (
    <React.Fragment>
      {React.cloneElement(button, { onClick: handleClick })}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          variant="outlined"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default AlertMessage;
