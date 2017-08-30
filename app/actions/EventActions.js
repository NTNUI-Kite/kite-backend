import AppDispatcher from '../dispatcher/AppDispatcher';
import EventConstants from '../constants/EventConstants';
import {GetRequest, AuthorizedGetRequest, PostRequest, AuthorizedPostRequest} from '../utilities/APIFunctions';

const Actions = {
  getEvents: () =>{
    GetRequest('/api/allEvents')
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
    AuthorizedGetRequest('/api/eventById/' + id)
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
    PostRequest('/api/updateEvent', body)
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
    return new Promise((resolve,reject) =>{
      AuthorizedPostRequest('/api/eventSignup',body).then(response => {
        //console.log(response);
        resolve(response);
      })
      .catch(message => {
        reject(response);
        //console.log(message);
      })
    })
  },
  signoff: (body) => {
    return new Promise((resolve,reject) => {
      AuthorizedPostRequest('/api/eventSignoff',body).then(response => {
        //console.log(response);
        resolve(response)
      })
      .catch(message => {
        reject(message);
        //console.log(message);
      })
    })
  }

}

export default Actions;
