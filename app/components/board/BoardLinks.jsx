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
  <Paper className="boardLinks">
    <div>
      <Link to="/board/events">
        <div className="boardLinkItem" >
          <EventIcon className="boardLinkIcon" />
          <p>Arrangement</p>
        </div>
      </Link>
      <Link to="">
        <div className="boardLinkItem" >
          <BlogIcon className="boardLinkIcon" />
          <p>Nyheter</p>
        </div>
      </Link>
      <Link to="/board/editabout">
        <div className="boardLinkItem" >
          <InfoIcon className="boardLinkIcon" />
          <p>Om oss</p>
        </div>
      </Link>
      <Link to="/board/memberlist">
        <div className="boardLinkItem" >
          <MemberIcon className="boardLinkIcon" />
          <p>Medlemmer</p>
        </div>
      </Link>
    </div>
    <div>
      <Link to="">
        <div className="boardLinkItem" >
          <HMSIcon className="boardLinkIcon" />
          <p>HMS</p>
        </div>
      </Link>
      <Link to="https://drive.google.com/drive/folders/0Bx3Px3yy21msZjRiX3hhb1ZKUVk?usp=sharing" target="_blank" >
        <div className="boardLinkItem" >
          <DocIcon className="boardLinkIcon" />
          <p>Dokumenter</p>
        </div>
      </Link>
      <Link to="">
        <div className="boardLinkItem" >
          <LessonIcon className="boardLinkIcon" />
          <p>Erfaringer</p>
        </div>
      </Link>
      <Link to="">
        <div className="boardLinkItem" >
          <SettingsIcon className="boardLinkIcon" />
          <p>Instillinger</p>
        </div>
      </Link>
    </div>
  </Paper>
);

const BoardLinks = () => <PaperExampleSimple />;

export default BoardLinks;
