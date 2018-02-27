import React from 'react';
import { Card, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

const createDate = (mysqlDate) => {
  const dateParts = mysqlDate.split('-');
  return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
};

const EventEntry = (props) => {
  const start = createDate(props.start);
  const end = createDate(props.end);
  return (
    <Card className="eventEntry">
      <CardMedia overlay={<CardTitle title={props.title} subtitle="Stevne 4" />}>
        <img alt="eventImage" src="http://kitingbarbados.com/images/album/1.jpg" />
      </CardMedia>
      <CardText>
        Where: {props.location}
      </CardText>
      <Divider />
      <CardText>
        Date: {start.toDateString()} - {end.toDateString()}
      </CardText>
      <Divider />
      <CardText>
        Spots taken: {props.spotsTaken}/{props.capacity}
      </CardText>
      <Divider />
      <CardText>
        Price: {props.price},-
      </CardText>
      <Divider />
      <CardActions>
        <RaisedButton label="Registration" onClick={() => props.onRegistrationClick(props.id)} />
      </CardActions>
    </Card>
  );
};

EventEntry.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  spotsTaken: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onRegistrationClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default EventEntry;
