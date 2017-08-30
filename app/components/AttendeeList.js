import React from  'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

const AttendeeList = (info) => {
  if(!info.userList){
    return(<Paper className="attendeeList"/>)
  }

  return(
    <Paper className = "attendeeList">
      <h3>Deltagere</h3>
      {
        info.userList.map((user,id) =>(
          <div key = {id}>
            <p>{user.name}</p>
          </div>
        ))
      }
    </Paper>
  )
}

export default AttendeeList;
