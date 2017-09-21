import db from '../utilities/dbConnection';

const Event = {
  getAllEvents(res) {
    return (
      db.query('select e.id, e.title, e.abstract, e.start, e.end, e.deadline, e.price, e.location, e.capacity, IFNULL(es.spots_taken,0) as spots_taken from events as e left join (select event_id, count(*) as spots_taken from event_signups group by event_id) as es on e.id = es.event_id', (err, rows) => {
        if (err) throw err;

        res.json(rows);
      })
    );
  },

  getEventById(res, id) {
    return (
      db.query('SELECT * FROM events WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
          const eventInfo = rows[0];

          db.query('SELECT user_id,name, signup_date FROM event_signups INNER JOIN users on event_signups.user_id = users.id WHERE event_id = ? order by signup_date ASC', [id], (error, signups) => {
            if (error) throw error;
            eventInfo.signups = signups;
            res.json(eventInfo);
          });
        } else {
          res.json();
        }
      })
    );
  },

  addEvent(res) {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const info = {
      title: '',
      abstract: '',
      start: date,
      end: date,
      deadline: date,
    };
    db.query('INSERT INTO events SET ?', info, (err, rows) => {
      if (err) throw err;
      res.json({ id: rows.insertId });
    });
  },

  updateEvent(body, res) {
    db.query('UPDATE events SET ? where id = ?', [body, body.id], (err) => {
      if (err) throw err;
      res.json({ message: 'event updated' });
    });
  },

  signup(userId, body, res) {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const info = {
      event_id: body.eventId,
      user_id: userId,
      signup_date: date,
      comment: body.comment,
      has_car: body.hasCar,
    };
    db.query('INSERT INTO event_signups SET ?', info, (err) => {
      if (err) throw err;
      res.json({ message: 'success' });
    });
  },
  signoff(userId, body, res) {
    db.query('DELETE FROM event_signups WHERE event_id = ? AND user_id = ?', [body.eventId, userId], (err) => {
      if (err) throw err;
      res.json({ message: 'Signed off' });
    });
  },
};

export default Event;
