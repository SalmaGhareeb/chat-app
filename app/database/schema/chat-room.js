const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'room name is required'],

    },
    connections: {
        type: [{
            userId: String,
            socketId: String
        }]
    },
    type: {
        type: String,
        default: '1'
    }
});



module.exports = mongoose.model('chat-room', schema);