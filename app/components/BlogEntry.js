import React, {Component} from 'react';
import {Card,CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card';

class BlogEntry extends Component {

  constructor(props){
    super(props);
  }


  render() {
    return(
      <Card  className="blogEntry">
        <CardMedia overlay={<CardTitle title={this.props.title} subtitle={this.props.date} />}>
          <img src = "http://via.placeholder.com/400x200"/>
        </CardMedia>
        <CardText>
          {this.props.abstract}
        </CardText>
      </Card>
    );
  }
}

export default BlogEntry;
