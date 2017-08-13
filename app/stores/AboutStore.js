import AppDispatcher from '../dispatcher/AppDispatcher';
import AboutConstants from '../constants/AboutConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _text = "";

function setText(text){
  _text = text;
}

class AboutStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getText(){
    return _text;
  }
}

const AboutStore = new AboutStoreClass();

AboutStore.dispatchToken = AppDispatcher.register(action =>{
  switch(action.actionType) {
    case AboutConstants.RECIEVE_TEXT:
      setText(action.text);
      AboutStore.emitChange();
      break

    case AboutConstants.RECIEVE_TEXT_ERROR:
      alert(action.message);
      AboutStore.emitChange();
      break

    default:
  }
});

export default AboutStore;
