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
        <AttendeeList signups={this.state.event.signups} />
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
