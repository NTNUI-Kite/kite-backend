import React, {Component} from 'react';

import EventEntry from '../components/EventEntry';

class EventContainer extends Component {

  render(){
    return(
      <div className="container">
        <EventEntry/>
        <EventEntry/>
      </div>
    );
  }
}

export default EventContainer;
