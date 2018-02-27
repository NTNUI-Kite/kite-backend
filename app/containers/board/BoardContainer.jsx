import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

import BoardLinks from '../../components/board/BoardLinks';
import BoardList from '../../components/board/BoardList';

import BoardActions from '../../actions/BoardActions';
import BoardStore from '../../stores/BoardStore';

class BoardContainer extends Component {
  constructor() {
    super();
    this.state = {
      boardMembers: [],
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    BoardStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    BoardActions.getBoardMembers();
  }

  componentWillUnmount() {
    BoardStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      boardMembers: BoardStore.getBoardMembers(),
    });
  }

  render() {
    return (
      <Paper className="boardContainer" zDepth={2}>
        <p className="boardTitle" >Dashboard</p>
        <BoardLinks />
        <BoardList members={this.state.boardMembers} />
      </Paper>
    );
  }
}

export default BoardContainer;
