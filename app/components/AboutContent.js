import React, {Component} from 'react';
import {Card,CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card';

class AboutContent extends Component {

  constructor(props){
    super(props);
  }


  render() {
    return(
      <Card className="AboutContent">
        <CardTitle titleColor={"red"}>
          {this.props.title}
        </CardTitle>
        <CardText>
          {this.props.abstract}
        </CardText>
      </Card>
    );
  }
}

export default AboutContent;
