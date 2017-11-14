import db from '../utilities/dbConnection';

const Board = {
  getBoardMembers() {
    return ([
      {
        id: 1,
        name: 'Emil Schrøder',
        title: 'Tacospiser',
        email: 'emil@bikbok.no',
        phoneNumber: '12121212',
      },
      {
        id: 2,
        name: 'Tørres Lande',
        title: 'Party Host',
        email: 'party@tørres.no',
        phoneNumber: '23232323',
      },
      {
        id: 3,
        name: 'Ole Barsch',
        title: 'Kaptein',
        email: '2kul4skool@gemeil.com',
        phoneNumber: '69696969',
      },
    ]
    );
  },
  getAllEvents(res) {
    db.query('SELECT * FROM events', (err, rows) => {
      if (err) throw err;

      res.json(rows);
    });
  },
  getEventById(res, id) {
    return (
      db.query('SELECT * FROM events WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
          const eventInfo = rows[0];

          db.query('SELECT user_id, name, email, phone, signup_date, comment, has_car FROM event_signups INNER JOIN users on event_signups.user_id = users.id WHERE event_id = ? order by signup_date ASC', [id], (error, signups) => {
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
  getMembers(res) {
    db.query('SELECT * FROM users', (err, rows) => {
      if (err) throw err;

      res.json(rows);
    });
  },
  updateMember(req, res) {
    db.query('UPDATE users SET ? WHERE id=?', [req.body, req.body.id], (err) => {
      if (err) throw err;
      res.json({ message: 'User updated' });
    });
  },
  removeAttendee(body, res) {
    db.query('DELETE FROM event_signups WHERE event_id = ? AND user_id = ?', [body.eventId, body.userId], (err) => {
      if (err) throw err;
      res.json({ message: 'Signed off' });
    });
  },
  addAttendee(body, res) {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const info = {
      event_id: body.eventId,
      user_id: body.userId,
      signup_date: date,
      comment: body.comment,
      has_car: body.hasCar,
    };
    db.query('INSERT INTO event_signups SET ?', info, (err) => {
      if (err) throw err;
      res.json({ message: 'success' });
    });
  },
};

export default Board;
