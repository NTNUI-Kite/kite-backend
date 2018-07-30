// TODO: import dbConnection and replace with actual db-calls
import db from '../utilities/dbConnection';

const Blog = {
  getAllPosts(res) {
    return (
      db.query('SELECT * FROM blog', (err, rows) => {
        if (err) throw err;
        console.log(rows);
        res.json(rows);
      })
    );
  },
};

export default Blog;
