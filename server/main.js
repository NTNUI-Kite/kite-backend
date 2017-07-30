var express = require('express');
var Event =  require('./models/Event');

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
