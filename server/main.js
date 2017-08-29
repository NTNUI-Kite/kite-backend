import express, {Router} from 'express';
//import jwt from 'express-jwt';
import cors from 'cors';
import bodyParser from 'body-parser';

import Event from './models/Event';
import Blog from './models/Blog';
import Board from './models/Board';
import User from './models/User';
import About from './models/About';

import getInstaFeed from './utilities/InstaScraper';
import Security from './utilities/Security';
import BoardSecurity from './utilities/BoardSecurity';

import Auth0Config from './config/AuthConfig';
import LocalAuthConfig from './config/LocalAuthConfig';

let app = express();
let router = Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//const authCheck = jwt(AuthConfig);
const auth0Check = Security(Auth0Config);
const authCheck = Security(LocalAuthConfig);
const boardCheck = BoardSecurity(LocalAuthConfig);

router.get('/allEvents',function(req,res){
  Event.getAllEvents(res);
});

router.get('/eventById/:id',authCheck, function(req,res){
  Event.getEventById(res,req.params.id);
});

router.post('/addEvent', function(req,res){
  Event.addEvent(req.body,res);
});

router.post('/updateEvent', function(req,res){
  Event.updateEvent(req.body,res);
});

router.get('/allBlogPosts', function(req,res){
  res.json(Blog.getAllPosts());
});

router.get('/boardMembers',boardCheck, function(req,res){
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

app.use('/api',router);

app.get('/', function (req,res) {
  res.render('./../app/index.ejs',{});
}).use(express.static(__dirname + './../.dist'))
.listen(7777);
