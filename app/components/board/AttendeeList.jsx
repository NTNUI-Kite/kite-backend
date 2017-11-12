import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Button from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

const AttendeeList = (props) => {
  return (
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
          <TableHeaderColumn />
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {
          props.signups.map(member => (
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
                <Button label="Remove" />
              </TableRowColumn>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};

AttendeeList.propTypes = {
  signups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default AttendeeList;
