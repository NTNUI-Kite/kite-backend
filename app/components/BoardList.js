import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';


class BoardList extends Component {
  render(){
    return(
    <Paper>
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
          <TableRow>
            <TableRowColumn>Emil Schrøder</TableRowColumn>
            <TableRowColumn>Tacospiser</TableRowColumn>
            <TableRowColumn>emil@bikbok.no</TableRowColumn>
            <TableRowColumn>12121212</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
    );
  }
}

export default BoardList;
