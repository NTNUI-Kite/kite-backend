import React from 'react';
import ReactDOM from 'react-dom';

//import HomePage from './components/common/header';
//import Header from './components/HomePage';

import RouteContainer from './containers/RouteContainer';

class App extends React.Component {
  render(){
    return(
      <RouteContainer/>
    );
  }
}

ReactDOM.render(<App/>, app);
