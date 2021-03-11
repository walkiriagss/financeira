import React, { useState, useEffect } from "react";
import api from '../services/api'
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

const [tran, setTran] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api("somadespesas");
      setTran(result.data);
    };
    fetchData();
  }, []);

const data =  [ 
  { categoria: 'salario', total: tran.salario },
  { categoria: 'outros', total:tran.outros },
  { categoria: 'investimento', total: tran.investimento },
  { categoria: 'premio', total: tran.premio },
  { categoria: 'presente', total: tran.presente },

];
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <PieSeries
            valueField="total"
            argumentField="categoria"
          />
          <Title
            text="Despesas por categoria"
          />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
