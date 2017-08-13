import React, {Component} from 'react';

class InstaWidget extends Component {

  constructor(props){
    super(props);
    this.state = {
      index: 0,
      maxIndex: props.posts.length -1,
      currentPost: props.posts[0],
    }

    this.changeImage = this.changeImage.bind(this);
  }

  componentDidMount(){
    this.setState({
      interval: setInterval(this.changeImage,4000)
    });
  }

  componentWillUnmount(){
    clearInterval(this.state.interval);
  }

  changeImage(){
    let newIndex = 0;

    if(this.state.index < this.state.maxIndex){
      newIndex = this.state.index + 1;
    }

    this.setState({
      index: newIndex,
      currentPost: this.props.posts[newIndex]
    });
  }

  render(){
    return(
      <div className = "instaSlide">
        <a className = "instaLink" target="_blank" href = {"https://www.instagram.com/p/" + this.state.currentPost.code}>
          <div className = "slideShow" style = {{backgroundImage: "url(" + this.state.currentPost.thumbnail_src +")"}}></div>
        </a>
      </div>
    );
  }
}

export default InstaWidget;
