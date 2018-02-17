import React from 'react';
import { Link } from 'react-router-dom';
import { ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import PropTypes from 'prop-types';

const NavLinks = props => (
  <ToolbarGroup>
    <Link className="navLink" to="/events">
      <ToolbarTitle text="Events" />
    </Link>
    <Link className="navLink" to="/blog">
      <ToolbarTitle text="Blog" />
    </Link>
    <Link className="navLink" to="/about">
      <ToolbarTitle text="About us" />
    </Link>
    <Link className="navLink" to="/images">
      <ToolbarTitle text="Images" />
    </Link>
    {props.boardMember
      ? <Link className="navLink" to="/board"> <ToolbarTitle text="Board" /> </Link>
      : <div />}
    {props.authenticated
      ? <Link className="navLink" to="/profile"> <ToolbarTitle text="Profile" /> </Link>
      : <div />}
  </ToolbarGroup>
);

NavLinks.propTypes = {
  boardMember: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default NavLinks;
