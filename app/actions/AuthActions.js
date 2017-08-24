import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import {AuthorizedPostRequest} from '../utilities/APIFunctions';

export default {

  logUserIn: (profile, token) => {

    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_USER,
      profile: profile,
      token: token
    });

    AuthorizedPostRequest("/api/login", profile)
    .then(res =>{
      console.log(res);
    })
    .catch(message =>{
      console.log(message);
    });
  },

  logUserOut: () => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT_USER
    });
  }

}
