const express = require('express');
const api_router = express.Router();
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://stavro510@localhost:5432/poke_crud');


api_router.get('/:id',function(req,res) {
  var poke_id = parseInt(req.params.id);
  if (poke_id > 0 && poke_id < 152)
    db.one('SELECT * FROM pokemon WHERE poke_id = $1',[poke_id])
      .catch(function(error){
        res.send(error);
      })
      .then(function(data){
        res.json(data);
      });
  else {
    res.send('Invalid pokemon');
  }
})

module.exports = api_router;
