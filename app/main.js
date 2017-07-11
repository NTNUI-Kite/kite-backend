var React = require('react');
var ReactDOM = require('react-dom');

var HomePage = require('./components/HomePage');
var Header = require('./components/common/header');

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
