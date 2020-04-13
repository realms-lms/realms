import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/App.scss';
import * as ROUTES from './constants/routes';

// Services
import { session } from './components/services/Session';

// Components
import Header from './components/header';

// Pages
import HomePage from './components/pages/home';
import SignIn from './components/pages/signin';
import SignUp from './components/pages/signup';
import ForgotPassword from './components/pages/forgotpassword';
import CreateOrganization from './components/pages/createorg';


const App = () => {
  return (
    <Router>
    <div className="App">
      <Header />
      
      <Switch>
        <Route exact path={ROUTES.ROOT} component={HomePage} />
        <Route path={ROUTES.SIGNIN} component={SignIn} />
        <Route path={ROUTES.SIGNUP} component={SignUp} />
        <Route path={ROUTES.FORGOTPASSWORD} component={ForgotPassword} />
        <Route path={ROUTES.CREATEORG} component={CreateOrganization} />
      </Switch>
    </div>
    </Router>
  );
};

export default session(App);
