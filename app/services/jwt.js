const jwt = require('jsonwebtoken');
require('dotenv').config;

module.exports = {
    authorize: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error)
                    reject(error);
                else
                    resolve(decoded);
            });
        });
    },

    sign: (payload) => {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token);
                }
            });
        });
    }

};