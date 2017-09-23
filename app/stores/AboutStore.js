import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AboutConstants from '../constants/AboutConstants';

const CHANGE_EVENT = 'change';

let text = {};

function setText(newText) {
  text = newText;
}

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getText"] }] */
class AboutStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getText() {
    return text;
  }
}

const AboutStore = new AboutStoreClass();

AboutStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case AboutConstants.RECIEVE_TEXT:
      setText(action.text);
      AboutStore.emitChange();
      break;

    case AboutConstants.RECIEVE_TEXT_ERROR:
      AboutStore.emitChange();
      break;

    case AboutConstants.UPDATE_ABOUT:
      setText(action.about);
      AboutStore.emitChange();
      break;

    default:
  }
});

export default AboutStore;
