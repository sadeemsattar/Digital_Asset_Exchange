import React from "react";
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

export const ShowNFT = () => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <Container maxWidth="lg">
      <TableContainer
        component={Paper}
        style={{
          marginTop: "100px",
        }}
      >
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
                Title
              </TableCell>
              <TableCell
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#C62662",
                }}
              >
                Description
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
                Url
              </TableCell>
              <TableCell
                align="right"
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#C62662",
                }}
              >
                Status
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
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="secondary">
                    View
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
