import AppDispatcher from '../dispatcher/AppDispatcher';
import EventConstants from '../constants/EventConstants';
import { GetRequest, AuthorizedGetRequest, PostRequest, AuthorizedPostRequest } from '../utilities/APIFunctions';

const Actions = {
  getEvents: () => {
    GetRequest('/api/allEvents')
      .then((events) => {
        AppDispatcher.dispatch({
          actionType: EventConstants.RECIEVE_EVENTS,
          events,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: EventConstants.RECIEVE_EVENTS_ERROR,
          message,
        });
      });
  },
  getEvent: (id) => {
    AuthorizedGetRequest(`/api/eventById/${id}`)
      .then((event) => {
        AppDispatcher.dispatch({
          actionType: EventConstants.RECIEVE_EVENT,
          event,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: EventConstants.RECIEVE_EVENT_ERROR,
          message,
        });
      });
  },
  signup: body => new Promise((resolve, reject) => {
    AuthorizedPostRequest('/api/eventSignup', body).then((response) => {
      // console.log(response);
      resolve(response);
    })
      .catch((message) => {
        reject(message);
        // console.log(message);
      });
  }),
  signoff: body => new Promise((resolve, reject) => {
    AuthorizedPostRequest('/api/eventSignoff', body).then((response) => {
      // console.log(response);
      resolve(response);
    })
      .catch((message) => {
        reject(message);
        // console.log(message);
      });
  }),

};

export default Actions;
