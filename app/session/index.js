var session = require('express-session');
require('dotenv').config();

/**
 * Initialize Session
 *
 */
module.exports = function () {
	return session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		unset: 'destroy',
		saveUninitialized: true
	});
};