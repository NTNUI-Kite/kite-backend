import React, { Component } from 'react';

import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';

import UserEventList from '../components/UserEventList';
import UserInfoBox from '../components/UserInfoBox';

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      eventInfo: [],
      userInfo: {
        id: 0,
        facebook_id: '',
        name: '',
        phone: '',
        email: '',
      },
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
      <div className="profileContainer">
        <UserEventList eventList={this.state.eventInfo} />
        <UserInfoBox userInfo={this.state.userInfo} />
      </div>
    );
  }
}

export default ProfileContainer;
