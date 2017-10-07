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
    <Link to="/board/events">
      <Paper className="boardLinkItem" zDepth={2} >
        <EventIcon className="boardLinkIcon" />
        <p>Arrangement</p>
      </Paper>
    </Link>
    <Link to="">
      <Paper className="boardLinkItem" zDepth={2} >
        <SettingsIcon className="boardLinkIcon" />
        <p>Instillinger</p>
      </Paper>
    </Link>
    <Link to="">
      <Paper className="boardLinkItem" zDepth={2} >
        <BlogIcon className="boardLinkIcon" />
        <p>Nyheter</p>
      </Paper>
    </Link>
    <Link to="/board/editabout">
      <Paper className="boardLinkItem" zDepth={2} >
        <InfoIcon className="boardLinkIcon" />
        <p>Om oss</p>
      </Paper>
    </Link>
    <Link to="">
      <Paper className="boardLinkItem" zDepth={2} >
        <HMSIcon className="boardLinkIcon" />
        <p>HMS</p>
      </Paper>
    </Link>
    <Link to="">
      <Paper className="boardLinkItem" zDepth={2} >
        <DocIcon className="boardLinkIcon" />
        <p>Dokumenter</p>
      </Paper>
    </Link>
    <Link to="/board/memberlist">
      <Paper className="boardLinkItem" zDepth={2} >
        <MemberIcon className="boardLinkIcon" />
        <p>Medlemmer</p>
      </Paper>
    </Link>
    <Link to="">
      <Paper className="boardLinkItem" zDepth={2} >
        <LessonIcon className="boardLinkIcon" />
        <p>Erfaringer</p>
      </Paper>
    </Link>
  </Paper>
);

const BoardLinks = () => <PaperExampleSimple />;

export default BoardLinks;
