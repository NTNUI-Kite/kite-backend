import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

// import EventActions from '../actions/EventActions';
// import EventStore from '../stores/EventStore';

import BlogActions from '../actions/BlogActions';
import BlogStore from '../stores/BlogStore';

class TestContainer extends Component {
  constructor() {
    super();
    this.state = {
      event: {},
      events: [],
      posts: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    // EventStore.addChangeListener(this.onChange);
    BlogStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    // EventActions.getEvent(0); //TODO replace with param
    // EventActions.getEvents();
    BlogActions.getPosts();
  }

  componentWillUnmount() {
    // EventStore.removeChangeListener(this.onChange);
    BlogStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      // event: EventStore.getEvent(),
      // events: EventStore.getEvents(),
      posts: BlogStore.getPosts(),
    });
  }

  render() {
    return (
      <Paper className="baseContainer">
        <h1>Hello</h1>
      </Paper>
    );
  }
}

export default TestContainer;
