import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ data }: any) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={80}></StyledTableCell>
            <StyledTableCell align="left">NAME</StyledTableCell>
            <StyledTableCell align="left">ITEMS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    bgcolor: row?.color ?? "primary.main",
                    height: 60,
                    width: 60,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    align="center"
                    sx={{ color: "white", fontSize: 24, fontWeight: 600 }}
                  >
                    Jo
                  </Typography>
                </Box>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.items.length} products
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function CustomTable({items,children}:any) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
          <TableRow>
            {items && items.map((item:any,index:number)=>(<StyledTableCell align="left">{item}</StyledTableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
