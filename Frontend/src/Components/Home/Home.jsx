/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useWeb3React } from "@web3-react/core";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ButtonGroup } from "@material-ui/core";
import { useEffect } from "react";
import { Disconnect } from "./Disconnect";
import { injected } from "../../contexts/connect";
import useEth from "../../contexts/useEth";
import { actions } from "../../contexts/state";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  buttonGroup: {
    flexGrow: 1,
  },
  menuButton: { marginRight: theme.spacing(2), color: "black" },
  title: {
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

  const navigate = useNavigate();
  const { active, account, library, activate, deactivate } = useWeb3React();
  const { dispatch } = useEth();

  const disconnect = async () => {
    console.log(account);

    try {
      await deactivate();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (exception) {
      console.log(exception);
    }
  };
  useEffect(() => {
    activate(injected);
    const abi = require("../../contexts/DigitalAssetExchange.json");
    console.log("ABI", abi.abi, active);
    if (active) {
      const contract = new library.eth.Contract(
        abi.abi,
        // "0xCafA992Db763B627b549B4409c3Ce2D16c639aE7"
        // "0xaa305c77b901a25EfdCDb4fE2c37503dcd42fEC9"
        // "0xF39C41C4fF72EF70772A52C939788FA245349092"
        // "0xf46287916fF7f1b2c00B9c44aD9cCebbf42b512b"
        // "0xCDeEAbA8b7e0812ecD92EA2908624f1b7D6ac1b3"
        // "0x4CcF84d1054f9E0b77726398d31F99D0D4496542"
        // "0x4f67e7c9d42a38FACEAf5DE2DdB5596561bbBD20"
        "0xeec91F5F76773548B659Fb1f9506361418530AE4"
      );
      dispatch({ type: actions.init, data: { contract } });
      console.log(contract);
    }
  }, [account]);

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
            <Button href="/show_owner_asset">Show Own's NFT</Button>
            <Button href="/add_asset">Add NFT</Button>
            <Button href="/show_asset">Show Selling NFT</Button>
            <Button href="purchase_asset">Purchase NFT</Button>
          </ButtonGroup>
          <Disconnect account={account} disconnect={disconnect} />
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};
