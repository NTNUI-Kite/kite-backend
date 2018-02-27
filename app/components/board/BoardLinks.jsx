import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';


import EventIcon from 'material-ui/svg-icons/action/event';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import BlogIcon from 'material-ui/svg-icons/action/announcement';
import InfoIcon from 'material-ui/svg-icons/action/info';
import HMSIcon from 'material-ui/svg-icons/action/report-problem';
import DocIcon from 'material-ui/svg-icons/file/folder';
import MemberIcon from 'material-ui/svg-icons/social/group';
import LessonIcon from 'material-ui/svg-icons/social/school';

const PaperExampleSimple = () => (
  <div className="boardLinks">
    <div>
      <Link to="/board/events">
        <Paper className="boardLinkItem" zDepth={1} >
          <EventIcon className="boardLinkIcon" />
          <p>Events</p>
        </Paper>
      </Link>
      <Link to="">
        <Paper className="boardLinkItem" zDepth={1} >
          <BlogIcon className="boardLinkIcon" />
          <p>Blog</p>
        </Paper>
      </Link>
      <Link to="/board/editabout">
        <Paper className="boardLinkItem" zDepth={1} >
          <InfoIcon className="boardLinkIcon" />
          <p>About us</p>
        </Paper>
      </Link>
      <Link to="/board/memberlist">
        <Paper className="boardLinkItem" zDepth={1} >
          <MemberIcon className="boardLinkIcon" />
          <p>Members</p>
        </Paper>
      </Link>
    </div>
    <div>
      <Link to="">
        <Paper className="boardLinkItem" zDepth={1} >
          <HMSIcon className="boardLinkIcon" />
          <p>HMS</p>
        </Paper>
      </Link>
      <Link to="https://drive.google.com/drive/folders/0Bx3Px3yy21msZjRiX3hhb1ZKUVk?usp=sharing" target="_blank" >
        <Paper className="boardLinkItem" zDepth={1} >
          <DocIcon className="boardLinkIcon" />
          <p>Documents</p>
        </Paper>
      </Link>
      <Link to="">
        <Paper className="boardLinkItem" zDepth={1} >
          <LessonIcon className="boardLinkIcon" />
          <p>Experiences</p>
        </Paper>
      </Link>
      <Link to="">
        <Paper className="boardLinkItem" zDepth={1} >
          <SettingsIcon className="boardLinkIcon" />
          <p>Settings</p>
        </Paper>
      </Link>
    </div>
  </div>
);

const BoardLinks = () => <PaperExampleSimple />;

export default BoardLinks;
