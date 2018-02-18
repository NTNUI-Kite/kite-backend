import React from 'react';
import { Link } from 'react-router-dom';
import { ToolbarGroup } from 'material-ui/Toolbar';


const Logo = () => (
  <ToolbarGroup className="logo" firstChild>
    <Link to="/">
      <img alt="logo" src="https://www.emilps.no/kitelogo.png" />
    </Link>
  </ToolbarGroup>
);

export default Logo;
