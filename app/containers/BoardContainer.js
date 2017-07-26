import React, {Component} from 'react';

import BoardLinks from '../components/BoardLinks';
import BoardList from '../components/BoardList';

class BoardContainer extends Component{
  render(){
    return(
      <div className="container">
        <BoardLinks/>
        <BoardList/>
      </div>
    );
  }
}

export default BoardContainer;
