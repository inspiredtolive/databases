var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      req.setEncoding('utf8');
      var json = '';
      req.on('data', (chunk) => {
        json += chunk;
      });
      req.on('end', ()=> {
        var obj = JSON.parse(json);
        models.messages.post(obj);
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

