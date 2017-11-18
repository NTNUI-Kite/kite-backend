import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

const EventPreviews = props => (
  <Paper className="eventPreviews">
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

export default EventPreviews;
