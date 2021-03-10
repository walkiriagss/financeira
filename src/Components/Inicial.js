import Table from '../Components/Table';
import Paper from '../Components/Paper';
import Cadastro from '../Components/Cadastro'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
function App() {
  return (
    <div className="App">
        <Grid item xs={12} sm={12} md={12} lg={7} xl={6}>
            <Typography paragraph style={{ justifyContent:"flex-start"}}>
                <Cadastro />
            </Typography>
                <Table/>
        </Grid>  
        <Grid item xs={12} sm={12} md={12} lg={5} xl={6}>
            <Paper/>
        </Grid>
    </div>
  );
}

export default App;
