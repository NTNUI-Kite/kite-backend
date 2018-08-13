import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import apiRoutes from './routes/apiRoutes';
import boardRoutes from './routes/boardRoutes';

const app = express();

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  response.status(500).json({ error: Something went wrong});
};

app.use(errorHandler);

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(helmet());

app.use('/api', apiRoutes);
app.use('/api/board', boardRoutes);

app.get('/', (req, res) => {
  res.send('Hello, this is API :D :D');
});

app.listen(7777, () => {
  console.log('Server running on port 7777');
});
