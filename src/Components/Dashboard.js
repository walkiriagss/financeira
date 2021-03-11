import React, { useState, useEffect } from "react";
import api from '../services/api'
import { Chart } from "react-google-charts";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent:"center",
      flexWrap: 'wrap',
      '& > *': {
       
      },
    },
    paper: {
        width: '100%',
      },
  }));

function Dashboard() {
    const classes = useStyles();
    const [tran, setTran] = useState([]);
    const [des, setDesp] = useState([]);
    const [balanco, setBalanco] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const result = await api("soma");
        setTran(result.data);

        const res = await api("somadespesas");
        setDesp(res.data);
        
        const re = await api("balanco");
        setBalanco(re.data);
      };
      fetchData();
    }, []);

    const [options, setOptions] = useState({
        title: 'Receitas por Categoria',
        is3D: true,
    });
    const [optionsBar, setOptionsBar] = useState({
        title: 'Despesas por Categoria',
        is3D: true,
    });
    const [optionsBarBalanco, setOptionsBarBalanco] = useState({
        title: 'Despesas x Receita',
        is3D: true,
    });

    return (
        <div className={classes.root}>
            <Grid container spacing={3} style={{display: 'flex', justifyContent:"center", alignItems: 'center'}}>
                <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                    <Paper className={classes.paper} elevation={3}>
                        <Chart
                        width={'100%'}
                        height={'500px'}
                        chartType="PieChart"
                        data={([
                            ['Salário', 'Quantidade'],
                            ['Receita', balanco.somatorioReceita],
                            ['Despesa', balanco.somatorioDespesas],
                            
                            
                        ])}
                        options={optionsBarBalanco}
                        />
                    </Paper>
                </Grid> 
                <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                    <Paper className={classes.paper} elevation={3}>
                        <Chart
                        width={'100%'}
                        height={'500px'}
                        chartType="PieChart"
                        data={([
                            ['Salário', 'Quantidade'],
                            ['Salário', tran.salario],
                            ['Outros', tran.outros],
                            ['Prêmio', tran.premio],
                            ['Investimento', tran.investimento],
                            ['Presente', tran.presente]
                        ])}
                        options={options}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                    <Paper className={classes.paper} elevation={3}>
                        <Chart
                        width={'100%'}
                        height={'500px'}
                        chartType="PieChart"
                        data={([
                            ['Salário', 'Quantidade'],
                            ['Alimentação', des.alimentacao],
                            ['Outros', des.educacao],
                            ['Saúde', des.saude],
                            ['Lazer', des.lazer],
                            ['Moradia', des.moradia],
                            ['Transporte', des.transporte],
                            ['Outros', des.outros]
                        ])}
                        options={optionsBar}
                        />
                    </Paper>
                </Grid>
                
            </Grid>
        </div>
        
    );
}

export default Dashboard;