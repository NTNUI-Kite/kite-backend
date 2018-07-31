// TODO: import dbConnection and replace with actual db-calls
import db from '../utilities/dbConnection';

const Blog = {
  getAllPosts(res) {
    return (
      db.query('SELECT * FROM blog', (err, rows) => {
        if (err) throw err;
        res.json(rows);
      })
    );
  },
  addPost(res) {
    const today = new Date();
    const dateToday = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const info = {
      title: '',
      abstract: '',
      date: dateToday,
    };
    db.query('INSERT INTO blog SET ?', info, (err, rows) => {
      if (err) throw err;
      res.json({ id: rows.insertId });
    });
  },
};

export default Blog;
