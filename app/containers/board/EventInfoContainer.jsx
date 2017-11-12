import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

import BoardActions from '../../actions/BoardActions';
import BoardStore from '../../stores/BoardStore';

import AttendeeList from '../../components/board/AttendeeList';

class EventInfoContainer extends Component {
  constructor() {
    super();
    this.state = {
      event: {
        signups: [],
      },
      openDialog: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    BoardStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    BoardActions.getEvent(this.props.match.params.eventId);
  }


  onChange() {
    this.setState({
      event: BoardStore.getEvent(),
    });
  }

  render() {
    return (
      <Paper>
        <h1>Deltagere</h1>
        <AttendeeList
          eventId={this.state.event.id}
          signups={this.state.event.signups}
          removeAttendee={BoardActions.removeAttendee}
        />
      </Paper>
    );
  }
}

EventInfoContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      eventId: PropTypes.string,
    }),
  }).isRequired,
};

export default EventInfoContainer;
