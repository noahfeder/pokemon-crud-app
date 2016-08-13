const express = require('express');
const api_router = express.Router();
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://stavro510@localhost:5432/poke_crud');


function validateName(str) {
  str = str.toLowerCase();
  if (str.indexOf('mime') > -1) {
    return str.replace(/\. |\.%20|\.| |%20/g,'-');
  } else if (str.indexOf('farfetch') > -1) {
    return str.replace(/'/g,'');
  } else if (str.indexOf('nidoran') > -1) {
    return str.replace(/ |%20/g,'');
  } else {
    return str;
  }
}

api_router.get('/',function(req,res) {
  if (req.query.type) {
    db.many('SELECT * FROM pokemon WHERE type = $1',[req.query.type])
    .catch(function(error){
      res.send(error);
    })
    .then(function(data){
      res.json(data);
    })
  } else {
    db.many('SELECT * FROM pokemon;')
    .catch(function(error){
      res.send(error);
    })
    .then(function(data){
      res.json(data);
    })
  }

})

api_router.get('/:id',function(req,res) {
  var poke_id = parseInt(req.params.id);
  if (poke_id > 0 && poke_id < 152) {
    db.one('SELECT * FROM pokemon WHERE poke_id = $1',[poke_id])
      .catch(function(error){
        res.send(error);
      })
      .then(function(data){
        res.json(data);
      });
  } else {
    var name = validateName(req.params.id);
    db.one('SELECT * FROM pokemon WHERE img_name = $1',[name])
      .catch(function(error) {
        res.send(error);
      }).then(function(data) {
        res.json(data);
      })
  }
});



module.exports = api_router;
