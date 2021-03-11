import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from '../services/api'
import moment from 'moment'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "green",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});


export default function CustomizedTables() {
  const classes = useStyles();
  const [tran, setTran] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await api("transacoes");
      setTran(result.data);
    };
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tipo</StyledTableCell>
            <StyledTableCell>Data</StyledTableCell>
            <StyledTableCell>Categoria</StyledTableCell>
            <StyledTableCell>Valor</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tran.map((item) => (
            <StyledTableRow>
              <StyledTableCell>{item.tipo}</StyledTableCell>
              <StyledTableCell>{moment(item.data).format("DD/MM/YYYY")}</StyledTableCell>
              <StyledTableCell>{item.categoria}</StyledTableCell>
              <StyledTableCell>{item.valor}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
