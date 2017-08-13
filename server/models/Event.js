//TODO: import dbConnection and replace with actual db-calls

const Event = {
  getAllEvents: function(callback){
    return ([
        {
          id: 1,
          name: "tur til gokk",
          abstract: "blablabla",
          start: "2018-03-28",
          end: "2018-03-30",
          capacity: "30",
          active: "1",
          price: "1000",
          registration: "2018-03-20"
        },
        {
          id: 1,
          name: "tur til gokk2",
          abstract: "blablablatacostacos",
          start: "2018-03-28",
          end: "2018-03-30",
          capacity: "30",
          active: "1",
          price: "1001",
          registration: "2018-03-20"
        },
      ]);
  },
  getEventById: function(id){
    return({
            id: 1,
            name: "tur til gokk",
            abstract: "blablabla",
            start: "2018-03-28",
            end: "2018-03-30",
            capacity: "30",
            active: "1",
            price: "1000",
            registration: "2018-03-20"
    });
  }
}

export default Event;
