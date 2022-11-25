import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Button from "@material-ui/core/Button";

import { Outlet } from "react-router-dom";
import { ButtonGroup } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  buttonGroup: {
    flexGrow: 1,
  },
  menuButton: { marginRight: theme.spacing(2), color: "black" },
  title: {
    // flexGrow: 1,
    marginRight: "50px",
    fontWeight: "bold",
    fontSize: 16,
    color: "#C62662",
    backgroundColor: "#F3BFC6",
  },
  appbar: {
    backgroundColor: "#cfe8fc",
  },
}));
export const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Button className={classes.title} href="/">
            Digital Asset Exchange
          </Button>
          <ButtonGroup
            variant="text"
            color="secondry"
            className={classes.buttonGroup}
          >
            <Button href="/profile">Profile</Button>
            <Button href="/add_asset">Add NFT</Button>
            <Button href="/show_asset">Show NFT</Button>
            <Button href="purchase_asset">Purchase NFT</Button>
          </ButtonGroup>
          <Button variant="contained" disabled>
            show Wallet Address
          </Button>
          <Button variant="contained" color="secondary">
            Disconnect Wallet
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};
