import jwt from 'jsonwebtoken';
import db from '../utilities/dbConnection';
import AuthConfig from '../config/LocalAuthConfig';


const User = {
  Login: function(body,facebookId,res) {
    let userCheck = new Promise((resolve,reject) =>{
      let localData;
      db.query("SELECT * FROM users where facebook_id = ?", [facebookId] ,(err,rows) =>{
        if(err) throw err;
        //if no user exists create new
        if(rows.length == 0){
          let userInfo = {
            facebook_id: facebookId,
            name: body.name,
            email: body.email,
            phone: "",
            board_member: false
          }

          db.query("INSERT INTO users SET ?" , userInfo, (err) => {
            if(err) throw err;

            //get newly created user
            db.query("SELECT * FROM users where facebook_id = ?", [facebookId] ,(err,rows) =>{
              if(err) throw err;
              resolve(rows[0])
            })
          })
        }
        //if user existed
        else{
          resolve(rows[0])
        }
      })
    });

    userCheck.then((userData)=>{

      let scopes = [];
      if(userData.board_member){
        scopes.push("boardMember")
      }

      const token = jwt.sign(
        {
          userId: userData.id,
          scopes: scopes
        },
        AuthConfig.secret,
        {
          expiresIn: AuthConfig.expireTime
        }
      );
      res.json(token);

    });
  }
}

export default User;
