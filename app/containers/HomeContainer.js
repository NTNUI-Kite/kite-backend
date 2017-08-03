import React ,{Component} from 'react';

import BlogContainer from './BlogContainer';
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

  renderWidget(){
    if(this.state.posts.length > 0){
      return <InstaWidget posts = {this.state.posts}/>;
    }
  }

  render(){
    return(
      <div className = "homeContainer">
        {
          this.renderWidget()
        }
        <BlogContainer/>
      </div>
    );
  }
}

export default HomeContainer;
