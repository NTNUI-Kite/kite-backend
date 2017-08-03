import React, {Component} from 'react';

import InstaFeed from '../components/InstaFeed';

import {getInstaFeed} from '../utilities/APIFunctions';

class InstaFeedContainer extends Component {

  constructor(){
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount(){
    this.getFeed();
  }

  getFeed(){
    getInstaFeed().then((res)=>{
      this.setState({
        posts: res.data.entry_data.TagPage[0].tag.media.nodes
      });
    });
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
