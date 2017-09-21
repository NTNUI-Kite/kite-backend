// TODO: import dbConnection and replace with actual db-calls
import db from '../utilities/dbConnection';

const About = {
  getAllAbout(res) {
    return (
      db.query('SELECT abstract FROM about WHERE id = 1', (err, rows) => {
        if (err) throw err;

        res.json(rows[0]);
      })
    );
  },
  updateAbout(body, res) {
    db.query('UPDATE about SET abstract = ? WHERE id = 1', [body.abstract], (err) => {
      if (err) throw err;
      res.json({ message: 'about updated' });
    });
  },
};

export default About;
