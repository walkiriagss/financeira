import React, { useState, useEffect } from "react";
import api from '../services/api'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    height: 140,
    width: '100%',
  },

}));

export default function SimplePaper() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [receita, setReceita] = useState([]);
  const [balanco, setBalanco] = useState([]); 
  useEffect(() => {
    const fetchData = async () => {
      const result = await api("somadespesas");
      setData(result.data);

      const res = await api("soma");
      setReceita(res.data)

      const resBal = await api("balanco");
      setBalanco(resBal.data)
    };
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4} lg={12} xl={12}>
          <Paper className={classes.paper} elevation={3} style={{display: 'flex', justifyContent:"space-around", alignItems: 'center'}}>
            <ArrowUpwardIcon style={{ backgroundColor:"green", color:'white', borderRadius:"100%", fontSize:'60px'}}/>
            <div style={{display: 'block', justifyContent:"flex-end", color:'green'}}>
              <h3 style={{color:'grey'}}>RECEITA TOTAL</h3>
              <h1>R${receita.somatorio}  </h1>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={12} xl={12}>
        <Paper className={classes.paper} elevation={3} style={{display: 'flex', justifyContent:"space-around", alignItems: 'center'}}>
            <ArrowDownwardIcon style={{ backgroundColor:"red", color:'white', borderRadius:"100%", fontSize:'60px'}}/>
            <div style={{display: 'block', justifyContent:"flex-end", color:'red'}}>
              <h3 style={{color:'grey'}}>DESPESA TOTAL</h3>
              <h1>R$ {data.somatorioDespesas}</h1>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={12} xl={12}>
          <Paper className={classes.paper} elevation={3} style={{display: 'flex', justifyContent:"space-around", alignItems: 'center'}}>
            <AccountBalanceWalletIcon style={{ backgroundColor:"blue", color:'white', borderRadius:"100%", fontSize:'60px'}}/>
            <div style={{display: 'block', justifyContent:"flex-end", color:'blue'}}>
              <h3 style={{color:'grey'}}>BALANÇO GERAL</h3>
              <h1> R$ {balanco.balanco}</h1>
            </div>
          </Paper>
        </Grid> 
      </Grid>
    </div>

  );
}
