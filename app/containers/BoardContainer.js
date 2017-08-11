import React, {Component} from 'react';

import BoardLinks from '../components/BoardLinks';
import BoardList from '../components/BoardList';

import BoardActions from '../actions/BoardActions';
import BoardStore from '../stores/BoardStore';

class BoardContainer extends Component{

  constructor(){
    super();
    this.state = {
      boardMembers: []
    }

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){
    BoardStore.addChangeListener(this.onChange);
  }

  componentWillUnmount(){
    BoardStore.removeChangeListener(this.onChange);
  }

  componentDidMount(){
    BoardActions.getBoardMembers()
  }

  onChange(){
    this.setState({
      boardMembers: BoardStore.getBoardMembers()
    })
  }

  render(){
    return(
      <div className="baseContainer">
        <BoardLinks/>
        <BoardList members = {this.state.boardMembers}/>
      </div>
    );
  }
}

export default BoardContainer;
