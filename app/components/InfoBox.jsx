import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

const createDate = (mysqlDate) => {
  const dateParts = mysqlDate.split('-');
  return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
};

const InfoBox = (event) => {
  if (!event || !event.start) {
    return (<Paper className="infoBox" />);
  }

  const start = createDate(event.start);
  const end = createDate(event.end);
  const deadline = createDate(event.deadline);

  return (
    <Paper className="infoBox">
      <h3>Info</h3>
      <p>Fra: {start.toDateString()}</p>
      <Divider />
      <p>Til: {end.toDateString()}</p>
      <Divider />
      <p>Frist: {deadline.toDateString()}</p>
      <Divider />
      <p>Plasser tatt: {event.spotsTaken}/{event.capacity}</p>
      <Divider />
      <p>Pris: {event.price}</p>
    </Paper>
  );
};

export default InfoBox;
