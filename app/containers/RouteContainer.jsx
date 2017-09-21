import React from 'react';
import { BrowserRouter, Route, Switch, browserHistory } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import {Provider} from "react-redux";
import injectTapEventPlugin from 'react-tap-event-plugin';

import NavBarContainer from '../containers/NavBarContainer';
import Footer from '../components/Footer';
import TestContainer from '../containers/TestContainer';
import HomeContainer from '../containers/HomeContainer';
import BlogContainer from '../containers/BlogContainer';
import EventContainer from '../containers/EventContainer';
import BoardContainer from '../containers/board/BoardContainer';
import AboutContainer from '../containers/AboutContainer';
import InstaFeedContainer from '../containers/InstaFeedContainer';
import EditAbout from '../containers/EditAbout';
import EditEventContainer from '../containers/board/EditEventContainer';
import SingleEventContainer from '../containers/SingleEventContainer';
import EventListContainer from '../containers/board/EventListContainer';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: 'rgb(10, 79, 117)',
    alternateTextColor: 'rgb(246, 170, 111)',
  },
});

const RouteContainer = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className="routeContainer">
      <NavBarContainer />
      <BrowserRouter history={browserHistory}>
        <div className="baseContainer">
          <Switch>
            <Route exact path="/" component={HomeContainer} />

            <Route path="/blog" component={BlogContainer} />
            <Route path="/events" component={EventContainer} />
            <Route path="/about" component={AboutContainer} />
            <Route path="/event/:eventId" component={SingleEventContainer} />
            <Route path="/images" component={InstaFeedContainer} />

            <Route path="/editabout" component={EditAbout} />
            <Route path="/test" component={TestContainer} />
            <Route exact path="/board" component={BoardContainer} />
            <Route path="/board/events" component={EventListContainer} />
            <Route path="/board/editEvent/:eventId" component={EditEventContainer} />
          </Switch>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  </MuiThemeProvider>
);

injectTapEventPlugin();

export default RouteContainer;
