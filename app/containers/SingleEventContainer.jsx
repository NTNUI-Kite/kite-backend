import React, { Component } from 'react';
import PropTypes from 'prop-types';


import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';

import AbstractBox from '../components/AbstractBox';
import InfoBox from '../components/InfoBox';
import AttendeeList from '../components/AttendeeList';
import SignupBox from '../components/SignupBox';

import AuthStore from '../stores/AuthStore';

class SingleEventContainer extends Component {
  constructor() {
    super();
    this.state = {
      event: {},
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    EventStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    EventActions.getEvent(this.props.match.params.eventId);
  }

  componentWillReceiveProps(nextProps) {
    EventActions.getEvent(nextProps.match.params.eventId);
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.setState({
      event: EventStore.getEvent(),
    });
  }

  render() {
    let hasSignedUp = false;
    const userInfo = JSON.parse(AuthStore.getUser());
    if (this.state.event.signups && AuthStore.isAuthenticated()) {
      this.state.event.signups.forEach((element) => {
        if (element.name === userInfo.name) {
          hasSignedUp = true;
        }
      });
    }

    return (
      <div className="singleEventContainer">
        <AbstractBox abstract={this.state.event.abstract} />
        <InfoBox {...this.state.event} />
        <AttendeeList userList={this.state.event.signups} />
        <SignupBox hasSignedUp={hasSignedUp} eventId={this.props.match.params.eventId} />
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
