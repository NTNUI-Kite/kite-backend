import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';

import AbstractBox from '../components/AbstractBox';
import InfoBox from '../components/InfoBox';
import AttendeeList from '../components/AttendeeList';

const userList = [
  {
    name: "Nils Bærlaug"
  },
  {
    name: "Bjornebær Johansen"
  },
  {
    name: "Chicken David"
  }
]

class SingleEventContainer extends Component {
  constructor(){
    super();
    this.state = {
      event: {}
    }

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){
    EventStore.addChangeListener(this.onChange);
  }

  componentWillUnmount(){
    EventStore.removeChangeListener(this.onChange);
  }

  componentDidMount(){
    EventActions.getEvent(this.props.match.params.eventId);
  }

  onChange(){
    this.setState({
      event: EventStore.getEvent()
    })
  }

  render(){
    return(
      <div className = "singleEventContainer">
        <AbstractBox abstract = {this.state.event.abstract}/>
        <InfoBox {...this.state.event}/>
        <AttendeeList userList = {userList}/>
      </div>
    );
  }
}

export default SingleEventContainer;
