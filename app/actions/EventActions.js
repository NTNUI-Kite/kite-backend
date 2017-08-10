import AppDispatcher from '../dispatcher/AppDispatcher';
import EventConstants from '../constants/EventConstants';
import EventsAPI from '../utilities/EventsAPI';

const Actions = {
  recieveEvents: () =>{
    EventsAPI
    .getEvents('/api/allEvents')
    .then(events =>{
      AppDispatcher.dispatch({
        actionType: EventConstants.RECIEVE_EVENTS,
        events: events
      });
    })
    .catch(message =>{
      AppDispatcher.dispatch({
        actionType: EventConstants.RECIEVE_EVENTS_ERROR,
        message: message
      });
    });
  },
  getEvent: (id) => {
    EventsAPI
    .getEvent('/api/eventById/' + id)
    .then(event =>{
      AppDispatcher.dispatch({
        actionType: EventConstants.RECIEVE_EVENT,
        event: event
      });
    })
    .catch(message =>{
      AppDispatcher.dispatch({
        actionType: EventConstants.RECIEVE_EVENT_ERROR,
        message: message
      });
    });
  }
}

export default Actions;
