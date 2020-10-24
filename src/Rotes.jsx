import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Chat from './components/Chat/Chat';
import Home from "./components/Home/Home"
import NameProvider from './contexts/NameContext';


const Routes = () => {
  return (
    <BrowserRouter>
    <Switch>
      <NameProvider>
        <Route path="/" exact component={Home} />
        <Route path="/chat" component={Chat} />
      </NameProvider>
    </Switch>
    </BrowserRouter>
  )
}

export default Routes;