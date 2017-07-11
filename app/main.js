import React from 'react';
import ReactDOM from 'react-dom';

import HomePage from './components/common/header';
import Header from './components/HomePage';

class App extends React.Component {
  render(){
    return(
      <div>
        <Header/>
        <HomePage/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, app);
