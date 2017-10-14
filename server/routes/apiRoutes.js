import { Router } from 'express';

import Event from '../models/Event';
import Blog from '../models/Blog';
import Board from '../models/Board';
import User from '../models/User';
import About from '../models/About';
import Payment from '../models/Payment';

import getInstaFeed from '../utilities/InstaScraper';
import Security from '../utilities/Security';
// import BoardSecurity from '../utilities/BoardSecurity';

import Auth0Config from '../config/AuthConfig';
import LocalAuthConfig from '../config/LocalAuthConfig';

const router = Router();

const auth0Check = Security(Auth0Config);
const authCheck = Security(LocalAuthConfig);
// const boardCheck = BoardSecurity(LocalAuthConfig);

router.get('/allEvents', (req, res) => {
  Event.getActiveEvents(res);
});

router.get('/eventById/:id', (req, res) => {
  Event.getEventById(res, req.params.id);
});

router.post('/updateEvent', (req, res) => {
  Event.updateEvent(req.body, res);
});

router.post('/eventSignup', authCheck, (req, res) => {
  Event.signup(req, res);
});

router.post('/eventSignoff', authCheck, (req, res) => {
  Event.signoff(req.user.userId, req.body, res);
});

router.post('/updateUser', authCheck, (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  User.UpdateUser(token, req.body, res);
});

router.get('/allBlogPosts', (req, res) => {
  res.json(Blog.getAllPosts());
});

router.get('/boardMembers', (req, res) => {
  res.json(Board.getBoardMembers());
});

router.get('/aboutInfo', (req, res) => {
  About.getAllAbout(res);
});

router.get('/instaFeed', (req, res) => {
  getInstaFeed.then((feed) => {
    res.json(feed);
  });
});

router.post('/login', auth0Check, (req, res) => {
  User.Login(req.body, req.user.sub, res);
});

router.post('/pay', authCheck, (req, res) => {
  Payment.pay(req, res);
});

export default router;
