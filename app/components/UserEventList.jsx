import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom';

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
      <Paper>
        <Table selectable={false} >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Location</TableHeaderColumn>
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
                  <TableRowColumn>{event.location}</TableRowColumn>
                  <TableRowColumn>{createDate(event.start).toDateString()}</TableRowColumn>
                  <TableRowColumn>{convertHasPaid(event.has_paid)}</TableRowColumn>
                  <TableRowColumn>
                    <Button label="view Event" onClick={() => this.goToEvent(event.id)} />
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


export default withRouter(UserEventList);
