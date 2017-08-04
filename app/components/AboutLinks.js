import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import EventIcon from 'material-ui/svg-icons/action/event';

const PaperLinks = () => (
  <Paper className = "boardLinks">
    <Paper className="boardLinkItem" zDepth={2} >
      <EventIcon className="boardLinkIcon"/>
      <p>Arrangement</p>
    </Paper>
    <Paper className="boardLinkItem" zDepth={2} >
      <EventIcon className="boardLinkIcon"/>
      <p>Arrangement</p>
    </Paper>
    <Paper className="boardLinkItem" zDepth={2} >
      <EventIcon className="boardLinkIcon"/>
      <p>Arrangement</p>
    </Paper>
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
