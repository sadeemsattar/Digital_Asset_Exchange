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
} from "@material-ui/core";
import useEth from "../../contexts/useEth";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
export const ShowNFT = () => {
  const {
    state: { contract },
  } = useEth();

  const { account } = useWeb3React();

  const [data, setData] = useState([]);

  const getData = async () => {
    // pirticular seller
    const result = await contract.methods.getDigitalItem().call({
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
                <TableCell align="right">{row[1]}</TableCell>
                <TableCell align="right">{row[2]}</TableCell>
                <TableCell align="right">
                  {" "}
                  {Web3.utils.fromWei(`${row[3]}`, "ether")} Eth
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
