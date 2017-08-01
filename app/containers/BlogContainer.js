import React, {Component} from 'react';

import BlogEntry from '../components/BlogEntry';
import{getAllBlogPosts} from '../utilities/APIFunctions';

class BlogContainer extends Component {

  constructor(){
    super();
    this.state = {
      posts: []
    }
  }

  getPosts(){
    getAllBlogPosts().then((res) =>{
      console.log(res.data.posts)
      this.setState({
        posts: res.data.posts
      })
      console.log(this.state.posts);
    });
  }

  componentDidMount(){
    this.getPosts();
  }

  render(){
    return(
      <div className = "container">
        {
          this.state.posts.map((post,id) => (
            <BlogEntry key={id} {...post}/>
          ))
        }
      </div>
    );
  }
}

export default BlogContainer;
