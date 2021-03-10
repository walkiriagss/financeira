import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { PermDeviceInformationTwoTone } from '@material-ui/icons';

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

function createData(tipo, data, categoria, valor) {
  return {tipo, data, categoria, valor };
}

const rows = [
  createData('Receita', '30/05/2020', 'Salário', 2500),
  createData('Despesa', '30/05/2020', 'Saúde', 300),
  createData('Receita', '30/05/2020', 'Salário', 1.000),
  createData('Despesa', '30/05/2020', 'Educação', 800),
  createData('Despesa', '30/05/2020', 'Transporte', 150),
  createData('Despesa', '30/05/2020', 'Transporte', 150),

];

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});


export default function CustomizedTables() {
  const classes = useStyles();

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
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell>{row.tipo}</StyledTableCell>
              <StyledTableCell>{row.data}</StyledTableCell>
              <StyledTableCell>{row.categoria}</StyledTableCell>
              <StyledTableCell>{row.valor}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
