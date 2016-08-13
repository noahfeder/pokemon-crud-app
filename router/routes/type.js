const express = require('express');
const api_router = express.Router();
const pgp = require('pg-promise')();
const db = pgp('postgres://stavro510@localhost:5432/poke_crud');


api_router.get('/:type',function(req,res) {
  var type = req.params.type.toLowerCase();
  db.any('SELECT * FROM pokemon WHERE type = $1',[type])
    .catch(function(error){
      res.send(error);
    })
    .then(function(data){
      res.json(data);
    })
})

module.exports = api_router;
