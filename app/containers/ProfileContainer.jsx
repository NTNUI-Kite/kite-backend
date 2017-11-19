import React, { Component } from 'react';

import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';

import UserEventList from '../components/UserEventList';

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
    return (
      <div className="baseContainer">
        <UserEventList eventList={this.state.eventInfo} />
      </div>
    );
  }
}

export default ProfileContainer;
