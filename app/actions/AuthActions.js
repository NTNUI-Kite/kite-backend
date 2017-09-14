import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import { PostRequestWithAuth } from '../utilities/APIFunctions';

export default {

  logUserIn: (profile, token) => {
    PostRequestWithAuth('/api/login', profile, token)
      .then((res) => {
        AppDispatcher.dispatch({
          actionType: AuthConstants.LOGIN_USER,
          profile,
          token: res,
        });
      })
      .catch((message) => {
        throw message;
      });
  },

  logUserOut: () => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT_USER,
    });
  },

};
