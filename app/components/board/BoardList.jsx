import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const BoardList = props => (<Paper>
  <Table>
    <TableHeader displaySelectAll={false}>
      <TableRow>
        <TableHeaderColumn>Navn</TableHeaderColumn>
        <TableHeaderColumn>Stilling</TableHeaderColumn>
        <TableHeaderColumn>Epost</TableHeaderColumn>
        <TableHeaderColumn>TelefonNummer</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {props.members.map(member => (
        <TableRow key={member.id}>
          <TableRowColumn>{member.name}</TableRowColumn>
          <TableRowColumn>{member.title}</TableRowColumn>
          <TableRowColumn>{member.email}</TableRowColumn>
          <TableRowColumn>{member.phoneNumber}</TableRowColumn>
        </TableRow>
      ))
      }
    </TableBody>
  </Table>
</Paper>
);

BoardList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BoardList;
