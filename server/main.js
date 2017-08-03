var express = require('express');
var router = express.Router();

var Event =  require('./models/Event');
var Blog = require('./models/Blog');
var Board = require('./models/Board');

var getInstaFeed = require("./utilities/InstaScraper");

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

var app = express();

router.get('/allEvents',function(req,res){
  res.json(Event.getAllEvents());
});

router.get('/eventById', function(req,res){
  res.json(Event.getEventById(0)); //TODO: replace 0 with actual Id
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
