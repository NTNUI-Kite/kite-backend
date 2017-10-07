import React from 'react';
import { Link } from 'react-router-dom';
import { ToolbarGroup } from 'material-ui/Toolbar';


const Logo = () => (
  <ToolbarGroup className="logo" firstChild>
    <Link to="/">
      <img alt="logo" src="http://via.placeholder.com/167x64" />
    </Link>
  </ToolbarGroup>
);

export default Logo;
