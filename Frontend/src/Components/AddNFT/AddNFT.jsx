import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import Web3 from "web3";
import { ethers } from "ethers";
import useEth from "../../contexts/useEth";
import { Alert } from "@mui/material";
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
  const { account } = useWeb3React();

  const {
    state: { contract },
  } = useEth();
  const classes = useStyles();
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState();
  const [File, setFile] = useState("");
  const [signature, setSignature] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Adding NFT wait ...");
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const uploadFile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", File);
    handleClick();
    const urlHash = await axios.post(
      "http://localhost:4000/addFile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log(urlHash.data);
    const metaDataHash = await axios.post("http://localhost:4000/addMetaData", {
      urlHash: urlHash.data,
      Title: Title,
      Description: Description,
      Price: Price,
    });
    // console.log(metaDataHash.data);
    // console.log(contract);
    // console.log(signature);

    const id = await contract.methods
      .MintDigitalItem(
        Web3.utils.toWei(`${Price}`, "ether"),
        `https://infura-ipfs.io/ipfs/${metaDataHash.data}`,
        urlHash.data,
        signature
      )
      .send({
        from: account,
        gas: "3000000",
        value: Web3.utils.toWei(`${0.001}`, "ether"),
      });
    if (id) {
      setMessage("Added Successfull");

      setTimeout(() => {
        handleClose();
      }, 2000);
    }

    console.log(id);
  };

  const getSignature = async (e) => {
    e.preventDefault();
    var buffer = new FileReader();

    buffer.readAsDataURL(File, { encoding: "utf8", flag: "r" });
    buffer.onload = async (e) => {
      // fileContent = e.target.result;

      // console.log("File To String", e.target.result);
      if (!window.ethereum) {
        throw new Error("No Wallet");
      }
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(e.target.result);

      // const getAddress = await signer.getAddress();
      // console.log("signature", signature, getAddress, account);
      setSignature(signature);
    };
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
        <Button className={classes.button} onClick={getSignature}>
          Sign
        </Button>
        {signature ? (
          <Button className={classes.button} onClick={uploadFile}>
            Submit
          </Button>
        ) : (
          ""
        )}
      </form>
      <Snackbar
        style={{ marginTop: "50px", backgroundColor: "green" }}
        open={open}
        // autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert variant="filled" severity="success">
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
