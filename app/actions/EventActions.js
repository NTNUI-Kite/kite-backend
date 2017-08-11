import AppDispatcher from '../dispatcher/AppDispatcher';
import EventConstants from '../constants/EventConstants';
import {getRequest, authorizedGetRequest} from '../utilities/APIFunctions';

const Actions = {
  getEvents: () =>{
    getRequest('/api/allEvents')
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
    authorizedGetRequest('/api/eventById/' + id)
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
