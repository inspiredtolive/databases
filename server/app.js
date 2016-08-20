var express = require('express');
var db = require('./db');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');
// var Promise = require('bluebird');
// var query = Promise.promisify(db.connection.query.bind(db.connection));

var app = express();
// var users = {};
// var rooms = {};
module.exports.app = app;

// Set what we are listening on.
app.set('port', 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use('/classes', router);

// Serve the client files
app.use(express.static(__dirname + '/../client'));


db.connection.connect();

// starts server after exporting usernames and rooms
// query('SELECT name FROM Users')
// 	.then ((rows) => {
// 		users = rows.reduce(function(p, user) {
// 			p[user.name] = true;
// 			return p;
// 		}, {});
// 		exports.users = users;
// 	})
// 	.then(() => {
// 		return query('SELECT name FROM Rooms');
// 	})
// 	.then((rows) => {
// 		rooms = rows.reduce(function(p, room) {
// 			p[room.name] = true;
// 			return p;
// 		}, {});
// 		exports.rooms = rooms;

		// If we are being run directly, run the server.
		if (!module.parent) {
		  app.listen(app.get('port'));
		  console.log('Listening on', app.get('port'));
		}
	// });

