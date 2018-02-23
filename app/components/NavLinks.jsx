import React from 'react';
import { Link } from 'react-router-dom';
import { ToolbarTitle } from 'material-ui/Toolbar';
import PropTypes from 'prop-types';

const style = {
  fontSize: '25px',
  color: '#fff',
};

const NavLinks = props => (
  <div className="navLinks">
    <Link className="navLink" to="/events">
      <ToolbarTitle style={style} text="Events" />
    </Link>
    <Link className="navLink" to="/blog">
      <ToolbarTitle style={style} text="Blog" />
    </Link>
    <Link className="navLink" to="/about">
      <ToolbarTitle style={style} text="About us" />
    </Link>
    <Link className="navLink" to="/images">
      <ToolbarTitle style={style} text="Images" />
    </Link>
    {props.boardMember
      ? <Link className="navLink" to="/board"> <ToolbarTitle style={style} text="Board" /> </Link>
      : <div />}
    {props.authenticated
      ? <Link className="navLink" to="/profile"> <ToolbarTitle style={style} text="Profile" /> </Link>
      : <div />}
  </div>
);


NavLinks.propTypes = {
  boardMember: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default NavLinks;
