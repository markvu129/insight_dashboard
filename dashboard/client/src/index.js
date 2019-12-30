import React from 'react';
import {render} from 'react-dom';
import {Route, Router, Switch} from 'react-router-dom';
import App from './components/App/App';
import Main from './components/MainDashboard/Home/Main.js';
import FbInsight from './components/MainDashboard/Facebook/FbInsight.js';
import './styles/main.css';
import history from "./modules/history.js";
import IgInsight from "./components/MainDashboard/Instagram/IgInsight";

render((
  <Router history={history}>
    <App>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/home" component={Main}/>
        <Route exact path="/fb-insight" component={FbInsight}/>
        <Route exact path="/ig-insight" component={IgInsight}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
