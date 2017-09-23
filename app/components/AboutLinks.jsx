import React from 'react';
import Paper from 'material-ui/Paper';

const PaperLinks = () => (
  <Paper className="boardLinks">
    <a target="_blank" rel="noreferrer noopener" href="https://www.snapchat.com/add/ntnuikite">
      <img
        className="AboutLinkIcon"
        src={'http://www.freeiconspng.com/uploads/142411756098-snapchat-icon-1.png'}
        alt="snapchat_logo"
      />
    </a>
    <a target="_blank" rel="noreferrer noopener" href="https://www.facebook.com/groups/NTNUIKite">
      <img
        className="AboutLinkIcon"
        src={'http://www.freeiconspng.com/uploads/circle-color-facebook-icon--6.png'}
        alt="facebook_logo"
      />
    </a>
    <a target="_blank" rel="noreferrer noopener" href="https://www.instagram.com/ntnuikite/">
      <img
        className="AboutLinkIcon"
        src={'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2000px-Instagram_logo_2016.svg.png'}
        alt="Instagram_Logo"
      />
    </a>
  </Paper>
);


export default PaperLinks;
