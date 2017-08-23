import express, {Router} from 'express';
import jwt from 'express-jwt';
import cors from 'cors';

import Event from './models/Event';
import Blog from './models/Blog';
import Board from './models/Board';

import getInstaFeed from './utilities/InstaScraper';

import AuthConfig from './config/AuthConfig';

let app = express();
let router = Router();

app.use(cors());

const authCheck = jwt(AuthConfig);

router.get('/allEvents',function(req,res){
  Event.getAllEvents(res);
});

router.get('/eventById/:id',authCheck, function(req,res){
  Event.getEventById(res,req.params.id);
});

router.get('/allBlogPosts', function(req,res){
  res.json(Blog.getAllPosts());
});

router.get('/boardMembers', function(req,res){
  res.json(Board.getBoardMembers());
});

router.get('/instaFeed',function(req,res){
  getInstaFeed.then((feed) =>{
    res.json(feed);
  });
});

app.use('/api',router);

app.get('/', function (req,res) {
  res.render('./../app/index.ejs',{});
}).use(express.static(__dirname + './../.dist'))
.listen(7777);
