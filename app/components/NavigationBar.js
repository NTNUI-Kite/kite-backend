import React from 'react';
import {AppBar, FlatButton} from 'material-ui'

const logo = <div className="logo"><img src="http://www.ntnuikite.no/uploads/cache/c4/56/c4567c0fc3d93687d3e90c8eb82835da.jpg" /></div>;

const NavigationBar = () => {
  return(
    <AppBar className = "navigationBar" iconElementLeft = {logo}  iconElementRight={<FlatButton label="Logg in"/>}/>
  );
}

export default NavigationBar;
