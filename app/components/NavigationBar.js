import React from 'react';
import {AppBar, FlatButton} from 'material-ui'

const logo = <div className="logo"><img src="http://via.placeholder.com/167x100" /></div>;

const NavigationBar = () => {
  return(
    <AppBar className = "navigationBar" iconElementLeft = {logo}  iconElementRight={<FlatButton label="Logg in"/>}/>
  );
}

export default NavigationBar;
