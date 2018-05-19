import React from 'react';
import { Paper } from 'material-ui';

import PaperLinks from './SocialMediaLinks';

const Footer = () => (
  <Paper className="footer">
    <PaperLinks />
    <p>2018 © NTNUI Kite</p>
  </Paper>
);

export default Footer;
