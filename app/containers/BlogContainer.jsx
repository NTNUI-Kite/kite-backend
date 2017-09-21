import React, { Component } from 'react';

import BlogEntry from '../components/BlogEntry';

import BlogActions from '../actions/BlogActions';
import BlogStore from '../stores/BlogStore';

class BlogContainer extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
    this.onChange = this.onChange.bind(this);
  }


  componentWillMount() {
    BlogStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    BlogActions.getPosts();
  }

  componentWillUnmount() {
    BlogStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      posts: BlogStore.getPosts(),
    });
  }

  render() {
    return (
      <div>
        {
          this.state.posts.map(post => (
            <BlogEntry key={post.id} {...post} />
          ))
        }
      </div>
    );
  }
}

export default BlogContainer;
