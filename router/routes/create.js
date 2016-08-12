const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const db = pgp('postgres://stavro510@localhost:5432/poke_crud');

router.get('/', function (req, res) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    db.any('SELECT * FROM pokemon; SELECT * FROM types;'
    ).catch(function(error){
      res.redirect('/');
    }).then(function(data){
      res.render('teams/create',{pokemon: data.slice(0,151),types: data.slice(151)});
    });
  }
});

router.post('/',function(req, res) {
  var team = req.body;
  console.log(req.session.user);
  db.none(
      'INSERT INTO teams(pokemon_1_id,pokemon_2_id,pokemon_3_id,pokemon_4_id,pokemon_5_id,pokemon_6_id,user_id_ref,team_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8);',
      [team.pokemon_1_id,team.pokemon_2_id,team.pokemon_3_id,team.pokemon_4_id,team.pokemon_5_id,team.pokemon_6_id,req.session.user,team.team_name]
    ).catch(function(error){
      console.log(error);
      res.json({error:error.message})
    }).then(function(){
      res.json({error:false});
    });
});

module.exports = router;
