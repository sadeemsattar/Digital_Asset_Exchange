/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import logo from "./metamask-icon.png";
import { makeStyles } from "@material-ui/core/styles";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../contexts/connect";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useEth from "../../contexts/useEth";
const useStyles = makeStyles((theme) => ({
  rootbox: {
    backgroundColor: "#cfe8fc",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },

  box: {
    display: "flex",
    flexDirection: "column",
    border: "2px solid #C62662",
    borderRadius: "20px",
    padding: "30px",
  },
  button: {
    marginTop: "20px",
  },
  image: {
    padding: "20px",
  },
}));
export const Login = () => {
  const navigate = useNavigate();
  const { active, account, library, activate, deactivate } = useWeb3React();

  const classes = useStyles();
  useEffect(() => {
    deactivate();
  }, []);
  const connectWallet = async () => {
    try {
      await activate(injected);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const disconnect = async () => {
    console.log(account);
    try {
      await deactivate();
    } catch (exception) {
      console.log(exception);
    }
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" className={classes.rootbox}>
          <h1>Digital Asset Exchange</h1>
          <div className={classes.box}>
            <img
              src={logo}
              alt="not found"
              height="150"
              className={classes.image}
            />
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={disconnect}
            >
              DisConnect Wallet
            </Button>
          </div>
          {active ? <div>{account}</div> : ""}
        </Typography>
      </Container>
    </>
  );
};
