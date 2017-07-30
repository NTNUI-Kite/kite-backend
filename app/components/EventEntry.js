import React, {Component} from 'react';
import {Card,CardHeader, CardMedia, CardText, CardTitle,CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

class EventEntry extends Component {

  constructor(props){
    super(props);
    this.state = props.event;
  }


  render(){
    return(
      <Card  className="eventEntry">
        <CardMedia overlay={<CardTitle title={this.state.name} subtitle="Stevne 4" />}>
          <img src = "http://via.placeholder.com/400x200"/>
        </CardMedia>
        <CardText>
          Sted: Storwartz
        </CardText>
        <Divider/>
        <CardText>
          Fra: {this.state.start}, til: {this.state.end}
        </CardText>
        <Divider/>
        <CardText>
          Plasser: {this.state.capacity}
        </CardText>
        <Divider/>
        <CardText>
          Pris: {this.state.price},-
        </CardText>
        <CardActions>
          <RaisedButton label="Påmelding" primary={true}/>
        </CardActions>
      </Card>
    );
  }
}

export default EventEntry;
