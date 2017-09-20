import React, { Component } from 'react';
import { AppBar, FlatButton } from 'material-ui';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import AuthActions from '../actions/AuthActions';

const logo = (
  <div className="logo">
    <Link to="/">
      <img alt="logo" src="http://via.placeholder.com/167x100" />
    </Link>
  </div>
);

const navLinks = (boardMember) => {
  if (boardMember) {
    return (
      <div>
        <Link className="navLink" to="/events">Events</Link>
        <Link className="navLink" to="/blog">Blog</Link>
        <Link className="navLink" to="/about">About</Link>
        <Link className="navLink" to="/images">Images</Link>
        <Link className="navLink" to="/board">Board</Link>
      </div>
    );
  }
  return (
    <div>
      <Link className="navLink" to="/events">Events</Link>
      <Link className="navLink" to="/blog">Blog</Link>
      <Link className="navLink" to="/about">About</Link>
      <Link className="navLink" to="/images">Images</Link>
    </div>
  );
};

const loginButton = (authenticated, login, logout, userInfo) => {
  if (!authenticated) {
    return (
      <div>
        <FlatButton onClick={login}>Login</FlatButton>
      </div>
    );
  }

  return (
    <div>
      <p>{userInfo.name}</p>
      <FlatButton onClick={logout}>Logout</FlatButton>
    </div>
  );
};

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.props.lock.show((err, profile, token) => {
      if (err) {
        return;
      }
      AuthActions.logUserIn(profile, token);
    });
  }

  logout() {
    AuthActions.logUserOut();
    this.props.history.push('/');
  }

  render() {
    return (
      <AppBar
        className="navigationBar"
        iconElementLeft={logo}
        title={navLinks(this.props.boardMember)}
        iconElementRight={loginButton(this.props.authenticated,
          this.login, this.logout, this.props.userInfo)}
      />
    );
  }
}

NavigationBar.propTypes = {
  lock: PropTypes.shape({
    show: PropTypes.func.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  boardMember: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  userInfo: PropTypes.shape({}).isRequired,
};

export default withRouter(NavigationBar);
