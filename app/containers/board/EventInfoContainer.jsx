import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

import BoardActions from '../../actions/BoardActions';
import BoardStore from '../../stores/BoardStore';

import AttendeeList from '../../components/board/AttendeeList';
import AddAttendeeBox from '../../components/board/AddAttendeeBox';

class EventInfoContainer extends Component {
  constructor() {
    super();
    this.state = {
      event: {
        signups: [],
      },
      openAddDialog: false,
      memberList: [],
    };

    this.onChange = this.onChange.bind(this);
    this.toggleAddDialog = this.toggleAddDialog.bind(this);
  }

  componentWillMount() {
    BoardStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    BoardActions.getEvent(this.props.match.params.eventId);
    BoardActions.getMembers();
  }


  onChange() {
    let event = BoardStore.getEvent();
    if (Object.keys(event).length === 0) {
      event = { signups: [] };
    }
    this.setState({
      event,
      memberList: BoardStore.getMembers(),
    });
  }

  toggleAddDialog() {
    this.setState({
      openAddDialog: !this.state.openAddDialog,
    });
  }

  render() {
    return (
      <Paper>
        <h1>Deltagere</h1>
        <Button label="Add user to event" onClick={this.toggleAddDialog} />
        <AttendeeList
          eventId={this.state.event.id}
          signups={this.state.event.signups}
          removeAttendee={BoardActions.removeAttendee}
        />
        <AddAttendeeBox
          eventId={this.state.event.id}
          memberList={this.state.memberList}
          attendeeList={this.state.event.signups}
          toggle={this.toggleAddDialog}
          open={this.state.openAddDialog}
          addAttendee={BoardActions.addAttendee}
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
