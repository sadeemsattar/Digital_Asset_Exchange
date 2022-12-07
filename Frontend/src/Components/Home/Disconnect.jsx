import { Button, Snackbar } from "@material-ui/core";
import React from "react";
import Alert from "@mui/material/Alert";
export const Disconnect = ({ account, disconnect }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" disabled>
        {account}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          disconnect();
          handleClick();
        }}
      >
        Disconnect Wallet
      </Button>
      <Snackbar
        style={{ marginTop: "50px", backgroundColor: "green" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert variant="filled" severity="success">
          Disconnecting...
        </Alert>
      </Snackbar>
    </div>
  );
};
