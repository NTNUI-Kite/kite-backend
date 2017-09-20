import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';

const CHANGE_EVENT = 'change';

function setUser(profile, info) {
  // eslint-disable-next-line no-undef
  if (!localStorage.getItem('id_token')) {
    // eslint-disable-next-line no-undef
    localStorage.setItem('profile', JSON.stringify(profile));
    // eslint-disable-next-line no-undef
    localStorage.setItem('id_token', info.token);
    // eslint-disable-next-line no-undef
    localStorage.setItem('boardMember', info.boardMember);
  }
}

function removeUser() {
  // eslint-disable-next-line no-undef
  localStorage.removeItem('profile');
  // eslint-disable-next-line no-undef
  localStorage.removeItem('id_token');
  // eslint-disable-next-line no-undef
  localStorage.removeItem('boardMember');
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
    // eslint-disable-next-line no-undef
    if (localStorage.getItem('id_token')) {
      return true;
    }
    return false;
  }

  isBoardMember() {
    if (this.isAuthenticated()) {
      // eslint-disable-next-line no-undef
      return localStorage.getItem('boardMember');
    }
    return false;
  }

  getUser() {
    // eslint-disable-next-line no-undef
    return JSON.parse(localStorage.getItem('profile'));
  }

  getJwt() {
    // eslint-disable-next-line no-undef
    return localStorage.getItem('id_token');
  }
}

const AuthStore = new AuthStoreClass();

AuthStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case AuthConstants.LOGIN_USER:
      setUser(action.profile, action.token);
      AuthStore.emitChange();
      break;

    case AuthConstants.LOGOUT_USER:
      removeUser();
      AuthStore.emitChange();
      break;

    default:
  }
});

export default AuthStore;
