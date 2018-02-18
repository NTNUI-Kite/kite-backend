import db from '../utilities/dbConnection';

const Event = {

  getActiveEvents(res) {
    db.query('SELECT e.id, e.title, e.abstract, e.start, e.end, e.deadline, e.price, e.location, e.capacity, IFNULL(es.spots_taken,0) as spots_taken FROM events AS e LEFT JOIN (select event_id, count(*) AS spots_taken FROM event_signups GROUP BY event_id) AS es ON e.id = es.event_id WHERE e.is_active = true AND e.end >= CURDATE()', (err, rows) => {
      if (err) throw err;

      res.json(rows);
    });
  },

  getEventById(res, id) {
    return (
      db.query('SELECT * FROM events WHERE id = ?; SELECT user_id,name, signup_date, comment, has_car, has_paid, waiting_list FROM event_signups INNER JOIN users on event_signups.user_id = users.id WHERE event_id = ? order by signup_date ASC', [id, id], (err, result) => {
        if (err) throw err;
        const eventInfo = result[0][0];
        eventInfo.signups = result[1].filter(entry => entry.waiting_list === 0);
        eventInfo.waitingList = result[1].filter(entry => entry.waiting_list === 1);
        res.json(eventInfo);
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
      open: date,
    };
    db.query('INSERT INTO events SET ?', info, (err, rows) => {
      if (err) throw err;
      res.json({ id: rows.insertId });
    });
  },

  updateEvent(body, res) {
    if (body.capacityChange > 0) {
      db.query('UPDATE event_signups SET waiting_list=0 WHERE waiting_list = 1 AND event_id =? ORDER BY signup_date ASC limit ?', [body.id, body.capacityChange], (uerr) => {
        if (uerr) throw uerr;
      });
    }
    // Code below removes if capacity shrinks, which is complicates the payment process
    // else if (body.capacityChange < 0) {
    //   db.query('UPDATE event_signups SET waiting_list=1 WHERE waiting_list = 0
    // AND event_id =? ORDER BY signup_date DESC limit ?',
    // [body.id, Math.abs(body.capacityChange)], (uerr) => {
    //     if (uerr) throw uerr;
    //   });
    // }
    delete body.capacityChange;
    db.query('UPDATE events SET ? where id = ?', [body, body.id], (err) => {
      if (err) throw err;
      res.json({ message: 'event updated' });
    });
  },
  register(req, res) {
    const userId = req.user.userId;
    const body = req.body;
    const today = new Date();
    const info = {
      event_id: body.eventId,
      user_id: userId,
      signup_date: today,
      comment: body.comment,
      has_car: body.hasCar,
      has_paid: false,
      waiting_list: false,
    };

    const logInfo = {
      event_id: info.event_id,
      user_id: info.user_id,
      date: new Date(),
      action: 'signup',
    };

    db.query('SELECT e.capacity,count(*) AS signups FROM events AS e inner join event_signups AS es ON e.id=es.event_id WHERE e.id=?', [body.eventId], (err, rows) => {
      if (err) throw err;
      const event = rows[0];
      if (event.signups >= event.capacity) {
        info.waiting_list = true;
        logInfo.action = 'waitinglist signup';
      }
      db.query('INSERT INTO event_signups SET ?; INSERT INTO event_signup_log SET ?', [info, logInfo], (signupErr) => {
        if (signupErr) throw signupErr;
        res.json({ message: 'success' });
      });
    });
  },
  signoff(userId, body, res) {
    // TODO: check both waitingList and signups
    db.query('DELETE FROM event_signups WHERE event_id = ? AND user_id = ?; UPDATE event_signups SET waiting_list = 0 WHERE waiting_list=1 and event_id = ? ORDER BY signup_date LIMIT 1; ', [body.eventId, userId, body.eventId], (err) => {
      if (err) throw err;
      const today = new Date();
      const logInfo = {
        event_id: body.eventId,
        user_id: userId,
        date: today,
        action: 'signoff',
      };
      db.query('INSERT INTO event_signup_log SET ?', logInfo, (error) => {
        if (error) throw error;
        res.json({ message: 'success' });
      });
    });
  },
};

export default Event;
