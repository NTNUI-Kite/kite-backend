import AppDispatcher from '../dispatcher/AppDispatcher';
import EventConstants from '../constants/EventConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _events = [];
let _event = {};

function setEvents(events) {
  _events = events;
}

function setEvent(event) {
  _event = event;
}

class EventStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getEvents() {
    return _events;
  }

  getEvent() {
    return _event;
  }

}

const EventStore = new EventStoreClass();

EventStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {
    case EventConstants.RECIEVE_EVENTS:
      setEvents(action.events);
      EventStore.emitChange();
      break

    case EventConstants.RECIEVE_EVENT:
      setEvent(action.event);
      EventStore.emitChange();
      break

    case EventConstants.RECIEVE_EVENT_ERROR:
      alert(action.message);
      EventStore.emitChange();
      break

    case EventConstants.RECIEVE_EVENTS_ERROR:
      alert(action.message);
      EventStore.emitChange();
      break

    default:
  }

});

export default EventStore;
