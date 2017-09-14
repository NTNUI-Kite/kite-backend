import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';

import AuthConfig from '../config/AuthConfig';

class NavBarContainer extends Component {
  componentWillMount() {
    // eslint-disable-next-line no-undef
    this.lock = new Auth0Lock(AuthConfig.id, AuthConfig.domain);
  }

  render() {
    return (
      <NavigationBar lock={this.lock} />
    );
  }
}

export default NavBarContainer;
