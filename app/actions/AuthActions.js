import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import { PostRequestWithAuth, AuthorizedPostRequest, AuthorizedGetRequest } from '../utilities/APIFunctions';

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

  updateUser: (userInfo) => {
    AuthorizedPostRequest('/api/updateUser', userInfo)
      .then(() => {
        AppDispatcher.dispatch({
          actionType: AuthConstants.UPDATE_USER,
          userInfo,
        });
      });
  },

  getProfile: () => {
    AuthorizedGetRequest('/api/userProfile')
      .then((res) => {
        AppDispatcher.dispatch({
          actionType: AuthConstants.RECIEVE_PROFILE,
          profile: res,
        });
      })
      .catch((message) => {
        throw message;
      });
  },

};
