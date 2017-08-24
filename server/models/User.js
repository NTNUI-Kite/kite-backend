import db from '../utilities/dbConnection';

const User = {
  Login: function(body,facebookId,res) {
    db.query("SELECT * FROM users where facebook_id = ?", [facebookId] ,(err,rows) =>{
      if(err) throw err;
      //if no user exists create new
      if(rows.length == 0){
        const data = {
          facebook_id: facebookId,
          name: body.name,
          email: body.email,
          phone: "",
          board_member: false
        }

        db.query("INSERT INTO users SET ?" , data, (err) => {
          if(err) throw err;

          res.send("new user created");
        })
      }
      else{
        res.send("user found");
      }
    })
  }
}

export default User;
