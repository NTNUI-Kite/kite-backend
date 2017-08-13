import AppDispatcher from '../dispatcher/AppDispatcher';
import InstaConstants from '../constants/InstaConstants.js'
import {getRequest} from '../utilities/APIFunctions';

const Actions = {
  getFeed: () => {
    getRequest('/api/instaFeed')
    .then(feed =>{
      AppDispatcher.dispatch({
        actionType: InstaConstants.RECIEVE_FEED,
        feed: feed
      });
    })
    .catch(message =>{
      AppDispatcher.dispatch({
        actionType: InstaConstants.RECIEVE_FEED_ERROR,
        message: message
      });
    });
  }
}

export default Actions;
