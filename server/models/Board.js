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
};

export default Board;
