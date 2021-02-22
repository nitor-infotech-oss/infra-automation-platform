import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomeContainer } from './containers/HomeContainer';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import ProtectedView from './components/ProtectedView';
import TicketsView from './components/TicketsView';
import MyTicketsView from './components/MyTicketsView';
import AllTicketsView from './components/AllTicketsView';
import Analytics from './components/Analytics';
import NotFound from './components/NotFound';
import HealtCheckView from './components/HealtCheckView';


export const AuthRoutes = () => (
  <Switch>
    <Route exact path="/" component={MyTicketsView} />
    <Route path="/main" component={ProtectedView} />
    <Route path="/tickets" component={TicketsView} />
    <Route path="/mytickets" component={MyTicketsView} />
    <Route path="/alltickets" component={AllTicketsView} />
    <Route path="/raise_ticket" component={Analytics} />
    <Route path="/healthcheck" component={HealtCheckView} />
    <Route component={NotFound} />
  </Switch>
);

export const NonAuthRoutes = () => (
  <Switch>
    <Route exact path="/" component={LoginView} />
    <Route path="/login" component={LoginView} />
    <Route path="/register" component={RegisterView} />
    <Route path="/home" component={LoginView} />
    <Route component={NotFound} />
  </Switch>
);
