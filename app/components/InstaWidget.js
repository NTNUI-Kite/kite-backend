import React, {Component} from 'react';

class InstaWidget extends Component {
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return(
      <div className = "instaContainer">
        {
          this.props.posts.map((info,id) =>(
            <div key={id} className = "instaPost">
              <img className = "instaImage" src = {info.thumbnail_src}></img>
            </div>
          ))
        }
      </div>
    )
  }
}

export default InstaWidget;
