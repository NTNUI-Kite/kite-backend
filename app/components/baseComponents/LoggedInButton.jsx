import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import EditUserDialog from '../EditUserDialog';

import AuthActions from '../../actions/AuthActions';


class LoggedInButton extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    AuthActions.logUserOut();
    this.props.history.push('/');
  }

  toggleEdit() {
    this.setState({
      showEdit: !this.state.showEdit,
    });
  }

  render() {
    return (
      <ToolbarGroup>
        <ToolbarTitle className="username" text={this.props.userInfo.name} />
        <IconMenu
          {...this.props}
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Edit Info" onClick={this.toggleEdit} />
          <MenuItem primaryText="Sign out" onClick={this.logout} />
        </IconMenu>
        <EditUserDialog
          toggle={this.toggleEdit}
          open={this.state.showEdit}
          userInfo={this.props.userInfo}
        />
      </ToolbarGroup>
    );
  }
}

LoggedInButton.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


export default withRouter(LoggedInButton);
