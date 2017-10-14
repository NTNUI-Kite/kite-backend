import React from 'react';
import { Paper } from 'material-ui';

import PaperLinks from './SocialMediaLinks';

const Footer = () => (
  <Paper className="footer">
    <PaperLinks />
    <p>Laget av NTNUi kite</p>
    <a>Emil Schrøder så på Ole Barsch lage denne siden</a>
  </Paper>
);

export default Footer;
