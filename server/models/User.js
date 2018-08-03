import jwt from 'jsonwebtoken';
import db from '../utilities/dbConnection';
import AuthConfig from '../config/LocalAuthConfig';
import TokenRefresher from '../utilities/TokenRefresher';
import Emailer from '../utilities/Emailer';


const createEmail = (userInfo, email) => ({
  email,
  subject: 'Delete user',
  content: `Delele this user ${userInfo}`,
});

const User = {
  login(body, facebookId, res) {
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
      const resBody = {
        userId: userData.id,
        name: userData.name,
        scopes,
      };
      if (userData.board_member) {
        scopes.push('boardMember');
      }
      const token = jwt.sign(
        resBody,
        AuthConfig.secret,
        {
          expiresIn: AuthConfig.expireTime,
        },
      );
      const refreshToken = jwt.sign(
        resBody,
        AuthConfig.refreshSecret,
        { expiresIn: AuthConfig.refreshExpireTime },
      );
      res.json({
        token,
        refreshToken,
        userData,
      });
    });
  },
  UpdateUser(token, body, res) {
    const id = jwt.decode(token).userId;
    db.query('UPDATE users SET name = ?, phone = ?, email = ? WHERE id = ?', [body.name, body.phone, body.email, id], (err) => {
      if (err) throw err;
      res.json({ message: 'User updated' });
    });
  },
  refreshToken(req, res) {
    TokenRefresher(req, res);
  },
  getProfile(userId, res) {
    db.query('SELECT ev.id, ev.title, ev.location, ev.start, es.has_paid FROM event_signups as es INNER JOIN events as ev ON es.event_id=ev.id WHERE user_id=?', [userId], (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },
  deleteUser(userInfo) {
    const emailBody = createEmail(JSON.stringify(userInfo), 'emilp.schroder@gmail.com');
    Emailer.sendMail(emailBody);
  },
};

export default User;
