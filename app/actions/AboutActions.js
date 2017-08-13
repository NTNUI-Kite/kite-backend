import AppDispatcher from '../dispatcher/AppDispatcher';
import AboutConstants from '../constants/AboutConstants';
import {getRequest} from '../utilities/APIFunctions';

const Actions = {
  getText: () => {
    getRequest('/api/aboutInfo')
    .then(text =>{
      AppDispatcher.dispatch({
        actionType: AboutConstants.RECIEVE_TEXT,
        text: text
      });
    })
    .catch(message =>{
      AppDispatcher.dispatch({
        actionType: AboutConstants.RECIEVE_TEXT_ERROR,
        message: message
      });
    });
  }
}

export default Actions;
