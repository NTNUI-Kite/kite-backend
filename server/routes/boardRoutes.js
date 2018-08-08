import { Router } from 'express';

import Event from '../models/Event';
import About from '../models/About';
import Board from '../models/Board';
import Blog from '../models/Blog';

import BoardSecurity from '../utilities/BoardSecurity';

import LocalAuthConfig from '../config/LocalAuthConfig';

const router = Router();

const boardCheck = BoardSecurity(LocalAuthConfig);

router.use(boardCheck);

router.get('/test', (req, res) => {
  res.send('success');
});

router.get('/members', (req, res) => {
  Board.getMembers(res);
});

router.post('/updateMember', (req, res) => {
  Board.updateMember(req, res);
});

router.get('/allevents', (req, res) => {
  Board.getAllEvents(res);
});

router.get('/eventById/:id', (req, res) => {
  Board.getEventById(res, req.params.id);
});

router.post('/addEvent', (req, res) => {
  Event.addEvent(res);
});

router.post('/updateAbout', (req, res) => {
  About.updateAbout(req.body, res);
});

router.post('/removeAttendee', (req, res) => {
  Board.removeAttendee(req.body, res);
});

router.post('/addAttendee', (req, res) => {
  Board.addAttendee(req.body, res);
});

router.get('/postById/:id', (req, res) => {
  Board.getPostById(res, req.params.id);
});

router.post('/addPost', (req, res) => {
  Blog.addPost(res);
});

export default router;
