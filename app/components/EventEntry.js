import React, {Component} from 'react';
import {Card,CardHeader, CardMedia, CardText, CardTitle,CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

class EventEntry extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <Card  className="eventEntry">
        <CardMedia overlay={<CardTitle title={this.props.name} subtitle="Stevne 4" />}>
          <img src = "http://via.placeholder.com/400x200"/>
        </CardMedia>
        <CardText>
          Sted: Storwartz
        </CardText>
        <Divider/>
        <CardText>
          Fra: {this.props.start}, til: {this.props.end}
        </CardText>
        <Divider/>
        <CardText>
          Plasser: {this.props.capacity}
        </CardText>
        <Divider/>
        <CardText>
          Pris: {this.props.price},-
        </CardText>
        <CardActions>
          <RaisedButton label="Påmelding" primary={true}/>
        </CardActions>
      </Card>
    );
  }
}

export default EventEntry;
