var db = require('../db');
var Promise = require('bluebird');
var query = Promise.promisify(db.connection.query.bind(db.connection));
// var app = require('../app.js');
module.exports = {
  messages: {
    get: function (cb) {
      query(`SELECT Messages.objectId, Messages.text, Users.username, Rooms.roomname, Messages.createdAt FROM Messages, Users, Rooms WHERE Messages.user_id = Users.users_id && Messages.room_id = Rooms.rooms_id ORDER BY Messages.createdAt DESC`)
      .then((rows)=>{
        cb(rows);
      })
      .catch((err)=>{
        console.log('Error on retreiving data from database', err);
      });
    }, // a function which produces all the messages
    post: function (messageObj, cb) {
      console.log(messageObj);
      query(`INSERT INTO Users (username) VALUES ('${messageObj.username}')`)
      .finally(()=>{
        return query(`INSERT INTO Rooms (roomname) VALUES ('${messageObj.roomname}')`);
      })
      .finally(() => {
        console.log('getting ids for', messageObj.username, messageObj.roomname)
        query(`SELECT Users.users_id, Rooms.rooms_id FROM Users, Rooms WHERE Users.username='${messageObj.username}' AND Rooms.roomname='${messageObj.roomname}'`)
          .then((rows)=>{
            console.log(rows);
            query(`INSERT INTO Messages (user_id, room_id, text) VALUES ('${rows[0].users_id}', '${rows[0].rooms_id}', '${messageObj.text}')`)
            cb();
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

