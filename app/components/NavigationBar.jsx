import React from 'react';
import { AppBar } from 'material-ui';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import PropTypes from 'prop-types';

import LoginButton from './baseComponents/LoginButton';
import LoggedInButton from './baseComponents/LoggedInButton';
import NavLinks from './NavLinks';
import Logo from './Logo';

const NavigationBar = props => (
  <Toolbar className="navigationBar">
    <Logo />
    <NavLinks {...props.boardMember} />
    <ToolbarGroup>
      {props.authenticated
        ? <LoggedInButton userInfo={props.userInfo} />
        : <LoginButton />}
    </ToolbarGroup>
  </Toolbar>
);

NavigationBar.propTypes = {
  boardMember: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  userInfo: PropTypes.shape({}).isRequired,
};

export default NavigationBar;
