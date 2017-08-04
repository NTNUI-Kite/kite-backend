import React, {Component} from 'react';

import AboutContent from '../components/AboutContent';
import AboutLinks from '../components/AboutLinks';

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
      <div className = "baseContainer">

            <AboutContent informasjon = {this.state.info}/>
            <AboutLinks/>

      </div>)
  }

}

export default AboutContainer;
