const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL);

router.get('/', function (req, res){
  if(!req.session.user){
    res.render('index',{logged_in:false});
  } else {
    db.any('SELECT * FROM teams WHERE user_id_ref = $1;',[req.session.user])
    .then(function(data){
      res.render('teams/battle',{logged_in:true, teams: data});
    });
  }
});

module.exports = router;
