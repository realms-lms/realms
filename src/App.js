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
import SignInPage from './components/pages/signin';


const App = () => {
  return (
    <Router>
    <div className="App">
      <Header />
      
      <Switch>
        <Route exact path={ROUTES.ROOT} component={HomePage} />
        <Route path={ROUTES.SIGNIN} component={SignInPage} />
      </Switch>
    </div>
    </Router>
  );
};

export default session(App);
