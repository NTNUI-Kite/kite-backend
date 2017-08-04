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

    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded(){
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render(){
    return(
      <Card  className="eventEntry" expanded = {this.state.expanded}>
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
        <Divider/>
        <CardText expandable = {true} >
          <div dangerouslySetInnerHTML={{__html:this.props.abstract}}></div>
        </CardText>
        <CardActions>
          <RaisedButton label="Påmelding" primary={true} onClick = {this.toggleExpanded}/>
        </CardActions>
      </Card>
    );
  }
}

export default EventEntry;
