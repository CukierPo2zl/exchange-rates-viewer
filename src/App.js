import React from 'react';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { green, indigo } from '@material-ui/core/colors';
import Dashboard from './pages/dashboard/Dashboard';
import Navbar from './components/Navbar';
import Navigator from './components/Navigator';
import { Switch, Route } from 'react-router-dom'
import { Container } from '@material-ui/core';
import Details from './pages/details/Details';


const Router = ({route}) => (
  <Switch>
    <Route exact path='/' component={Dashboard} />
    <Route path="/index.html" component={Dashboard} />
    <Route path='/details' component={Details} />
  </Switch>
)

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[600]
    },
    secondary: {
      main: green[700]
    }
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
},
  appBarSpacer: theme.mixins.toolbar,

}));



function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Navbar></Navbar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Navigator></Navigator>
          <Container maxWidth="lg" className={classes.container}>
            <Router />
            </Container>
        </main>
      </div>
    </ThemeProvider>
      )
    }
    
    export default App;
