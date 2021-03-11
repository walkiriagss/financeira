import React, { useState, useEffect } from "react";
import api from '../services/api'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tipo, setTipo] = React.useState('');
  const [data, setData] = React.useState(new Date('10/03/2021'));
  const [categoria, setCategoria] = React.useState('');
  const [valor, setValor] = React.useState('');

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

    const transacoes = {
      tipo,
      data,
      categoria,
      valor,
    };
    api.post(`transacoes`, transacoes)
    
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert("SUCESSO!!! \n Cadastro realizado com sucesso!!!");
      }, (error) => {alert("Erro!!! \n O cadastro não foi realizado!!!");
      });
  }

 

  return (
    <div>
        <Button variant="outlined" style={{color:'green'}} onClick={handleClickOpen}>
          <AddCircleIcon ></AddCircleIcon>
          NOVA TRANSAÇÃO
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" onSubmit={handleSubmit}>
          <form  onSubmit={handleSubmit} noValidate>
            <DialogTitle id="form-dialog-title" style={{color:'green'}}>Nova Transação</DialogTitle>
            <DialogContent>
            <Typography gutterBottom style={{color:'green'}}>
              Preencha as informações abaixo para adicionar uma nova transação
            </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      style={{width:'100%'}}
                      margin="normal"
                      id="data"
                      label="Data"
                      value={data}
                      onChange={handleChange}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <Grid container justify="space-around">
                    <FormControl className={classes.formControl} style={{width:'100%'}}>
                        <InputLabel id="demo-controlled-open-select-label"><ImportExportIcon/>Tipo</InputLabel>
                        <Select
                        labelId="tipo"
                        id="tipo"
                        value={tipo}
                        onChange={handleChange1}
                        >
                          <MenuItem value="Receita">Receita</MenuItem>
                          <MenuItem value="Despesa">Despesa</MenuItem>
                        </Select>
                    </FormControl>
                  </Grid>
                </MuiPickersUtilsProvider>
                
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <FormControl className={classes.formControl} style={{width:'100%'}}>
                        <InputLabel htmlFor="input-with-icon-adornment"><TurnedInIcon/>Categoria</InputLabel>
                        <Select
                        labelId="demo-controlled-open-select-label"
                        id="categoria"
                        value={categoria}
                        onChange={handleChange2}
                        >
                        <MenuItem value={10}>Salário</MenuItem>
                        <MenuItem value={20}>Achado</MenuItem>
                        <MenuItem value={20}>Doado</MenuItem>
                        <MenuItem value={20}>Presente</MenuItem>
                        <MenuItem value={20}>Outros</MenuItem>
                        </Select>
                    </FormControl>
                  </Grid>
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <FormControl className={classes.margin} style={{width:'100%'}}>
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
