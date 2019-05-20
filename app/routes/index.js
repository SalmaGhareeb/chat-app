const express = require('express');

const router = express.Router();

/* GET home page. */
// Home page
router.get('/', function (req, res, next) {
  // If user is already logged in, then redirect to rooms page
  res.render('login');

});

module.exports = router; 