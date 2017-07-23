import React, {Component} from 'react';
import BlogEntry from '../components/BlogEntry';

class BlogContainer extends Component {
  render(){
    return(
      <div className = "container">
        <BlogEntry/>
        <BlogEntry/>
        <BlogEntry/>
      </div>
    );
  }
}

export default BlogContainer;
