import AppDispatcher from '../dispatcher/AppDispatcher';
import EventConstants from '../constants/EventConstants';
import {getRequest, authorizedGetRequest, postRequest, AuthorizedPostRequest} from '../utilities/APIFunctions';

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
  },
  updateEvent: (body) => {
    postRequest('/api/updateEvent', body)
    .then( response =>{
      AppDispatcher.dispatch({
        actionType: EventConstants.UPDATE_EVENT,
        event: body
      });
    })
    .catch(message =>{
      AppDispatcher.dispatch({
        actionType: EventConstants.UPDATE_EVENT_ERROR,
        message: message
      });
    });
  },
  signup: (body) => {
    AuthorizedPostRequest('/api/eventSignup',body).then(response => {
      //console.log(response);
    })
    .catch(message => {
      console.log(message);
    })
  },
  signoff: (body) => {
    AuthorizedPostRequest('/api/eventSignoff',body).then(response => {
      //console.log(response);
    })
    .catch(message => {
      console.log(message);
    })
  }

}

export default Actions;
