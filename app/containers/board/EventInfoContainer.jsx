import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import BoardActions from '../../actions/BoardActions';
import BoardStore from '../../stores/BoardStore';

import AttendeeList from '../../components/board/AttendeeList';

class EventContainer extends Component {
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

export default EventContainer;
