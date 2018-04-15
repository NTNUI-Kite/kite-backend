import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EventPreviews = props => (
  <Paper className="eventPreviews" zDepth={2}>
    <h3>Upcoming events</h3>
    <table style={{ width: '100%' }}>
      <tbody>
        <tr>
          <th>Where</th>
          <th>When</th>
          <th>Registration</th>
        </tr>
        {
          props.events.map(event => (
            <tr className="eventPreview" key={event.id}>
              <td className="eventTitle" >This is an really long title and its longer now</td>
              <td>{event.start.split('-')[2].substr(0, 2)}.-{event.end.split('-')[2].substr(0, 2)}. {'0-january-february-march-april-may-june-july-august-september-october-november-desember'.split('-')[parseInt(event.end.split('-')[1], 10)]}</td>
              <td>
                <div className="registrationStatus">Closed</div>
              </td>
              <td>
                <Link to={`/event/${event.id}`}>
                  <p className="eventPreviewLink">Go to</p>
                </Link>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </Paper>
);

EventPreviews.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default EventPreviews;
