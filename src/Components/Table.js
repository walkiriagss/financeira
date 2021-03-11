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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "green",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function CustomizedTables() {
  const [openSnack, setOpenSnack] = React.useState(false);
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };
  const classes = useStyles();
  const [tran, setTran] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api("transacoes");
      setTran(result.data);
    };
    fetchData();
  }, []);

  const clear = (id) => {
    api.delete("transacoes/" + id);
    setOpenSnack(true)
    window.location.reload();
  };
  return (
    <TableContainer component={Paper}>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success">Transação excluída com sucesso!</Alert>
      </Snackbar>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tipo</StyledTableCell>
            <StyledTableCell>Data</StyledTableCell>
            <StyledTableCell>Categoria</StyledTableCell>
            <StyledTableCell>Valor</StyledTableCell>
            <StyledTableCell><DeleteForeverIcon/></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tran.map((item) => (
            <StyledTableRow style={{backgroundColor:item.tipo === "Receita" ?'#E0FFFF' : '#FFEFD5' }}>
              <StyledTableCell>{item.tipo}</StyledTableCell>
              <StyledTableCell>{moment(item.data).format("DD/MM/YYYY")}</StyledTableCell>
              <StyledTableCell>{item.categoria}</StyledTableCell>
              <StyledTableCell>{item.valor}</StyledTableCell>
              <StyledTableCell><DeleteForeverIcon style={{cursor:'pointer', color:'red' }} onClick={() => clear(item.id)} /></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    
  );
}
