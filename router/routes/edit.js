const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const db = pgp('postgres://stavro510@localhost:5432/poke_crud');

router.get('/:id', function (req,res) {
  if(!req.session.user) {
    res.render('index',{logged_in:false});
  } else {
    var team_id = req.params.id;
    db.any(
      'SELECT * FROM teams WHERE team_id = $1; SELECT * FROM pokemon; SELECT * FROM types;',
      [team_id]
      ).then(function(data) {
        res.render('teams/edit',{teams: data.slice(0,1), pokemon: data.slice(1,152),types: data.slice(152)});
      }).catch(function(error){
        res.render('/');
      });
  }
});

module.exports = router;
