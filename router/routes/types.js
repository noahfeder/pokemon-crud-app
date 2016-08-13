const express = require('express');
const api_router = express.Router();
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://stavro510@localhost:5432/poke_crud');

api_router.get('/',function(req,res) {
  db.any('SELECT * FROM types;')
    .catch(function(error){
      res.send(error);
    })
    .then(function(data){
      res.json(data);
    });
});

api_router.get('/:type',function(req,res) {
  var type = req.params.type;
  db.one('SELECT * FROM types WHERE type_name = $1',[type])
    .catch(function(error){
      res.send(error);
    })
    .then(function(data){
      res.json(data);
    });
})


module.exports = api_router;
