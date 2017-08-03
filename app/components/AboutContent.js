import React, {Component} from 'react';
import {Card,CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card';

class AboutContent extends Component {

  constructor(props){
    super(props);
  }


  render() {
    return(
      <h1>{this.props.abstract}</h1>
    );
  }
}

export default AboutContent;
