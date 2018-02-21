import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventEntry from '../components/EventEntry';

import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';

class EventContainer extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onRegistrationClick = this.onRegistrationClick.bind(this);
  }

  componentWillMount() {
    EventStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    EventActions.getEvents();
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      events: EventStore.getEvents(),
    });
  }

  onRegistrationClick(id) {
    this.props.history.push(`/event/${id}`);
  }

  render() {
    return (
      <div>
        {
          this.state.events.map(event => (
            <EventEntry
              key={event.id}
              {...event}
              spotsTaken={Math.min(event.spots_taken, event.capacity)}
              onRegistrationClick={this.onRegistrationClick}
            />
          ))
        }
      </div>
    );
  }
}

EventContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default EventContainer;
