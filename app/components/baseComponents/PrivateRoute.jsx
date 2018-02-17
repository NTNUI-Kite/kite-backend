import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthStore from '../../stores/AuthStore';

class PrivateRoute extends Component {
  constructor() {
    super();

    this.state = {
      isAuthenticated: AuthStore.isAuthenticated(),
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    AuthStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      isAuthenticated: AuthStore.isAuthenticated(),
    });
  }

  render() {
    if (this.state.isAuthenticated) {
      return <Route path={this.props.path} component={this.props.component} />;
    }
    return <Redirect to="/" />;
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
