import React ,{Component} from 'react';

import BlogContainer from './BlogContainer';
import InstaWidget from '../components/InstaWidget';

import InstaActions from '../actions/InstaActions';
import InstaStore from '../stores/InstaStore';

class HomeContainer extends Component {

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

  renderWidget(){
    if(this.state.posts.length > 0){
      return <InstaWidget posts = {this.state.posts}/>;
    }
  }

  render(){
    return(
      <div className = "baseContainer">
        {
          this.renderWidget()
        }
        <BlogContainer/>
      </div>
    );
  }
}

export default HomeContainer;
