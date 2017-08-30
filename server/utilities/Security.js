import jwt from 'jsonwebtoken';
import set from 'lodash.set';

 const _requestProperty = "user";

function checkAuthorization(options){

  return function (req,res,next){
    if(!req.headers.authorization){
        res.status(401).json({message: 'No Token found'})
    }
    else{

      let token = req.headers.authorization.split(' ')[1];

      jwt.verify(token, options.secret, function(err,decoded){
        if(err){
          res.status(401).json({message: 'Malformed jwt'})
        }
        else{
          set(req,_requestProperty,decoded);
          next()
        }
      });
    }
  }

}

export default checkAuthorization;
