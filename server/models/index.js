var db = require('../db');
var Promise = require('bluebird');
var query = Promise.promisify(db.connection.query);

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (messageObj) {
      query.call(db.connection, `INSERT INTO Users (name) VALUES ('${messageObj.username}')`);

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

