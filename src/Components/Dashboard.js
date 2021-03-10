import React, { useState } from 'react';
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

    const [options, setOptions] = useState({
        title: 'Receitas por Categoria',
        is3D: true,
    });
    const [optionsBar, setOptionsBar] = useState({
        title: 'Despesas por Categoria',
        is3D: true,
    });
    const [optionsBalanco, setOptionsBalanco] = useState({
        title: 'Balanço Geral',
        bar: { groupWidth: '95%' },
        legend: { position: 'none' },
    });
    const [data, setData] = useState([
        ['Salário', 'Quantidade'],
        ['Salário', 100],
    
    ]);
    const [dataBar, setDataBar] = useState([
        ['Salário', 'Quantidade'],
        ['Saúde', 300],
        ['Educação', 800],
        ['Transporte', 150],
    ])
    const [dataBalaco, setDataBalanco] = useState([
            ['Receita','Despesa',
            { role: 'style' },
            {
                sourceColumn: 0,
                role: 'annotation',
                type: 'string',
                calc: 'stringify',
            },
            ],
            ['Despesa', 1500, 'red', null],
            ['Receita', 3500, 'color: blue', null],
    ])
    return (
        <div className={classes.root}>
            <Grid container spacing={3} style={{display: 'flex', justifyContent:"center", alignItems: 'center'}}>
                <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                <Paper className={classes.paper} elevation={3}>
                    <Chart
                    width={'100%'}
                    height={'500px'}
                    chartType="PieChart"
                    data={data}
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
                    data={dataBar}
                    options={optionsBar}
                    />
                </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                <Paper className={classes.paper} elevation={3}>
                    <Chart
                    width={'100%'}
                    height={'500px'}
                    chartType="BarChart"
                    data={dataBalaco}
                    options={optionsBalanco}
                    />
                </Paper>
                </Grid> 
            </Grid>
        </div>
        
    );
}

export default Dashboard;