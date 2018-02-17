import jwt from 'jsonwebtoken';
import config from '../config/LocalAuthConfig';

const TokenRefresher = (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: 'No Token found' });
  } else {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.refreshSecret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.status(401).json({ message: 'Expired jwt' });
        } else {
          res.status(401).json({ message: 'Malformed jwt' });
        }
      } else {
        const newToken = jwt.sign(
          {
            userId: decoded.userId,
            name: decoded.name,
            scopes: decoded.scopes,
          },
          config.secret,
          { expiresIn: config.expireTime },
        );
        res.json({
          token: newToken,
        });
      }
    });
  }
};

export default TokenRefresher;
