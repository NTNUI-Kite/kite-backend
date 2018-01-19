import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Button from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import ConfirmPopup from '../baseComponents/ConfirmPopup';


class AttendeeList extends Component {
  constructor() {
    super();

    this.state = {
      openDialog: false,
    };

    this.toggleDialog = this.toggleDialog.bind(this);
    this.setAttendee = this.setAttendee.bind(this);
    this.removeAttendee = this.removeAttendee.bind(this);
  }

  setAttendee(user) {
    this.setState({
      removeUser: user,
    });
    this.toggleDialog();
  }

  toggleDialog() {
    this.setState({
      openDialog: !this.state.openDialog,
    });
  }

  cancelAction() {
    this.setState({ removeUser: null });
  }

  removeAttendee() {
    this.props.removeAttendee(this.state.removeUser, this.props.eventId);
    this.setState({ removeId: null });
  }

  render() {
    return (
      <div>
        <Table
          selectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Navn</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Tlf</TableHeaderColumn>
              <TableHeaderColumn>Kommentar</TableHeaderColumn>
              <TableHeaderColumn>Har Bil</TableHeaderColumn>
              <TableHeaderColumn>Har betalt</TableHeaderColumn>
              <TableHeaderColumn>På venteliste</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              this.props.signups.map(member => (
                <TableRow key={member.user_id}>
                  <TableRowColumn>{member.name}</TableRowColumn>
                  <TableRowColumn>{member.email}</TableRowColumn>
                  <TableRowColumn>{member.phone}</TableRowColumn>
                  <TableRowColumn style={{
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                  }}
                  >{member.comment}</TableRowColumn>
                  <TableRowColumn>
                    <Checkbox disabled checked={(member.has_car === 1)} />
                  </TableRowColumn>
                  <TableRowColumn>
                    <Checkbox disabled checked={(member.has_paid === 1)} />
                  </TableRowColumn>
                  <TableRowColumn>
                    <Checkbox disabled checked={(member.waiting_list === 1)} />
                  </TableRowColumn>
                  <TableRowColumn>
                    <Button label="Remove" onClick={() => this.setAttendee(member)} />
                  </TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <ConfirmPopup title="Warning" open={this.state.openDialog} toggle={this.toggleDialog} continueAction={this.removeAttendee} text="Are you sure you want to remove this user from the event?" />
      </div>
    );
  }
}

AttendeeList.propTypes = {
  signups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  eventId: PropTypes.number,
  removeAttendee: PropTypes.func.isRequired,
};

AttendeeList.defaultProps = {
  eventId: null,
};

export default AttendeeList;
