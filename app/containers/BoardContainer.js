import React, {Component} from 'react';

import BoardLinks from '../components/BoardLinks';
import BoardList from '../components/BoardList';

import {getBoardMembers} from '../utilities/APIFunctions';

class BoardContainer extends Component{

  constructor(){
    super();
    this.state = {
      members: []
    }
  }

  getMembers(){
    getBoardMembers().then((res)=>{
      this.setState({
        members: res.data.members
      });
    });
  }

  componentDidMount(){
    this.getMembers();
  }

  render(){
    return(
      <div className="container">
        <BoardLinks/>
        <BoardList members = {this.state.members}/>
      </div>
    );
  }
}

export default BoardContainer;
