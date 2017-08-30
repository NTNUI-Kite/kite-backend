import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';


const InfoBox = (event) => {

  if(!event){
    return(<Paper className="infoBox"/>)
  }

  return(
    <Paper className = "infoBox">
      <h3>Info</h3>
      <p>Fra: {event.start}</p>
      <Divider/>
      <p>Til: {event.end}</p>
      <Divider/>
      <p>Frist: {event.start}</p>
      <Divider/>
      <p>Plasser: {event.spots_taken}/{event.capacity}</p>
      <Divider/>
      <p>Pris: {event.price}</p>
    </Paper>
  );
}

export default InfoBox;
