import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import https from 'https';

import apiRoutes from './routes/apiRoutes';
import boardRoutes from './routes/boardRoutes';

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(helmet())

app.use(express.static(`${__dirname}./../.dist`));

app.use('/api', apiRoutes);
app.use('/api/board', boardRoutes);

app.get('/', (req, res) => {
  res.send('Hello Digital Ocean!')
})

app.listen(7777, () => {
  console.log('Server running on port 7777')
});
