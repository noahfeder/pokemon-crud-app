const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://stavro510@localhost:5432/poke_crud');

router.delete('/:id', function (req, res){
  if(!req.session.user){
    res.render('index',{logged_in:false});
  } else {
    var id = req.params.id;
    db.none('DELETE FROM teams WHERE team_id = $1;',[id])
      .catch(function(error) {
        res.send({'deleted':false,'error':error});
      }).then(function() {
        res.send({'deleted':true});
      })
  }
});

module.exports = router;
