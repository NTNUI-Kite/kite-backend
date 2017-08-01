import React, {Component} from 'react';

import AboutContent from '../components/AboutContent';
import {getAboutInfo} from '../utilities/APIFunctions';

class AboutContainer extends Component{
  constructor(){
    super()
    this.state = {
      info: []
    }
  }

  getAbout(){
    getAboutInfo().then((res) =>{
      console.log(res.data.info)
      this.setState({
        info: res.data.info
      })
      console.log(this.state)
    })
  }

  componentDidMount(){
      this.getAbout();
  }

  render(){
    return(
      <div className = "container">
        {
          this.state.info.map((id, info) => (
            <AboutContent key={id} {...info}/>
          ))
        }
      </div>)
  }

}

export default AboutContainer;
