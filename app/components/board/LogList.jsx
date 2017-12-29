import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const LogList = props => (
  <div>
    <Table selectable={false} >
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Action</TableHeaderColumn>
          <TableHeaderColumn>Date</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {
          props.logEntries.map(entry => (
            <TableRow key={entry.id}>
              <TableRowColumn>{entry.name}</TableRowColumn>
              <TableRowColumn>{entry.action}</TableRowColumn>
              <TableRowColumn>{new Date(entry.date).toLocaleString()}</TableRowColumn>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  </div>
);

export default LogList;
