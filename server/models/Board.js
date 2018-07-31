import db from '../utilities/dbConnection';

const Board = {
  getBoardMembers(res) {
    db.query('SELECT * FROM users WHERE board_member = 1', (err, rows) => {
      if (err) throw err;

      res.json(rows);
    });
  },
  getAllEvents(res) {
    db.query('SELECT * FROM events', (err, rows) => {
      if (err) throw err;

      res.json(rows);
    });
  },
  getEventById(res, id) {
    return (
      db.query('SELECT * FROM events WHERE id = ?; SELECT user_id, name, email, phone, signup_date, comment, has_car, has_paid, waiting_list FROM event_signups INNER JOIN users on event_signups.user_id = users.id WHERE event_id = ? order by signup_date ASC; SELECT esl.id, u.name,esl.action , esl.date from event_signup_log as esl INNER JOIN users as u WHERE u.id = esl.user_id AND esl.event_id = ?', [id, id, id], (err, rows) => {
        if (err) throw err;
        if (rows[0].length > 0) {
          const eventInfo = rows[0][0];
          eventInfo.signups = rows[1];
          eventInfo.log = rows[2];
          res.json(eventInfo);
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
  getPostById(res, id) {
    return (
      db.query('SELECT * FROM blog WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;
        res.json(rows);
      })
    );
  },
  updatePost(body, res) {
    console.log('Its here');
    db.query('UPDATE blog SET ? where id = ?', [body, body.id], (err) => {
      if (err) throw err;
      res.json({ message: 'event updated' });
    });
  },
};

export default Board;
