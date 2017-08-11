import React, {Component} from 'react';

import InstaFeed from '../components/InstaFeed';

import InstaActions from '../actions/InstaActions';
import InstaStore from '../stores/InstaStore';

class InstaFeedContainer extends Component {

  constructor(){
    super();
    this.state = {
      posts: []
    }

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){
    InstaStore.addChangeListener(this.onChange);
  }

  componentWillUnmount(){
    InstaStore.removeChangeListener(this.onChange);
  }

  componentDidMount(){
    InstaActions.getFeed();
  }

  onChange(){
    this.setState({
      posts: InstaStore.getFeed().entry_data.TagPage[0].tag.media.nodes
    })
  }

  render(){
    return(
      <div className = "instaFeedContainer">
        <InstaFeed posts = {this.state.posts}/>
      </div>
    );
  }
}

export default InstaFeedContainer;
