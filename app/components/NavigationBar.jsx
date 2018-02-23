import React from 'react';
// import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import muiThemeable from 'material-ui/styles/muiThemeable';
import PropTypes from 'prop-types';

import LoginButton from './baseComponents/LoginButton';
import LoggedInButton from './baseComponents/LoggedInButton';
import NavLinks from './NavLinks';
import Logo from './Logo';

const NavigationBar = props => (
  <div className="navigationBar">
    <Logo />
    <NavLinks boardMember={props.boardMember} authenticated={props.authenticated} />
    <div className="logInUser">
      {props.authenticated
        ? <LoggedInButton userInfo={props.userInfo} />
        : <LoginButton />}
    </div>
  </div>
);

NavigationBar.propTypes = {
  boardMember: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  userInfo: PropTypes.shape({}).isRequired,
};

export default muiThemeable()(NavigationBar);
