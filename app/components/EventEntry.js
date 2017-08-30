import React, {Component} from 'react';
import {Card,CardHeader, CardMedia, CardText, CardTitle,CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

class EventEntry extends Component {

  constructor(props){
    super(props);

    this.state = {
      expanded: false
    }
  }



  render(){
    return(
      <Card  className="eventEntry" expanded = {this.state.expanded}>
        <CardMedia overlay={<CardTitle title={this.props.name} subtitle="Stevne 4" />}>
          <img src = "http://via.placeholder.com/400x200"/>
        </CardMedia>
        <CardText>
          Sted: {this.props.location}
        </CardText>
        <Divider/>
        <CardText>
          Fra: {this.props.start}, til: {this.props.end}
        </CardText>
        <Divider/>
        <CardText>
          Plasser tatt: {this.props.spots_taken}/{this.props.capacity}
        </CardText>
        <Divider/>
        <CardText>
          Pris: {this.props.price},-
        </CardText>
        <Divider/>
        <CardActions>
          <RaisedButton label="Påmelding" primary={true} onClick = {() => this.props.onRegistrationClick(this.props.id)}/>
        </CardActions>
      </Card>
    );
  }
}

export default EventEntry;
