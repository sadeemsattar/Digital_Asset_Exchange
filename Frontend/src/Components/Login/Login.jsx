import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import logo from "./metamask-icon.png";
import { makeStyles } from "@material-ui/core/styles";
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
  const classes = useStyles();
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
            >
              Connect Wallet
            </Button>
          </div>
        </Typography>
      </Container>
    </>
  );
};
