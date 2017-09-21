import React from 'react';
import UserList from './baseComponents/UserList';

const WaitingList = (info) => {
  if (!info.userList) {
    return (<UserList title="Venteliste" cssName="waitingList" />);
  }

  return (
    <UserList {...info} title="Venteliste" cssName="waitingList" />
  );
};

export default WaitingList;
