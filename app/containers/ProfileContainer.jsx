import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      eventInfo: [],
      userInfo: {},
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    AuthStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    AuthActions.getProfile();
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      eventInfo: AuthStore.getProfile(),
      userInfo: AuthStore.getUser(),
    });
  }

  render() {
    console.log(this.state);
    return (
      <Paper />
    );
  }
}

export default ProfileContainer;
