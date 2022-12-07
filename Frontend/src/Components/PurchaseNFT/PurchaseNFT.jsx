/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { ethers } from "ethers";
import {
  Table,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
} from "@material-ui/core";
import useEth from "../../contexts/useEth";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import axios from "axios";
import { Alert } from "@mui/material";

export const PurchaseNFT = () => {
  const {
    state: { contract },
  } = useEth();

  const { active, account } = useWeb3React();

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Adding NFT wait ...");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const verifyDocument = async (seller, fileCID, signature) => {
    const fileData = await axios.post("http://localhost:4000/getFile", {
      Hash: fileCID,
    });

    const verifyAddress = ethers.utils.verifyMessage(
      `data:image/png;base64,${fileData.data}`,
      signature
    );

    if (seller === verifyAddress) {
      let check = true;
      let newSignature = `data:image/png;base64,${fileData.data}`;
      return { check, newSignature };
    } else {
      let check = false;
      let newSignature = `data:image/png;base64,${fileData.data}`;
      return { check, newSignature };
    }
  };

  const minting = async (tokenId, seller, price, fileCID, signature) => {
    if (active) {
      handleClick();
      if (seller !== account) {
        // console.log("Mining Price", Web3.utils.toWei(`${price}`, "ether"));
        setMessage("Verifying...");
        let { check, newSignature } = await verifyDocument(
          seller,
          fileCID,
          signature
        );
        // console.log(check, newSignature);
        if (check && newSignature) {
          if (!window.ethereum) {
            throw new Error("No Wallet");
          }
          await window.ethereum.send("eth_requestAccounts");
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const newsignature = await signer.signMessage(newSignature);
          await contract.methods.sellDigitalItem(tokenId, newsignature).send({
            from: account,
            gas: "3000000",
            value: Web3.utils.toWei(`${price}`, "ether"),
          });
          handleClick();
          setMessage("Mint Success");
          getData();
        } else {
          setMessage("Invalid Document");
        }
      } else {
        setMessage("You Are Seller Of This NFT Therefore You Cannnot Buy This");
      }
    } else {
      console.log("Connect Account!");
    }
  };

  const getData = async () => {
    const result = await contract.methods.getUnsoldDigitalItem().call({
      from: account,
    });
    // result[0].shift();
    console.log(result);
    setData(result);
  };

  return (
    <Container maxWidth="lg">
      <TableContainer
        component={Paper}
        style={{
          marginTop: "100px",
        }}
      >
        <Button variant="contained" color="secondary" onClick={getData}>
          View
        </Button>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          style={{ backgroundColor: "#cfe8fc" }}
        >
          <TableHead>
            <TableRow
              style={{
                backgroundColor: "#F3BFC6",
              }}
            >
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#C62662",
                  padding: "15px",
                }}
              >
                Token ID
              </TableCell>

              <TableCell
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#C62662",
                }}
              >
                Seller
              </TableCell>
              <TableCell
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#C62662",
                }}
              >
                Owner
              </TableCell>
              <TableCell
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#C62662",
                }}
              >
                Price
              </TableCell>
              {/* <TableCell
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#C62662",
                }}
              >
                Url
              </TableCell> */}
              <TableCell
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#C62662",
                }}
              >
                Show
              </TableCell>
              <TableCell
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#C62662",
                }}
              >
                Mint
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row[0]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row[0]}
                </TableCell>
                <TableCell align="right">{row[1]}</TableCell>
                <TableCell align="right">{row[2]}</TableCell>
                <TableCell align="right">
                  {Web3.utils.fromWei(`${row[3]}`, "ether")} Eth
                </TableCell>
                {/* <TableCell              Cell align="right">
                  <a
                    href={`https://testnets.opensea.io/assets/optimism-goerli/0xaa305c77b901a25efdcdb4fe2c37503dcd42fec9/${row[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Page
                  </a>
                </TableCell> */}

                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    // onClick={() => {
                    //   gettokenUri(row[0]);
                    // }}
                  >
                    <a
                      href={`https://testnets.opensea.io/assets/optimism-goerli/0x4CcF84d1054f9E0b77726398d31F99D0D4496542/${row[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Token
                    </a>
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      minting(
                        row[0],
                        row[1],
                        Web3.utils.fromWei(`${row[3]}`, "ether"),
                        row[5],
                        row[6]
                      );
                    }}
                  >
                    Mint Token
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
