const express = require('express');
const userModel = require('../models/user.js');
const message = require('../database').models.message;

const router = express.Router();

router.get('/', async function (req, res, next) {

    let result = await message.find();
    res.send(result);
});


router.get('/online-users', function (req, res, next) {
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


module.exports = router;