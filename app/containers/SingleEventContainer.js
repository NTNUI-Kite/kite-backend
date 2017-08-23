import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';

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
    EventActions.getEvent(this.props.eventId);
  }

  onChange(){
    this.setState({
      event: EventStore.getEvent()
    })
  }

  render(){
    return(
      <div className = "singleEventContainer">
        <Paper className = "abstractBox">Abstract</Paper>
        <InfoBox {...this.state.event}/>
        <AttendeeList userList = {userList}/>
      </div>
    );
  }
}

export default SingleEventContainer;
