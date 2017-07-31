import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';


class BoardList extends Component {

  constructor(props){
    super(props);
    console.log(props);
  }

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
          {
            this.props.members.map((member,id) =>(
              <TableRow>
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
  }
}

export default BoardList;
