import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import {PostRequestWithAuth} from '../utilities/APIFunctions';

export default {

  logUserIn: (profile, token) => {
    PostRequestWithAuth("/api/login", profile,token)
    .then(res =>{
      AppDispatcher.dispatch({
        actionType: AuthConstants.LOGIN_USER,
        profile: profile,
        token: res
      });
    })
    .catch(message =>{
      console.log(message); //TODO: change this to properly dispatch error
    });
  },

  logUserOut: () => {
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT_USER
    });
  }

}
