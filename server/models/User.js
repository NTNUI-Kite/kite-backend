import jwt from 'jsonwebtoken';
import db from '../utilities/dbConnection';
import AuthConfig from '../config/LocalAuthConfig';


const User = {
  Login(body, facebookId, res) {
    const userCheck = new Promise((resolve) => {
      db.query('SELECT * FROM users where facebook_id = ?', [facebookId], (err, rows) => {
        if (err) throw err;
        // if no user exists create new
        if (rows.length === 0) {
          const userInfo = {
            facebook_id: facebookId,
            name: body.name,
            email: body.email,
            phone: '',
            board_member: false,
          };

          db.query('INSERT INTO users SET ?', userInfo, (error) => {
            if (error) throw error;

            // get newly created user
            db.query('SELECT * FROM users where facebook_id = ?', [facebookId], (nestedError, nestedRows) => {
              if (nestedError) throw nestedError;
              resolve(nestedRows[0]);
            });
          });
        } else { // if user existed
          resolve(rows[0]);
        }
      });
    });

    userCheck.then((userData) => {
      const scopes = [];
      if (userData.board_member) {
        scopes.push('boardMember');
      }

      const token = jwt.sign(
        {
          userId: userData.id,
          scopes,
        },
        AuthConfig.secret,
        {
          expiresIn: AuthConfig.expireTime,
        },
      );
      res.json(token);
    });
  },
};

export default User;
