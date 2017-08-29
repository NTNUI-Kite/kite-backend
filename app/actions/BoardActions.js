import AppDispatcher from '../dispatcher/AppDispatcher';
import BoardConstants from '../constants/BoardConstants.js'
import {authorizedGetRequest} from '../utilities/APIFunctions';

const Actions = {
  getBoardMembers: () => {
    authorizedGetRequest('/api/boardMembers')
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
  }
}

export default Actions;
