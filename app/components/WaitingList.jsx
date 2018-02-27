import React from 'react';
import UserList from './baseComponents/UserList';

const WaitingList = (info) => {
  if (!info.userList) {
    return (<UserList title="Waiting list" cssName="waitingList" />);
  }

  return (
    <UserList {...info} title="Waiting list" cssName="waitingList" />
  );
};

export default WaitingList;
