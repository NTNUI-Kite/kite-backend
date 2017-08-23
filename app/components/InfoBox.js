import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';


class InfoBox extends Component {

  constructor(){
    super();
  }


  render(){ //TODO: fix frist
    return(
      <Paper className = "infoBox">
        <h3>Info</h3>
        <p>Fra: {this.props.start}</p>
        <Divider/>
        <p>Til: {this.props.end}</p>
        <Divider/>
        <p>Frist: {this.props.start}</p>
        <Divider/>
        <p>Plasser: 0/{this.props.capacity}</p>
        <Divider/>
        <p>Pris: {this.props.price}</p>
      </Paper>
    );
  }
}

export default InfoBox; 
