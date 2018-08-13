import db from '../utilities/dbConnection';

const checkEventIfOpen = (event) => {
  let open;
  if (event.length) {
    const thisDate = new Date();
    if (thisDate < event[0].deadline && thisDate > event[0].open) {
      open = 1;
    } else if (thisDate > event[0].deadline || thisDate < event[0].open) {
      open = 0;
    }
    if (event[0].is_Open !== open) {
      db.query('UPDATE events SET is_open = ? WHERE id = ?', [open, event[0].id], (err) => {
        if (err) throw err;
      });
    }
  }
  return open;
};

const checkEventListIfOpen = (eventsList) => {
  const openList = [];
  if (eventsList.length) {
    const thisDate = new Date();
    for (let i = 0; i < eventsList.length; i += 1) {
      let open;
      if (thisDate < eventsList[i].deadline && thisDate > eventsList[i].open) {
        open = 1;
      } else if (thisDate > eventsList[i].deadline || thisDate < eventsList[i].open) {
        open = 0;
      }
      if (eventsList[i].is_Open !== open) {
        db.query('UPDATE events SET is_open = ? WHERE id = ?', [open, eventsList[i].id], (err) => {
          if (err) throw err;
        });
      }
      openList.push(open);
    }
  }
  return openList;
};

const Event = {
<<<<<<< HEAD
  getActiveEvents(res, next) {
    db.query(
      'SELECT e.id, e.title, e.abstract, e.start, e.end, e.open, e.deadline, e.price, e.location, e.capacity, e.is_Open, IFNULL(es.spots_taken,0) as spots_taken FROM events AS e LEFT JOIN (select event_id, count(*) AS spots_taken FROM event_signups GROUP BY event_id) AS es ON e.id = es.event_id WHERE e.is_active = true AND e.end >= CURDATE()',
      (err, rows) => {
        if (err) return next(err);
        const openList = checkEventListIfOpen(rows);
        const events = rows;
        if (openList.length) {
          for (let i = 0; i < openList.length; i += 1) {
            events[i].is_Open = openList[i];
          }
=======

  getActiveEvents(res) {
    db.query('SELECT e.id, e.title, e.abstract, e.start, e.end, e.open, e.deadline, e.price, e.location, e.capacity, e.is_Open, e.img_url, IFNULL(es.spots_taken,0) as spots_taken FROM events AS e LEFT JOIN (select event_id, count(*) AS spots_taken FROM event_signups GROUP BY event_id) AS es ON e.id = es.event_id WHERE e.is_active = true AND e.end >= CURDATE()', (err, rows) => {
      if (err) throw err;
      const openList = checkEventListIfOpen(rows);
      const events = rows;
      if (openList.length) {
        for (let i = 0; i < openList.length; i += 1) {
          events[i].is_Open = openList[i];
>>>>>>> 6aa7b023876f1d231d45bef77109a8a3e8ee1386
        }
        res.json(rows);
      },
    );
  },

  getEventById(res, id) {
    return db.query(
      'SELECT * FROM events WHERE id = ?; SELECT user_id,name, signup_date, comment, has_car, has_paid, waiting_list FROM event_signups INNER JOIN users on event_signups.user_id = users.id WHERE event_id = ? order by signup_date ASC',
      [id, id],
      (err, result) => {
        if (err) throw err;
        const eventInfo = result[0][0];
        eventInfo.signups = result[1].filter(entry => entry.waiting_list === 0);
        eventInfo.waitingList = result[1].filter(entry => entry.waiting_list === 1);
        eventInfo.is_open = checkEventIfOpen(result[0]);
        res.json(eventInfo);
      },
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
      location: '',
    };
    db.query('INSERT INTO events SET ?', info, (err, rows) => {
      if (err) throw err;
      res.json({ id: rows.insertId });
    });
  },

  updateEvent(body, res) {
    if (body.capacityChange > 0) {
      db.query(
        'UPDATE event_signups SET waiting_list=0 WHERE waiting_list = 1 AND event_id =? ORDER BY signup_date ASC limit ?',
        [body.id, body.capacityChange],
        (uerr) => {
          if (uerr) throw uerr;
        },
      );
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

    db.query(
      'SELECT signups, capacity from (SELECT count(*) as signups from event_signups where event_id = ?) as c inner join events as e where e.id=?',
      [body.eventId, body.eventId],
      (err, rows) => {
        if (err) throw err;
        const event = rows[0];
        if (event.signups >= event.capacity) {
          info.waiting_list = true;
          logInfo.action = 'waitinglist signup';
        }
        db.query(
          'INSERT INTO event_signups SET ?; INSERT INTO event_signup_log SET ?',
          [info, logInfo],
          (signupErr) => {
            if (signupErr) throw signupErr;
            res.json({ message: 'success' });
          },
        );
      },
    );
  },
  signoff(userId, body, res) {
    // TODO: check both waitingList and signups
    db.query(
      'DELETE FROM event_signups WHERE event_id = ? AND user_id = ?; UPDATE event_signups SET waiting_list = 0 WHERE waiting_list=1 and event_id = ? ORDER BY signup_date LIMIT 1; ',
      [body.eventId, userId, body.eventId],
      (err) => {
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
      },
    );
  },
};

export default Event;
