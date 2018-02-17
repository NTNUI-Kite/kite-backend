import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const createDate = (mysqlDate) => {
  const dateParts = mysqlDate.split('-');
  return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
};

const convertHasPaid = (hasPaid) => {
  if (hasPaid === 1) {
    return ('Yes');
  }
  return ('No');
};


class UserEventList extends Component {
  constructor() {
    super();

    this.goToEvent = this.goToEvent.bind(this);
  }

  goToEvent(id) {
    this.props.history.push(`/event/${id}`);
  }

  render() {
    return (
      <Paper className="userEventList">
        <h3>Your events</h3>
        <Table selectable={false} >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Start-date</TableHeaderColumn>
              <TableHeaderColumn>Payment Recieved</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              this.props.eventList.map(event => (
                <TableRow key={event.id}>
                  <TableRowColumn>{event.title}</TableRowColumn>
                  <TableRowColumn>{createDate(event.start).toDateString()}</TableRowColumn>
                  <TableRowColumn>{convertHasPaid(event.has_paid)}</TableRowColumn>
                  <TableRowColumn>
                    <Button label="Info" onClick={() => this.goToEvent(event.id)} />
                  </TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

UserEventList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  eventList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withRouter(UserEventList);
