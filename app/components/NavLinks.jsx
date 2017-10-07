import React from 'react';
import { Link } from 'react-router-dom';
import { ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

const NavLinks = (boardMember) => {
  if (boardMember) {
    return (
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
        <Link className="navLink" to="/board">
          <ToolbarTitle text="Board" />
        </Link>
      </ToolbarGroup>
    );
  }
  return (
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
    </ToolbarGroup>
  );
};

export default NavLinks;
