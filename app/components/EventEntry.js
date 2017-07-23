import React, {Component} from 'react';
import {Card,CardHeader, CardMedia, CardText, CardTitle,CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

class EventEntry extends Component {
  render(){
    return(
      <Card  className="eventEntry">
        <CardMedia overlay={<CardTitle title="Tur til Storwartz" subtitle="Stevne 4" />}>
          <img src = "http://via.placeholder.com/400x200"/>
        </CardMedia>
        <CardText>
          Sted: Storwartz
        </CardText>
        <Divider/>
        <CardText>
          Dato: 23. August - 24. Desember
        </CardText>
        <Divider/>
        <CardText>
          Plasser: 24/45
        </CardText>
        <Divider/>
        <CardText>
          Pris: 600,-
        </CardText>
        <CardActions>
          <RaisedButton label="Påmelding" primary={true}/>
        </CardActions>
      </Card>
    );
  }
}

export default EventEntry;
