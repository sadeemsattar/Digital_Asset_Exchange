/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
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
  CircularProgress,
} from "@material-ui/core";
import useEth from "../../contexts/useEth";
import { useWeb3React } from "@web3-react/core";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Web3 from "web3";

export const ShowOwnerNFT = () => {
  const {
    state: { contract },
  } = useEth();

  const { account } = useWeb3React();

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [newPrice, setPrice] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleResale = async (tokenid) => {
    console.log("contract  in resale", contract);
    setLoading(false);
    const result = await contract.methods
      .updateDigitalItemPrice(tokenid, Web3.utils.toWei(`${newPrice}`, "ether"))
      .send({
        from: account,
        value: Web3.utils.toWei(`${0.001}`, "ether"),
      });
    console.log(result);
    setLoading(true);
    getData();
    handleClose();
  };

  const getData = async () => {
    // pirticular seller
    const result = await contract.methods.getMarketPlaceDigitalItem().call({
      from: account,
    });
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

              <TableCell
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#C62662",
                }}
              >
                Re-Sale
              </TableCell>
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

                <TableCell align="right">{row[2]}</TableCell>
                <TableCell align="right">
                  {Web3.utils.fromWei(`${row[3]}`, "ether")} Eth
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpen}
                  >
                    Re-Sale
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Token ID : {row[0]}</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Enter Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button
                        onClick={() => {
                          handleResale(row[0]);
                        }}
                      >
                        {loading === false ? (
                          <CircularProgress color="secondary" />
                        ) : (
                          ""
                        )}
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableCell>

                <TableCell align="right">
                  <Button variant="contained" color="secondary">
                    <a
                      href={`https://testnets.opensea.io/assets/optimism-goerli/0xeec91F5F76773548B659Fb1f9506361418530AE4/${row[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Token
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
