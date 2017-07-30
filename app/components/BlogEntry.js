import React, {Component} from 'react';
import {Card,CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card';

class BlogEntry extends Component {

  constructor(props){
    super(props);
    this.state = props.post;
  }


  render() {
    return(
      <Card  className="blogEntry">
        <CardMedia overlay={<CardTitle title={this.state.title} subtitle={this.state.date} />}>
          <img src = "http://via.placeholder.com/400x200"/>
        </CardMedia>
        <CardText>
          {this.state.abstract}
        </CardText>
      </Card>
    );
  }
}

export default BlogEntry;
