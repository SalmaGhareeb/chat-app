const express = require('express');
const userModel = require('../models/user.js');
const message = require('../database').models.message;
const chat = require('../database').models.chat;
const chatModel = require('../models/chat');

const router = express.Router();

router.route('/online-users').get((req, res, next) => {
    userModel.getOnlineUsers(function (users) {
        let data = users.map((user) => {
            return {
                username: user.username,
                email: user.email
            };
        });

        return res.send(data);
    });

});
router.post('/create', (req, res, next) => {
    chatModel.create(req.body, function (err, rooms) {
        if (err) throw err;
        res.send(rooms);
    });
});

// Rooms
router.route('/public').get((req, res, next) => {
    chatModel.find({ 'type': 'public' }, function (err, rooms) {
        if (err) throw err;
        res.send(rooms);
    });
});



router.route('/m/:id').get(async (req, res, next) => {
    let result = await message.find({ 'chat': req.params.id });
    res.send(result);
});

module.exports = router;