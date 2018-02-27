import React from 'react';
import { Link } from 'react-router-dom';


const Logo = () => (
  <div className="logo">
    <Link to="/">
      <img alt="logo" src="https://www.emilps.no/kitelogo.png" />
    </Link>
  </div>
);

export default Logo;
