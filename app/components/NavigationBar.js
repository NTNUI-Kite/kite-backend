import React, {Component} from 'react';
import {AppBar, FlatButton} from 'material-ui'

import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';

const logo = <div className="logo"><img src="http://via.placeholder.com/167x100" /></div>;

class NavigationBar extends Component {

  constructor() {
      super();
      this.state = {
        authenticated: false
      }
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }

    login() {
      this.props.lock.show((err, profile, token) => {
        if (err) {
          alert(err);
          return;
        }
        AuthActions.logUserIn(profile, token);
        this.setState({authenticated: true});
        });
      }

      logout() {
        AuthActions.logUserOut();
        this.setState({authenticated: false});
      }

  render(){
    return(
      <AppBar className = "navigationBar" iconElementLeft = {logo}
        iconElementRight=
        { !AuthStore.isAuthenticated() ? (
            <FlatButton onClick={this.login}>Login</FlatButton>
          ) : (
            <FlatButton onClick={this.logout}>Logout</FlatButton>
          )
        }
      />
    );
  }
}

export default NavigationBar;
