import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import BoardConstants from '../constants/BoardConstants';

const CHANGE_EVENT = 'change';

let boardMembers = [];

function setBoardMembers(newBoardMembers) {
  boardMembers = newBoardMembers;
}

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getBoardMembers"] }] */
class BoardStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getBoardMembers() {
    return boardMembers;
  }
}

const BoardStore = new BoardStoreClass();

BoardStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case BoardConstants.RECIEVE_MEMBERS:
      setBoardMembers(action.boardMembers);
      BoardStore.emitChange();
      break;

    case BoardConstants.RECIEVE_MEMBERS_ERROR:
      BoardStore.emitChange();
      break;

    default:
  }
});

export default BoardStore;
