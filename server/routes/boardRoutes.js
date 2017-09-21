import { Router } from 'express';

import Event from '../models/Event';

import About from '../models/About';

import BoardSecurity from '../utilities/BoardSecurity';

import LocalAuthConfig from '../config/LocalAuthConfig';

const router = Router();

const boardCheck = BoardSecurity(LocalAuthConfig);

router.use(boardCheck);

router.get('/test', (req, res) => {
  res.send('success');
});

router.post('/addEvent', (req, res) => {
  Event.addEvent(res);
});

router.post('/updateAbout', boardCheck, (req, res) => {
  About.updateAbout(req.body, res);
});

export default router;
