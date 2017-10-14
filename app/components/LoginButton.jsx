import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

import EditUserDialog from './EditUserDialog';

class LoginButton extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }


  toggleEdit() {
    this.setState({
      showEdit: !this.state.showEdit,
    });
  }

  render() {
    if (!this.props.authenticated) {
      return (
        <FlatButton label="Login" onClick={this.props.login} />
      );
    }

    return (
      <div>
        <p onClick={this.toggleEdit}>{this.props.userInfo.name}</p>
        <FlatButton onClick={this.props.logout}>Logout</FlatButton>
        <EditUserDialog toggle={this.toggleEdit} open={this.state.showEdit} userInfo={this.props.userInfo} />
      </div>
    );
  }
}

LoginButton.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default LoginButton;
