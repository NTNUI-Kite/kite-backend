import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import EventEntry from '../components/EventEntry';

import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';

class EventContainer extends Component {

  constructor(){
    super();
    this.state = {
      events: []
    }

    this.onChange = this.onChange.bind(this);
    this.onRegistrationClick = this.onRegistrationClick.bind(this);
  }

  componentWillMount(){
    EventStore.addChangeListener(this.onChange);
  }

  componentWillUnmount(){
    EventStore.removeChangeListener(this.onChange);
  }

  componentDidMount(){
    EventActions.getEvents();
  }

  onChange(){
    this.setState({
      events: EventStore.getEvents()
    })
  }

  onRegistrationClick(id){
    this.props.history.push("/event/" + id);
  }

  render(){

    return(
      <div className="baseContainer">
        {
          this.state.events.map((event,id) =>(
            <EventEntry key = {id}  {...event} onRegistrationClick = {this.onRegistrationClick}/>
          ))
        }
      </div>
    );
  }
}

export default EventContainer;
