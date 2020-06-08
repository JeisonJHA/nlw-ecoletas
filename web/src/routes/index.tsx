import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CreatePoint from '../pages/CreatePoint';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route component={Home} exact path="/" />
      <Route component={CreatePoint} exact path="/create-point" />
    </BrowserRouter>
  );
};

export default Routes;
