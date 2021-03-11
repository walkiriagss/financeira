import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//icons material ui
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
//import component
import Paper from './Paper'
import Cadastro from './Cadastro'
import Dashboard from './Dashboard'
import Tabela from './Table'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [clicked, setClicked] = React.useState(true); 

  const [clickedDash, setClickedDash] = React.useState(false); 

  const handleClick = () => {
      setClicked(true);
      setClickedDash(false);
      console.log("entra clicked:", clicked, clickedDash)
  }

  const handleClickDash = () => {
    setClickedDash(true);
    setClicked(false);
    console.log("entra clicked:", clicked, clickedDash)
  }

  const itemList = [
    {
      text:'Transações',
      icon:<MonetizationOnIcon/>,
      onClick: () => handleClickDash()
    },
    {
      text:'Dashboard',
      icon:<EqualizerIcon />,
      onClick: () => handleClick()
    }
  ]
console.log("clicked:", clicked, clickedDash)
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Sistema Financeiro
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {itemList.map((item, index) => {
            const { text, icon, onClick } = item;
            return(
              <AnchorLink key={text} onCLick={onClick} href={text=='Transações' ? '#tabela' : '#graf'} style={{textDecoration:'none', color:'gray'}}> 
                <ListItem button >
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
                </ListItem>
              </AnchorLink>
            );

          })}
        </List>   
      </Drawer>
      <main className={classes.content} id="tabela">
        <div className={classes.toolbar} style={{justifyContent:"flex-start"}}/>
        <h1 style={{ color:'gray'}}>Transações</h1>
          <Grid container spacing={3} style={{ color:'gray', marginTop:'30px'}}>
            <Grid item xs={12} sm={12} md={12} lg={7} xl={6} >
              <Typography paragraph style={{ justifyContent:"flex-start"}}>
                  <Cadastro />
              </Typography>
                  <Tabela/>
            </Grid>  
            <Grid item xs={12} sm={12} md={12} lg={5} xl={6}>
                <Paper/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} id="graf">
              <h1 style={{ color:'gray', marginTop:'50px'}}>Dashboard</h1>
              <Dashboard/>
            </Grid>
          </Grid>
      </main>
    </div>
  );
}
