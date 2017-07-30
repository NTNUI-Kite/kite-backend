//TODO: import dbConnection and replace with actual db-calls

var Board = {
  getBoardMembers: function (callback) {
    return(
      {
        members:[
          {
            name: "Emil Schrøder",
            title: "Tacospiser",
            email: "emil@bikbok.no",
            phoneNumber:"12121212"
          },
          {
            name: "Tørres Lande",
            title: "Party Host",
            email: "party@tørres.no",
            phoneNumber: "23232323"
          },
          {
            name: "Ole Barsch",
            title: "Kaptein",
            email: "2kul4skool@gemeil.com",
            phoneNumber: "69696969"
          }
        ]
      }
    )
  },

}

module.exports = Board;
