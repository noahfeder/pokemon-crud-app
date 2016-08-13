const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://stavro510@localhost:5432/poke_crud');

router.get('/', function (req, res){
  if(!req.session.user){
    res.render('index',{logged_in:false});
  } else {
    db.any('SELECT * FROM teams WHERE user_id_ref != $1 ORDER BY RANDOM() LIMIT 1; SELECT * FROM teams WHERE user_id_ref = $1;',[req.session.user,req.session.user])
    .then(function(data){
      res.render('teams/battle',{logged_in:true, enemy: data[0], teams: data.slice(1)});
    });
  }
});

module.exports = router;
