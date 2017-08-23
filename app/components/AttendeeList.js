import React from  'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

const AttendeeList = (info) => {
  return(
    <Paper className = "attendeeList">
      <h3>Deltagere</h3>
      {
        info.userList.map((user,id) =>(
          <div key = {id}>
            <p>{user.name}</p>
            <Divider/>
          </div>
        ))
      }
    </Paper>
  )
}

export default AttendeeList;
