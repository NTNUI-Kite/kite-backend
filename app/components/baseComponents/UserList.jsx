import React from 'react';
import Paper from 'material-ui/Paper';

const UserList = (info) => {
  if (!info.userList) {
    return (<Paper className="attendeeList" />);
  }
  return (
    <Paper className={info.cssName}>
      <h3>{info.title}</h3>
      {
        info.userList.map(user => (
          <div key={user.user_id}>
            <p>{user.name}</p>
          </div>
        ))
      }
    </Paper>
  );
};

export default UserList;
