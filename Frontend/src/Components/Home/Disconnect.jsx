import { Button } from "@material-ui/core";
import React from "react";

export const Disconnect = ({ account, disconnect }) => {
  return (
    <div>
      <Button variant="contained" disabled>
        {account}
      </Button>
      <Button variant="contained" color="secondary" onClick={disconnect}>
        Disconnect Wallet
      </Button>
    </div>
  );
};
