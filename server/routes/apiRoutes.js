import {Router} from 'express';

import Event from '../models/Event';
import Blog from '../models/Blog';
import Board from '../models/Board';
import User from '../models/User';
import About from '../models/About';

import getInstaFeed from '../utilities/InstaScraper';
import Security from '../utilities/Security';
//import BoardSecurity from '../utilities/BoardSecurity';

import Auth0Config from '../config/AuthConfig';
import LocalAuthConfig from '../config/LocalAuthConfig';

let router = Router();

const auth0Check = Security(Auth0Config);
const authCheck = Security(LocalAuthConfig);
//const boardCheck = BoardSecurity(LocalAuthConfig);

router.get('/allEvents',function(req,res){
  Event.getAllEvents(res);
});

router.get('/eventById/:id', function(req,res){
  Event.getEventById(res,req.params.id);
});

router.post('/addEvent', function(req,res){
  Event.addEvent(req.body,res);
});

router.post('/updateEvent', function(req,res){
  Event.updateEvent(req.body,res);
});

router.post('/eventSignup',authCheck,function(req,res){
  Event.signup(req.user.userId,req.body,res);
})

router.post('/eventSignoff', authCheck,function(req,res){
  Event.signoff(req.user.userId,req.body,res);
});

router.get('/allBlogPosts', function(req,res){
  res.json(Blog.getAllPosts());
});

router.get('/boardMembers', function(req,res){
  res.json(Board.getBoardMembers());
});

router.get('/aboutInfo', function(req,res){
  res.json(About.getAllAbout());
})

router.get('/instaFeed',function(req,res){
  getInstaFeed.then((feed) =>{
    res.json(feed);
  });
});

router.post('/login', auth0Check,function(req,res){
  User.Login(req.body, req.user.sub, res);
});

export default router;
