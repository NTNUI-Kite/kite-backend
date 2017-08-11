import AppDispatcher from '../dispatcher/AppDispatcher';
import BoardConstants from '../constants/BoardConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _boardMembers = [];

function setBoardMembers(boardMembers){
  _boardMembers = boardMembers;
}

class BoardStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getBoardMembers(){
    return _boardMembers;
  }
}

const BoardStore = new BoardStoreClass();

BoardStore.dispatchToken = AppDispatcher.register(action =>{
  switch(action.actionType) {
    case BoardConstants.RECIEVE_MEMBERS:
      setBoardMembers(action.boardMembers);
      BoardStore.emitChange();
      break

    case BoardConstants.RECIEVE_MEMBERS_ERROR:
      alert(action.message);
      BoardStore.emitChange();
      break

    default:
  }
});

export default BoardStore;
