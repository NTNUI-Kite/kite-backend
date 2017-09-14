import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import InstaConstants from '../constants/InstaConstants';

const CHANGE_EVENT = 'change';

let feed = {};

function setFeed(newFeed) {
  feed = newFeed;
}

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getFeed"] }] */
class InstaStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getFeed() {
    return feed;
  }
}

const InstaStore = new InstaStoreClass();

InstaStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case InstaConstants.RECIEVE_FEED:
      setFeed(action.feed);
      InstaStore.emitChange();
      break;

    case InstaConstants.RECIEVE_FEED_ERROR:
      InstaStore.emitChange();
      break;

    default:
  }
});

export default InstaStore;
