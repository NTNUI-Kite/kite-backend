"use strict";
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {Provider} from "react-redux";
import injectTapEventPlugin from 'react-tap-event-plugin';


import NavBarContainer from '../containers/NavBarContainer';
import Footer from '../components/Footer';
import TestContainer from '../containers/TestContainer';
import BlogContainer from '../containers/BlogContainer';
import EventContainer from '../containers/EventContainer';
import BoardContainer from '../containers/BoardContainer';
import AboutContainer from '../containers/AboutContainer';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: 'rgb(10, 79, 117)',
        alternateTextColor: 'rgb(246, 170, 111)',
    }
});

const RouteContainer = ({store}) => (
    <MuiThemeProvider muiTheme = {muiTheme}>
      <div>
        <NavBarContainer/>
        <HashRouter>
          <Switch>
            <Route exact path = "/" component={TestContainer}/>
            <Route path = "/board" component = {BoardContainer}/>
            <Route path = "/blog" component = {BlogContainer}/>
            <Route path = "/events" component = {EventContainer}/>
            <Route path = "/about" component = {AboutContainer}/>
          </Switch>
        </HashRouter>
        <Footer/>
      </div>
    </MuiThemeProvider>
);

injectTapEventPlugin();

export default RouteContainer;
