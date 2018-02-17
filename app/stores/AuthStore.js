import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';

const CHANGE_EVENT = 'change';

let isAuthenticated = false;

let profile = {};

// eslint-disable-next-line no-undef
if (localStorage.getItem('id_token')) {
  isAuthenticated = true;
}

const setUser = (userInfo, token, refreshToken) => {
  // eslint-disable-next-line no-undef
  if (!localStorage.getItem('id_token')) {
    // eslint-disable-next-line no-undef
    localStorage.setItem('profile', JSON.stringify(userInfo));
    // eslint-disable-next-line no-undef
    localStorage.setItem('id_token', token);
    // eslint-disable-next-line no-undef
    localStorage.setItem('refreshToken', refreshToken);
    // eslint-disable-next-line no-undef
    localStorage.setItem('boardMember', userInfo.board_member);
  }
  isAuthenticated = true;
};

const removeUser = () => {
  // eslint-disable-next-line no-undef
  localStorage.removeItem('profile');
  // eslint-disable-next-line no-undef
  localStorage.removeItem('id_token');
  // eslint-disable-next-line no-undef
  localStorage.removeItem('boardMember');

  isAuthenticated = false;
};

const updateUser = (userInfo) => {
  // eslint-disable-next-line no-undef
  localStorage.setItem('profile', JSON.stringify(userInfo));
};

const setProfile = (newProfile) => {
  profile = newProfile;
}

/* eslint class-methods-use-this:
["error", { "exceptMethods": ["isAuthenticated", "getUser", "getJwt"] }] */
class AuthStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  isAuthenticated() {
    return isAuthenticated;
  }

  isBoardMember() {
    if (this.isAuthenticated()) {
      // eslint-disable-next-line no-undef
      return localStorage.getItem('boardMember') === '1';
    }
    return false;
  }

  getUser() {
    if (this.isAuthenticated()) {
      // eslint-disable-next-line no-undef
      return JSON.parse(localStorage.getItem('profile'));
    }
    return {};
  }

  getRefreshJwt() {
    // eslint-disable-next-line no-undef
    return localStorage.getItem('refreshToken');
  }

  getJwt() {
    // eslint-disable-next-line no-undef
    return localStorage.getItem('id_token');
  }

  setJwt(token) {
    // eslint-disable-next-line no-undef
    localStorage.setItem('id_token', token);
  }

  getProfile() {
    return profile;
  }
}


const AuthStore = new AuthStoreClass();

AuthStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case AuthConstants.LOGIN_USER:
      setUser(action.profile, action.token, action.refreshToken);
      AuthStore.emitChange();
      break;

    case AuthConstants.LOGOUT_USER:
      removeUser();
      AuthStore.emitChange();
      break;

    case AuthConstants.UPDATE_USER:
      updateUser(action.userInfo);
      AuthStore.emitChange();
      break;

    case AuthConstants.RECIEVE_PROFILE:
      setProfile(action.profile);
      AuthStore.emitChange();
      break;

    default:
  }
});

export default AuthStore;
