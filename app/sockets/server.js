const redis = require('redis');
const message = require('../database').models.message;
require('dotenv').config();

let ioEvents = function (io) {
    io.on('connection', function (socket) {

        socket.on('MESSAGE', async function (chat) {
            chat.created = new Date();
            console.log(chat);
            
            await new message(chat).save().then(function (e, message) {
                console.log(message);

            }).catch(e => {
                console.log(e);
            });

            io.emit('MESSAGE', chat);
        });

        socket.on('createChat', function (socket) {

        });



    });
};

let start = function (server) {
    const io = require('socket.io').listen(server, {
        origins: '*:*'
    });
    const adapter = require('socket.io-redis');

    // // Using Redis
    let port = process.env.REDIS_PORT;
    let host = process.env.REDIS_HOST;
    let pub = redis.createClient(port, host);
    let sub = redis.createClient(port, host, {
        return_buffers: true,
    });

    io.adapter(adapter({
        pubClient: pub,
        subClient: sub
    }));

    // Allow sockets to access session data 
    // io.use((socket, next) => {
    // require('../session')(socket.request, {}, next);
    // });

    io.set('transports', ['websocket']);
    ioEvents(io);

    return server;
};

module.exports = start;