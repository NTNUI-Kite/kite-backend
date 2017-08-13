import express, {Router} from 'express';
import jwt from 'express-jwt';
import cors from 'cors';

<<<<<<< HEAD
var Event =  require('./models/Event');
var Blog = require('./models/Blog');
var Board = require('./models/Board');
var About = require('./models/About')
=======
>>>>>>> 19feb6f61ed79076e0e6066b55679a54a8296447

import Event from './models/Event';
import Blog from './models/Blog';
import Board from './models/Board';

import getInstaFeed from './utilities/InstaScraper';

import AuthConfig from './config/AuthConfig';

// var mysql = require('mysql');
//
// var con = mysql.createConnection({
//   host: '',
//   user: '',
//   password: '',
//   database: ''
// });
//
// con.connect();
let app = express();
let router = Router();

app.use(cors());

const authCheck = jwt(AuthConfig);

router.get('/allEvents',function(req,res){
  res.json(Event.getAllEvents());
});

router.get('/eventById/:id',authCheck, function(req,res){
  res.json(Event.getEventById(req.params.id)); //TODO: replace 0 with actual Id
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

app.use('/api',router);

app.get('/', function (req,res) {
  res.render('./../app/index.ejs',{});
}).use(express.static(__dirname + './../.dist'))
.listen(7777);
