const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();

const db = pgp(process.env.DATABASE_URL);

// BATTLE
router.get('/', function (req, res){
  if (!req.session.user) {
    res.render('index',{logged_in:false});
  } else {
    db.any('SELECT u.username, t.team_name, t.pokemon_1_id, t.pokemon_2_id, t.pokemon_3_id, t.pokemon_4_id, t.pokemon_5_id, t.pokemon_6_id FROM teams t JOIN users u ON u.user_id = t.user_id_ref WHERE t.user_id_ref != $1 ORDER BY RANDOM() LIMIT 1; SELECT * FROM teams WHERE user_id_ref = $1;',[req.session.user,req.session.user])
    .then(function(data){
      res.render('teams/battle',{logged_in:true, color:req.session.color, enemy: data[0], teams: data.slice(1)});
    });
  }
});

router.get('/new',function (req,res) {
  if (!req.session.user) {
    res.send({'error':'error'});
  } else {
    db.any('SELECT u.username, t.team_name, t.pokemon_1_id, t.pokemon_2_id, t.pokemon_3_id, t.pokemon_4_id, t.pokemon_5_id, t.pokemon_6_id FROM teams t JOIN users u ON u.user_id = t.user_id_ref WHERE t.user_id_ref != $1 ORDER BY RANDOM() LIMIT 1;',[req.session.user])
    .then(function(data){
      res.send({enemy: data[0]});
    });
  }
})



module.exports = router;
