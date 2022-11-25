import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  conatiner: {
    backgroundColor: "#cfe8fc",
    marginTop: "5%",
    border: "2px solid #F3BFC6",
    borderRadius: "10px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "50px",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    color: "#C62662",
    backgroundColor: "#F3BFC6",
    padding: "10px",
    border: "2px solid #F3BFC6",
    borderRadius: "10px",
    marginBottom: "25px",
  },
  button: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#C62662",
    backgroundColor: "#F3BFC6",
    marginTop: "20px",
    marginBottom: "10px",
  },
  feild: {
    marginTop: "10px",
  },
}));

export const AddNFT = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.conatiner}>
      <form className={classes.form}>
        <Typography className={classes.heading}>Add Document</Typography>
        <TextField label="Title" color="secondary" className={classes.feild} />
        <TextField
          label="Price"
          type="number"
          color="secondary"
          className={classes.feild}
        />
        <TextField
          label="Description"
          color="secondary"
          multiline
          rows={5}
          className={classes.feild}
        />
        <TextField type="file" color="secondary" className={classes.button} />

        <Button className={classes.button}>Submit</Button>
      </form>
    </Container>
  );
};
