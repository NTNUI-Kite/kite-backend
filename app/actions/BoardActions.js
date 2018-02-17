import AppDispatcher from '../dispatcher/AppDispatcher';
import BoardConstants from '../constants/BoardConstants';
import { AuthorizedGetRequest, AuthorizedPostRequest } from '../utilities/APIFunctions';

const Actions = {

  updateMember: (body) => {
    AuthorizedPostRequest('/api/board/updateMember', body)
      .then(() => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.UPDATE_MEMBER,
          body,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.UPDATE__MEMBERS_ERROR,
          message,
        });
      });
  },
  getMembers: () => {
    AuthorizedGetRequest('/api/board/members')
      .then((members) => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.RECIEVE_MEMBERS,
          members,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.RECIEVE__MEMBERS_ERROR,
          message,
        });
      });
  },
  getBoardMembers: () => {
    AuthorizedGetRequest('/api/boardMembers')
      .then((boardMembers) => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.RECIEVE_BOARD_MEMBERS,
          boardMembers,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.RECIEVE_BOARD_MEMBERS_ERROR,
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
  getEvent: (id) => {
    AuthorizedGetRequest(`/api/board/eventById/${id}`)
      .then((event) => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.RECIEVE_EVENT,
          event,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.RECIEVE_EVENT_ERROR,
          message,
        });
      });
  },
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
  updateEvent: (body) => {
    AuthorizedPostRequest('/api/updateEvent', body)
      .then(() => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.UPDATE_EVENT,
          event: body,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.UPDATE_EVENT_ERROR,
          message,
        });
      });
  },
  removeAttendee: (user, eventId) => {
    const body = {
      userId: user.user_id,
      eventId,
    };
    AuthorizedPostRequest('/api/board/removeAttendee', body)
      .then(() => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.REMOVE_ATTENDEE,
          user,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.REMOVE_ATTENDE_ERROR,
          message,
        });
      });
  },
  addAttendee: (user, eventId, comment, hasCar) => {
    const body = {
      userId: user.id,
      comment: `${comment} - Added by admin`,
      hasCar,
      eventId,
    };
    const newUser = Object.assign({}, user);
    newUser.user_id = user.id;
    newUser.comment = `${comment} - Added by admin`;
    newUser.hasCar = hasCar;
    delete newUser.id;
    delete newUser.facebook_id;
    AuthorizedPostRequest('/api/board/addAttendee', body)
      .then(() => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.ADD_ATTENDEE,
          user: newUser,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: BoardConstants.ADD_ATTENDE_ERROR,
          message,
        });
      });
  },
};

export default Actions;
