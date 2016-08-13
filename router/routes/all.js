const express = require('express');
const api_router = express.Router();
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://stavro510@localhost:5432/poke_crud');


api_router.get('/',function(req,res) {
  db.any('SELECT * FROM pokemon;')
    .catch(function(error){
      res.send(error);
    })
    .then(function(data){
      res.json(data);
    })
})

module.exports = api_router;
