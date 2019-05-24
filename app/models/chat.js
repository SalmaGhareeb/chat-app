const chatModel = require('../database').models.chat;


var create = function (data, callback) {
    var newRoom = new chatModel(data);
    newRoom.save(callback);
};

var find = function (data, callback) {
    chatModel.find(data, callback);
};

var findOne = function (data, callback) {
    chatModel.findOne(data, callback);
};

var findById = function (id, callback) {
    chatModel.findById(id, callback);
};

var findByIdAndUpdate = function (id, data, callback) {
    chatModel.findByIdAndUpdate(id, data, { new: true }, callback);
};
/**
 * Add a user along with the corresponding socket to the passed room
 *
 */
var addUser = function (room, socket, callback) {

    // Get current user's id
    var userId = socket.request.session.passport.user;
    var conn = { userId: userId, socketId: socket.id };
    room.connections.push(conn);
    room.save(callback);
};



module.exports = {
    create,
    find,
    findOne,
    findById,
    addUser,
    findByIdAndUpdate
};