import React from 'react';
import UserList from './baseComponents/UserList';

const AttendeeList = (info) => {
  if (!info.userList) {
    return (<UserList title="Deltagere" cssName="attendeeList" />);
  }

  return (
    <UserList {...info} title="Deltagere" cssName="attendeeList" />
  );
};

export default AttendeeList;
