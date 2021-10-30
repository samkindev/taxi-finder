import React, { useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { CircularProgress, ThemeProvider } from '@mui/material';
import { AdminNav, MainNav } from './app/navigations';
import theme from './styles/theme';
import { LoginPage } from './pages';
import SignupNav from './app/navigations/signupNav';
import ClientNavigation from './app/navigations/ClientNavigation';
import ChauffeurNavigation from './app/navigations/ChauffeurNavigation';
import { getUserData } from './app/firebase/api/user';
import { actions } from './app/reducers/user';
import { Box } from '@mui/system';
import globalStyles from './styles/globalStyles';
import { ForbidenRoute } from './components';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  React.useEffect(() => {
    getUserData((l, err, user) => {
      setLoading(l);

      if (err) {
        console.log(err);
        return;
      }

      if (user) {
        const { createdAt, ...rest } = user;

        dispatch(actions.connectUser({
          loading: l,
          user: rest
        }));
      }
    });
  }, [dispatch]);
  const globalClasses = globalStyles();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {loading ?
          <Box width="100%" height="100vh" className={globalClasses.centerFlex}>
            <CircularProgress color="secondary" size={70} />
          </Box> :
          <Switch>
            <Route path="/conducteur/:userId" component={ChauffeurNavigation} />
            <Route path="/client/:clientName" component={ClientNavigation} />
            <Route path="/signup" component={SignupNav} />
            <ForbidenRoute path="/login" component={LoginPage} />
            <Route path="/admin" component={AdminNav} />
            <Route path="/" component={MainNav} />
          </Switch>
        }
      </Router>
    </ThemeProvider>
  );
}

export default App;
