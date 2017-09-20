import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthStore from '../../stores/AuthStore';

const PrivateRoute = (props) => {
  if (AuthStore.isBoardMember()) {
    return <Route path={props.path} component={props.component} />;
  }
  return <Redirect to="/" />;
};
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
