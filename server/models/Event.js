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
          res.json(rows[0]);
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
      res.send("Event saved");
    })
  },

  updateEvent: function(body, res){
    db.query("UPDATE events SET ? where id = ?", [body, body.ID], (err) =>{
      if(err) throw err;
      res.send("event updated");
    })
  }
}

export default Event;
