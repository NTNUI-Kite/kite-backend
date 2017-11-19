import React, { Component } from 'react';
import PropTypes from 'prop-types';


import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';

import AbstractBox from '../components/AbstractBox';
import InfoBox from '../components/InfoBox';
import AttendeeList from '../components/AttendeeList';
import WaitingList from '../components/WaitingList';
import SignupBox from '../components/SignupBox';

import AuthStore from '../stores/AuthStore';

class SingleEventContainer extends Component {
  constructor() {
    super();
    this.state = {
      event: {
        title: '',
        price: 0,
      },
      attendeeList: [],
      waitingList: [],
      authenticated: AuthStore.isAuthenticated(),
      userInfo: AuthStore.getUser(),
    };

    this.onChange = this.onChange.bind(this);
    this.onAuthChange = this.onAuthChange.bind(this);
  }

  componentWillMount() {
    EventStore.addChangeListener(this.onChange);
    AuthStore.addChangeListener(this.onAuthChange);
  }

  componentDidMount() {
    EventActions.getEvent(this.props.match.params.eventId);
  }

  componentWillReceiveProps(nextProps) {
    EventActions.getEvent(nextProps.match.params.eventId);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.onChange);
    AuthStore.removeChangeListener(this.onAuthChange);
  }

  onAuthChange() {
    this.setState({
      authenticated: AuthStore.isAuthenticated(),
      userInfo: AuthStore.getUser(),
    });
  }
  onChange() {
    const event = EventStore.getEvent();
    const attendeeList = event.signups.slice(0, event.capacity);
    const waitingList = event.signups.slice(event.capacity, event.signups.length);
    this.setState({
      event,
      attendeeList,
      waitingList,
    });
  }

  render() {
    let hasSignedUp = false;
    let userInfo = {
      comment: '',
      has_car: 0,
    };
    if (this.state.event.signups && this.state.authenticated) {
      this.state.event.signups.forEach((element) => {
        if (element.name === this.state.userInfo.name) {
          hasSignedUp = true;
          userInfo = element;
        }
      });
    }

    return (
      <div className="singleEventContainer">
        <AbstractBox abstract={this.state.event.abstract} />
        <InfoBox {...this.state.event} spotsTaken={this.state.attendeeList.length} />
        <AttendeeList userList={this.state.attendeeList} />
        <WaitingList userList={this.state.waitingList} />
        <SignupBox
          isOpen={(this.state.event.is_open === 1)}
          authenticated={this.state.authenticated}
          hasSignedUp={hasSignedUp}
          eventId={this.props.match.params.eventId}
          userInfo={userInfo}
          description={this.state.event.title}
          price={this.state.event.price}
        />
      </div>
    );
  }
}

SingleEventContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      eventId: PropTypes.string,
    }),
  }).isRequired,
};

export default SingleEventContainer;
