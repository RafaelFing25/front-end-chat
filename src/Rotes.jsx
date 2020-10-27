import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Chat from './components/Chat/Chat';
import Home from "./components/Home/Home"
import UserProvider from './contexts/UserContext';


const Routes = () => {
  return (
    <BrowserRouter>
    <Switch>
      <UserProvider>
        <Route path="/" exact component={Home} />
        <Route path="/chat" component={Chat} />
      </UserProvider>
    </Switch>
    </BrowserRouter>
  )
}

export default Routes;