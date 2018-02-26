import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

const EventPreviews = props => (
  <Paper className="eventPreviews" zDepth={2}>
    <h3>Upcoming events</h3>
    {
      props.events.map(event => (
        <div key={event.id}>
          <Divider />
          <p>{event.title}</p>
        </div>
      ))
    }
  </Paper>
);

EventPreviews.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default EventPreviews;
