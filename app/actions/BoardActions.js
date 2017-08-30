import AppDispatcher from '../dispatcher/AppDispatcher';
import BoardConstants from '../constants/BoardConstants.js'
import {AuthorizedGetRequest, AuthorizedPostRequest} from '../utilities/APIFunctions';

const Actions = {
  getBoardMembers: () => {
    AuthorizedGetRequest('/api/boardMembers')
    .then(boardMembers =>{
      AppDispatcher.dispatch({
        actionType: BoardConstants.RECIEVE_MEMBERS,
        boardMembers: boardMembers
      });
    })
    .catch(message =>{
      console.log(message);
      AppDispatcher.dispatch({
        actionType: BoardConstants.RECIEVE_MEMBERS_ERROR,
        message: message
      });
    });
  },
  addNewEvent: () => {
    return new Promise((resolve,reject) => {
      AuthorizedPostRequest('/api/board/addEvent')
      .then(response => {
        resolve(response);
      })
      .catch(message => {
        reject(message);
      })
    })
  }
}

export default Actions;
