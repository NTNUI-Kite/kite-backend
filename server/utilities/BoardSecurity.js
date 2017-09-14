import jwt from 'jsonwebtoken';
import set from 'lodash.set';

const requestProperty = 'user';

function checkAuthorization(options) {
  return (req, res, next) => {
    if (!req.headers.authorization) {
      res.status(401).json({ message: 'No Token found' });
    } else {
      const token = req.headers.authorization.split(' ')[1];

      jwt.verify(token, options.secret, (err, decoded) => {
        if (err) {
          res.status(401).json({ message: 'Malformed jwt' });
        } else if (decoded.scopes.includes('boardMember')) {
          set(req, requestProperty, decoded);
          next();
        } else {
          res.status(401).json({ message: 'No access' });
        }
      });
    }
  };
}

export default checkAuthorization;
