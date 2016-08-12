const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

router.get('/', function (req, res){
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
