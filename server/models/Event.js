import db from '../utilities/dbConnection';

const Event = {
  getAllEvents: function(res){
  return(
    db.query("SELECT * FROM events",(err,rows) =>{
      if(err) throw err;

      res.json(rows);
    })
  );
  },

  getEventById: function(res,id){
    return(
      db.query("SELECT * FROM events WHERE id = ?", [id], (err,rows) =>{
        if(err) throw err;
        if(rows.length > 0) {
          let eventInfo = rows[0];

          db.query("SELECT name, signup_date FROM event_signups INNER JOIN users on event_signups.user_id = users.id WHERE event_id = ? order by signup_date ASC", [id], (err,signups)=>{
            if(err) throw err;
            eventInfo.signups = signups;
            res.json(eventInfo);
          })
        }
        else{
          res.json();
        }
      })
    );
  },

  addEvent: function(body, res){
    db.query("INSERT INTO events SET ?", body, (err)=>{
      if (err) throw err;
      res.json({message: "event saved"});
    })
  },

  updateEvent: function(body, res){
    db.query("UPDATE events SET ? where id = ?", [body, body.ID], (err) =>{
      if(err) throw err;
      res.json({message: "event updated"});
    })
  },

  signup: function(userId,body,res){
    let today = new Date()
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let info = {
      event_id: body.eventId,
      user_id: userId,
      signup_date: date
    }
    db.query("INSERT INTO event_signups SET ?", info, (err)=>{
      if(err) throw err;
      res.json({message: "success"});
    })
  },
  signoff: function(userId,body,res){
    db.query("DELETE FROM event_signups WHERE event_id = ? AND user_id = ?", [body.eventId,userId], (err)=>{
      if(err) throw err;
      res.json({message: "Signed off"});
    })
  }
}

export default Event;
