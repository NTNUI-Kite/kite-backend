import React, { Component } from 'react';
import { AppBar, FlatButton } from 'material-ui';
import PropTypes from 'prop-types';

import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';


const logo = <div className="logo"><img alt="logo" src="http://via.placeholder.com/167x100" /></div>;

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
  constructor() {
    super();
    this.state = {
      authenticated: false,
      userInfo: {},
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const authenticated = AuthStore.isAuthenticated;
    /* eslint-disable react/no-did-mount-set-state */
    if (authenticated) {
      this.setState({
        userInfo: JSON.parse(AuthStore.getUser()),
        authenticated: AuthStore.isAuthenticated(),
      });
    } else {
      this.setState({
        authenticated: AuthStore.isAuthenticated(),
      });
    }
  }

  login() {
    this.props.lock.show((err, profile, token) => {
      if (err) {
        return;
      }
      AuthActions.logUserIn(profile, token);
      this.setState(
        {
          authenticated: true,
          userInfo: profile,
        });
    });
  }

  logout() {
    AuthActions.logUserOut();
    this.setState(
      {
        authenticated: false,
        userInfo: {},
      });
  }

  render() {
    return (
      <AppBar
        className="navigationBar"
        iconElementLeft={logo}
        iconElementRight={loginButton(this.state.authenticated,
          this.login, this.logout, this.state.userInfo)}
      />
    );
  }
}

NavigationBar.propTypes = {
  lock: PropTypes.shape({
    show: PropTypes.func.isRequired,
  }),
};

export default NavigationBar;
