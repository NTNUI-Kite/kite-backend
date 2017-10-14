import React from 'react';
import Button from 'material-ui/RaisedButton';

import AuthActions from '../../actions/AuthActions';
import AuthConfig from '../../config/AuthConfig';

// eslint-disable-next-line no-undef
const lock = new Auth0Lock(AuthConfig.id, AuthConfig.domain);

const login = () => {
  lock.show((err, profile, token) => {
    if (err) {
      return;
    }
    AuthActions.logUserIn(profile, token);
  });
};

const LoginButton = () => (
  <Button label="Login" onClick={login} />
);

export default LoginButton;
