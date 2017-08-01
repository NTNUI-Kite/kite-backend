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
      this.setState({
        info: res.data.info
      })
    })
  }

  componentDidMount(){
      this.getAbout();
  }

  render(){
    return(
      <div className = "container">
            <AboutContent {...this.state.info}/>
      </div>)
  }

}

export default AboutContainer;
