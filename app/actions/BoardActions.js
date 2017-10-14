import AppDispatcher from '../dispatcher/AppDispatcher';
import BoardConstants from '../constants/BoardConstants';
import { AuthorizedGetRequest, AuthorizedPostRequest } from '../utilities/APIFunctions';

const Actions = {
  getBoardMembers: () => {
    AuthorizedGetRequest('/api/boardMembers')
      .then((boardMembers) => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.RECIEVE_MEMBERS,
          boardMembers,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.RECIEVE_MEMBERS_ERROR,
          message,
        });
      });
  },
  addNewEvent: () => new Promise((resolve, reject) => {
    AuthorizedPostRequest('/api/board/addEvent')
      .then((response) => {
        resolve(response);
      })
      .catch((message) => {
        reject(message);
      });
  }),
  getEvents: () => AuthorizedGetRequest('/api/board/allevents')
    .then((events) => {
      AppDispatcher.dispatch({
        actionType: BoardConstants.RECIEVE_EVENTS,
        events,
      });
    })
    .catch((message) => {
      AppDispatcher.dispatch({
        actionType: BoardConstants.RECIEVE_EVENTS_ERROR,
        message,
      });
    }),
};

export default Actions;
