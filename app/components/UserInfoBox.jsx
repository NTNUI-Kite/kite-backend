import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Phone from 'material-ui/svg-icons/communication/call';
import User from 'material-ui/svg-icons/action/account-circle';
import Email from 'material-ui/svg-icons/communication/email';
import PropTypes from 'prop-types';
import EditUserDialog from '../components/EditUserDialog';

class UserInfoBox extends Component {
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
    return (
      <Paper className="userInfoBox">
        <Subheader>Your Info</Subheader>
        <List>
          <ListItem disabled primaryText={this.props.userInfo.name} leftIcon={<User />} />
          <ListItem disabled primaryText={this.props.userInfo.phone} leftIcon={<Phone />} />
          <ListItem disabled primaryText={this.props.userInfo.email} leftIcon={<Email />} />
        </List>
        <Button label="Edit" onClick={this.toggleEdit} />
        <EditUserDialog
          toggle={this.toggleEdit}
          open={this.state.showEdit}
          userInfo={this.props.userInfo}
        />
      </Paper>
    );
  }
}

UserInfoBox.propTypes = {
  userInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    facebook_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserInfoBox;
