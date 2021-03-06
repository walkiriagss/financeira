import React from "react";
import api from '../services/api'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';

import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tipo, setTipo] = React.useState('');
  const [data, setData] = React.useState(Date.now);
  const [categoria, setCategoria] = React.useState('');
  const [valor, setValor] = React.useState('');
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openSnackErro, setOpenSnackErro] = React.useState(false);
  const [openSnackSucess, setOpenSnackSucess] = React.useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };
  const handleCloseSnackErro = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackErro(false);
  };
  const handleCloseSnackSucess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackSucess(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    switch (event.target.id) {
    case  'data':
      setData(event.target.value);
    break;
    case 'categoria':
      setCategoria( event.target.value);
    break;
    case 'valor':
      setValor( event.target.value);
    break;
    default:
    break;
    }
  }

  const handleChange1 = (event) => {
    setTipo(event.target.value);
  };

  const handleChange2 = (event) => {
    setCategoria(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if(valor === "" || tipo === "" || categoria === "" || data === ""){
      return setOpenSnack(true)
    }

    const transacoes = {
      tipo,
      data,
      categoria,
      valor,
    };
    api.post(`transacoes`, transacoes)
    
      .then(res => {
        setOpenSnackSucess(true);
        setOpen(false);
        window.location.reload();
      }, (error) => {setOpenSnackErro(true);
      });
  }

  return (
    <div>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="error">Preencha todos os campos para concluir o cadastro.</Alert>
      </Snackbar>
      <Snackbar open={openSnackErro} autoHideDuration={6000} onClose={handleCloseSnackErro}>
        <Alert onClose={handleCloseSnackErro} severity="error">ERRO!! O cadastro n??o foi conclu??do. Tente novamente.</Alert>
      </Snackbar>
      <Snackbar open={openSnackSucess} autoHideDuration={6000} onClose={handleCloseSnackSucess}>
        <Alert onClose={handleCloseSnackSucess} severity="success">Cadastro conclu??do com sucesso.</Alert>
      </Snackbar>
      
        <Button variant="outlined" style={{color:'green'}} onClick={handleClickOpen}>
          <AddCircleIcon ></AddCircleIcon>
          NOVA TRANSA????O
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <form  onSubmit={handleSubmit} noValidate>
            <DialogTitle id="form-dialog-title" style={{color:'green'}}>Nova Transa????o</DialogTitle>
            <DialogContent>
            <Typography gutterBottom style={{color:'green'}}>
              Preencha as informa????es abaixo para adicionar uma nova transa????o
            </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                  <TextField
                  style={{width:'100%', margin: "20px"}}
                  id="data"
                  label="Birthday"
                  type="date"
                  defaultValue={data}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChange}
                  />
                  </Grid>
                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <Grid container justify="space-around">
                    <FormControl className={classes.formControl} style={{width:'100%', margin: "20px"}}>
                        <InputLabel id="demo-controlled-open-select-label"><ImportExportIcon/>Tipo</InputLabel>
                        <Select
                        labelId="tipo"
                        id="tipo"
                        value={tipo}
                        onChange={handleChange1}
                        >
                          <MenuItem value=""></MenuItem>
                          <MenuItem value="Receita">Receita</MenuItem>
                          <MenuItem value="Despesa">Despesa</MenuItem>
                        </Select>
                    </FormControl>
                  </Grid>
                </MuiPickersUtilsProvider>

                <Box component="span" display={tipo==="Receita"? "block" : "none"} >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <FormControl className={classes.formControl} style={{width:'100%', margin: "20px"}}>
                          <InputLabel htmlFor="input-with-icon-adornment"><TurnedInIcon/>Categoria</InputLabel>
                          <Select
                          labelId="demo-controlled-open-select-label"
                          id="categoria"
                          value={categoria}
                          onChange={handleChange2}
                          >
                          <MenuItem value={"Salario"}>Sal??rio</MenuItem>
                          <MenuItem value={"investimento"}>Investimento</MenuItem>
                          <MenuItem value={"premio"}>Premio</MenuItem>
                          <MenuItem value={"presente"}>Presente</MenuItem>
                          <MenuItem value={"outros"}>Outros</MenuItem>
                          </Select>
                      </FormControl>
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Box>

                <Box component="span" display={tipo==="Despesa"? "block" : "none"} >
                  <MuiPickersUtilsProvider utils={DateFnsUtils} className={tipo==="Despesa" ? 'exibir' : 'nao'}>
                    <Grid container justify="space-around">
                      <FormControl className={classes.formControl} style={{width:'100%', margin: "20px"}}>
                          <InputLabel htmlFor="input-with-icon-adornment"><TurnedInIcon/>Categoria</InputLabel>
                          <Select
                          labelId="demo-controlled-open-select-label"
                          id="categoria"
                          value={categoria}
                          onChange={handleChange2}
                          >
                          <MenuItem value={"Alimentacao"}>Alimentacao</MenuItem>
                          <MenuItem value={"Educacao"}>Educacao</MenuItem>
                          <MenuItem value={"Saude"}>Saude</MenuItem>
                          <MenuItem value={"Lazer"}>Lazer</MenuItem>
                          <MenuItem value={"Moradia"}>Moradia</MenuItem>
                          <MenuItem value={"Transporte"}>Transporte</MenuItem>
                          <MenuItem value={"Outros"}>Outros</MenuItem>
                          </Select>
                      </FormControl>
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Box>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <FormControl className={classes.margin} style={{width:'100%', margin: "20px"}}>
                      <InputLabel htmlFor="input-with-icon-adornment">Valor</InputLabel>
                        <Input
                          onChange={handleChange}
                          id="valor"
                          startAdornment={
                            <InputAdornment position="start">
                              <AttachMoneyIcon />
                            </InputAdornment>
                          }
                        />
                    </FormControl>
                  </Grid>
                </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions >
                <Button variant="outlined" onClick={handleClose} style={{color:'red'}}>
                    Cancelar
                </Button>
                <Button variant="outlined" type="submit" style={{color:'blue'}}>
                    Adicionar
                </Button>
            </DialogActions>
          </form>
      </Dialog>
    </div>
  );
}
