import React, {Component} from 'react';

import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';

class TestContainer extends Component {

  constructor(){
    super();
    this.state = {
      event: {},
      events: []
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){
    EventStore.addChangeListener(this.onChange);
  }

  componentDidMount(){
    EventActions.getEvent(0); //TODO replace with param
    EventActions.recieveEvents();
  }

  componentWillUnmount(){
    EventStore.removeChangeListener(this.onChange);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      event: EventActions.getEvent(0), //TODO replace with param
      events: EventActions.recieveEvents()
    })
  }

  onChange(){
    this.setState({
      event: EventStore.getEvent(),
      events: EventStore.getEvents()
    });
  }

  render() {
    return(
      <h1>Hello</h1>
    );
  }
}

export default TestContainer;
