import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import EventIcon from 'material-ui/svg-icons/action/event';

const PaperLinks = () => (
  <Paper className = "boardLinks">
    
      <img className="AboutLinkIcon" src={'http://www.freeiconspng.com/uploads/142411756098-snapchat-icon-1.png'} />

      <img className="AboutLinkIcon"
      src={'http://www.freeiconspng.com/uploads/circle-color-facebook-icon--6.png'} />


      <img className="AboutLinkIcon"
      src={'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2000px-Instagram_logo_2016.svg.png'} />

  </Paper>
);

class AboutLinks extends Component {
  render(){
    return(
      <PaperLinks/>
    );
  }
}


export default AboutLinks
