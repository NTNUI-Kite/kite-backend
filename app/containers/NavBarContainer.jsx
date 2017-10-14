import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';

import AuthStore from '../stores/AuthStore';

class NavBarContainer extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      authenticated: AuthStore.isAuthenticated(),
      boardMember: AuthStore.isBoardMember(),
      userInfo: AuthStore.getUser(),
    };
  }

  componentWillMount() {
    AuthStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      authenticated: AuthStore.isAuthenticated(),
      boardMember: AuthStore.isBoardMember(),
      userInfo: AuthStore.getUser(),
    });
  }

  render() {
    return (
      <NavigationBar lock={this.lock} {...this.state} />
    );
  }
}

export default NavBarContainer;
