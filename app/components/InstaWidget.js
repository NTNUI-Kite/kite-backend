import React, {Component} from 'react';

class InstaWidget extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className = "instaContainer">
        {
          this.props.posts.map((info,id) =>(
            <div key={id} className = "instaPost">
              <a target="_blank" href = {"https://www.instagram.com/p/" + info.code}>
                <img className = "instaImage" src = {info.thumbnail_src}></img>
              </a>
            </div>
          ))
        }
      </div>
    )
  }
}

export default InstaWidget;
