import AppDispatcher from '../dispatcher/AppDispatcher';
import InstaConstants from '../constants/InstaConstants';
import { GetRequest } from '../utilities/APIFunctions';

const Actions = {
  getFeed: () => {
    GetRequest('/api/instaFeed')
      .then((feed) => {
        AppDispatcher.dispatch({
          actionType: InstaConstants.RECIEVE_FEED,
          feed,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: InstaConstants.RECIEVE_FEED_ERROR,
          message,
        });
      });
  },
};

export default Actions;
