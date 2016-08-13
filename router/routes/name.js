const express = require('express');
const api_router = express.Router();
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL);

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

api_router.get('/:name',function(req,res) {
  var poke_name = req.params.name;
  poke_name = validateName(poke_name);
  db.one('SELECT * FROM pokemon WHERE img_name = $1',[poke_name])
    .catch(function(error){
      res.send(error);
    })
    .then(function(data){
      res.json(data);
    });
})

module.exports = api_router;
