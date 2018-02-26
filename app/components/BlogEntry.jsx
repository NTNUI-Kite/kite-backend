import React from 'react';
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import PropTypes from 'prop-types';

const BlogEntry = props => (
  <Card className="blogEntry">
    <CardMedia overlay={<CardTitle title={props.title} subtitle={props.date} />}>
      <img alt="logo" src="http://kitingbarbados.com/images/album/1.jpg" />
    </CardMedia>
    <CardText>
      {props.abstract}
    </CardText>
  </Card>
);

BlogEntry.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  abstract: PropTypes.string.isRequired,
};

export default BlogEntry;
