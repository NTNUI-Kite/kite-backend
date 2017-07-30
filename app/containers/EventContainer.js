import React, {Component} from 'react';

import EventEntry from '../components/EventEntry';

import {getAllEvents, getEventById} from '../utilities/APIFunctions';

class EventContainer extends Component {

  constructor(){
    super();
    this.state = {
      events: []
    }
  }

  getEvents(){
    getAllEvents().then((res) =>{
      this.setState({events: res.data.events});
    });
  }

  componentDidMount(){
    this.getEvents();
  }

  render(){

    return(
      <div className="container">
        {
          this.state.events.map((event,id) =>(
            <EventEntry key = {id}  event = {event}/>
          ))
        }
      </div>
    );
  }
}

export default EventContainer;
