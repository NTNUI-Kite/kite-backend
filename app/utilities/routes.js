"use strict";
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import TestContainer from '../containers/TestContainer';

const Routes = ({store}) => (
  <HashRouter>
    <Route path = "/" component={TestContainer}/>
  </HashRouter>
);

export default Routes;
