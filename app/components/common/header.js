var React = require('react');

class Header extends React.Component {
  render(){
    return (
      <nav className = "navbar navbar-default">
        <div className = "container-fluid">
          <a href = "/" className = "navbar-brand">
            <img src = "images/logo.png"/>
          </a>
          <ul className = "nav navbar-nav">
            <li><a href = "/">Home</a></li>
            <li><a href = "/#login">Login</a></li>
            <li><a href = "/#trips">Turer</a></li>
            <li><a href = "/#about">Om oss</a></li>
          </ul>
        </div>
      </nav>

    );
  }
}

module.exports = Header;
