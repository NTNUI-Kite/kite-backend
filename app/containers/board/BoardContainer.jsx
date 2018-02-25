import React, { Component } from 'react';

import BoardLinks from '../../components/board/BoardLinks';
import BoardList from '../../components/board/BoardList';

import BoardActions from '../../actions/BoardActions';
import BoardStore from '../../stores/BoardStore';

import Paper from 'material-ui/Paper';

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
        <BoardLinks />
        <BoardList members={this.state.boardMembers} />
      </Paper>
    );
  }
}

export default BoardContainer;
