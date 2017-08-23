import db from '../utilities/dbConnection';

const Event = {
  getAllEvents: function(res){
  return(
    db.query("select * from events",(err,rows) =>{
      if(err) throw err;

      res.json(rows);
    })
  );
  },

  getEventById: function(res,id){
    return(
      db.query("select * from events where id = ?", [id], (err,rows) =>{
        if(err) throw err;

        res.json(rows);
      })
    );
  }
}

export default Event;
