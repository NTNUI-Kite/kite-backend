import express, {Router} from 'express';
//import jwt from 'express-jwt';
import cors from 'cors';
import bodyParser from 'body-parser';

import apiRoutes from './routes/apiRoutes';
import boardRoutes from './routes/boardRoutes';

let app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + './../.dist'));

app.use('/api',apiRoutes);
app.use('/api/board', boardRoutes);


app.get('*', function (req,res) {
  res.render('./../app/index.ejs');
});

app.listen(7777);
