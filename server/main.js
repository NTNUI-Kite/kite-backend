import fs from 'fs';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import https from 'https';

import apiRoutes from './routes/apiRoutes';
import boardRoutes from './routes/boardRoutes';

const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.ntnuikite.no/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/api.ntnuikite.no/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/api.ntnuikite.no/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(helmet())

//app.use(express.static(`${__dirname}./../.dist`));
app.use(express.static('/home/kite/public'))

app.use('/api', apiRoutes);
app.use('/api/board', boardRoutes);

app.get('/', (req, res) => {
  res.send('Hello, this is API :D :D')
})

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(7777, () => {
  console.log('Server running on port 7777')
});
