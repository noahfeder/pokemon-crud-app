const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();

const db = pgp(process.env.DATABASE_URL || 'postgres://stavro510@localhost:5432/poke_crud');

// INDEX
router.get('/', function (req, res){
  if(!req.session.user){
    res.render('index',{logged_in:false});
  } else {
    db.any('SELECT * FROM teams WHERE user_id_ref = $1 ORDER BY team_id DESC;',[req.session.user])
    .then(function(data){
      res.render('index',{logged_in:true, color:req.session.color,teams: data});
    });
  }
});

// CREATE GET
router.get('/new', function (req, res) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    db.any(
      'SELECT * FROM pokemon ORDER BY poke_name; SELECT * FROM types  WHERE type_name != $1 AND type_name != $2 AND type_name != $3 ORDER BY type_name;',
      ['dark','steel','flying']
    ).catch(function(error){
      res.redirect('/');
    }).then(function(data){
      res.render('teams/create',{pokemon: data.slice(0,151),types: data.slice(151), color:req.session.color});
    });
  }
});

// CREATE POST
router.post('/new',function(req, res) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    var team = req.body;
    db.none(
      'INSERT INTO teams(pokemon_1_id,pokemon_2_id,pokemon_3_id,pokemon_4_id,pokemon_5_id,pokemon_6_id,user_id_ref,team_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8);',
      [team.pokemon_1_id,team.pokemon_2_id,team.pokemon_3_id,team.pokemon_4_id,team.pokemon_5_id,team.pokemon_6_id,req.session.user,team.team_name]
    ).catch(function(error){
      res.json({error:error.message})
    }).then(function(){
      res.json({error:false});
    });
  }

});

// BATTLE
router.get('/battle', function (req, res){
  if (!req.session.user) {
    res.render('index',{logged_in:false});
  } else {
    db.any('SELECT u.username, t.team_name, t.pokemon_1_id, t.pokemon_2_id, t.pokemon_3_id, t.pokemon_4_id, t.pokemon_5_id, t.pokemon_6_id FROM teams t JOIN users u ON u.user_id = t.user_id_ref WHERE t.user_id_ref != $1 ORDER BY RANDOM() LIMIT 1; SELECT * FROM teams WHERE user_id_ref = $1;',[req.session.user,req.session.user])
    .then(function(data){
      res.render('teams/battle',{logged_in:true, color:req.session.color, enemy: data[0], teams: data.slice(1)});
    });
  }
});

router.get('/battle/new',function (req,res) {
  if (!req.session.user) {
    res.send({'error':'error'});
  } else {
    db.any('SELECT u.username, t.team_name, t.pokemon_1_id, t.pokemon_2_id, t.pokemon_3_id, t.pokemon_4_id, t.pokemon_5_id, t.pokemon_6_id FROM teams t JOIN users u ON u.user_id = t.user_id_ref WHERE t.user_id_ref != $1 ORDER BY RANDOM() LIMIT 1;',[req.session.user])
    .then(function(data){
      res.send({enemy: data[0]});
    });
  }
})

// SHOW
router.get('/:id', function (req,res) {
  if(!req.session.user) {
    res.render('index',{logged_in:false});
  } else {
    var team_id = req.params.id;
    db.any(
      'SELECT * FROM teams WHERE team_id = $1; SELECT * FROM pokemon ORDER BY poke_name; SELECT * FROM types WHERE type_name != $2 AND type_name != $3 AND type_name != $4 ORDER BY type_name;',
      [team_id, 'dark', 'steel', 'flying']
      ).then(function(data) {
        if (req.session.user !== data[0].user_id_ref) {
          res.redirect('/');
        } else {
          res.render('teams/show',{team: data[0], pokemon: data.slice(1,152),types: data.slice(152), color:req.session.color});
        }
      }).catch(function(error){
        res.redirect('/');
      });
  }
});

// EDIT
router.put('/:id', function (req,res) {
  if(!req.session.user) {
    res.redirect('/');
  } else {
    var data = req.body;
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


// DELETE
router.delete('/:id', function (req, res){
  if(!req.session.user){
    res.redirect('/');
  } else {
    var id = req.params.id;
    db.none('DELETE FROM teams WHERE team_id = $1 AND user_id_ref = $2;',[id,req.session.user])
      .catch(function(error) {
        res.send({'deleted':false,'error':error});
      }).then(function() {
        res.send({'deleted':true});
      })
  }
});



module.exports = router;
