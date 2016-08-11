const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = pgp('postgres://stavro510@localhost:5432/poke_crud');
router.get('/', function (req, res){

  db.any('SELECT * FROM pokemon;').then(function(data){
    res.render('index',{pokemon:data});
  }).catch(function(error){
    console.log(error);
  })
  // if(!req.session.user){
  //   res.redirect('sessions/new');
  // } else {
  //   res.render('index', { 'email': req.session.user.email });
  // }
});

module.exports = router;
