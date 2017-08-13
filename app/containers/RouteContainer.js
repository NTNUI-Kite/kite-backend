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
import HomeContainer from '../containers/HomeContainer';
import BlogContainer from '../containers/BlogContainer';
import EventContainer from '../containers/EventContainer';
import BoardContainer from '../containers/BoardContainer';
import InstaFeedContainer from '../containers/InstaFeedContainer';
import EditEventContainer from '../containers/EditEventContainer';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: 'rgb(10, 79, 117)',
        alternateTextColor: 'rgb(246, 170, 111)',
    }
});

const RouteContainer = ({store}) => (
    <MuiThemeProvider muiTheme = {muiTheme}>
      <div className = "routeContainer">
        <NavBarContainer/>
        <HashRouter>
          <div className = "baseContainer">
            <Switch>
              <Route exact path = "/" component={HomeContainer}/>
              <Route path = "/board" component = {BoardContainer}/>
              <Route path = "/blog" component = {BlogContainer}/>
              <Route path = "/events" component = {EventContainer}/>
              <Route path = "/images" component = {InstaFeedContainer}/>
              <Route path = "/editEvent" component = {EditEventContainer}/>
              <Route path = "/test" component = {TestContainer}/>
            </Switch>
          </div>
        </HashRouter>
        <Footer/>
      </div>
    </MuiThemeProvider>
);

injectTapEventPlugin();

export default RouteContainer;
