import React, { Component } from 'react';

import BlogContainer from './BlogContainer';
import InstaWidget from '../components/InstaWidget';
import EventPreviews from '../components/EventPreviews';

import InstaActions from '../actions/InstaActions';
import InstaStore from '../stores/InstaStore';

import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';

class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      events: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onEventChange = this.onEventChange.bind(this);
  }

  componentWillMount() {
    InstaStore.addChangeListener(this.onChange);
    EventStore.addChangeListener(this.onEventChange);
  }

  componentDidMount() {
    InstaActions.getFeed();
    EventActions.getEvents();
  }

  componentWillUnmount() {
    InstaStore.removeChangeListener(this.onChange);
    EventStore.removeChangeListener(this.onEventChange);
  }

  onEventChange() {
    this.setState({
      events: EventStore.getEvents(),
    });
  }

  onChange() {
    this.setState({
      posts: InstaStore.getFeed().entry_data.TagPage[0].tag.media.nodes,
    });
  }

  renderWidget() {
    if (this.state.posts.length > 0) {
      return <InstaWidget posts={this.state.posts} />;
    }
    return null;
  }

  render() {
    return (
      <div className="homeContainer">
        <EventPreviews events={this.state.events} />
        {/* {
          this.renderWidget()
        } */}
        <div className="homeBlog">
          <BlogContainer />
        </div>
      </div>
    );
  }
}

export default HomeContainer;
