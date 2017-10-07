import React from 'react';
import { AppBar } from 'material-ui';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LoginButton from './baseComponents/LoginButton';
import LoggedInButton from './baseComponents/LoggedInButton';

const logo = (
  <div className="logo">
    <Link to="/">
      <img alt="logo" src="http://via.placeholder.com/167x64" />
    </Link>
  </div>
);

const navLinks = (boardMember) => {
  if (boardMember) {
    return (
      <div>
        <Link className="navLink" to="/events">Events</Link>
        <Link className="navLink" to="/blog">Blog</Link>
        <Link className="navLink" to="/about">About</Link>
        <Link className="navLink" to="/images">Images</Link>
        <Link className="navLink" to="/board">Board</Link>
      </div>
    );
  }
  return (
    <div>
      <Link className="navLink" to="/events">Events</Link>
      <Link className="navLink" to="/blog">Blog</Link>
      <Link className="navLink" to="/about">About</Link>
      <Link className="navLink" to="/images">Images</Link>
    </div>
  );
};

const NavigationBar2 = props => (
  <Toolbar className="navigationBar">
    <ToolbarGroup firstChild>
      {logo}
    </ToolbarGroup>
    <ToolbarGroup>
      {navLinks(props.boardMember)}
    </ToolbarGroup>
    <ToolbarGroup>
      {props.authenticated
        ? <LoggedInButton userInfo={props.userInfo} />
        : <LoginButton />}
    </ToolbarGroup>
  </Toolbar>
);

const NavigationBar = props => (
  <AppBar
    className="navigationBar"
    iconElementLeft={logo}
    title={navLinks(props.boardMember)}
    iconElementRight={props.authenticated
      ? <LoggedInButton userInfo={props.userInfo} />
      : <LoginButton />}
    iconStyleLeft={{
      margin: 0,
    }}
  />
);

NavigationBar.propTypes = {
  boardMember: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  userInfo: PropTypes.shape({}).isRequired,
};

export default NavigationBar2;
