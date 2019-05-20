const express = require('express');
const ApiProblem = require('express-api-problem');
const httpStatus = require('http-status-codes');
const UserSchema = require('../database/').models.user;
const userModel = require('../models/user.js');
const jwt = require('../services/jwt.js');

const router = express.Router();

router.route('/register').post((req, res, next) => {

  const User = new UserSchema(req.body);
  const validateUser = User.joiValidate(req.body);

  if (validateUser.error) {
    next(new ApiProblem(httpStatus.BAD_REQUEST, validateUser.error.details));
  }

  try {
    userModel.createIfNotExists(validateUser.value, (err, data) => {
      if (err) {
        if (err.message) err = err.message;
        return next(new ApiProblem(httpStatus.BAD_REQUEST, err));
      }

      res.send(data);
      return;
    });
  } catch (err) {
    return next(new ApiProblem(httpStatus.BAD_REQUEST, err));
  }
});

router.route('/generate-token').post((req, res, next) => {
  if (req.body.email && req.body.password) {
    return userModel.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error) {
        if (error.message) error = error.message;
        return next(new ApiProblem(httpStatus.FORBIDDEN, error));
      }


      jwt.sign({
        'id': user._id,
        'email': user.email
      }).then((token) => {
        res.send({
          'token': token,
          'username': user.username,
          'email': user.email
        });
        return;

      }).catch((err) => {
        return next(new ApiProblem(httpStatus.BAD_REQUEST, err));
      });

    });
  }

  return next(new ApiProblem(httpStatus.BAD_REQUEST, 'All fields are required'));
});


module.exports = router;