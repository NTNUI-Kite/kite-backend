import AppDispatcher from '../dispatcher/AppDispatcher';
import BoardConstants from '../constants/BoardConstants.js'
import {getRequest} from '../utilities/APIFunctions';

const Actions = {
  getBoardMembers: () => {
    getRequest('/api/boardMembers')
    .then(boardMembers =>{
      AppDispatcher.dispatch({
        actionType: BoardConstants.RECIEVE_MEMBERS,
        boardMembers: boardMembers
      });
    })
    .catch(message =>{
      AppDispatcher.dispatch({
        actionType: BoardConstants.RECIEVE_MEMBERS_ERROR,
        message: message
      });
    });
  }
}

export default Actions;
