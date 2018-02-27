import React from 'react';
import UserList from './baseComponents/UserList';

const AttendeeList = (info) => {
  if (!info.userList) {
    return (<UserList title="Attendees" cssName="attendeeList" />);
  }

  return (
    <UserList {...info} title="Attendees" cssName="attendeeList" />
  );
};

export default AttendeeList;
