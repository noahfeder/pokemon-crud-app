const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://stavro510@localhost:5432/poke_crud');

router.get('/', function (req, res){
  if(!req.session.user){
    res.render('index',{logged_in:false});
  } else {
    db.any('SELECT * FROM teams WHERE user_id_ref = $1 ORDER BY team_id DESC;',[req.session.user])
    .then(function(data){
      res.render('index',{logged_in:true, teams: data});
    });
  }
});

router.get('/:id/edit', function (req,res) {
  if(!req.session.user) {
    res.render('index',{logged_in:false});
  } else {
    var team_id = req.params.id;
    db.any(
      'SELECT * FROM teams WHERE team_id = $1; SELECT * FROM pokemon; SELECT * FROM types;',
      [team_id]
      ).then(function(data) {
        if (req.session.user !== data[0].user_id_ref) {
          res.redirect('/');
        } else {
          res.render('teams/edit',{team: data[0], pokemon: data.slice(1,152),types: data.slice(152)});
        }
      }).catch(function(error){
        res.render('index');
      });
  }
});

router.put('/:id/edit', function (req,res) {
  if(!req.session.user) {
    res.render('index',{logged_in:false});
  } else {
    var data = req.body;
    console.log(data);
    db.none(
      'UPDATE teams SET (pokemon_1_id,pokemon_2_id,pokemon_3_id,pokemon_4_id,pokemon_5_id,pokemon_6_id) = ($1,$2,$3,$4,$5,$6) WHERE team_id = $7;',
      [data.poke1,data.poke2,data.poke3,data.poke4,data.poke5,data.poke6,data.id]
      ).then(function() {
        res.json({update:true});
      }).catch(function(error){
        res.json({update:false,error:error});
      });
  }
});

module.exports = router;
