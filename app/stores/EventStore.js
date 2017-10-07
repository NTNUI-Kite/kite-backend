import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import EventConstants from '../constants/EventConstants';

const CHANGE_EVENT = 'change';

let events = [];
let event = {};

function setEvents(newEvents) {
  events = newEvents;
}

function setEvent(newEvent) {
  event = newEvent;
}

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getEvents", "getEvent"] }] */
class EventStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getEvents() {
    return events;
  }

  getEvent() {
    return event;
  }
}

const EventStore = new EventStoreClass();

EventStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case EventConstants.RECIEVE_EVENTS:
      setEvents(action.events);
      EventStore.emitChange();
      break;

    case EventConstants.RECIEVE_EVENT:
      setEvent(action.event);
      EventStore.emitChange();
      break;

    case EventConstants.RECIEVE_EVENT_ERROR:
      EventStore.emitChange();
      break;

    case EventConstants.RECIEVE_EVENTS_ERROR:
      EventStore.emitChange();
      break;

    case EventConstants.UPDATE_EVENT_ERROR:
      EventStore.emitChange();
      break;

    default:
  }
});

export default EventStore;
