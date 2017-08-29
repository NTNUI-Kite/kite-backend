import {Router} from 'express';

import BoardSecurity from '../utilities/BoardSecurity';

import LocalAuthConfig from '../config/LocalAuthConfig';

let router = Router();

const boardCheck = BoardSecurity(LocalAuthConfig);

router.use(boardCheck);

router.get("/test", function(req,res){
  console.log("success");
  res.send("success");
})

export default router;
