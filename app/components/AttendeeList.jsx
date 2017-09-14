import React from 'react';
import Paper from 'material-ui/Paper';

const AttendeeList = (info) => {
  if (!info.userList) {
    return (<Paper className="attendeeList" />);
  }

  return (
    <Paper className="attendeeList">
      <h3>Deltagere</h3>
      {
        info.userList.map(user => (
          <div key={user.id}>
            <p>{user.name}</p>
          </div>
        ))
      }
    </Paper>
  );
};

export default AttendeeList;
