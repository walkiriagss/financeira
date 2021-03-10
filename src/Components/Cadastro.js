import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [openSelect, setOpenSelect] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const [cat, setCat] = React.useState('');
  const [openSelectCat, setOpenSelectCat] = React.useState(false);

  const handleChangeCat = (event) => {
    setCat(event.target.value);
  };

  const handleCloseSelectCat = () => {
    setOpenSelectCat(false);
  };

  const handleOpenSelectCat = () => {
    setOpenSelectCat(true);
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <div>
        <Button variant="outlined" style={{color:'green'}} onClick={handleClickOpen}>
          <AddCircleIcon ></AddCircleIcon>
          NOVA TRANSAÇÃO
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                      id="date-picker-dialog"
                      label="Data"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <Grid container justify="space-around">
                    <FormControl className={classes.formControl} style={{width:'100%'}}>
                        <InputLabel id="demo-controlled-open-select-label"><ImportExportIcon/>Tipo</InputLabel>
                        <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openSelect}
                        onClose={handleCloseSelect}
                        onOpen={handleOpenSelect}
                        value={age}
                        onChange={handleChange}
                        >
                        <MenuItem value={10}>Receita</MenuItem>
                        <MenuItem value={20}>Despesa</MenuItem>
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
                        id="demo-controlled-open-select"
                        open={openSelectCat}
                        onClose={handleCloseSelectCat}
                        onOpen={handleOpenSelectCat}
                        value={cat}
                        onChange={handleChangeCat}
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
                          id="input-with-icon-adornment"
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
                <Button variant="outlined" onClick={handleClose} style={{color:'blue'}}>
                    Adicionar
                </Button>
            </DialogActions>
      </Dialog>
    </div>
  );
}
