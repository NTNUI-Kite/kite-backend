import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import { PostRequestWithAuth, AuthorizedPostRequest } from '../utilities/APIFunctions';

export default {

  logUserIn: (profile, token) => {
    PostRequestWithAuth('/api/login', profile, token)
      .then((res) => {
        AppDispatcher.dispatch({
          actionType: AuthConstants.LOGIN_USER,
          profile: res.userData,
          token: res.token,
          refreshToken: res.refreshToken,
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

  updateUser: (profile) => {
    AuthorizedPostRequest('/api/updateUser', profile)
      .then(() => {
        AppDispatcher.dispatch({
          actionType: AuthConstants.UPDATE_USER,
          profile,
        });
      });
  },

};
