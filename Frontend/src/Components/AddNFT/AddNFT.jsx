import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
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
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState();
  const [File, setFile] = useState("");
  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("file", File);
    // console.log(formData.get("file"));
    formData.append("id", "234");

    const urlHash = await axios.post(
      "http://localhost:4000/addFile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };
  return (
    <Container maxWidth="sm" className={classes.conatiner}>
      <form className={classes.form}>
        <Typography className={classes.heading}>Add Document</Typography>
        <TextField
          label="Title"
          color="secondary"
          className={classes.feild}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          color="secondary"
          className={classes.feild}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <TextField
          label="Description"
          color="secondary"
          multiline
          rows={5}
          className={classes.feild}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          type="file"
          color="secondary"
          className={classes.button}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <Button className={classes.button} onClick={uploadFile}>
          Submit
        </Button>
      </form>
    </Container>
  );
};
