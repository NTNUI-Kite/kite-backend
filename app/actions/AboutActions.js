import AppDispatcher from '../dispatcher/AppDispatcher';
import AboutConstants from '../constants/AboutConstants';
import { GetRequest, AuthorizedPostRequest } from '../utilities/APIFunctions';

const Actions = {
  getText: () => {
    GetRequest('/api/aboutInfo')
      .then((text) => {
        AppDispatcher.dispatch({
          actionType: AboutConstants.RECIEVE_TEXT,
          text,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: AboutConstants.RECIEVE_TEXT_ERROR,
          message,
        });
      });
  },
  updateAbout: (body) => {
    AuthorizedPostRequest('/api/board/updateAbout', body)
      .then(() => {
        AppDispatcher.dispatch({
          actionType: AboutConstants.UPDATE_ABOUT,
          about: body,
        });
      })
      .catch((message) => {
        AppDispatcher.dispatch({
          actionType: AboutConstants.UPDATE_ABOUT_ERROR,
          message,
        });
      });
  },
};

export default Actions;
