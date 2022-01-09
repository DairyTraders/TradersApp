import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginPanel from './LoginPanel' ;
import ProvideAuth from './ContextAPI/Authentication';
import ProvideURL from './ContextAPI/ServerURL';
import NewAdminPanel from './Components/NewAdminPanel.js';

function RouteConfig() {  
    return (
      <ProvideAuth>
        <ProvideURL>
          <Router>
            <div>
              <Switch>
              <Route exact path="/">
                  <LoginPanel />
                </Route>
                <Route path="/login">
                  <LoginPanel />
                </Route>
                <Route path="/admin">
                  <NewAdminPanel />
                </Route>
                <Route path="/sales">
                  <NewAdminPanel />
                </Route>
                <Route path="/purchases">
                  <NewAdminPanel />
                </Route>
                <Route path="/pos">
                  <NewAdminPanel />
                </Route>
                <Route path="/stock">
                  <NewAdminPanel />
                </Route>
                <Route path="/invite">
                  <NewAdminPanel />
                </Route>
              </Switch>
              <footer> DairyTraders version 1.0</footer>
            </div>
          </Router>
        </ProvideURL>
      </ProvideAuth>
    );
  }
  

export default RouteConfig;
