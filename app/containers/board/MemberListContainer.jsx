import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import Button from 'material-ui/RaisedButton';

import BoardActions from '../../actions/BoardActions';
import BoardStore from '../../stores/BoardStore';

class MemberListContainer extends Component {
  constructor() {
    super();
    this.state = {
      members: [],
    };

    this.onActiveToggle = this.onActiveToggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    BoardStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    BoardActions.getMembers();
  }

  componentWillUnmount() {
    BoardStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      members: BoardStore.getMembers(),
    });
  }

  onActiveToggle(member) {
    const newMember =  Object.assign({}, member);

    if (newMember.board_member || (newMember.board_member === 1)) {
      newMember.board_member = false;
    } else {
      newMember.board_member = true;
    }

    BoardActions.updateMember(newMember);
  }

  render() {
    return (
      <Paper className="baseContainer">
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
              <TableHeaderColumn>StyreMedlem</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {
              this.state.members.map(member => (
                <TableRow key={member.id}>
                  <TableRowColumn>{member.name}</TableRowColumn>
                  <TableRowColumn>{member.email}</TableRowColumn>
                  <TableRowColumn>{member.phone}</TableRowColumn>
                  <TableRowColumn>
                    <Toggle
                      toggled={(member.board_member === 1 || member.board_member === true)}
                      onToggle={() => this.onActiveToggle(member)}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <Button label="Edit" />
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

export default MemberListContainer;
