var express = require('express');

var Event =  require('./models/Event');
var Blog = require('./models/Blog');
var Board = require('./models/Board');
var About = require('./models/About')

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

var app = new express();

app.get('/', function (req,res) {
  res.render('./../app/index.ejs',{});
}).use(express.static(__dirname + './../.dist'))
.listen(7777);

app.get('/api/allEvents',function(req,res){
  res.json(Event.getAllEvents());
});

app.get('/api/eventById', function(req,res){
  res.json(Event.getEventById(0)); //TODO: replace 0 with actual Id
});

app.get('/api/allBlogPosts', function(req,res){
  res.json(Blog.getAllPosts());
});

app.get('/api/boardMembers', function(req,res){
  res.json(Board.getBoardMembers());
});

app.get('api/aboutInfo', function(req,res){
  res.json(About.getAllAbout());
})
