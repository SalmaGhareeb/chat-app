require('dotenv').config();
const Mongoose = require('mongoose');
const user = require('./schema/user');
const chatroom = require('./schema/chat-room');
const message = require('./schema/message');

var dbURI = "mongodb://" +
    process.env.DB_HOST + ":" +
    process.env.DB_PORT + "/" +
    process.env.DB_NAME;

Mongoose.set('useCreateIndex', true);
Mongoose.connect(dbURI, {
    useNewUrlParser: true,
});

// Throw an error if the connection fails
Mongoose.connection.on('error', function (err) {
    if (err) throw err;
});

module.exports = {
    Mongoose,
    models: {
        user: user,
        chatroom: chatroom,
        message: message
    }
};