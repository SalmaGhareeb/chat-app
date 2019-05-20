const ApiProblem = require('express-api-problem');
const httpStatus = require('http-status-codes');
const auth = require('../services/jwt');

module.exports = function (req, res, next) {
    let token = req && (req.headers['x-access-token'] || req.headers.authorization);

    if (!token) {
        next(new ApiProblem(httpStatus.BAD_REQUEST, 'Access code is required'));
    }

    auth.authorize(token)
        .then(() => {
            next();
        })
        .catch(() => {
            next(new ApiProblem(httpStatus.FORBIDDEN, 'Access denied'));
        });
};