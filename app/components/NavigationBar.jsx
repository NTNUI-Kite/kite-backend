import React from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import muiThemeable from 'material-ui/styles/muiThemeable';
import PropTypes from 'prop-types';

import LoginButton from './baseComponents/LoginButton';
import LoggedInButton from './baseComponents/LoggedInButton';
import NavLinks from './NavLinks';
import Logo from './Logo';

const NavigationBar = props => (
  <Toolbar className="navigationBar" style={{ backgroundColor: props.muiTheme.palette.primary1Color }}>
    <Logo />
    <NavLinks boardMember={props.boardMember} />
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

export default muiThemeable()(NavigationBar);
