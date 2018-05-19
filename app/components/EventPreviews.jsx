import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

function checkIfOpen(event) {
  const today = new Date();
  const open = new Date(event.open);
  const deadline = new Date(event.deadline);
  const openDate = open.toDateString().split(' ');
  const openDateString = (`${parseInt(openDate[2], 10)}. ${openDate[1]}`);

  if (open < today && today < deadline) {
    return <div className="registrationStatus open"><Link to={`/event/${event.id}`}>Open</Link></div>;
  } else if (today > deadline) {
    return <div className="registrationStatus closed"><Link to={`/event/${event.id}`}>Closed</Link></div>;
  }
  return <div className="registrationStatus opens"><Link to={`/event/${event.id}`} />{ openDateString }</div>;
}

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
          props.events.slice(0).reverse().map(event => (
            <tr className="eventPreview" key={event.id}>
              <td className="eventTitle"><Link to={`/event/${event.id}`}>This is an really long title and its longer now</Link></td>
              <td className="eventDate"><Link className="eventDate" to={`/event/${event.id}`}>{event.start.split('-')[2].substr(0, 2)}.-{event.end.split('-')[2].substr(0, 2)}. {'0-january-february-march-april-may-june-july-august-september-october-november-desember'.split('-')[parseInt(event.end.split('-')[1], 10)]}</Link></td>
              <td>
                {checkIfOpen(event)}
              </td>
              <td>
                <Link to={`/event/${event.id}`}>
                  <ArrowRight />
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
