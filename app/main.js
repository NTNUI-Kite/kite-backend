import React from 'react';
import ReactDOM from 'react-dom';

//import HomePage from './components/common/header';
//import Header from './components/HomePage';

import Routes from './utilities/routes';

class App extends React.Component {
  render(){
    return(
      <Routes/>
    );
  }
}

ReactDOM.render(<App/>, app);
