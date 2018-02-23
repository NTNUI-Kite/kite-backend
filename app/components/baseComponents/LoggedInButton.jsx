import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import { ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import muiThemeable from 'material-ui/styles/muiThemeable';
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
    const styles = {
      largeIcon: {
        width: 40,
        height: 40,
      },
      large: {
        width: 80,
        height: 80,
        padding: 20,
      },
    };

    return (
      <ToolbarGroup>
        <ToolbarTitle style={{ color: '#fff', fontSize: '25px', padding: '0px' }} className="username" text={this.props.userInfo.name} />
        <IconMenu
          {...this.props}
          iconButtonElement={
            <IconButton iconStyle={styles.largeIcon} style={styles.large}><AccountCircle color={'#fff'} /></IconButton>
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


export default withRouter(muiThemeable()(LoggedInButton));
