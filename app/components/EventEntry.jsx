import React from 'react';
import { Card, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

const EventEntry = props => (
  <Card className="eventEntry">
    <CardMedia overlay={<CardTitle title={props.title} subtitle="Stevne 4" />}>
      <img alt="eventImage" src="http://via.placeholder.com/400x200" />
    </CardMedia>
    <CardText>
      Sted: {props.location}
    </CardText>
    <Divider />
    <CardText>
      Fra: {props.start}, til: {props.end}
    </CardText>
    <Divider />
    <CardText>
      Plasser tatt: {props.spots_taken}/{props.capacity}
    </CardText>
    <Divider />
    <CardText>
      Pris: {props.price},-
    </CardText>
    <Divider />
    <CardActions>
      <RaisedButton label="Påmelding" primary onClick={() => props.onRegistrationClick(props.id)} />
    </CardActions>
  </Card>
);

EventEntry.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  spots_taken: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onRegistrationClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default EventEntry;
