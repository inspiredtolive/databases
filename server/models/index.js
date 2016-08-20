var db = require('../db');
var Promise = require('bluebird');
var query = Promise.promisify(db.connection.query.bind(db.connection));
// var app = require('../app.js');
module.exports = {
  messages: {
    get: function () {
      query(`SELECT * FROM Messages`)
      .then((rows)=>{
        console.log(rows);
      })
    }, // a function which produces all the messages
    post: function (messageObj) {
      query(`INSERT INTO Users (name) VALUES ('${messageObj.username}')`)
      .finally(()=>{
        return query(`INSERT INTO Rooms (name) VALUES ('${messageObj.roomname}')`);
      })
      .finally(() => {
        console.log('getting ids for ', messageObj.username, messageObj.roomname)
        query(`SELECT Users.users_id, Rooms.rooms_id FROM Users, Rooms WHERE Users.name='${messageObj.username}' AND Rooms.name='${messageObj.roomname}'`)
          .then((rows)=>{
            query(`INSERT INTO Messages (user_id, room_id, text) VALUES ('${rows[0].users_id}', '${rows[0].rooms_id}', '${messageObj.text}')`)
          });
      })
      .catch((err) => {
        console.log('Warning: duplicate user or room');
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

