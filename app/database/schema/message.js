const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const MessageSchema = new Schema({
    'handle': String,
    'message': String,
    'created': Date,
    'chat': {
        type: Schema.Types.ObjectId,
        ref: 'chat',
        required: true
    }
});

module.exports = mongoose.model('message', MessageSchema);