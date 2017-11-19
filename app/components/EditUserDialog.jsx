import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import AuthActions from '../actions/AuthActions';

class EditUserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.userInfo.name,
      phone: props.userInfo.phone, // TODO: replace this
      email: props.userInfo.email,
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.cancelDialog = this.cancelDialog.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.userInfo.name,
      phone: nextProps.userInfo.phone,
      email: nextProps.userInfo.email,
    });
  }

  updateUser() {
    const userObject = {
      id: this.props.userInfo.id,
      facebook_id: this.props.userInfo.facebook_id,
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
    };

    AuthActions.updateUser(userObject);
    this.props.toggle();
  }

  cancelDialog() {
    this.setState({
      name: this.props.userInfo.name,
      phone: this.props.userInfo.phone, // TODO: replace this
      email: this.props.userInfo.email,
    });
    this.props.toggle();
  }

  render() {
    const actions = [
      <FlatButton
        key={0}
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onClick={this.cancelDialog}
      />,
      <FlatButton
        key={1}
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={this.updateUser}
      />,
    ];

    return (
      <div>
        <Dialog
          title="User profile"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            name="name"
            hintText="Name"
            floatingLabelText="Name"
            defaultValue={this.state.name}
            onChange={this.handleChange}
          />
          <TextField
            name="phone"
            hintText="Phone-number"
            floatingLabelText="Phone-number"
            defaultValue={this.state.phone}
            onChange={this.handleChange}
          />
          <TextField
            name="email"
            hintText="Email"
            floatingLabelText="Email"
            defaultValue={this.state.email}
            onChange={this.handleChange}
          />
        </Dialog>
      </div>
    );
  }
}

EditUserDialog.propTypes = {
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    facebook_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditUserDialog;
