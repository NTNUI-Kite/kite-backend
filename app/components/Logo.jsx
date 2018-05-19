import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <div className="logo">
    <Link to="/">
      <img alt="logo" src="http://localhost:7777/public/images/kitelogo.png" />
    </Link>
  </div>
);

export default Logo;
