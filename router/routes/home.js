const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = pgp('postgres://stavro510@localhost:5432/poke_crud');

router.get('/', function (req, res){
  if(!req.session.user){
    res.redirect('/login');
  } else {
    res.render('index');
  }
});

module.exports = router;
