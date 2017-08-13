import AppDispatcher from '../dispatcher/AppDispatcher';
import InstaConstants from '../constants/InstaConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _feed = {};

function setFeed(feed){
  _feed = feed;
}

class InstaStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getFeed(){
    return _feed;
  }
}

const InstaStore = new InstaStoreClass();

InstaStore.dispatchToken = AppDispatcher.register(action =>{
  switch(action.actionType) {
    case InstaConstants.RECIEVE_FEED:
      setFeed(action.feed);
      InstaStore.emitChange();
      break

    case InstaConstants.RECIEVE_FEED_ERROR:
      alert(action.message);
      InstaStore.emitChange();
      break

    default:
  }
});

export default InstaStore;
