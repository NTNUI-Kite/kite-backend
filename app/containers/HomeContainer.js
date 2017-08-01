import React ,{Component} from 'react';


import InstaWidget from '../components/InstaWidget';

import {getInstaFeed} from '../utilities/APIFunctions';

class HomeContainer extends Component {

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
      <div className = "container">
        <InstaWidget posts = {this.state.posts}/>
      </div>
    );
  }
}

export default HomeContainer;
